import gulp from 'gulp';
import babel from 'gulp-babel';
import watch from 'gulp-watch';
import concat from 'gulp-concat';

gulp.task('transform', () => {
  'use strict';
  return gulp
    .src(['./lib/**/*.js'])
    .pipe(babel({
      optional: [
        'es7.decorators'
      ],
      stage: 2
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('transform:lib', () => {
  'use strict';
  return gulp
    .src(['./lib/**/*.js'])
    .pipe(babel({
      optional: [
        'es7.decorators'
      ],
      stage: 2
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build:dev', ['transform:lib'], () => {
  'use strict';
  return gulp.src(['./dist/**/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch:lib', () => {
  'use strict';
  watch('./lib/**/*.js', () => {
    gulp.start('build:dev');
  });
});

gulp.task('transform:demo', () => {
  'use strict';
  return gulp
    .src(['./demo/src/**/*.js'])
    .pipe(babel({
      optional: [
        'es7.decorators'
      ],
      stage: 2
    }))
    .pipe(gulp.dest('./demo/dist/'));
});

