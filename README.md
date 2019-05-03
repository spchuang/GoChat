# GoChat

This is a source code for [GoChat](http://playmessengergo.com), a Facebook messenger chat bot that allows users to play Go with  people.

## Quick Start

Start a local server using sqlite
```
> npm install
> npm run sdev
```
Then access `http://localhost:5000/webhook/localChat/` to see the local chat window.

## Deployment Guide
1. Set up a Mysql server and AWS S3 bucket, and get a FB developer account with chatbot. Update `config.js` with all the relevant access tokens
2. Get some VPS and deploy the apps. You can use the existing ansible scripts (update relevant IP addresses) to deploy the app and nginx for load balancing. You need to get a domain and your own SSL (required by FB)
3. After all of this is set up, you should hopefully be able to send messages to your test FB page and start interacting!

## Development Guide

1. Build code

```
# Build server code
> npm run watch

# Build client in development mode
> npm run web_watch

# Build client in production mode
> npm run web_p_watch
```

2. code checks
```

# Run Flow static typing (http://flowtype.org/docs/builtins.html)
> npm run flow   


# Check for everything (eslint, flow, and test)
> npm run check

# Run single test only
> NODE_ENV=test node_modules/mocha/bin/mocha --compilers js:babel-register test/<name>
```

3. To update DB model
```
1. create migration file. The file will be in `db/migrations`
> ./node_modules/.bin/sequelize migration:create --config db/config.json --migrations-path db/migrations --name <NAME>

2. update the migration file, then run this to perform the migration
> npm run migrate_dev // migrate on dev db
> npm run migrate_prod // migrate on prod db

3. to undo the migration
> npm run migrate_undo_dev
> npm run migrate_undo_prod

4. after db migration is done, you'll need to update the schemal files in `src/class/schema` then run this script which will auto generate the class interface for each table with proper flow types in place
> npm run gen_models
```

4. Update translation
Access `http://localhost:5000/internal` then click on `translation` tab. From here you can make changes to the translations and after you click save, all the relevant files (json definition `translations.json`, flow types `flow-typed/TranslationNames.js`) will be updated.

To add new langauges, you need to update `src/translations/TranslationConstants.js` and add to `LANGUAGE_TO_NAME_MAP` and `Language`.

## Basic code explanation

### Model classes `src/class`
GoChat uses [Sequelizejs](http://docs.sequelizejs.com/) as the ORM to communicate with databases. It provides an easy to use interface but one issue I found was how it plays with flow for static typing. A typical way to retrieve a field is using the general `get` function like `user.get('name')`. The return value would be untyped which is suboptimal.

To mitigate this issue, what I did is create another layer of abstraction on top of Sequelizejs, which provides an interface with typed getter and setter interface for each field as defined in `src/class/schema` model files. `src/scripts/auto-gen-model-classes.js` scans through all the model definitions and auto generates the base class files in `src/class/base`. For example for user model, it creates `UserBase.js` then I extend `User.js` and put all the user related operations in it, which provides another nice level of encapsulation. Some of this was motivated by how `Ent` model interface is defined at Facebook for data querying with TAO.

### Request handling

- Facebook message handling: `src/response`
Entry point: `ResponseHandler.handleText` `ResponseHandler.handleAttachment` `ResponseHandler.handlePostback`
As the function names implies, these function will be called when a user sends a text, attachment or a postback request to Facebook which then relays to GoChat servers. Depending on the state of the user, we then pass to different handlers.

Every file in `src/response/game` handles different game requests in a game. For example `FocusGameHandler` allows user to focus on different games if he/she has multiple active games. Similarly, `src/response/general` handles any requests not specific to game mutations, such as `SetLanguageHandler` for changing language and `CreateGameMessage.js` for creating a new game. All the handlers inherits from `MessageHandlerBase` which defines some basic common interface.

- Web UI handling `src/routes`
FB bot platform provides some ways for user to interact with the chat bot, such as by messaging directly or through a persistent menu and quick replies. In some cases, however, these simple interacts is not enough to do more interesting things. In our case, we need to show more complex UI for game creation, to count stones in the end game, to open board simulation page. This is why we also have web UI that can be opened to perform more complex interactions.

### Web UIs `public/src/js`
For intern tool, there are 2 pages: one for displaying internal metrics and another for updating translation data.

For external, there are 4 different Packages
1. Create game `CreateGameContainer`
2. Join Game `JoinGameContainer`
3. Score counting `ScoreCountingContainer`
4. Simulate board `SimulateBoardContainer`

### Board image generation `src/utils/images`
This part is probably the most fun and really gives life to the chat bot. The entry point is `GameImageRendererUtils.genBoardImageURL` and `GameImageRendererUtils.genMiniBoardImageURL`. A game image like the following contains multiple components: black/white user profile and name, number of captured stones, and finally the board image itself. Go Board needs to highlight the last move. Furthermore, we need to support board size of 9, 13 and 19.

Because image processing is a CPU intensive work, I've added as much caching as possible to optimize the process. For each game, I first generate a base game image consistenting of just white background and black/white user profile. These information are static throughout the game. Then I overlay the board image and capture stone text on top. For board image, we need to overlay the black and white stones one by one. Initially, the implementation uses Sharp but consecutive image overlay turned out to be due to buffer conversion. So the overlays here is implemented with lwip library.


### Go Game engine
I use [`weiqi`](https://github.com/cjlarose/weiqi.js/) as the underlying game engine for game representation and validation of new moves. That said, I still created an abstraction on top `GoBoard` which is just a wrapper of `weiqi` but provides a way for easier migration in case I wanted to do it in the future. In fact, before I stopped working on it, I wanted to migrate to the game engine provide by [`WGO`](http://wgo.waltheri.net/) which i think provided some extra features I can't really recall now. :(

### Miscellaneous
- Logger `src/logging`
- GateKeeper `src/utils/GK.js`
- Multi-language support

## References
- Messenger platform doc: https://developers.facebook.com/docs/messenger-platform/send-api-reference
- DB Migration: http://docs.sequelizejs.com/en/latest/docs/migrations/
