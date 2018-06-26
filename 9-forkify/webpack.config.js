const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js', //entry point
  output: {
    path: path.resolve(__dirname, 'dist'), //needs to be an absolute path so we use path package from nodejs
    filename: 'js/bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
      new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './src/index.html'
      })
  ]
};