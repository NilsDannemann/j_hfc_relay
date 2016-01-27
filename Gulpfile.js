/*===========================
GULP VARIABLES
===========================*/
var gulp = require('gulp'),
	shell = require('gulp-shell'),
	runSequence = require('run-sequence'),
	replace = require('gulp-replace'),	
	fs = require('fs'),
	notify = require('gulp-notify'),		
	// For: gulp optimize_html
	htmlmin = require('gulp-htmlmin'),						//works - (minifies html)
	// For: gulp optimize_css
	sass = require('gulp-sass'),							//works - (process sass)
	cssImport = require('gulp-cssimport'),					//works - (imports from remote sources like a CDN)
	autoprefixer = require('gulp-autoprefixer'), 			//works	- (autoprefixes)
	cssnano = require('gulp-cssnano'),						//works - (minifies)
	glob = require('glob');									//works - (grabs all html files and puts them into one file...)
	uncss = require('gulp-uncss'),							//works - (...scans that big html file and finds + removes unused css)
	rename = require('gulp-rename'),						//works - (rename to style.min.css)
	// For: gulp optimize_js
	concat = require('gulp-concat');						//works - (concats all scripts)
	requirejsOptimize = require('gulp-requirejs-optimize'),	//works - (minifies)
	// For: gulp optimize_images
	imagemin = require('gulp-imagemin'),					//works - (general image minification)
	pngquant = require('imagemin-pngquant'),				//works - (minify png)
	optipng = require('imagemin-optipng'),					//works - (minify png2)
	jpegtran = require('imagemin-jpegtran'),				//works - (minify jpg)
	gifsicle = require('imagemin-gifsicle'),				//works - (minify gifsicle)
	// For: gulp sync-watch
	browserSync = require('browser-sync').create(),			//works - (browser-sync & live refresh)
	// For: outputfolder variable
	outputfolder = '.deploy';




/*===========================
GULP OPTIMIZE || run all tasks in order
===========================*/
gulp.task('optimize', function(callback) {
	runSequence(
		'jekyll_build',
		'optimize_html', 
		'optimize_css',
		'optimize_js',
		'optimize_images', 
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
gulp.task('optimize_html', function() {
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
gulp.task('optimize_images', function () {
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
// Step 1 - place style.min.css reference in head
gulp.task('place_style.min.css', function() {
	return gulp.src(outputfolder + '/**/*.html')
		.pipe(replace('style.css', 'style.min.css'))
		.pipe(gulp.dest(outputfolder));
});
// Step 2 - minify everything
gulp.task('optimize_css', ['place_style.min.css'], function() {
	return gulp.src('assets/css/style.scss')
		.pipe(notify({message: '[CSS] ------------------------', onLast: true}))
		.pipe(notify({message: '[CSS] - preparing scss files...', onLast: true}))
		.pipe(replace('---', ''))
		.pipe(replace('@import \'', '@import \'_includes/'))
		.pipe(sass())
		.pipe(notify({message: '[CSS] - grabbing remote styles...', onLast: true}))
		.pipe(cssImport())
		.pipe(notify({message: '[CSS] - autoprefixing...', onLast: true}))
		.pipe(autoprefixer())
		.pipe(notify({message: '[CSS] - removing unused styles...', onLast: true}))
		.pipe(uncss({
			html: glob.sync(".deploy/**/*.html"),
			ignore: [
				// don't remove dynamic & js classes like "is-active"/"has-focus" & "js-something"/"something-js"
				/(#|\.)(is-)/,
				/(#|\.)(has-)/,
				/(#|\.)(js-)/,
				/(#|\.)(-js)/  
			]
		}))
		.pipe(notify({message: '[CSS] - minifying...'}))
		.pipe(cssnano())
		.pipe(notify({message: '[CSS] - placing styles.min.css...', onLast: true}))
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest(outputfolder + '/assets/css'))
		.pipe(notify({message: '[CSS] ------------------------', onLast: true}));
});
/*===========================
GULP INLINE_CSS || INLINE CSS IN HEAD (for google page speed)
===========================*/
gulp.task('inline_css', ['optimize_css'], function() {
	return gulp.src(outputfolder + '/**/*.html')
		.pipe(replace('<link rel=\"stylesheet\" href=\"/assets/css/style.min.css\">', function(s) {
			var style = fs.readFileSync(outputfolder + '/assets/css/style.min.css', 'utf8');
			return '<style>\n' + style + '\n</style>';
		}))
		.pipe(gulp.dest(outputfolder))
		.pipe(notify({message: '[CSS] - placing inline styles in head...', onLast: true}));
});




/*===========================
GULP JS || concat & optimize js
===========================*/
// Step 1 - place scripts.min.js reference in footer
gulp.task('place_scripts.min.js', function() {
	return gulp.src(outputfolder + '/**/*.html')
		.pipe(replace(/<script[\s\S]*?<\/script>/gmi, ''))
		.pipe(replace(/<\/body>/, function(s) {
			return '<script src="/assets/js/scripts.min.js"></script></body>';
		}))
		.pipe(gulp.dest(outputfolder));
});
// Step 2 - create scripts.min.js (concat all scripts)
gulp.task('concat_js', ['place_scripts.min.js'], function() {
	return gulp.src(['./**/*.js', '!node_modules/**/*.js', '!Gulpfile.js'])
		.pipe(concat('scripts.min.js'))
		.pipe(gulp.dest(outputfolder + '/assets/js'))
});
// Step 3 - minify everything
gulp.task('optimize_js', ['concat_js'], function() {
	return gulp.src(outputfolder + '/assets/js/scripts.min.js')
		.pipe(notify({message: '[JS] ------------------------', onLast: true}))
		.pipe(notify({message: '[JS] - grabbing all scripts...', onLast: true}))
		.pipe(notify({message: '[JS] - concatenating...', onLast: true}))
		.pipe(requirejsOptimize())
		.pipe(gulp.dest(outputfolder + '/assets/js'))
		.pipe(notify({message: '[JS] - minifying...', onLast: true}))
		.pipe(notify({message: '[JS] - placing scripts.min.js...', onLast: true}))
		.pipe(notify({message: '[JS] ------------------------', onLast: true}));
});
/*===========================
GULP INLINE_js || INLINE JS IN FOOTER (for google page speed)
===========================*/
gulp.task('inline_js', ['optimize_js'], function() {
	return gulp.src(outputfolder + '/**/*.html')
		.pipe(replace(/<script[\s\S]*?<\/script>/gmi, ''))
		.pipe(replace(/<\/body>/, function(s) {
			var script = fs.readFileSync(outputfolder + '/assets/js/scripts.min.js', 'utf8');
			return '<script>\n' + script + '\n</script></body>';
		}))
		.pipe(gulp.dest(outputfolder))
		.pipe(notify({message: '[JS] - placing inline scripts in footer...', onLast: true}));
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