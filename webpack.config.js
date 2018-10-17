const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    entry:'./src/app.jsx',
    output:{
        path:path.resolve(__dirname,'dist'),
        publicPath:'/dist/',
        filename:'js/app.js'
    },
    module: {
        rules: [
          //jsx 使用babel-loader babel-preset
          {
            test: /\.m?jsx$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['env','react']
              }
            }
          },
          //样式 使用style——loader 和css-loader
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
          },
          //图片，使用url-loader和file-loader
          {
            test: /\.(png|jpg|gif)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                  name:'resoure/[name].[ext]'
                }
              }
            ]
          },
          //图标字体。使用font-awesome
          {
            test: /\.(eot|svg|ttf|woff|woff2|otf)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                  name:'resoure/[name].[ext]'
                }
              }
            ]
          }
        ]
    },
    devServer: {

    },
    plugins: [
      //处理html
        new HtmlWebpackPlugin({
            template:'./src/index.html',
        }),
        //独立css
        new ExtractTextPlugin("css/[name].css"),
        //提出公共公共模块
        new webpack.optimize.CommonsChunkPlugin({
          name:'common',
          filename:'js/base.js'
        })
    ]
}