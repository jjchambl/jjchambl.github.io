const path = require('path');
const webpack = require('webpack');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin')

const dirApp = path.join(__dirname, 'src');
const dirModules = path.join(__dirname, 'node_modules');
const dirAssets = path.join(__dirname, 'assets');

/**
 * Webpack Configuration
 */
module.exports = (env) => {
  // Is the current build a development build
  const IS_DEV = !!env.dev;

  return {
    // No need for an entrypoint; let the plugin do the heavy lifting
    // cf. https://extri.co/2017/05/23/using-htmlwebpackplugin-and-pug/
    entry: {
      main: path.join(dirApp, 'js', 'index'),
    },

    resolve: {
      modules: [dirApp, dirModules, dirAssets],
    },

    plugins: [
      new webpack.DefinePlugin({ IS_DEV }),

      // new ImageMinimizerPlugin({
      //   minimizer: {
      //     implementation: ImageMinimizerPlugin.imageminMinify,
      //     options: {
      //       plugins: [
      //         // SVGO options: "https://github.com/svg/svgo#what-it-can-do"
      //         [
      //           'imagemin-svgo',
      //           {
      //             plugins: [
      //               {
      //                 removeViewBox: false,
      //                 removeXMLNS: true,
      //               },
      //             ],
      //           },
      //         ]
      //       ]
      //     }
      //   }
      // }),

      new HTMLWebpackPlugin({
        filename: 'index.html',
        template: './src/views/main.pug',
        inject: true
      })
    ],

    module: {
      rules: [
        // PUG
        {
          test: /\.pug/,
          use: [
            'html-loader',
            {
              loader: 'pug-html-loader',
              options: {
                // options to pass to the compiler same as: https://pugjs.org/api/reference.html
                data: {
                  title: 'Jak webby',
                  assetPath: dirAssets
                } // set of data to pass to the pug render.
              }
            }
          ]
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
      minimizer: [
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.squooshMinify,
            options: {
              encodeOptions: {
                mozjpeg: {
                  // That setting might be close to lossless, but it’s not guaranteed
                  // https://github.com/GoogleChromeLabs/squoosh/issues/85
                  quality: 100,
                },
                webp: {
                  lossless: 1,
                },
                avif: {
                  // https://github.com/GoogleChromeLabs/squoosh/blob/dev/codecs/avif/enc/README.md
                  cqLevel: 0,
                },
              },
            },
          },
        }),
      ]
    },
  };
};