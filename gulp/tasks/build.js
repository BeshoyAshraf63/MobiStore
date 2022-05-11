// const { series, parallel } = require("gulp");
const { parallel } = require("gulp");
// const { htmlBuild } = require("./templates");
const { stylesBuild } = require("./styles");
const { publicBuild } = require("./public");
const { scriptsBuild } = require("./scripts");
const { assetsBuild } = require("./assets");

const build = parallel(publicBuild, stylesBuild, assetsBuild, scriptsBuild);

// const build = series(
//   parallel(publicBuild, stylesBuild, assetsBuild, scriptsBuild),
//   htmlBuild
// );

module.exports = {
  build,
};
