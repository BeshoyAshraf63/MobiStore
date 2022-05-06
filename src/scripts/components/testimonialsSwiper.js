const { Swiper, Pagination } = require("swiper");

class TestimonialsSwiper {
  constructor() {
    new Swiper(".testimonials-swiper", {
      slidesPerView: 1.1,
      spaceBetween: 30,
      centeredSlides: true,
      modules: [Pagination],
      pagination: {
        el: ".testimonials-swiper .swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      breakpoints: {
        567: {
          slidesPerView: 1.1,
          centeredSlides: true,
        },
        768: {
          slidesPerView: 2,
          centeredSlides: false,
        },
        992: {
          slidesPerView: 2,
          centeredSlides: false,
        },
        1120: {
          slidesPerView: 3,
          centeredSlides: false,
        },
      },
    });
  }
}

module.exports = {
  TestimonialsSwiper,
};
