const path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      { resolve,  webpackModule } = require('./config.common.js')

const config = {
  entry: [
    './src/index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: "http://127.0.0.1:8080"
  },
  module: webpackModule,
  resolve,
  plugins: [
    new HtmlWebpackPlugin({
      title: "线上",
      hash: false,
      inject: false,
      window: {
        'ENV': 'prod'
      },
      // envFile: null,
      filename: 'index.html',
      favicon: '',
      template: 'src/templates/index.ejs'
    })
  ]
};

module.exports = config;
