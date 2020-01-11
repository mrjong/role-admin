const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config.js");
const fs = require("fs");

fs.open(__dirname + "/env.js", "w", function(err, fd) {
  const buf = 'export default "development";';
  // TODO: 下面这个方法有兼容问题？
  fs.write(fd, buf, 0, "utf-8", function(err, written, buffer) {});
});

module.exports = merge(webpackBaseConfig, {
  devtool: "#source-map",
  output: {
    publicPath: "/dist/",
    filename: "[name].js",
    chunkFilename: "[name].chunk.js"
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "[name].css",
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ["vender-exten", "vender-base"],
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      title: "流量合作平台",
      filename: "../index.html",
      inject: false
    })
  ],
  devServer: {
    // hot: true,
    host: "0.0.0.0",
    port: 8031,
    clientLogLevel: "none",
    historyApiFallback: true,
    stats: {
      cached: false,
      exclude: [
        /node_modules[\\/]react(-router)?[\\/]/,
        /node_modules[\\/]items-store[\\/]/
      ]
    },
    disableHostCheck: true,
    proxy: {
      "/admin": {
        target: "http://172.16.174.225:8080",
        pathRewrite: { "^/admin": "" }, //重写接口
        changeOrigin: true //是否跨域
      }
    }
  }
});
