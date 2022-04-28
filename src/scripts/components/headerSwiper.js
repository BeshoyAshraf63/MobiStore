const { Swiper, Pagination, Autoplay } = require("swiper");

class HeaderSwiper {
  constructor() {
    this.currentSlide = document.querySelector("header .current-slide-no");
    this.totalSlides = document.querySelector("header .total-slides-no");
    const that = this;

    new Swiper("header .swiper-container", {
      loop: true,
      modules: [Pagination, Autoplay],
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: "header .swiper-container .swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      on: {
        init: function (swiper) {
          that.currentSlide.innerHTML = "01";
          that.totalSlides.innerHTML = "0" + (swiper.slides.length - 2);
        },
        slideChange: function (swiper) {
          that.currentSlide.innerHTML = "0" + (swiper.realIndex + 1);
        },
      },
    });
  }
}

module.exports = {
  HeaderSwiper,
};
