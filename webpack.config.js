/*
 * @Descripttion: 
 * @version: 
 * @Author: STC
 * @Date: 2020-07-03 15:25:54
 * @LastEditors: STC
 * @LastEditTime: 2020-07-03 17:29:47
 */ 
const path = require('path');
const config = {
    entry: './src/main.js',
    output: {
        filename: 'StcGLEngine.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: "umd",
    }
};
  
module.exports = config;