const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

console.log(process.env.NODE_ENV)

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    // publicPath: '/',
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
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
        // use: [
        //   {
        //     loader: 'file-loader',
        //     options: {
        //       name: '[name].[ext]',
        //       outputPath: 'fonts/'
        //     }
        //   }
        // ]
      }
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './client'),
      publicPath: '/'
    },
    proxy: {
      '/newquote': 'http://localhost:3000',
      '/history': 'http://localhost:3000',
      '/submit': 'http://localhost:3000'
    }
  }
}