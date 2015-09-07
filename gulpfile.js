var gulp = require('gulp'),
  less = require('gulp-less'),
  jade = require('gulp-jade'),
  bower = require('gulp-bower'),
  gutil = require('gulp-util'),
  concat = require('gulp-concat'),
  browserify = require('browserify'),
  path = require('path'),
  stringify = require('stringify'),
  source = require('vinyl-source-stream'),
  imagemin = require('gulp-imagemin'),
  nodemon = require('gulp-nodemon'),
  browserSync = require('browser-sync');

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


paths = {
  public: 'public/**',
  jade: 'app/**/*.jade',
  scripts: 'app/**/*.js',
  images: 'app/images/**/*',
  staticFiles: [
    '!app/**/*.+(less|css|js|jade)',
    '!app/images/**/*',
     'app/**/*.*'
  ],
  unitTests: [],
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

gulp.task('jade', function() {
  gulp.src('./app/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./public/'))
});

gulp.task('less', function () {
  gulp.src(paths.styles)
    .pipe(less({
      paths: [ path.join(__dirname, 'styles') ]
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('lint', function () {
  return 
    gulp.src(['./app/**/*.js','./index.js','./lib/**/*.js']).pipe(jshint()).pipe(jshint.reporter('default'));
});

gulp.task('static-files',function(){
  return gulp.src(paths.staticFiles)
    .pipe(gulp.dest('public/'));
});

gulp.task('nodemon', function () {
  nodemon({ script: 'index.js', ext: 'js', ignore: ['public/', 'node_modules/'] })
    .on('change', ['lint'])
    .on('restart', function () {
      console.log('>> node restart');
    })
});

gulp.task('test:ui', function() {
  // Be sure to return the stream
  return gulp.src(paths.unitTests)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

gulp.task('test:one', function() {


argv = process.argv.slice(3);
  console.log(argv);

  var testPaths = paths.unitTests;
  testPaths = testPaths.splice(0,testPaths.length-1);

  if(argv[0] === '--file' && argv[1] !== undefined) {
    testPaths.push('app/test/' + argv[1].trim());
  }

  return gulp.src(testPaths)
  .pipe(karma({
    configFile: 'test/karma.conf.js',
    action: 'run'
  }))
  .on('error', function(err) {
    // Make sure failed tests cause gulp to exit non-zero
    throw err;
  })
  .pipe(exit());
});

gulp.task('test:lib', function() {
  return gulp.src(paths.libTests)
    .pipe(mocha({
        reporter: 'dot',
        timeout: 60000
    }));
});

gulp.task('watch', function() {
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.styles, ['less']);
  gulp.watch(paths.scripts, ['browserify']);
});

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('public/lib/'));
});

gulp.task('e2e',function(cb){
  gulp.src(["./lib/protractor/tests/**/*.js"])
  .pipe(protractor({
      configFile: "test/protractor.conf.js",
      args: ['--baseUrl', 'http://127.0.0.1:8000']
  }))    
  .on('error', function(e) {
        console.log(e)
  })
  .on('end', cb);    
});

gulp.task('browserify', function() {
 var b = browserify();
 b.add('./app/application.js');
 return b.bundle()
 .on('success', gutil.log.bind(gutil, 'Browserify Rebundled'))
 .on('error', gutil.log.bind(gutil, 'Browserify Error: in browserify gulp task'))
 .pipe(source('index.js'))
 .pipe(gulp.dest('./public/js'));
});

gulp.task('usemin', function() {
  gulp.src('public/*.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat'],
      html: [minifyHtml({empty: true})],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('build', ['jade','less','static-files','browserify','bower']);
gulp.task('heroku:production', ['build']);
gulp.task('production', ['nodemon','build']);
gulp.task('default', ['nodemon','watch','build']);
gulp.task('test', ['test:ui','test:lib']);