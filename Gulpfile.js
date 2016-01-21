/*===========================
GULP VARIABLES
===========================*/
var gulp = require('gulp'),
	shell = require('gulp-shell'),
	// For: gulp html
	htmlmin = require('gulp-htmlmin'),
	// For: gulp images
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	jpegtran = require('imagemin-jpegtran'),
	gifsicle = require('imagemin-gifsicle'),
	optipng = require('imagemin-optipng'),
	// For: gulp sync-watch
	browserSync = require('browser-sync').create(),
	// For: Outputfolder variable
	outputfolder = '.deploy';




/*===========================
GULP DEPLOY || run all tasks in order
===========================*/
gulp.task('deploy', ['html', 'images']);
/*===========================
GULP BUILD || triggers Jekylls build command
===========================*/
gulp.task('jekyll_build', shell.task(['jekyll build']));
/*===========================
GULP SERVE || triggers Jekylls serve command
===========================*/
gulp.task('jekyll_serve', shell.task(['jekyll serve']));




/*===========================
GULP HTML || compress html + inline css + inline scripts & put in outputfolder
===========================*/
gulp.task('html', ['jekyll_build'], function() {
	return gulp.src(outputfolder + '/**/*.html')
		.pipe(htmlmin({
			removeComments: true,			//works - removes comments
			minifyJS: true,					//works - minifies inline scripts
			minifyCSS: true,				//works - minifies inline styles
			collapseWhitespace: true		//works - collapses whitespace
		}))
		.pipe(gulp.dest(outputfolder));
});




/*===========================
GULP IMAGES || compress images & put in outputfolder
===========================*/
gulp.task('images', ['jekyll_build'], function () {
	return gulp.src('assets/images/**')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant(), jpegtran(), optipng(), gifsicle()]
		}))
		.pipe(gulp.dest(outputfolder + '/assets/images'));
});









/*===========================
GULP CSS || compress css & put in outputfolder
===========================*/
var gulp = require('gulp'),
    sass = require('gulp-sass'),					//works
    importCss = require('gulp-import-css'),			//works - (imports from remote sources like a CDN)
    autoprefixer = require('gulp-autoprefixer'), 	//works	- (autoprefixes)
    cssnano = require('gulp-cssnano'),				//works - (minifies)
    glob = require('glob');							//works - (grabs all html files and puts them into one file...)
    uncss = require('gulp-uncss'),					//works - (...scans that big html file and finds + removes unused css)
    rename = require('gulp-rename'),				//works - (rename to style.min.css)

gulp.task('css', ['jekyll_build'], function() {
   return gulp.src('assets/css/style.scss')
       .pipe(sass())
       .pipe(importCss())
       .pipe(autoprefixer())
       .pipe(uncss({
           html: glob.sync(".deploy/**/*.html"),
           ignore: ['is-*', 'has-*', '*--active']
       }))
       .pipe(cssnano())
       .pipe(rename('style.min.css'))
       .pipe(gulp.dest(outputfolder + '/assets/css'));
});






/*===========================
GULP SYNC-WATCH || browser sync & live-refresh 
===========================*/
gulp.task('sync', function() {
    browserSync.init({
        proxy: "http://127.0.0.1:3000/j_hfc_relay/"
    });
});
gulp.task('watch', function () {
    gulp.watch(['_includes/**/*', '_layouts/**/*', '_pages/**/*', 'assets/**/*'], ['reload']);
});
gulp.task('reload', ['jekyll_build'], function () {
    browserSync.reload();
});
gulp.task('sync-watch', ['sync', 'watch']);