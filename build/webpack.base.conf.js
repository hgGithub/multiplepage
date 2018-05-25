'use strict'
const path = require('path')
const utils = require('./utils')
const merge = require('webpack-merge')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const vuxLoader = require('vux-loader')
var inlineSpts = require('./chunks-config')
// 获得入口js文件
let entries = utils.getMultiEntry('./src/views/**/*.js')
entries = merge(entries, inlineSpts.thirdlibs)
// const temp = "global/flexiblefit";
// entries[temp] = "./src/assets/scripts/global/flexiblefit.js";

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const originalConfig  = {
  context: path.resolve(__dirname, '../'),
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.scss', '.json'],
    alias: {
      'vue$': process.env.NODE_ENV === 'production' ? 'vue/dist/vue.min.js' : 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint? [{
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],//, resolve('test')
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: !config.dev.showEslintErrorsInOverlay
        }
      }] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 2192,
          name: utils.assetsPath('img/[name].[hash:8].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: utils.assetsPath('media/[name].[hash:8].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|svg)(\??.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: utils.assetsPath('fonts/[name].[hash:8].[ext]')
        }
      }
    ]
  }
}

const webpackConfig = originalConfig
module.exports = vuxLoader.merge(webpackConfig, {
  plugins: ['vux-ui', 'progress-bar', 'duplicate-style', 'inline-manifest']
})
