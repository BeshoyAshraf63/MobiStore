const { series, task } = require("gulp");
const { starterMsg, buildCompleted } = require("./messages");
const { cleanup } = require("./cleanup");
const { build } = require("./build");

const prod = task("prod", series(starterMsg, cleanup, build, buildCompleted));

module.exports = {
  prod,
};
