const $ = require("jquery");

class HomeProducts {
  constructor() {
    $("#load-more-btn").on("click", (e) => {
      e.preventDefault();
      this.loadMore();
    });

    $("#products-search").on("input", (e) => {
      e.preventDefault();
      this.search();
    });
  }

  loadMore() {
    $(".product-item-wrapper.hidden").slice(0, 3).removeClass("hidden");
    if ($(".product-item-wrapper.hidden").length == 0) {
      $(".load-more-btn-wrapper").addClass("d-none");
    }
  }

  search() {
    $(".product-item-wrapper")
      .addClass("search-hide")
      .removeClass("search-show");
    if ($("#products-search").val() == "") {
      $(".product-item-wrapper")
        .removeClass("search-hide")
        .removeClass("search-show");
    } else {
      window.allProducts.forEach((product) => {
        if (product.name.search($("#products-search").val()) != -1) {
          $(`.product-item-wrapper[data-id='${product.id}']`)
            .removeClass("search-hide")
            .addClass("search-show");
        }
      });
    }
  }
}

module.exports = {
  HomeProducts,
};
