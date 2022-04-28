const { src, dest } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const { styles, views } = require("../config/paths");
const { plumberConfig } = require("../config/pluginsConfig");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const cssnano = require("gulp-cssnano");
const filter = require("gulp-filter");
const cache = require("gulp-cached");
const gulpif = require("gulp-if");
const concat = require("gulp-concat");
const { isDev } = require("../utils/env");
const purgecss = require("gulp-purgecss");

const stylesBuild = () => {
  return src(styles.src)
    .pipe(plumber(plumberConfig))
    .pipe(
      gulpif(function (file) {
        return file.basename == "vendor.scss";
      }, cache("stylesBuilding"))
    )
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      gulpif(
        !isDev,
        purgecss({
          content: [views.srcWatch],
        })
      )
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write("."))
    .pipe(gulpif(isDev, dest(styles.dev)))
    .pipe(gulpif(!isDev, filter("**/*.css")))
    .pipe(gulpif(!isDev, concat(styles.prodOut)))
    .pipe(gulpif(!isDev, cssnano()))
    .pipe(gulpif(!isDev, sourcemaps.write(".")))
    .pipe(gulpif(!isDev, dest(styles.dist)));
};

module.exports = {
  stylesBuild,
};
