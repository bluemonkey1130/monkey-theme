/**
 * Created by georgehawthorne on 12/02/2016.
 */
/*
 npm install --save-dev gulp gulp-autoprefixer gulp-concat gulp-imagemin gulp-clean imagemin-pngquant gulp-changed gulp-load-plugins gulp-cssnano gulp-plumber gulp-rename gulp-sass gulp-sourcemaps gulp-uglify imagemin-pngquant


 Gulp uses node-glob to get the files from the glob or globs you specify. It’s easiest to explain using examples:
/*
      js/app.js        Matches the exact file
      js/*.js          Matches all files ending in .js in the js directory only
     !js/app.js       Excludes js/app.js from the match, which is useful if you want to match all files in a directory except for a particular file
      *.+(js|css)     Matches all files in the root directory ending in .js or .css


 */

'use strict';
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'gulp.*'],
        replaceString: /\bgulp[\-.]/,
        lazy: true,
        camelize: true
    });
var pngquant = require('imagemin-pngquant');


/////////////////////////////////////   JS TASKS
gulp.task('js', function() {
    return gulp.src([
            'SRC/library/js/custom/**/*.js',
            'SRC/library/js/vendor/**/*.js',
            'SRC/library/js/libs/**/*.js',
            'SRC/library/js/**/*.js'
        ])
        .pipe($.plumber())
        .pipe($.concat('scripts.js'))
        .pipe(gulp.dest('DST/library/js/'))
        .pipe($.uglify())
        .pipe($.rename({ suffix: '.min' }))
        .pipe( gulp.dest('DST/library/js/min'));
});


/////////////////////////////////////   SASS TASKS
gulp.task('sass', function () {
    return gulp.src([
            'SRC/library/scss/partials/**/*.scss',
            'SRC/library/scss/modules/**/*.scss',
            'SRC/library/scss/custom/**/*.scss',
            'SRC/librSRC/scss/vendor/**/*.scss',
            'SRC/librSRC/scss/breakpoints/**/*.scss',
            'SRC/librSRC/scss/style.scss'
        ])
        .pipe($.plumber())
        .pipe($.concat('style.scss'))
        .pipe($.sass())
        .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4', 'Firefox >= 4'))
        .pipe($.combineMq())
        .pipe(gulp.dest('DST/library/css/'))
        .pipe($.cssnano())
        .pipe($.rename({ suffix: '.min' }))
        .pipe(gulp.dest('DST/library/css/min'))
});
gulp.task('sass-admin', function () {
    return gulp.src(['' +
            'SRC/library/scss/admin.scss',
            'SRC/library/scss/editor-style.scss',
            'SRC/library/scss/login.scss',
            'SRC/library/scss/ie.scss'
    ])
        .pipe($.plumber())
        .pipe($.sass())
        .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4', 'Firefox >= 4'))
        .pipe($.cssnano())
        .pipe(gulp.dest('DST/library/css/'))
});

/////////////////////////////////////  IMAGE TASK
gulp.task('image', function () {
    var imgSrc = 'SRC/library/images/**/*',
        imgDst = 'DST/library/img';

    gulp.src(imgSrc)
        .pipe($.changed(imgDst))
        .pipe($.imagemin({

            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(imgDst));
});


/////////////////////////////////////   MOVING TASKS
gulp.task('sub-move1', function(){
    gulp.src('SRC/library/fonts/**/*')

        .pipe(gulp.dest('dst/library/fonts'));
});

gulp.task('sub-move2', function(){
    gulp.src('SRC/library/translation/**/*')

        .pipe(gulp.dest('dst/library/translation'));
});

gulp.task('move', ['sub-move1','sub-move2'],function(){
    gulp.src(['SRC/**/*.php',
            'SRC/post-formats/**/*'

        ])
        .pipe(gulp.dest('dst'));
});

/////////////////////////////////////   CLEANING TASKS
gulp.task('clean', function(){
    return gulp.src(['DST/*'], {read:false})
        .pipe($.clean());
});
gulp.task('clean-sass', function(){
    return gulp.src(['DST/library/css/*'], {read:false})
        .pipe($.clean());
});
gulp.task('clean-js', function(){
    return gulp.src(['DST/library/js/*'], {read:false})
        .pipe($.clean());
});


/////////////////////////////////////  WATCH TASKS
gulp.task('watch', ['js', 'sass', 'image','move'], function(){
    gulp.watch('SRC/library/scss/*', ['sass' ,'sass-admin']);
    gulp.watch('SRC/library/js/**/*.js', ['js']);
    gulp.watch('SRC/*', ['move']);
    gulp.watch('SRC/library/images/**/*', ['image']);
});

gulp.task('default',['sass','js','image','move','sass-admin']);