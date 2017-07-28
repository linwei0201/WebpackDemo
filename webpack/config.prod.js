const path = require('path')
const fs =   require('fs')

//为src下的所有目录，添加alias
let dirs = fs.readdirSync('./src'),
    alias = {};

dirs.forEach(function(dir){
  const fp = path.join(SRC_PATH, dir);
  if(fs.statSync(fp).isDirectory()){
    alias[dir] = path.resolve(__dirname, '../src' , dir)
  }
});

const config = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        use: 'json-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      { test: /\.(jpe?g|png|gif|svg)$/i, use: 'url' },
      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        use: 'url'
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&minetype=application/font-woff'},
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&minetype=application/font-woff'},
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&minetype=application/octet-stream'},
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader'},
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&minetype=image/svg+xml'},
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader?resolve url'],
        exclude: /node_modules/
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/
      },
    ]
  },
  resolve: {
    alias,
    extensions: ['.js', '.jsx', '.json']
  }
};

module.exports = config;
