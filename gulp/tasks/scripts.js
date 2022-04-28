const { src, dest } = require("gulp");
const gulpif = require("gulp-if");
const { scripts } = require("../config/paths");
const { webpackConfig, plumberConfig } = require("../config/pluginsConfig");
const { isDev } = require("../utils/env");
const webpack = require("webpack");
const gulpWebpack = require("webpack-stream");
const named = require("vinyl-named");
// const cache = require("gulp-cached");
const plumber = require("gulp-plumber");

const scriptsBuild = () => {
  return (
    src(scripts.src)
      .pipe(plumber(plumberConfig))
      // .pipe(cache("scriptsBuilding"))
      .pipe(gulpif(isDev, named()))
      .pipe(gulpWebpack(webpackConfig, webpack))
      .pipe(gulpif(isDev, dest(scripts.dev), dest(scripts.dist)))
  );
};

module.exports = {
  scriptsBuild,
};
