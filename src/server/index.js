var express = require("express");
var path = require("path");
var app = express();

const portNo = process.env.PORT || 80;

// set static folder
const isDev = (process.env.NODE_ENV || "production") == "development";
if (isDev) {
  app.use(express.static("dev"));
} else {
  app.use(express.static("dist"));
}

// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
// use res.render to load up an ejs view file

// index page
app.get("/", function (req, res) {
  // res.redirect("/auth");
  res.render("index", { data: { ff: "hhh" } });
});

// auth page
app.get("/auth", function (req, res) {
  res.render("auth");
});

// cart page
app.get("/cart", function (req, res) {
  res.render("cart");
});

// 404
app.get("*", function (req, res) {
  res.send({ error: "404" });
});

app.listen(portNo);
console.log("Server is listening on port " + portNo);
