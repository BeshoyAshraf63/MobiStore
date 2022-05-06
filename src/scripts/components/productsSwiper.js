const { Swiper, Navigation } = require("swiper");

class ProductsSwiper {
  constructor() {
    new Swiper(".new-products-swiper", {
      slidesPerView: 1.3,
      spaceBetween: 30,
      centeredSlides: true,
      modules: [Navigation],
      navigation: {
        nextEl: ".new-products-swiper-controls .swiper-button-next",
        prevEl: ".new-products-swiper-controls .swiper-button-prev",
      },
      breakpoints: {
        567: {
          slidesPerView: 1.5,
          centeredSlides: true,
        },
        768: {
          slidesPerView: 2.5,
          centeredSlides: false,
        },
        992: {
          slidesOffsetBefore: 20,
          slidesOffsetAfter: 20,
          slidesPerView: 2.5,
          centeredSlides: false,
        },
        1120: {
          slidesOffsetBefore: 20,
          slidesOffsetAfter: 20,
          slidesPerView: 3.5,
          centeredSlides: false,
        },
      },
    });
  }
}

module.exports = {
  ProductsSwiper,
};
