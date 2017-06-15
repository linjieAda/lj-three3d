const path = require('path')
const glob = require('glob')
const nodeModules = path.resolve(__dirname, 'node_modules')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const autoprefixer = require('autoprefixer')

const env = process.env.NODE_ENV
const devchunck = []

function generatorEntry() {
  const entry = {}
  const rootPath = path.resolve(__dirname, 'app')
  const files = glob.sync(path.join(rootPath, '**/main.+(js|jsx)'))

  files.forEach((file) => {
    const fileBasePath = file.replace('/main.js', '')
    const folderName = path.relative(rootPath, fileBasePath) || path.basename(fileBasePath)
    if (env !== 'dev' || devchunck.length === 0) {
      entry[folderName] = [file]
    } else if (devchunck.indexOf(folderName) >= 0) {
      entry[folderName] = [file]
    }
  })
  entry.vendors = ['react', 'react-dom', 'isomorphic-fetch']

  return entry
}

function generateChunckList() {
  const rootPath = path.resolve(__dirname, 'app')
  const files = glob.sync(path.join(rootPath, '**/main.+(js|jsx)'))

  return files.map((file) => {
    const fileBasePath = file.replace('/main.js', '')
    return path.relative(rootPath, fileBasePath) || path.basename(fileBasePath)
  })
}

function generateHtml(chunck) {
  return new HtmlWebpackPlugin({
    title: `上上铺 | 找商铺 上上铺 | ${chunck}`,
    template: chunck.indexOf('t-bdmap') >= 0 ? 'template/bdmap.ejs' : 'template/index.ejs',
    filename: `${chunck}/index.html`,
    chunks: ['vendors', chunck],
    cache: true,
  })
}

const config = {
  node: {
    fs: 'empty'
  },
  devtool: env === 'dev' && 'source-map',
  entry: generatorEntry(),
  resolve: {
    root: path.resolve(__dirname, 'app'),
    alias: {
      comps: path.resolve(__dirname, 'app', 'components'),
      assets: path.resolve(__dirname, 'app', 'assets'),
      sspquery: path.resolve(__dirname, 'app', 'kits/api/sspquery'),
      sspstore: path.resolve(__dirname, 'app', 'kits/api/sspstore'),
      utils: path.resolve(__dirname, 'app', 'kits/utils'),
      scss: path.resolve(__dirname, 'app', 'assets/css'),
      imgs: path.resolve(__dirname, 'app', 'assets/img'),
    },
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: env === 'dev' ? path.resolve(__dirname, 'build', 'dev')
     : path.resolve(__dirname, 'build', 'dist'),
    publicPath: env === 'dev' ? '../' : '../',
    filename: 'js/[name].[chunkhash:8].js',
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: [nodeModules],
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0', 'stage-1', 'stage-3'],
          plugins: ['transform-decorators-legacy']
        }
      },
      {
        test: /\.s?css$/,
        exclude: [nodeModules],
        loaders: ['style', 'css', 'postcss-loader', 'sass'],
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        exclude: [nodeModules],
        loader: 'url?limit=10000&name=img/[name].[sha512:hash:base64:7].[ext]'
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        exclude: [nodeModules],
        loader: 'url?limit=10000&name=fonts/[name].[sha512:hash:base64:7].[ext]'
      },
      {
        test: /\.html$/,
        exclude: [nodeModules],
        loader: 'html?name=html/[name].[ext]'
      },
      {
        test: /\.js$/,
        include: /linebreak/,
        loader: 'transform?brfs'
      }
    ]
  },
  postcss: [autoprefixer({ browsers: ['last 3 versions', 'Firefox ESR', '> 1%', 'ie >= 8'] })],
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.[hash:8].js'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ]
}

if (env !== 'dev') {
  config.plugins = config.plugins.concat(
    generateChunckList().map((chunck) => generateHtml(chunck))
  )
  config.plugins = config.plugins.concat([
    new CleanWebpackPlugin(['build/dist'], {
      root: __dirname,
      verbose: true,
      dry: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        warnings: false,
        drop_debugger: true,
        drop_console: true,
      },
    })
  ])
} else {
  console.log('dev chunch size:', devchunck.length)
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  config.plugins = config.plugins.concat(
    (devchunck.length === 0) ? generateChunckList().map((chunck) => generateHtml(chunck))
    : devchunck.map((chunck) => generateHtml(chunck))
  )
}

module.exports = config
