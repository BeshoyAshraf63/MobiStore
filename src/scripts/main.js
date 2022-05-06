const AOS = require("aos");
const { Nav } = require("./components/nav");
const { Header } = require("./components/header");
const { HeaderSwiper } = require("./components/headerSwiper");
const { ProductsSwiper } = require("./components/productsSwiper");
const { TestimonialsSwiper } = require("./components/testimonialsSwiper");

document.addEventListener("DOMContentLoaded", function () {
  new Nav();
  new Header();
  new HeaderSwiper();
  new ProductsSwiper();
  new TestimonialsSwiper();

  // init AOS
  AOS.init({
    offset: 0,
    duration: 600,
    easing: "ease-in-sine",
    delay: 0,
    disable: true,
  });
});
