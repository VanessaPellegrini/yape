var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var webserver = require('gulp-webserver');
/*------ JS ------*/
gulp.task('script', function(){
	gulp.src(['node_modules/jquery/dist/jquery.js','node_modules/materialize-css/dist/js/materialize.js','assets/js/*.js'])
		.pipe(concat('script.js'))
		//carpeta dist
		.pipe(gulp.dest('dist/js/'));
});
/*------ Estilos ------*/
gulp.task('style',function(){
	gulp.src(['node_modules/materialize-css/dist/css/materialize.css', 'assets/sass/main.scss'])
		.pipe(sass().on('error',sass.logError))
		.pipe(minifyCSS())
		.pipe(concat('style.min.css'))
		.pipe(gulp.dest('dist/css/'));
});
/*web server*/
gulp.task('webserver', function(){
    gulp.src('../yape/')
    .pipe(webserver({
        fallback: 'index.html',
        livereload: true,
        directoryListing: false,
        open: true
    }));
});
/*------ Watch Sass ------*/
gulp.task('watch', function(){
    gulp.watch('assets/js/*.js', ['script']);
});
gulp.task('watch', function(){
	gulp.watch('assets/sass/*.scss',['style']);
});
/*------ Llamada ------*/
gulp.task('default', ['script', 'style', 'webserver', 'watch']);