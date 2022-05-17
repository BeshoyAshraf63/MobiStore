const $ = require("jquery");
class Dashboard {
  constructor() {
    this.addProductForm = document.getElementById("add-product-form");
    this.updateProductForm = document.getElementById("update-product-form");

    if (this.addProductForm) {
      this.addProductForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.addProduct();
      });
    }

    if (this.updateProductForm) {
      this.updateProductForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.updateProduct();
      });
    }

    const that = this;
    if ($(".btn-product-delete").length) {
      $(".btn-product-delete").on("click", (e) => {
        e.preventDefault();
        that.deleteProduct($(e.target).data("product"));
      });
    }
  }

  addProduct() {
    const url = window.location.origin + "/products/create";
    const formData = new FormData(this.addProductForm);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result == "success") {
          alert("Product added successfully");
          window.location.replace(
            window.location.origin + "/dashboard/products"
          );
        } else {
          alert("error");
        }
      });
  }

  updateProduct() {
    const url = window.location.origin + "/products/update";
    const formData = new FormData(this.updateProductForm);
    formData.append(
      "updateProductId",
      this.updateProductForm.getAttribute("data-id")
    );
    fetch(url, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result == "success") {
          alert("Product updated successfully");
          window.location.replace(
            window.location.origin + "/dashboard/products"
          );
        } else {
          alert("error");
        }
      });
  }

  deleteProduct(id) {
    const url = window.location.origin + "/products/delete";
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result == "success") {
          alert("Product deleted successfully");
          window.location.replace(
            window.location.origin + "/dashboard/products"
          );
        } else {
          alert("error");
        }
      });
  }
}

module.exports = {
  Dashboard,
};
