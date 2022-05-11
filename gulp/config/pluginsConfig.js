const errorHandler = require("../utils/errorHandler");
const gulpif = require("gulp-if");
const { isDev, NODE_ENV } = require("../utils/env");
const { dev, dist, scripts } = require("./paths");
const imagemin = require("gulp-imagemin");
const TerserPlugin = require("terser-webpack-plugin");

const enableNotification = false;
const minifyHtml = false;

const delConfig = [gulpif(isDev, dev, dist)];

const plumberConfig = enableNotification ? errorHandler : {};

const browserSyncConfig = {
  // server: {
  //   baseDir: dev,
  // },
  proxy: "localhost:8080",
};

const injectConfig = {
  ignorePath: isDev ? dev : dist,
  addRootSlash: true,
  removeTags: true,
};

const htmlMinConfig = { collapseWhitespace: true };

const imageminPlugins = {
  images: [
    imagemin.mozjpeg({
      max: 85,
      min: 70,
      progressive: true,
    }),
    imagemin.optipng({
      optimizationLevel: 5,
    }),
    imagemin.svgo({
      plugins: [
        {
          removeViewBox: false,
        },
      ],
    }),
  ],
};

const imageminConfig = {
  verbose: true,
};

const webpackConfig = {
  mode: NODE_ENV,
  output: {
    filename: isDev ? "[name].js" : scripts.prodOut,
  },
  devtool: "source-map",
  optimization: {
    minimize: !isDev,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};

module.exports = {
  plumberConfig,
  delConfig,
  browserSyncConfig,
  injectConfig,
  htmlMinConfig,
  minifyHtml,
  imageminPlugins,
  imageminConfig,
  webpackConfig,
};
