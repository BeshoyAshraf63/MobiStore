const { watch, series } = require("gulp");
const {
  styles,
  views,
  public,
  assets,
  imgs,
  scripts,
} = require("../config/paths");
const { htmlBuild } = require("./templates");
const { stylesBuild } = require("./styles");
const { scriptsBuild } = require("./scripts");
const { reload } = require("./server");
const { publicBuild } = require("./public");
const { assetsWithoutImgsBuild, imgsBuild } = require("./assets");

const watcher = (done) => {
  watch(views.srcWatch, series(htmlBuild, reload));
  watch(styles.srcWatch, series(stylesBuild, reload));
  watch(public.src, series(publicBuild, reload));
  watch(assets.src, series(assetsWithoutImgsBuild, reload));
  watch(imgs.src, series(imgsBuild, reload));
  watch(scripts.srcWatch, series(scriptsBuild, reload));
  done();
};

module.exports = {
  watcher,
};
