const path = require('path');
console.log('my path is ',path);
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/app.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  resolve: { extensions: ['.js', '.scss', '.css'] },
  devServer: {
    contentBase: path.join(__dirname, '../public/'),
    port: 3000,
    proxy: {
      '^/api/*': {
        target: 'http://localhost:4000/api/',
        secure: 'false'
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          'css-loader','sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['public']),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin()
  ]
};
