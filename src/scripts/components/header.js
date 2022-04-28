class Header {
  constructor() {
    this.headerBg = document.querySelector("header .header__bg");
    this.navLogo = document.querySelector("#navbar .logo");
    this.widthBreakpoint = 992;

    this.updateHeaderBg();

    window.addEventListener("resize", () => {
      this.updateHeaderBg();
    });
  }

  updateHeaderBg() {
    if (window.innerWidth >= this.widthBreakpoint) {
      this.headerBg.style.width =
        this.navLogo.getBoundingClientRect().left + 300 + "px";
    }
  }
}

module.exports = {
  Header,
};
