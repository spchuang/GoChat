// @flow

'use strict';

import Promise from 'bluebird';
import Bot from 'fb-local-chat-bot';
import {got} from '../translations/Translator';
import GoGame from '../class/Game';
import GameScoring from '../class/GameScoring';
import {getCountScoreURLButton} from '../response/PostBackUtils';
import config from '../config';
import User from '../class/User';
import GameUtils from '../utils/GameUtils';
import {GameScoringRequestStatus, GameStatus} from '../class/ClassEnums';
import RouteControllerBase from './RouteControllerBase';
import ResignGameHandler from '../response/game/ResignGameHandler';
import {LoggingEvent} from '../logging/LoggingEnums';

async function genScoringJson(scoring: GameScoring, user: User): Promise<Object> {
  const fields = scoring.toJson();
  const opponentUser = await scoring.genCreator();
  const language = user.getLanguage();

  return {
    ...fields,
    isCreator: fields.creatorID === user.getID(),
    requestedByText: got('countScore.requestedByLabel', language, {name: opponentUser.getFirstName()}),
  };
}

class ScoreCountingRouteController extends RouteControllerBase {
  getName(): string {
    return 'countScore';
  }

  getRouterEvent(): string {
    return LoggingEvent.LOAD_COUNT_SCORE_VIEW;
  }

  getLoadMessengerExtension(): boolean {
    return true;
  }

  getPageTitle(lan: string): string {
    return got('button.countScore', lan);
  }

  async genClientContainerParams(user: User, req: Object): Promise<Object> {
    const language = user.getLanguage();
    const game = await GoGame.genEnforce(req.query.gameID);
    let [gameInfo, scorings] = await Promise.all([
      GameUtils.genGameInfo(user.getID(), language, game),
      GameScoring.genAllByGameID(game.getID()),
    ]);
    const scoringsJson = await Promise.all(scorings.map(s => genScoringJson(s, user)));

    gameInfo = {
      ...gameInfo,
      // handle resigned game info,
      isOver: game.isOver(),
      scoreText: game.getScoreText(),
    };

    return {
      gameInfo,
      scorings: scoringsJson,
      defaultScoringID: parseInt(req.query.defaultScoringID, 10),
      text: {
        submitButton: got('button.sendScoreRequest', language),
        createNewScoreButton: got('countScore.createNewScoringButton', language),
        doYouAgreeScoringText: got('countScore.doYouAgreeScoringText', language),
        explainInfoText: got('countScore.explainInfoText', language),
        updateButton: got('button.updateScore', language),
        acceptButton: got('countScore.acceptButton', language),
        rejectButton: got('countScore.rejectButton', language),
        pendingLabel: got('countScore.pendingLabel', language),
        rejectedLabel: got('countScore.rejectedLabel', language),
        black: got('Black', language),
        white: got('White', language),
        totalScore: got('countScore.totalScore', language),
        cancelButton: got('button.cancel', language),
        scoringListHeader: got('countScore.scoringListHeader', language),
      },
    };
  }

  getJS(): Array<string> {
    return [
      'vendor/wgo.min.js',
      'vendor/wgo.player.min.js',
      `web/ScoreCountingContainer.${config.env}.js`,
    ];
  }

  getCSS(): Array<string> {
    return [
      'webviewCommon.css',
      'simulateBoard.css',
      'vendor/wgo.player.css',
    ];
  }
}

const controller = new ScoreCountingRouteController();

controller.post('create', async (user: User, params: Object, res: Object) => {
  let game = await GoGame.genEnforce(params.gameID);
  game.enforceUser(user.getID());

  if (!game.isCountingScore()) {
    throw new Error('Game is not finished yet');
  }

  const scorings = await GameScoring.genAllByGameID(params.gameID);
  if (scorings.length > 0 && scorings[0].getCreatorID() === user.getID()) {
    throw new Error('User already created scoring for the game');
  }

  let scoring = await GameScoring.genCreate(
    user.getID(),
    params.gameID,
    parseInt(params.blackTerritory, 10),
    parseInt(params.blackCapture, 10),
    parseInt(params.whiteTerritory, 10),
    parseInt(params.whiteCapture, 10),
    JSON.parse(params.board),
  );

  if (game.isSelfPlayingGame()) {
    scoring = await GameScoring.genByIDAndGameID(scoring.getID(), params.gameID);
    await scoring.genAccept();

    game = await GoGame.genEnforce(params.gameID); // get updated game
    const opponent = await game.genOpponentUser(user.getID());

    // send message to self
    const winnerColor = game.getStatus() === GameStatus.BLACK_WINS
      ? got('Black', user.getLanguage())
      : got('White', user.getLanguage());
    const opponentName = got('inGameMessage.self', user.getLanguage());
    Bot.sendText(
      user.getFBID(),
      got('countScore.winsByText', user.getLanguage(), {opponentName, color: winnerColor, score: game.getWinsBy()}),
    );

    user = await User.genByUserID(user.getID());
    await ResignGameHandler.genSendEndGameMessage(user);
  } else {
    // send message to opponent
    scoring = await GameScoring.genByIDAndGameID(scoring.getID(), params.gameID);
    const game = await GoGame.genEnforce(params.gameID);
    const opponent = await game.genOpponentUser(user.getID());

    const language = opponent.getLanguage();
    const [whiteScore, blackScore] = scoring.getWhiteAndBlackScores();
    const winnerColor = blackScore > whiteScore
      ? got('Black', language)
      : got('White', language);

    Bot.sendButtons(
      opponent.getFBID(),
      got('countScore.createdScoringMessage', language, {opponentName: user.getFirstName(), color: winnerColor, score: Math.abs(whiteScore - blackScore)}),
      [
        getCountScoreURLButton(
          got('countScore.seeScoringButton', language), opponent, {gameID: game.getID(), defaultScoringID: scoring.getID()},
        ),
      ],
    );
  }
  res.send('');
});

controller.post('update', async (user: User, params: Object, res: Object) => {
  let scoring = await GameScoring.genByIDAndGameID(params.scoringID, params.gameID);
  if (!scoring) {
    throw new Error('Scoring doesn\'t exist');
  }

  if (scoring.getCreatorID() !== user.getID()) {
    throw new Error('Only creator can update the score');
  }

  if (scoring.getStatus() === GameScoringRequestStatus.ACCEPTED) {
    throw new Error('Can only update pending or rejected scoring');
  }

  scoring.setBlackTerritory(parseInt(params.blackTerritory, 10));
  scoring.setBlackCapture(parseInt(params.blackCapture, 10));
  scoring.setWhiteTerritory(parseInt(params.whiteTerritory, 10));
  scoring.setWhiteCapture(parseInt(params.whiteCapture, 10));
  scoring.setBoard(JSON.parse(params.board));
  scoring.setStatus(GameScoringRequestStatus.PENDING);

  if (scoring._model.changed()) {
    await scoring.genSave();

    // send message to opponent
    const game = await GoGame.genEnforce(params.gameID);
    const opponent = await game.genOpponentUser(user.getID());
    scoring = await GameScoring.genByIDAndGameID(scoring.getID(), params.gameID);

    const [whiteScore, blackScore] = scoring.getWhiteAndBlackScores();
    const language = opponent.getLanguage();

    const winnerColor = blackScore > whiteScore
      ? got('Black', language)
      : got('White', language);

    Bot.sendButtons(
      opponent.getFBID(),
      got('countScore.updatedScoringMessage', language, {opponentName: user.getFirstName(), color: winnerColor, score: Math.abs(whiteScore - blackScore)}),
      [
        getCountScoreURLButton(
          got('countScore.seeScoringButton', language), opponent, {gameID: game.getID(), defaultScoringID: scoring.getID()},
        ),
      ],
    );
  }
  res.send('');
});

controller.post('accept', async (user: User, params: Object, res: Object) => {
  let game = await GoGame.genEnforce(params.gameID);
  game.enforceUser(user.getID());

  const scoring = await GameScoring.genByIDAndGameID(params.scoringID, params.gameID);
  if (!scoring) {
    throw new Error('Scoring doesn\'t exist');
  }

  if (scoring.getCreatorID() === user.getID()) {
    throw new Error('Can not accept your own scoring!');
  }

  await scoring.genAccept();
  game = await GoGame.genEnforce(params.gameID); // get updated game
  const opponent = await game.genOpponentUser(user.getID());

  // send message to self
  let winnerColor = game.getStatus() === GameStatus.BLACK_WINS
    ? got('Black', user.getLanguage())
    : got('White', user.getLanguage());
  Bot.sendText(
    user.getFBID(),
    got('countScore.winsByText', user.getLanguage(), {opponentName: opponent.getFirstName(), color: winnerColor, score: game.getWinsBy()}),
  );
  user = await User.genByUserID(user.getID());
  ResignGameHandler.genSendEndGameMessage(user);

  // send message to opponent
  const language = opponent.getLanguage();
  winnerColor = game.getStatus() === GameStatus.BLACK_WINS
    ? got('Black', language)
    : got('White', language);

  Bot.sendText(
    opponent.getFBID(),
    got('countScore.acceptSelfScoringMessage', language, {opponentName: user.getFirstName()}) +
      got('countScore.winsByText', language, {opponentName: user.getFirstName(), color: winnerColor, score: game.getWinsBy()}),
  );
  ResignGameHandler.genSendEndGameMessage(opponent);
  res.send('');
});

controller.post('reject', async (user: User, params: Object, res: Object) => {
  const game = await GoGame.genEnforce(params.gameID);
  game.enforceUser(user.getID());

  const scoring = await GameScoring.genByIDAndGameID(params.scoringID, params.gameID);
  if (!scoring) {
    throw new Error('Scoring doesn\'t exist');
  }

  if (scoring.getCreatorID() === user.getID()) {
    throw new Error('Cannot reject your own scoring!');
  }

  scoring.setStatus(GameScoringRequestStatus.REJECTED);

  if (scoring._model.changed()) {
    await scoring.genSave();

    // send message to opponent
    const opponent = await game.genOpponentUser(user.getID());

    const language = opponent.getLanguage();
    Bot.sendButtons(
      opponent.getFBID(),
      got('countScore.rejectScoringMessage', language, {opponentName: user.getFirstName()}),
      [
        getCountScoreURLButton(
          got('countScore.seeScoringButton', language), opponent, {gameID: game.getID(), defaultScoringID: scoring.getID()},
        ),
      ],
    );
  }
  res.send('');
});
module.exports = controller;
