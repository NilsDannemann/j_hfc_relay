/*===========================
GULP VARIABLES
===========================*/
var gulp = require('gulp'),
	shell = require('gulp-shell'),
	runSequence = require('run-sequence'),
	replace = require('gulp-replace'),	
	fs = require('fs'),
	notify = require('gulp-notify'),		
	// For: gulp html
	htmlmin = require('gulp-htmlmin'),				//works - (minifies html)
	// For: gulp images
	imagemin = require('gulp-imagemin'),			//works - (general image minification)
	pngquant = require('imagemin-pngquant'),		//works - (minify png)
	optipng = require('imagemin-optipng'),			//works - (minify png2)
	jpegtran = require('imagemin-jpegtran'),		//works - (minify jpg)
	gifsicle = require('imagemin-gifsicle'),		//works - (minify gifsicle)
	// For: gulp css
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
GULP OPTIMIZE || run all tasks in order
===========================*/
gulp.task('optimize', function(callback) {
	runSequence(
		'jekyll_build',
		'optimize html', 
		'optimize css',
		'optimize images', 
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
gulp.task('optimize html', function() {
	return gulp.src(outputfolder + '/**/*.html')
		.pipe(notify({message: '[HTML] ------------------------', onLast: true}))
		.pipe(notify({message: '[HTML] - removing comments...', onLast: true}))
		.pipe(notify({message: '[HTML] - minifying inline scripts...', onLast: true}))
		.pipe(notify({message: '[HTML] - minifying inline styles...', onLast: true}))
		.pipe(notify({message: '[HTML] - removing whitespace...', onLast: true}))
		.pipe(notify({message: '[HTML] - saving html files...', onLast: true}))
		.pipe(htmlmin({
			removeComments: true,			//works - removes comments
			minifyJS: true,					//works - minifies inline scripts
			minifyCSS: true,				//works - minifies inline styles
			collapseWhitespace: true		//works - collapses whitespace
		}))
		.pipe(gulp.dest(outputfolder))
		.pipe(notify({message: '[HTML] ------------------------', onLast: true}));
});




/*===========================
GULP IMAGES || compress images & put in outputfolder
===========================*/
gulp.task('optimize images', function () {
	return gulp.src('assets/images/**')
		.pipe(notify({message: '[IMAGES] ------------------------', onLast: true}))
		.pipe(notify({message: '[IMAGES] - optimizing jpgs...', onLast: true}))
		.pipe(notify({message: '[IMAGES] - optimizing pngs...', onLast: true}))
		.pipe(notify({message: '[IMAGES] - optimizing gifs...', onLast: true}))
		.pipe(notify({message: '[IMAGES] - optimizing svgs...', onLast: true}))
		.pipe(notify({message: '[IMAGES] - saving optimized images...', onLast: true}))
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant(), jpegtran(), optipng(), gifsicle()]
		}))
		.pipe(gulp.dest(outputfolder + '/assets/images'))
		.pipe(notify({message: '[IMAGES] ------------------------', onLast: true}));
});




/*===========================
GULP CSS || compress css & put in outputfolder
===========================*/

// Step 1 - Wait for jekyll_build, then include style.min.css
gulp.task('create style.min.css', function() {
	return gulp.src(outputfolder + '/**/*.html')
		.pipe(replace('style.css', 'style.min.css'))
		.pipe(gulp.dest(outputfolder));
});
// Step 2 - Minify everything, then create style.min.css
gulp.task('optimize css', ['create style.min.css'], function() {
	return gulp.src('assets/css/style.scss')
		.pipe(notify({message: '[CSS] ------------------------', onLast: true}))
		.pipe(notify({message: '[CSS] - preparing scss files...', onLast: true}))
		.pipe(replace('---', ''))
		.pipe(replace('@import \'', '@import \'_includes/'))
		.pipe(sass())
		.pipe(notify({message: '[CSS] - importing remote styles...', onLast: true}))
		.pipe(importCss())
		.pipe(notify({message: '[CSS] - autoprefixing...', onLast: true}))
		.pipe(autoprefixer())
		.pipe(notify({message: '[CSS] - removing unused styles...', onLast: true}))
		.pipe(uncss({
			html: glob.sync(".deploy/**/*.html"),
			ignore: [
				// don't remove dynamic classes like "is-active" & "has-focus"
				/(#|\.)(is-)/,
				/(#|\.)(has-)/
			]
		}))
		.pipe(notify({message: '[CSS] - minifying...'}))
		.pipe(cssnano())
		.pipe(notify({message: '[CSS] - creating styles.min.css...', onLast: true}))
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest(outputfolder + '/assets/css'))
		.pipe(notify({message: '[CSS] ------------------------', onLast: true}));
});




/*===========================
GULP SERVE || browser sync (works) & live-refresh (works) ----------------------------------- ERROR with HTML omptimization??
===========================*/
gulp.task('browser-sync', function() {
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
gulp.task('serve', ['browser-sync', 'watch']);




/*===========================
GULP PUBLISH || PUBLISH ON GITHUB
===========================*/
gulp.task('publish', function() {
	// in progress
});



/*===========================
GULP CSSINLINE || INLINE CSS IN HEAD (for google page speed)
===========================*/
gulp.task('cssinline', ['optimize css'], function() {
	return gulp.src(outputfolder + '/**/*.html')
		.pipe(replace('<link rel=\"stylesheet\" href=\"/assets/css/style.min.css\">', function(s) {
			var style = fs.readFileSync(outputfolder + '/assets/css/style.min.css', 'utf8');
			return '<style>\n' + style + '\n</style>';
		}))
		.pipe(gulp.dest(outputfolder))
		.pipe(notify({message: '[SUCESS] CSS Inlined in head', onLast: true}));
});