const logger = require("gulplog");
const { NODE_ENV } = require("../utils/env");

const starterMsg = (done) => {
  logger.info(`🌟 Starting Gulp in [${NODE_ENV}] mode. `);
  done();
};

const buildCompleted = (done) => {
  logger.info(`🌟 Build Completed. `);
  done();
};

module.exports = {
  starterMsg,
  buildCompleted,
};
