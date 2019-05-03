// @flow

import {got} from '../translations/Translator';
import Promise from 'bluebird';
import GoGame from '../class/Game';

async function genGameInfo(userID: number, language: string, game: GoGame): Promise<Object> {
  const [sgf, opponentUser] = await Promise.all([
    game.genSGF(),
    game.genOpponentUser(userID)
  ])
  const opponentName = opponentUser.getID() === userID
    ? got('inGameMessage.self', language)
    : opponentUser.getFirstName();

  return {
    sgf,
    opponentName,
    move: game.getStonesHistory().length,
    id: game.getID(),
    komi: game.getKomi(),
  };
}

module.exports = {
  genGameInfo,
};
