import gulp from 'gulp';
import ts from 'gulp-typescript';
import merge from 'merge2';
import watch from 'gulp-watch';
import concat from 'gulp-concat';
import typescript from 'typescript';
import dtsBundle from 'dts-bundle';
import mocha from 'gulp-mocha';
import runSequence from 'run-sequence';

function tsProjectFactory(target, module) {
  var tsProject = ts.createProject({
    typescript: typescript,
    module: module || 'commonjs',
    target: 'es5'
  });
  return tsProject;
}

function registerTransformLibTask(type, module) {
  let name = `transform:${type}`;
  gulp.task(name, () => {
    'use strict';
    let tsresult = gulp
      .src([`./${type}/**/*.ts`])
      .pipe(ts(tsProjectFactory(module)));
    return tsresult.js.pipe(gulp.dest(`./dist/${type}/`))
  });
  return name;
}

let transforms = [
  registerTransformLibTask('lib', 'umd')
];

let testTransform = [
  registerTransformLibTask('test')
];

gulp.task('generate:dts', () => {
  'use strict';
  gulp.src('./lib/**/*.ts')
    .pipe(gulp.dest('temp'));
  let tsresult = gulp.src('./temp/**/*.ts')
    .pipe(ts(tsProjectFactory('commonjs')));

  return tsresult.dts.pipe(gulp.dest('./temp'))
});

gulp.task('bundle:dts', () => {
  dtsBundle.bundle({
    name: 'aspect.js',
    main: './temp/aspect.d.ts'
  });
});

gulp.task('build:dev', transforms, () => {
  'use strict';
  return gulp.src(['./dist/**/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build:test', () => {

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
    .pipe(ts(tsProjectFactory()));
  return merge([
    tsResult.dts.pipe(gulp.dest('./dist/definitions')),
    tsResult.js.pipe(gulp.dest('./dist/js'))
  ]);
});

gulp.task('test', ['transform:test'], () => {
  return gulp.src(['./dist/test/**/*.spec.js'])
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('build', ['build:dev', 'transform:test']);

gulp.task('watch', () => {
  watch(['./lib/**/*.ts', './test/**/*.ts'], () => {
    runSequence('test');
  });
});
