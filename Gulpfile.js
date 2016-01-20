var gulp = require('gulp'),
	// Jekyll build
	shell = require('gulp-shell'),
	// HTML
	htmlmin = require('gulp-htmlmin');
	// Images
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	jpegtran = require('imagemin-jpegtran'),
	gifsicle = require('imagemin-gifsicle'),
	optipng = require('imagemin-optipng'),
	// Folder
	outputfolder = '.deploy';



// gulp - run all tasks in order
gulp.task('default', ['html', 'images']);

// gulp build - Triggers Jekylls build command
gulp.task('build', shell.task([
	'jekyll build'
]));

// gulp html - Compress html and put in outputfolder
gulp.task('html', ['build'], function() {
	return gulp.src(outputfolder + '/**/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest(outputfolder));
});

// gulp images - Compress images and put in outputfolder
gulp.task('images', ['build'], function () {
	return gulp.src('assets/images/**')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant(), jpegtran(), optipng(), gifsicle()]
		}))
		.pipe(gulp.dest(outputfolder + '/assets/images'));
});


// gulp serve - Triggers Jekylls serve command
gulp.task('serve', shell.task([
	'jekyll serve'
]));



// CSS
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    importCss = require('gulp-import-css'),
    autoprefixer = require('gulp-autoprefixer'),
    uncss = require('gulp-uncss'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    glob = require('glob');

gulp.task('css', function() {
   return gulp.src('assets/css/style.scss')
       .pipe(sass())
       .pipe(importCss())
       .pipe(autoprefixer())
       .pipe(uncss({
           html: glob.sync(".deploy/**/*.html"),
           ignore: ['label.active', '.dark-mode', 'span.tweet-time']
       }))
       .pipe(cssnano())
       .pipe(rename('style.min.css'))
       .pipe(gulp.dest(outputfolder + '/assets/css'));
});