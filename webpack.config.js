const HtmlWebPackPlugin = require('html-webpack-plugin');
const postcssPresetEnv = require(`postcss-preset-env`);
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin');
const path = require('path');

const webpack = require('webpack');

module.exports = (env, {mode}) => {
  const plugins = [
    new HtmlWebPackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css'
    }),
    new OptimizeCSSAssetsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ];

  if (mode === 'production') {
    plugins.push(
      new HtmlCriticalWebpackPlugin({
        base: path.resolve(__dirname, 'dist'),
        src: 'index.html',
        dest: 'index.html',
        inline: true,
        minify: true,
        extract: true,
        dimensions: [
          {
            width: 1500,
            height: 700
          }
        ],
        penthouse: {
          blockJSRequests: false
        }
      })
    );
  }

  return {
    output: {
      filename: '[name].[hash].js'
    },
    devServer: {
      overlay: true,
      hot: true,
      contentBase: './src'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: `babel-loader`
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-srcsets-loader',
              options: {
                attrs: [':src', ':srcset']
              }
            }
          ]
        },
        {
          test: /\.(jpe?g|svg|png|webp)$/,
          loader: `url-loader`,
          options: {
            limit: 1000,
            context: './src',
            name: '[path][name].[hash].[ext]'
          }
        },
        {
          test: /\.css$/,
          loader: [
            mode === 'production'
              ? MiniCssExtractPlugin.loader
              : 'style-loader',
            'css-loader',
            'resolve-url-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: [
                  require(`postcss-will-change`),
                  require(`postcss-import`),
                  postcssPresetEnv({stage: 0})
                ]
              }
            }
          ]
        }
      ]
    },
    plugins
  };
};
