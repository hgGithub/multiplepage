'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
var inlineSpts = require('./chunks-config')
// 图片无损压缩处理
const execSync = require('child_process').execSync;
var cmd = 'gulp tiny';
try {
  execSync(cmd)
} catch(e) {
  console.log("图片压缩失败", e)
}

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    // contentBase: './dist/views',
    historyApiFallback: true,
    hot: true,
    host: process.env.HOST || config.dev.host,
    port: process.env.PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? {
      warnings: false,
      errors: true,
    } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
      ignored: /node_modules/
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),
    new FriendlyErrorsPlugin(),
    new webpack.ProvidePlugin({
      // $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  console.log('devWebpackConfig: ', devWebpackConfig.devServer.proxy);
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${config.dev.host}:${port}`],
        }
        // onErrors: config.dev.notifyOnErrors
        // ? utils.createNotifierCallback()
        // : undefined
      }))

      var pages =  utils.getMultiEntry('./src/views/**/*.html');
      for (var pathname in pages) {
        // 配置生成的html文件，定义路径等
        var conf = {
          filename: pathname + '.html',
          template: pages[pathname], // 模板路径
          chunks: inlineSpts.getChunks(pathname), // 每个html引用的js模块,
          chunksSortMode: 'dependency',
          inject: false,
          headChunks: Object.keys(inlineSpts.headChunks)
        };
        // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
        devWebpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
      }

      resolve(devWebpackConfig)
    }
  })
})
