const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/game.ts',
    output: {
      filename: isProduction ? 'bundle.[contenthash].js' : 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: [/\.vert$/, /\.frag$/],
          use: "raw-loader"
        },
        {
          test: /\.(gif|png|jpe?g|svg|xml|glsl)$/i,
          use: "file-loader"
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin({
        root: path.resolve(__dirname, "../")
      }),
      new webpack.DefinePlugin({
        "typeof CANVAS_RENDERER": JSON.stringify(true),
        "typeof WEBGL_RENDERER": JSON.stringify(true),
        "typeof WEBGL_DEBUG": JSON.stringify(true),
        "typeof EXPERIMENTAL": JSON.stringify(true),
        "typeof PLUGIN_3D": JSON.stringify(false),
        "typeof PLUGIN_CAMERA3D": JSON.stringify(false),
        "typeof PLUGIN_FBINSTANT": JSON.stringify(false),
        "typeof FEATURE_SOUND": JSON.stringify(true)
      }),
      new HtmlWebpackPlugin({
        template: "./index.html"
      })
    ],
    devtool: isProduction ? false : 'inline-source-map',
    devServer: {
      static: path.resolve(__dirname, './'),
      host: 'localhost',
      port: 8081,
      open: false
    },
    resolve: {
      extensions: ['.ts', '.js']
    }
  }
};