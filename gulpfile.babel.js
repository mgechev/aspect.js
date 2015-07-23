import gulp from 'gulp';
import babel from 'gulp-babel';
import watch from 'gulp-watch';

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

gulp.task('watch', () => {
  'use strict';
  watch('./lib/**/*.js', () => {
    gulp.start('transform');
  });
});
