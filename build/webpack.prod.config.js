const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsParallelPlugin = require('webpack-uglify-parallel');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const os = require('os');
const fs = require('fs');
const path = require('path');
const package = require('../package.json');

fs.open('./build/env.js', 'w', function (err, fd) {
  const buf = 'export default "production";';
  fs.write(fd, buf, 0, buf.length, 0, function (err, written, buffer) { });
});

module.exports = merge(webpackBaseConfig, {
  output: {
    // publicPath: 'https://iview.github.io/iview-admin/dist/',  // 修改 https://iv...admin 这部分为你的服务器域名
    publicPath: '/dist/',  // 修改 https://iv...admin 这部分为你的服务器域名
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].chunk.js'
  },
  plugins: [
    // 全局配置websocket的地址
    new webpack.DefinePlugin({
      LOCALHOST: '`wss://${window.location.host}/websocket`'
    }),
    new cleanWebpackPlugin(['dist/*'], {
      root: path.resolve(__dirname, '../')
    }),
    new ExtractTextPlugin({
      filename: '[name].[hash].css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      // name: 'vendors',
      // filename: 'vendors.[hash].js'
      name: ['vender-exten', 'vender-base'],
      minChunks: Infinity
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    }),
    new CopyWebpackPlugin([
      {
        from: 'td_icon.ico',
      },
      {
        from: 'src/styles/fonts',
        to: '../fonts'
      },
      {
        from: 'src/components/theme-switch/theme'
      },
      {
        from: 'src/assets/libs'
      },
    ], {
        ignore: [
          'text-editor.vue'
        ]
      }),
    new HtmlWebpackPlugin({
      title: '贷后管理系统',
      favicon: './td_icon.ico',
      filename: '../index.html',
      template: '!!ejs-loader!./src/template/index.ejs',
      inject: false
    })
  ]
});
