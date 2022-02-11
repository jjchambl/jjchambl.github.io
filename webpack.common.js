const path = require('path');
const webpack = require('webpack');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin')

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'src');
const dirAssets = path.join(__dirname, 'assets');

/**
 * Webpack Configuration
 */
module.exports = (env) => {
  // Is the current build a development build
  const IS_DEV = !!env.dev;
  const jsPath = IS_DEV ? 'local_path' : 'dist_path'

  return {
    // No need for an entrypoint; let the plugin do the heavy lifting
    // cf. https://extri.co/2017/05/23/using-htmlwebpackplugin-and-pug/
    entry: {
      main: path.join(dirApp, 'js', 'index'),
    },

    resolve: {
      modules: [dirNode, dirApp, dirAssets],
    },

    plugins: [
      new webpack.DefinePlugin({ IS_DEV }),

      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              // SVGO options: "https://github.com/svg/svgo#what-it-can-do"
              [
                'imagemin-svgo',
                {
                  plugins: [
                    {
                      removeViewBox: false,
                      removeXMLNS: true,
                    },
                  ],
                },
              ]
            ]
          }
        }
      }),

      new HTMLWebpackPlugin({
        filename: 'index.html',
        template: './src/views/main.pug',
        inject: true
      }),

      new HTMLWebpackPlugin({
        filename: 'secondary.html',
        template: './src/views/secondary.pug',
        inject: true
      })
    ],

    module: {
      rules: [
        // PUG
        {
          test: /\.pug/,
          use: {
            loader: 'pug-loader',
            options: {
              // options to pass to the compiler same as: https://pugjs.org/api/reference.html
              data: {
                title: 'My Webpage',
                filePath: jsPath
              } // set of data to pass to the pug render.
            }
          }
        },
        // BABEL
        {
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              compact: true,
            },
          },
        },

        // STYLES
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: IS_DEV,
              },
            },
          ],
        },

        // CSS / SASS
        {
          test: /\.scss/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: IS_DEV,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: IS_DEV,
                sassOptions: {
                  includePaths: [dirAssets],
                },
              },
            },
          ],
        },

        // IMAGES
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        },

        // SVG
        {
          test: /\.svg$/,
          use: ['raw-loader'],
        },
      ],
    },

    optimization: {
      runtimeChunk: 'single',
    },
  };
};