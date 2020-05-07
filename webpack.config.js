const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: [
    '@babel/polyfill',
    path.resolve(__dirname, 'resources', 'js', 'main.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'public', 'js'),
    filename: '[name].bundle.js',
    publicPath: '/js/',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(scss|css)$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
    extensions: ['*', '.js', '.vue', '.json'],
  },
  plugins: [new VueLoaderPlugin(), new CleanWebpackPlugin()],
  optimization: {
    usedExports: true,
  },
};
