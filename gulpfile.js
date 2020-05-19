const { src, dest, series, watch } = require("gulp");
const htmlClean = require("gulp-htmlclean");
const lessTo = require("gulp-less");
const cssZi = require("gulp-clean-css");
// const uglifyJs = require("gulp-uglify");
const stripDebug = require("gulp-strip-debug");
const uglifyJs = require("gulp-uglify");
const imageMin = require("gulp-imagemin");
const connect = require("gulp-connect");

let fileL = {
    src: "./src/",
    dist:"./dist/"
}


function html(cb) {
    return src(fileL.src+"html/*")
        .pipe(htmlClean())
        .pipe(dest(fileL.dist + "html"))
        .pipe(connect.reload());
}

function css(cb) { 
    return src(fileL.src + "css/*")
			.pipe(lessTo())
			.pipe(cssZi())
			.pipe(dest(fileL.dist + "css"))
			.pipe(connect.reload());
}

function js(cb) {
    return src(fileL.src + "js/*")
			// .pipe(stripDebug())
			.pipe(uglifyJs())
			.pipe(dest(fileL.dist + "js"))
			.pipe(connect.reload());
}

function image() { 
    return src(fileL.src + "images/*")
			.pipe(imageMin())
			.pipe(dest(fileL.dist + "images/"));
}

function server(cb) { 
    connect.server({
        port: 12306,
        livereload:true
    })
    cb();
}

watch(fileL.src + "html/*", (cb) => {
	html();
	cb();
});
watch(fileL.src + "css/*", (cb) => {
	css();
	cb();
});
watch(fileL.src + "js/*",(cb) => {
    js();
    cb();
});

exports.default = series(html, css, js,image,server);