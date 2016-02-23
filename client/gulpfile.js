var gulp = require('gulp');

var concat = require('gulp-concat');
var less = require('gulp-less');
var path = require('path');
var connect = require('gulp-connect');
var del = require('del');

// Base folders name
var bases = {
    app: 'src/',
    dist: 'dist/',
    vendor: 'bower_components/'
};
// app html/js/css file and external lib js/css for concating in one file 
// copy the html to dist folder
var paths = {
    scripts: ['**/*.js'],
    vendor_js: [
        'jquery/dist/jquery.js',
        'angular/angular.js',
        'angular-ui-router/release/angular-ui-router.js',
        'angular-material/angular-material.css'
    ],
    vendor_css: [
        'font-awesome/css/font-awesome.css',
        'angular-material/angular-material.css'
    ],
    html: ['**/**/*.html'],
    fonts: ['font-awesome/fonts/*']
};

// Delete the dist directory
gulp.task('clean', function(cb) {
    del(['dist'], cb);
});

// concatenate external js file into one output file
gulp.task('vendor_scripts', function() {
    gulp.src(paths.vendor_js, { cwd: bases.vendor })
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(bases.dist + 'scripts/'));
});

// Process scripts and concatenate them into one output file
gulp.task('scripts', ['vendor_scripts'], function() {
    gulp.src(paths.scripts, { cwd: bases.app })
        .pipe(concat('app.js'))
        .pipe(gulp.dest(bases.dist + 'scripts/'));
});

// concatenate external css file into one output file
gulp.task('vendor_css', function() {
    gulp.src(paths.vendor_css, { cwd: bases.vendor })
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(bases.dist + 'styles/'));
});

// comple less file to css 
gulp.task('less', ['vendor_css'], function() {
    return gulp.src('./src/app.less')
        .pipe(less())
        .pipe(gulp.dest(bases.dist + 'styles/'));
});

// Copy all other files to dist directly
gulp.task('copy', function() {
    // Copy html
    gulp.src(paths.html, { cwd: bases.app })
        .pipe(gulp.dest(bases.dist));

    // Copy fonts
    gulp.src(paths.fonts, { cwd: bases.vendor })
        .pipe(gulp.dest(bases.dist + 'fonts/'));

});

// open on port 3000 ponting to dist folder
gulp.task('connectDist', function() {
    connect.server({
        root: bases.dist,
        port: 3000,
        livereload: true
    });
});

// Define the default task as a sequence of the above tasks
gulp.task('serve', ['clean', 'scripts', 'less', 'copy', 'connectDist']);
