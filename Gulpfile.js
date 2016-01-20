var gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	jpegtran = require('imagemin-jpegtran'),
	gifsicle = require('imagemin-gifsicle'),
	optipng = require('imagemin-optipng');

var outputfolder = '.deploy';

// MAIN - Use "gulp" to run all tasks in order
gulp.task('default', ['images']);

// IMAGE - Compress images put in outputfolder
gulp.task('images', function () {
    return gulp.src('assets/images/**')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant(), jpegtran(), optipng(), gifsicle()]
        }))
        .pipe(gulp.dest(outputfolder + '/assets/images'));
});