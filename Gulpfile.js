/*===========================
GULP VARIABLES
===========================*/
var gulp = require('gulp'),
	shell = require('gulp-shell'),
	runSequence = require('run-sequence'),
	// For: gulp html
	htmlmin = require('gulp-htmlmin'),				//works - (minifies html)
	// For: gulp images
	imagemin = require('gulp-imagemin'),			//works - (general image minification)
	pngquant = require('imagemin-pngquant'),		//works - (minify png)
	optipng = require('imagemin-optipng'),			//works - (minify png2)
	jpegtran = require('imagemin-jpegtran'),		//works - (minify jpg)
	gifsicle = require('imagemin-gifsicle'),		//works - (minify gifsicle)
	// For: gulp css
	replace = require('gulp-replace'),				//works - (remove jekyll frontmatter before processing)
	sass = require('gulp-sass'),					//works - (process sass)
	importCss = require('gulp-import-css'),			//works - (imports from remote sources like a CDN)
	autoprefixer = require('gulp-autoprefixer'), 	//works	- (autoprefixes)
	cssnano = require('gulp-cssnano'),				//works - (minifies)
	glob = require('glob');							//works - (grabs all html files and puts them into one file...)
	uncss = require('gulp-uncss'),					//works - (...scans that big html file and finds + removes unused css)
	rename = require('gulp-rename'),				//works - (rename to style.min.css)
	// For: gulp sync-watch
	browserSync = require('browser-sync').create(),	//works - (browser-sync & live refresh)
	// For: outputfolder variable
	outputfolder = '.deploy';




/*===========================
GULP DEPLOY || run all tasks in order
===========================*/
// gulp.task('deploy', ['html', 'images', 'css']);
gulp.task('deploy', function(callback) {
  runSequence('jekyll_build',
              ['html', 'images', 'css'],
              'publish',
              callback);
});
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
gulp.task('html', function() {
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
gulp.task('images', function () {
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

// Step 1 - Wait for jekyll_build, then include style.min.css
gulp.task('css_add_mincss_to_head', function() {
	return gulp.src(outputfolder + '/**/*.html')
		.pipe(replace('style.css', 'style.min.css'))
		.pipe(gulp.dest(outputfolder));
});
// Step 2 - Minify everything, then create style.min.css
gulp.task('css', ['css_add_mincss_to_head'], function() {
	return gulp.src('assets/css/style.scss')
		.pipe(replace('---', ''))
		.pipe(replace('@import \'', '@import \'_includes/'))
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
GULP SYNC-WATCH || browser sync (works) & live-refresh (works)
===========================*/
gulp.task('sync', function() {
	browserSync.init({
		proxy: "http://127.0.0.1:3000/"
	});
});
gulp.task('watch', function () {
	gulp.watch([
		'_includes/**/*', 
		'_layouts/**/*', 
		'_pages/**/*', 
		'assets/**/*'
	], ['reload']);
});
gulp.task('reload', ['jekyll_build'], function () {
	browserSync.reload();
});
gulp.task('sync-watch', ['sync', 'watch']);




/*===========================
GULP PUBLISH || PUBLISH ON GITHUB
===========================*/
gulp.task('publish', function() {
	// in progress
});