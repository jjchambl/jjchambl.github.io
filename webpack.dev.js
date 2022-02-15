const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path')

module.exports = (env) => {
  return merge(common(env), {
    mode: 'development',

    // Use eval-cheap-source-map for accurate line numbers, eval has best build performance
    devtool: 'eval',

    output: {
      // path: path.join(__dirname, 'build'),
      pathinfo: true,
      publicPath: '/',
      filename: '[name].bundle.js',
    },

    devServer: {
      // static: '/',
      compress: true,
      host: '0.0.0.0',
      hot: true
    },

    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [{ from: path.join(__dirname, 'assets'), to: 'assets' }],
      }),
    ],
  });
};