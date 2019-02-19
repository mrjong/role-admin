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
                //target:'http://172.18.40.100:8080',
                //target: 'https://fcs-front-test.vbillbank.com',  // 测试地址
                // target: 'http://172.18.40.181:8080', //清泉目标接口域名
                // target: 'http://172.16.154.239:8080', //志祥目标接口域名
                //target: 'http://172.18.40.22:8080', // 胥尹辉后台本地
                //target: 'http://172.18.40.245:8080', //志祥目标接口域名
                target: 'http://172.18.40.151:8080', // 胥尹辉后台本地
                // target: 'http://172.16.154.239:8080', //目标接口域名
                // target: 'http://172.18.40.116:8080', //测试
                //  target: 'http://172.18.40.245:8080', //冯垚栋
                // target: 'http://172.18.40.219:8080', //志壮
                //target: 'http://172.18.30.201:8050', //本地
                // target: 'http://172.18.40.100:8080', //jiaqi
                // target: 'http://172.18.40.220:8080', //李鹏飞
                // target: 'http://172.18.40.116:8080', //郭西勇
                pathRewrite: { '^/admin': '' }, //重写接口
                changeOrigin: true, //是否跨域
                // demo=>  'http://localhost:8080/api' ===> 'http://www.abc.com/api'
            }
        },
    },
});
