const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config.js");
const fs = require("fs");
const path = require("path");

fs.open("./build/env.js", "w", function(err, fd) {
  const buf = 'export default "production";';
  fs.write(fd, buf, 0, "utf-8", function(err, written, buffer) {});
});

module.exports = merge(webpackBaseConfig, {
  output: {
    // publicPath: 'https://iview.github.io/iview-admin/dist/',  // 修改 https://iv...admin 这部分为你的服务器域名
    publicPath: "/dist/", // 修改 https://iv...admin 这部分为你的服务器域名
    filename: "[name].[hash].js",
    chunkFilename: "[name].[hash].chunk.js"
  },
  plugins: [
    new cleanWebpackPlugin(["dist/*"], {
      root: path.resolve(__dirname, "../")
    }),
    new ExtractTextPlugin({
      filename: "[name].[hash].css",
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      // name: 'vendors',
      // filename: 'vendors.[hash].js'
      name: ["vender-exten", "vender-base"],
      minChunks: Infinity
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: false
      }
    }),
    new CopyWebpackPlugin([
      {
        from: "src/styles/fonts",
        to: "../fonts"
      }
    ]),
    new HtmlWebpackPlugin({
      title: "流量合作平台",
      favicon: "./td_icon.ico",
      filename: "../index.html",
      template: "!!ejs-loader!./src/template/index.ejs",
      inject: false
    })
  ]
});
