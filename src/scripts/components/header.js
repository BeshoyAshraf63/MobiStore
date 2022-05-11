const SmoothScroll = require("smooth-scroll");

class Header {
  constructor() {
    this.header = document.querySelector("header");
    this.headerBg = document.querySelector("header .header__bg");
    this.navLogo = document.querySelector("#navbar .logo");
    this.headerLinks = document.querySelectorAll("header .inner-link");
    this.widthBreakpoint = 992;

    if (this.header) {
      this.updateHeaderBg();

      window.addEventListener("resize", () => {
        this.updateHeaderBg();
      });

      const that = this;
      [].forEach.call(this.headerLinks, function (item) {
        item.addEventListener("click", function (e) {
          e.preventDefault();
          that.scrollToSection(e.target);
        });
      });
    }
  }

  updateHeaderBg() {
    if (window.innerWidth >= this.widthBreakpoint) {
      this.headerBg.style.width =
        this.navLogo.getBoundingClientRect().left + 300 + "px";
    }
  }

  scrollToSection(link) {
    const section = document.querySelector(link.getAttribute("href"));
    new SmoothScroll().animateScroll(section, null, {
      speed: 200,
      speedAsDuration: true,
      updateURL: false,
      offset: 150,
    });
  }
}

module.exports = {
  Header,
};
