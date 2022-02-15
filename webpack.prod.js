const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common');

module.exports = (env) => {
  return merge(common(env), {
    mode: 'production',

    // IMPORTANT: Configure server to disallow access to source maps from public!
    devtool: 'source-map',

    // NOTE: if hosting in the cloud and serving statically, use the url of your cdn to import your js files here.
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].bundle.js',
      publicPath: '/'
    },

    plugins: [
      new CleanWebpackPlugin(),

      new CopyPlugin({
        patterns: [{ from: path.join(__dirname, 'assets'), to: 'assets' }],
      }),
    ],
  });
};