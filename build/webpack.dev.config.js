const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');
const path = require('path');
const package = require('../package.json');

fs.open(__dirname + '/env.js', 'w', function (err, fd) {
    const buf = 'export default "development";';
    // TODO: 下面这个方法有兼容问题？
    fs.write(fd, buf, 0, buf.length, function (err, written, buffer) {});
});

module.exports = merge(webpackBaseConfig, {
    devtool: '#source-map',
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vender-exten', 'vender-base'],
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            title: '贷后管理系统',
            filename: '../index.html',
            inject: false
        }),
        new CopyWebpackPlugin([
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
            })
    ],
    devServer: {
        // hot: true,
        host: '0.0.0.0',
        port: 8031,
        clientLogLevel: 'none',
        historyApiFallback: true,
        stats: {
            cached: false,
            exclude: [/node_modules[\\/]react(-router)?[\\/]/, /node_modules[\\/]items-store[\\/]/],
        },
        disableHostCheck: true,
        proxy: {
            '/admin': {
                // target: 'http://shopadmin.e-blive.com/', //目标接口域名
<<<<<<< HEAD
                target: 'http://172.18.30.201:8050', //目标接口域名
=======
                target: 'http://172.18.30.201:8050', //目标接口域名志向
>>>>>>> e402e4312fd361498a04c5ae1370c1f009c16806
                pathRewrite: { '^/admin': '' }, //重写接口
                changeOrigin: true, //是否跨域
                // demo=>  'http://localhost:8080/api' ===> 'http://www.abc.com/api'
            }
        },
    },
});
