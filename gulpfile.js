
var gulp = require('gulp');
var tsc = require("gulp-typescript");
var del = require('del');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');
var jasmine = require('gulp-jasmine');
var tslint = require("gulp-tslint");

var tsProject = tsc.createProject("tsconfig.json");


gulp.task('clean', function (cb) {
    return del('dist', cb)
})

gulp.task('build', ['tslint','clean', "copy"], function () {
    var tsResult = gulp.src(["typings/index.d.ts", "src/**/*.ts"])
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));
    return tsResult.js
        .pipe(sourcemaps.write('.', {
            sourceRoot: function (file) { return file.cwd + '/src'; }
        }))
        .pipe(gulp.dest("dist"));
});
gulp.task('copy', ["clean"], function () {
    gulp.src(["package.json"]).pipe(gulp.dest("dist"));
});

gulp.task('test', ['build'], function () {
    gulp.src('dist/**/*.spec.js').pipe(jasmine());
});

gulp.task("tslint", () =>
    gulp.src("src/**/*.ts")
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report())
);


gulp.task('watch', ['build', 'test',], function () {
    gulp.watch("src/**/*.ts", ['build', 'test']);
});

gulp.task('default', ['test', 'build']);