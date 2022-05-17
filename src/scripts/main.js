const AOS = require("aos");
const { Nav } = require("./components/nav");
const { Header } = require("./components/header");
const { HeaderSwiper } = require("./components/headerSwiper");
const { ProductsSwiper } = require("./components/productsSwiper");
const { TestimonialsSwiper } = require("./components/testimonialsSwiper");
const { Cart } = require("./components/cart");
const { Auth } = require("./components/auth");
const { Contact } = require("./components/contact");
const { Dashboard } = require("./components/dashboard");
const { HomeProducts } = require("./components/homeProducts");

document.addEventListener("DOMContentLoaded", function () {
  new Nav();
  new Header();
  new HeaderSwiper();
  new ProductsSwiper();
  new TestimonialsSwiper();
  new Cart();
  new Auth();
  new Contact();
  new Dashboard();
  new HomeProducts();

  // init AOS
  AOS.init({
    offset: 0,
    duration: 600,
    easing: "ease-in-sine",
    delay: 0,
    disable: true,
  });
});
