const path = require('path'),
      webpack = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      { resolve,  webpackModule } = require('./config.common.js')

const config = {
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:8888/',
    'webpack/hot/dev-server',
    './src/index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve('./dist')
  },
  module: webpackModule,
  resolve,
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 启用 HMR
    new HtmlWebpackPlugin({
      title: "开发环境",
      hash: false,
      inject: false,
      window: {
        'ENV': 'dev'
      },
      // envFile: null,
      filename: 'index.html',
      favicon: '',
      template: 'src/templates/index.ejs'
    })
  ]
};

module.exports = config;
