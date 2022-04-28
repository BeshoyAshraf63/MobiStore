class Nav {
  constructor() {
    this.nav = document.querySelector("#navbar");
    this.scrollClass = "navbar-scroll";

    window.addEventListener("scroll", () => {
      this.scrollHandler();
    });
  }

  scrollHandler() {
    if (window.scrollY > 0) {
      this.nav.classList.add(this.scrollClass);
    } else {
      this.nav.classList.remove(this.scrollClass);
    }
  }
}

module.exports = {
  Nav,
};
