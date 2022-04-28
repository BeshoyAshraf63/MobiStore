const { src, dest } = require("gulp");
const plumber = require("gulp-plumber");
const { public } = require("../config/paths");
const { plumberConfig } = require("../config/pluginsConfig");
const cache = require("gulp-cached");
const gulpif = require("gulp-if");
const { isDev } = require("../utils/env");

const publicBuild = () => {
  return src(public.src)
    .pipe(plumber(plumberConfig))
    .pipe(cache("publicBuilding"))
    .pipe(gulpif(!isDev, dest(public.dist), dest(public.dev)));
};

module.exports = {
  publicBuild,
};
