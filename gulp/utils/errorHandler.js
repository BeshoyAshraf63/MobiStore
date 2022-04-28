const notify = require("gulp-notify");

function errorHandler(err) {
  notify.onError({
    title: "Gulp",
    subtitle: "Failure!",
    message: "Error: <%= error.message %>",
    sound: "Basso",
  })(err);
  this.emit("end");
}

module.exports = {
  errorHandler,
};
