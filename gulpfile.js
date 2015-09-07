var gulp = require('gulp');
var less = require('gulp-less');
var jade = require('gulp-jade');
var bower = require('gulp-bower');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var browserify = require('browserify');
var path = require('path');
var stringify = require('stringify');
var source = require('vinyl-source-stream');
var imagemin = require('gulp-imagemin');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./public"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

var paths = {
  public: 'public/**',
  jade: 'app/**/*.jade',
  scripts: 'app/**/*.js',
  images: 'app/images/**/*',
  staticFiles: [
    '!app/**/*.+(less|css|js|jade)',
     'app/**/*.*'
  ],
  libTests:['lib/tests/**/*.js'],
  styles: 'app/styles/*.+(less|css)'
}

gulp.task('less', function () {
  gulp.src(paths.styles)
    .pipe(less({
      paths: [ path.join(__dirname, './app/styles') ]
    }))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('jade', function() {
  gulp.src(paths.jade)
    .pipe(jade())
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('images', function(){
  gulp.src(paths.images)
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('./public/images/'));
});

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('public/lib/'));
});

gulp.task('browserify', function() {
    return browserify('./app/application.js').bundle()
        .on('success', gutil.log.bind(gutil, 'Browserify Rebundled'))
        .on('error', gutil.log.bind(gutil, 'Browserify Error: in browserify gulp task'))
        // vinyl-source-stream makes the bundle compatible with gulp
        .pipe(source('index.js')) // Desired filename
        // Output the file
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('watch', function() {
  // livereload.listen({ port: 35729 });
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.styles, ['less']);
  gulp.watch(paths.scripts, ['browserify']);
  // gulp.watch(paths.public).on('change', livereload.changed);
});

gulp.task('nodemon', function () {
  nodemon({ script: 'index.js', ext: 'js', ignore: ['public/', 'node_modules/', 'bower_components'] })
    .on('change', ['lint'])
    .on('restart', function () {
      console.log('>> node restart');
    })
});

gulp.task('build', ['jade','less','bower', 'browserify', 'images']);
gulp.task('default', ['build','browser-sync','nodemon','watch']);