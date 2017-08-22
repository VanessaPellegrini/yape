var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var webserver = require('gulp-webserver');
/*------ JS ------*/
gulp.task('script', function(){
	gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery-validation/dist/jquery.validate.min.js', 'node_modules/materialize-css/dist/js/materialize.js', 'node_modules/jquery-validation/dist/jquery.validate.js','assets/js/*.js'])
		.pipe(concat('script.js'))
		//carpeta dist
		.pipe(gulp.dest('public/js/'));
});
/*------ Estilos ------*/
gulp.task('style',function(){
	gulp.src(['node_modules/materialize-css/dist/css/materialize.css', 'assets/sass/main.scss'])
		.pipe(sass().on('error',sass.logError))
		.pipe(minifyCSS())
		.pipe(concat('style.min.css'))
		.pipe(gulp.dest('public/css/'));
});
/*------ Watch Sass ------*/
gulp.task('watch', function(){
    gulp.watch('assets/js/*.js', ['script']);
});
gulp.task('watch', function(){
	gulp.watch('assets/sass/*.scss',['style']);
});
/*------ Llamada ------*/
gulp.task('default', ['script', 'style', 'watch']);