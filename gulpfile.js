var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('transform', function () {
  'use strict';
  return gulp
    .src(['./lib/**/*.es7'])
    .pipe(babel({
      optional: [
        'es7.decorators'
      ],
      stage: 2
    }))
    .pipe(gulp.dest('./dist'));
});
