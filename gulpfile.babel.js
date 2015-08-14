import gulp from 'gulp';
import ts from 'gulp-typescript';
import merge from 'merge2';
import watch from 'gulp-watch';
import concat from 'gulp-concat';

var tsProject = ts.createProject({
  declarationFiles: true,
  noExternalResolve: true,
  module: 'systemjs',
  target: 'es6'
});

gulp.task('transform', () => {
  'use strict';
  let tsResult = gulp
      .src(['./lib/**/*.ts'])
      .pipe(ts(tsProject));
  return merge([
    tsResult.dts.pipe(gulp.dest('./dist/definitions')),
    tsResult.js.pipe(gulp.dest('./dist/js'))
  ]);
});

gulp.task('transform:lib', () => {
  'use strict';
  let tsResult = gulp
    .src(['./lib/**/*.ts'])
    .pipe(ts(tsProject));
  return merge([
    tsResult.dts.pipe(gulp.dest('./dist/definitions')),
    tsResult.js.pipe(gulp.dest('./dist/js'))
  ]);
});

gulp.task('build:dev', ['transform:lib'], () => {
  'use strict';
  return gulp.src(['./dist/**/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch:lib', () => {
  'use strict';
  watch('./lib/**/*.ts', () => {
    gulp.start('build:dev');
  });
});

gulp.task('transform:demo', () => {
  'use strict';
  let tsResult = gulp
    .src(['./demo/src/**/*.js'])
    .pipe(ts(tsProject));
  return merge([
    tsResult.dts.pipe(gulp.dest('./dist/definitions')),
    tsResult.js.pipe(gulp.dest('./dist/js'))
  ]);
});

