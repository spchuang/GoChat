// @flow

'use strict';

import './global';
import process from 'process';
import express from 'express';
import exphbs from'express-handlebars';
import bodyParser from 'body-parser';
import models from './class/schema';
import Promise from 'bluebird';
import Bot from 'fb-local-chat-bot';
import GK from './utils/GK';
import {got} from './translations/Translator';
import {setUpLoggingJobs} from  './logging/Logger';
import User from './class/User';
import ResponseHandler from './response/ResponseHandler';
import PersistentMenuDefinition from './utils/PersistentMenuDefinition';
import config from './config';

process.title = 'GoChat'

// if (config.env === 'dev') {
//   Promise.config({
//     longStackTraces: true,
//   });
// }

// Override send functions to be no-op for AI user
Bot.oldSend = Bot.send;
Bot.send = function(recipientID: string, messageData: Object): Promise {
  if (recipientID === '0' || !recipientID) {
    return;
  }

  // local chat wouldn't require promise
  const promise = Bot.oldSend(recipientID, messageData);
  if (promise) {
    promise.then(() => {
      info(`Done send message for user ${recipientID}`);
    });
  }
}
Bot.oldSendSenderAction = Bot.sendSenderAction;
Bot.sendSenderAction = function(recipientID: string, action: string): Promise {
  if (recipientID === '0' || !recipientID) {
    return;
  }
  Bot.oldSendSenderAction(recipientID, action);
}

const XFRAME_WHITELIST = [ 'https://www.messenger.com/', 'https://www.facebook.com/' ];
function addMyHeaders(req, res, next){
  if (XFRAME_WHITELIST.indexOf(req.query.domain) !== -1) {
      res.header('X-FRAME-OPTIONS', 'ALLOW-FROM ' + req.query.domain);
  }
  next();
}

async function makeServer(silent: boolean = false): Promise<Object> {
  const app = express();

  // Register Handlebar templating engine
  const hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
      env: () => config.env,
      json: (s: string) => JSON.stringify(s),
    },
    defaultLayout: 'main',
    layoutsDir: APP_ROOT + '/templates/layouts',
    partialsDir: APP_ROOT + '/templates',
  });
  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');
  app.set('views', APP_ROOT + '/templates');
  app.use(addMyHeaders)

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  // init messenger bot api
  Bot.init(
    config.FBChatToken || '',
    'SETUP_PLAY_GO_THIS_IS_RIGHT',
    config.useFBChatLocalTest || false,
    config.useMessenger,
  );

  Bot.setPersistentMenu(PersistentMenuDefinition.getMenus());
  // Bot.storePersistentMenu();
/*
  User.genByFBID('743742272394998').then(user => {
    if (user) {
      ProfileImageUtils.genProfilePicAndSave(user);
    }
  })
*/
  async function genHandle(senderID: string, callback: Function) {
    try {
      await callback();
    } catch (err) {
      console.log(err);
      const user = await User.genOrCreateByFBID(senderID);
      let errorMessage = got('typedException.SOMETHING_IS_WRONG', user.getLanguage());
      /*
      if (err.name !== 'SequelizeDatabaseError' && err.name !== 'TypeError') {
        errorMessage += ' ' + err;
      }
      */
      await Bot.sendText(senderID, errorMessage.substring(0, 320));
    }
  }

  Bot.on('text', async (event: Object) => {
    await genHandle(
      event.sender.id,
      async () => await ResponseHandler.handleText(event.sender.id, event.message.text),
    );
  });

  Bot.on('attachments', async (event: Object) => {
    await genHandle(
      event.sender.id,
      async () => {
        await ResponseHandler.handleAttachment(
          event.sender.id,
          event.message.attachments,
        );
      },
    );
  });

  Bot.on('postback', async (event: Object) => {
    await genHandle(
      event.sender.id,
      async () => {
        await ResponseHandler.handlePostback(
          event.sender.id,
          event.postback.payload,
        );
      },
    );
  });

  Bot.on('quick_reply', async (event: Object) => {
    await genHandle(
      event.sender.id,
      async () => {
        await ResponseHandler.handlePostback(
          event.sender.id,
          event.message.quick_reply.payload,
        );
      },
    );
  });

  // configure routes with node app
  await require('./routes/routes.js')(app);

  await models.sequelize.sync();
  await GK.init();

  var server = app.listen(5000, function() {
    if (!silent) {
      console.log('Listening on port %s...', server.address().port);
    }

    setUpLoggingJobs();
  });


  // await createPersistedMenu.genSave();
  if (config.env === 'dev' && !config.test) {
    printRoutes('', app._router.stack);
    // TODO: analyze why startup take so much memory
    // const usage = process.memoryUsage();
    // console.log('RSS: ' + bytesToSize(usage.rss, 3), 'and Heap:', bytesToSize(usage.heapUsed, 3), 'of', bytesToSize(usage.heapTotal, 3), 'total');
  }

  return server;
}

function printRoutes(baseUrl, routes) {
  var Table = require('cli-table');
  var table = new Table({ head: ["", "regex", "Path"] });
  console.log('\nAPI for ' + baseUrl);
  console.log('\n********************************************');

  routes.forEach(route => {
    if (route.name !== 'router') {
      return;
    }

    route.handle.stack.forEach(stack => {
      const val = stack.route;
      if (!val) {
        return;
      }

      var _o = {};
      _o[val.stack[0].method]  = [route.regexp, baseUrl + val.path];
      table.push(_o);
    });
  });

  console.log(table.toString());
};

// var unit = ['', 'K', 'M', 'G', 'T', 'P'];
// function bytesToSize(input, precision) {
//     var index = Math.floor(Math.log(input) / Math.log(1024));
//     if (unit >= unit.length) {
//       return input + ' B';
//     }
//     return (input / Math.pow(1024, index)).toFixed(precision) + ' ' + unit[index] + 'B'
// }

module.exports = makeServer;
