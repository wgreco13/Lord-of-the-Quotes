const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

console.log(process.env.NODE_ENV)

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV,
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: './client/index.html',
      }
    ),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './client'),
      publicPath: '/'
    },
    proxy: {
      // TODO:
      '/api': 'http://localhost: 3000',
    }
  }
}