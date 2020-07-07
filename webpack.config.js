/*
 * @Descripttion: 
 * @version: 
 * @Author: STC
 * @Date: 2020-07-03 15:25:54
 * @LastEditors: STC
 * @LastEditTime: 2020-07-07 11:26:16
 */ 
const path = require('path');
const config = {
    entry: './src/main.ts',
    output: {
        filename: 'StcGLEngine.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: "umd",
    },
    module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                options: {
                  modules: true
                }
              }
            ]
          },
          {test:/\.ts$/,exclude: /node_modules/,use:['ts-loader']}
        ]
    },
    resolve: {
        extensions:['.js','.ts']
    },
};
  
module.exports = config;