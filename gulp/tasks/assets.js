const { src, dest, parallel } = require("gulp");
const plumber = require("gulp-plumber");
const { assets, imgs } = require("../config/paths");
const {
  plumberConfig,
  imageminPlugins,
  imageminConfig,
} = require("../config/pluginsConfig");
const cache = require("gulp-cached");
const gulpif = require("gulp-if");
const { isDev } = require("../utils/env");
const imagemin = require("gulp-imagemin");

const assetsWithoutImgsBuild = () => {
  return src(assets.src)
    .pipe(plumber(plumberConfig))
    .pipe(cache("assetsBuilding"))
    .pipe(gulpif(!isDev, dest(assets.dist), dest(assets.dev)));
};

const imgsBuild = () => {
  return src(imgs.src)
    .pipe(plumber(plumberConfig))
    .pipe(cache("imgsBuilding"))
    .pipe(imagemin(imageminPlugins, imageminConfig))
    .pipe(gulpif(!isDev, dest(imgs.dist), dest(imgs.dev)));
};

const assetsBuild = parallel(assetsWithoutImgsBuild, imgsBuild);

module.exports = {
  assetsBuild,
  assetsWithoutImgsBuild,
  imgsBuild,
};
