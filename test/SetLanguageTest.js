// @flow

'use strict';

import 'babel-polyfill';
import {expect} from 'chai';
import {mochaAsync, getLastMessageForUser} from './TestHelpers';
import makeServer from '../src/server';
import User from '../src/class/User';
import ResponseHandler from '../src/response/ResponseHandler';
import Bot from 'fb-local-chat-bot';
import {PostBackTypes} from '../src/response/PostBackUtils';
import {got} from '../src/translations/Translator';
import {LANGUAGE_TO_NAME_MAP} from '../src/translations/TranslationConstants';

describe('Set Language function test', function() {
  this.timeout(1000);
  var server;
  var userID = 'testUser';
  beforeEach(mochaAsync(async () => {
    server = await makeServer(true /* silent */);
  }));

  afterEach(function (done) {
    Bot.clearLocalChatMessages();
    Bot.removeAllListeners();
    server.close(done);
  });

  it('Should show all available languages', mochaAsync(async () => {
    await ResponseHandler.handleText(userID, "help");
    let messages = Bot.getLocalChatMessagesForUser(userID);
    expect(messages.length).to.equal(2);
    await ResponseHandler.handlePostback(userID, PostBackTypes.SHOW_LANGUAGES);

    //update messages and get the buttons from the latest message
    let buttons = getLastMessageForUser(userID).quick_replies;
    // The amount of buttons should be equal to the amount of languages
    expect(buttons.length).to.equal(Object.keys(LANGUAGE_TO_NAME_MAP).length);

    // Flatten buttons array to button titles
    let buttonTitles = buttons.map(function(button){
      return button.title;
    });

    // Flatten Languages object to array of language names
    let languageNames = Object.keys(LANGUAGE_TO_NAME_MAP).map(function(code) {
      return LANGUAGE_TO_NAME_MAP[code];
    });

    for (let i = 0, len = buttonTitles.length; i < len; i++) {
      expect(buttonTitles[i]).to.equal(languageNames[i]);
    }
  }));

  it('Language chosen should be saved when set', mochaAsync(async () => {
    let englishCode = 'en';
    let tChineseCode = 'zh_tw';
    let tChinesePayload = PostBackTypes.SET_LANGUAGE + ':' + tChineseCode;
    let englishPayload = PostBackTypes.SET_LANGUAGE + ':' + englishCode;

    // set to chinese
    await ResponseHandler.handlePostback(userID, tChinesePayload);
    expect(getLastMessageForUser(userID).text).to.equal(got('normalMessage.languageSaved', tChineseCode));
    let user = await User.genByFBID(userID);
    expect(user.getLanguage()).to.equal(tChineseCode);

    // set to english
    await ResponseHandler.handlePostback(userID, englishPayload);
    expect(getLastMessageForUser(userID).text).to.equal(got('normalMessage.languageSaved',englishCode));
    user = await User.genByFBID(userID);
    expect(user.getLanguage()).to.equal(englishCode);
  }));
});
