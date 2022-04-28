const del = require("del");
const { delConfig } = require("../config/pluginsConfig");

const cleanup = async () => {
  await del.sync(delConfig);
};

module.exports = {
  cleanup,
};
