const SmoothScroll = require("smooth-scroll");

class Nav {
  constructor() {
    this.nav = document.querySelector("#navbar");
    this.mobileNav = document.querySelector("#navbar .mobile-nav");
    this.backdrop = document.querySelector("#navbar .backdrop");
    this.mobileMenuTrigger = document.querySelector(
      "#navbar .mobile-menu-trigger"
    );
    this.profileMenuTrigger = document.querySelector("#profile-menu-trigger");
    this.profileMenu = document.querySelector("#profile-popup");
    this.cartMenuTrigger = document.querySelector("#cart-menu-trigger");
    this.cartMenu = document.querySelector("#cart-popup");
    this.menuLinks = document.querySelectorAll("#navbar .inner-link");
    this.scrollSections = document.querySelectorAll(".scroll-section");
    this.mobileMenuState = "closed";
    this.profileMenuState = "closed";
    this.cartMenuState = "closed";
    this.scrollClass = "navbar-scroll";
    this.menuLinkHrefPrefix = "/";
    this.lg_breakpoint = 992;

    if (this.nav) {
      this.mobileMenuTrigger.addEventListener("click", (e) => {
        e.preventDefault();
        this.toggleMobileMenu();
      });

      this.profileMenuTrigger.addEventListener("click", (e) => {
        e.preventDefault();
        this.toggleProfileMenu();
      });

      if (this.cartMenuTrigger) {
        this.cartMenuTrigger.addEventListener("click", (e) => {
          e.preventDefault();
          this.toggleCartMenu();
        });
      }

      this.backdrop.addEventListener("click", () => {
        this.backdropClickHandler();
      });

      window.addEventListener("resize", () => {
        this.resizeHandler();
      });

      this.scrollHandler();
      window.addEventListener("scroll", () => {
        this.scrollHandler();
      });

      const that = this;
      [].forEach.call(this.menuLinks, function (item) {
        item.addEventListener("click", function (e) {
          if (document.querySelector(".app.home-page") != null) {
            e.preventDefault();
            that.scrollToSection(e.target);
          }
        });
      });
    }
  }

  backdropClickHandler() {
    if (this.mobileMenuState == "opened") {
      this.toggleMobileMenu();
    }

    if (this.profileMenuState == "opened") {
      this.toggleProfileMenu();
    }

    if (this.cartMenuState == "opened") {
      this.toggleCartMenu();
    }
  }

  scrollHandler() {
    if (window.scrollY > 0) {
      this.nav.classList.add(this.scrollClass);
    } else {
      this.nav.classList.remove(this.scrollClass);
    }

    // update link in home page
    if (document.querySelector(".app.home-page") != null) {
      const that = this;

      [].forEach.call(this.scrollSections, function (section) {
        if (that.isInView(section)) {
          const activeNavLinks = document.querySelectorAll(
            `.inner-link[href="${
              that.menuLinkHrefPrefix
            }#${section.getAttribute("id")}"]`
          );
          [].forEach.call(that.menuLinks, function (item) {
            if (item.classList.contains("active")) {
              item.classList.remove("active");
            }
          });
          [].forEach.call(activeNavLinks, function (link) {
            link.classList.add("active");
          });
        }
      });
    }
  }

  isInView(el) {
    if (
      el.offsetTop - window.scrollY < 200 &&
      el.offsetTop - window.scrollY > -200
    )
      // upper and lower limits of the section to trigger active class
      return true;
    else return false;
  }

  resizeHandler() {
    if (
      window.innerWidth > this.lg_breakpoint &&
      this.mobileMenuState === "opened"
    ) {
      this.toggleMobileMenu();
    }
  }

  toggleMobileMenu() {
    if (this.profileMenuState === "opened") {
      this.toggleProfileMenu();
    }
    if (this.cartMenuState === "opened") {
      this.toggleCartMenu();
    }
    if (this.mobileMenuState === "closed") {
      this.mobileNav.classList.add("open");
      this.mobileMenuTrigger.classList.add("open");
      this.backdrop.classList.add("show");
      document.body.classList.add("overflow-hidden");
      this.mobileMenuState = "opened";
    } else {
      this.mobileNav.classList.remove("open");
      this.mobileMenuTrigger.classList.remove("open");
      this.backdrop.classList.remove("show");
      document.body.classList.remove("overflow-hidden");
      this.mobileMenuState = "closed";
    }
  }

  toggleProfileMenu() {
    if (this.mobileMenuState === "opened") {
      this.toggleMobileMenu();
    }
    if (this.cartMenuState === "opened") {
      this.toggleCartMenu();
    }
    if (this.profileMenuState === "closed") {
      this.profileMenu.classList.add("show");
      this.profileMenuTrigger.classList.add("open");
      this.backdrop.classList.add("show", "hidden");
      this.profileMenuState = "opened";
    } else {
      this.profileMenu.classList.remove("show");
      this.profileMenuTrigger.classList.remove("open");
      this.backdrop.classList.remove("show", "hidden");
      this.profileMenuState = "closed";
    }
  }

  toggleCartMenu() {
    if (this.mobileMenuState === "opened") {
      this.toggleMobileMenu();
    }
    if (this.profileMenuState === "opened") {
      this.toggleProfileMenu();
    }
    if (this.cartMenuState === "closed") {
      this.cartMenu.classList.add("show");
      this.cartMenuTrigger.classList.add("open");
      this.backdrop.classList.add("show", "hidden");
      this.cartMenuState = "opened";
    } else {
      this.cartMenu.classList.remove("show");
      this.cartMenuTrigger.classList.remove("open");
      this.backdrop.classList.remove("show", "hidden");
      this.cartMenuState = "closed";
    }
  }

  scrollToSection(link) {
    if (this.mobileMenuState == "opened") {
      this.toggleMobileMenu();
    }
    if (link == null || link.getAttribute("href").search("#") == -1) {
      new SmoothScroll().animateScroll(document.body, null, {
        speed: 200,
        speedAsDuration: true,
        updateURL: false,
        offset: 150,
      });
    } else {
      const section = document.getElementById(
        link.getAttribute("href").split("#")[1]
      );
      new SmoothScroll().animateScroll(section, null, {
        speed: 200,
        speedAsDuration: true,
        updateURL: false,
        offset: 150,
      });
    }
  }
}

module.exports = {
  Nav,
};
