// @flow

import config from '../config';
import Bot from 'fb-local-chat-bot';
import CreateGameRouteController from './CreateGameRouteController';
import JoinGameRouteController from './JoinGameRouteController';
import InternalRoutes from './internal/InternalRoutes';
import SimulateBoardRouteController from './SimulateBoardRouteController';
import ScoreCountingRouteController from './ScoreCountingRouteController';
import MessageRouteController from './MessageRouteController';
import st from 'st';

const routeControllers = [
  SimulateBoardRouteController,
  CreateGameRouteController,
  JoinGameRouteController,
  ScoreCountingRouteController,
  MessageRouteController,
];

const appRouter = async (app: Object) => {

  // load home page
  app.get('/', (req, res) => {
    res.sendFile('web/index.html', {root: APP_ROOT + '/public'});
  });

  app.use('/webhook', Bot.router());

  const cacheOptions = config.env === 'dev'
    ? false
    : {
        fd: {
          max: 1000, // number of fd's to hang on to
          maxAge: 1000*60*60, // 1 hour
        },
        stat: {
          max: 5000, // number of stat objects to hang on to
          maxAge: 1000 * 60, // 1 mins
        },
        content: {
          max: 1024*1024*32, // 32 mb
          maxAge: 1000 * 60 * 10, // 10 mins
          cacheControl: 'public, max-age=18000', // 5 hours
        },
      };

  // set up static content serving
  const mount = st({
    path: APP_ROOT + '/public/web',
    url: '/web',
    cache: cacheOptions,
    index: false,
    gzip: true,
  });
  app.use(mount);

  // register routes
  for (const controller of routeControllers) {
    const router = await controller.genRouter();
    app.use('/', router);
  }

  // add internal routes
  app.use('/internal', InternalRoutes);

  // error handling
  app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    error(err);

    if (err.name === 'TypedError') {
      res.status(400).send({
        error: {
          code: err.code,
          message: err.getErrorMessage(req.userLanguage),
        },
      });
    } else {
      res.status(400).send(err.message);
    }
  });
};

module.exports = appRouter;
