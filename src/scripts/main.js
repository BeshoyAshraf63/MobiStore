const AOS = require("aos");
const { Nav } = require("./components/nav");
const { Header } = require("./components/header");
const { HeaderSwiper } = require("./components/headerSwiper");

document.addEventListener("DOMContentLoaded", function () {
  new Nav();
  new Header();
  new HeaderSwiper();

  // init AOS
  AOS.init({
    offset: 0,
    duration: 600,
    easing: "ease-in-sine",
    delay: 0,
    disable: true,
  });
});
