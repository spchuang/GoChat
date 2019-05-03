var path = require('path');
var webpack = require('webpack');

const env = process.env.NODE_ENV;

const baseConfig = {
  devtool: 'cheap-module-source-map',
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          plugins: [
            "transform-flow-strip-types",
            "syntax-trailing-function-commas",
            "transform-class-properties",
            "transform-object-rest-spread",
          ],
        }
      },
      {
        test: /\.css$/,
        loader: "css-loader",
        options: {
          minimize: true,
          sourceMap: true,
        }
      },
    ]
  },
  externals: {
    'jquery': 'jQuery',
    'react': 'React',
    'react-dom': 'ReactDOM',
    'WGo': 'WGo',
    'MessengerExtensions': 'MessengerExtensions',
  },
  plugins: [
    new webpack.OldWatchingPlugin()
  ],
};

const settings = [
  {
    file: 'CreateGameContainer',
    isPublic: true,
  },
  {
    file: 'ScoreCountingContainer',
    isPublic: true,
  },
  {
    file: 'JoinGameContainer',
    isPublic: true,
  },
  {
    file: 'SimulateBoardContainer',
    isPublic: true,
  },
  {
    file: 'MainInternalContainer',
    isPublic: false,
  },
  {
    file: 'MessageContainer',
    isPublic: true,
  },
];

const configs = settings.map(function(setting) {
  const folder = setting.isPublic
    ? 'js/web'
    : 'js/internal';

  const outputFolder = setting.isPublic
    ? 'web'
    : 'internal';

  return Object.assign({}, baseConfig, {
    entry: __dirname + `/${folder}/${setting.file}.jsx`,
    output: { path: __dirname, filename: `../web/js/dist/${outputFolder}/${setting.file}.${env}.js`},
  });
})

module.exports = configs;
