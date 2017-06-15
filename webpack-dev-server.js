const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');

Object.keys(config.entry).forEach((name) => {
  config.entry[name].unshift('webpack-dev-server/client?http://127.0.0.1:8088/', 'webpack/hot/dev-server');
})

new WebpackDevServer(webpack(config), {
  contentBase: config.output.path,
  // publicPath: config.output.publicPath,
  hot: true,
  noInfo: false,
  historyApiFallback: false,
  stats: {
    colors: true,
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
}).listen(8088, err => {
  if (err) {
    console.log(err);
  }
  console.log('Webpack Listening at 127.0.0.1:8088');
});
