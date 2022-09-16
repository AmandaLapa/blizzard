const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create(); //cria um servidor local
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

function compilaSass() {
	//acessa a pasta sass para minificar e converter no arquivo css
	return gulp
		.src("scss/*.scss")
		.pipe(sass({outputStyle: "compressed"}))
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 2 versions"], //faz funcionar até duas últimas versões de navegadores
				cascade: false,
			})
		)
		.pipe(gulp.dest("css/"))
		.pipe(browserSync.stream()); //injeta css na página automaticamente
}
gulp.task("sass", compilaSass);

function gulpJs() {
	return gulp
		.src("js/scripts/*.js")
		.pipe(concat("main.js"))
		.pipe(
			babel({
				presets: ["@babel/env"],
			})
		)
		.pipe(uglify())
		.pipe(gulp.dest("js/"))
		.pipe(browserSync.stream()); //injeta js na página automaticamente
}
gulp.task("alljs", gulpJs);

function pluginsCSS(){
	return gulp.src('./css/lib/**/*.css')
	.pipe(concat('plugins.css'))
	.pipe(gulp.dest('css/'))
	.pipe(browserSync.stream())
}
gulp.task('plugincss', pluginsCSS);

function pluginsJs() {
	return gulp
	.src("./js/lib/**/*.js")
	.pipe(concat("plugins.js"))
	.pipe(gulp.dest("js/"))
	.pipe(browserSync.stream());
}
gulp.task('pluginjs', pluginsJs);

function browser() {
	browserSync.init({
		server: {
			baseDir: "./",
		},
	});
}
gulp.task("browser-sync", browser);

function watch() {
	gulp.watch("scss/*.scss", compilaSass);
	gulp.watch('css/lib/**/*.css', pluginsCSS);
	gulp.watch("*.html").on("change", browserSync.reload); //atualiza a página automaticamente
	gulp.watch("js/scripts/*js", gulpJs);
	gulp.watch('js/lib/*.js', pluginsJs);
}
gulp.task("watch", watch);

gulp.task("default", gulp.parallel("watch", "browser-sync", "sass", 'plugincss', "alljs", 'pluginjs'));
