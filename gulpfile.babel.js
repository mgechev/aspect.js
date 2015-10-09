import gulp from 'gulp';
import ts from 'gulp-typescript';
import merge from 'merge2';
import watch from 'gulp-watch';
import concat from 'gulp-concat';
import typescript from 'typescript';
import dtsBundle from 'dts-bundle';

function tsProjectFactory(target, module) {
  var tsProject = ts.createProject({
    typescript: typescript,
    declarationFiles: true,
    declaration: true,
    noExternalResolve: true,
    module: module || 'system',
    target: target
  });
}

function registerTransformLibTask(version, type, module) {
  let name = `transform:${type}:${version}`;
  gulp.task(name, () => {
    'use strict';
    let tsresult = gulp
      .src([`./${type}/**/*.ts`])
      .pipe(ts(tsProjectFactory(version, module)));
    return tsresult.js.pipe(gulp.dest(`./dist/${type}/${version}`))
  });
  return name;
}

let transforms = [
  registerTransformLibTask('es5', 'lib', 'umd'),
  registerTransformLibTask('es6', 'lib')
];

let testTransform = [
  registerTransformLibTask('es5', 'test')
];

gulp.task('generate:dts', () => {
  'use strict';
  gulp.src('./lib/**/*.ts')
    .pipe(gulp.dest('temp'));
  let tsresult = gulp.src('./temp/**/*.ts')
    .pipe(ts(tsProjectFactory('es5', 'commonjs')));

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
    .pipe(ts(tsProjectFactory('es6')));
  return merge([
    tsResult.dts.pipe(gulp.dest('./dist/definitions')),
    tsResult.js.pipe(gulp.dest('./dist/js'))
  ]);
});

gulp.task('build', ['build:dev']);

