/*
 * @Descripttion: 
 * @version: 
 * @Author: STC
 * @Date: 2020-07-07 11:16:57
 * @LastEditors: STC
 * @LastEditTime: 2020-07-07 13:47:29
 */ 

const gulp = require("gulp");
const ts = require("gulp-typescript");
const rollup = require("rollup");
const typescript = require('rollup-plugin-typescript2');

const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const concat = require('gulp-concat')

gulp.task('combine', function () {
    return roComple();
});

function roComple() {
    gulp.src('./static/css/index.css') //需要打包的css文件目录（gulp流的源头）
        .pipe(concat('index.css')) //通过concat将css文件拼接成一个叫做style.css的文件
        .pipe(cssmin()) //通过cssmin将上一步骤生产出的style.css去掉中间的空白，使他变成压缩格式
        // .pipe(rename({
        //     suffix: '.min' //rename只是给上一步骤产出的压缩的styles.css重命名为style.min.css
        // }))
        .pipe(gulp.dest('./dist/static/css')) //dest方法把上一步骤产出的style.min.css输出到“./dist/css”目录下（gulp流的终点）
    return rollup.rollup({
        input: './src/main.ts',
        treeshake: true,//建议忽略
        plugins: [
            typescript({
                check: true,
                clean:true,
                tsconfigOverride: { compilerOptions: { removeComments: true } }
            }),

        ]
    }).then(bundle => {
        return bundle.write({
            file: './dist/StcGLEngine.js',
            format: 'iife',
            name: 'StcGLEngine',
            sourcemap: false
        });
    });
}