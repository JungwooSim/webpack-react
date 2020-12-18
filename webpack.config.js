const HtmlWebpackPlugin = require('html-webpack-plugin');
const port = process.env.PORT || 3000;
const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");

module.exports = (env) => {

  dotenv.config({
    path: path.resolve(`react-app/env/${env.file_name || 'real'}.env`)
  });

  return {
    mode: 'development',
    entry: './react-app/index.js',
    output: {
      path: path.resolve("dist"),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'react-app/public/index.html',
      }),

      // 변수를 전역으로 사용할 수 있도록 해주는 플러그인
      new webpack.DefinePlugin({
        'process.env.test' : JSON.stringify(process.env.test)
      }),

      // 변수 내보내기
      new webpack.EnvironmentPlugin(['test'])
    ],
    devServer: {
      host: 'localhost',
      port: port,
    },
  };
};
