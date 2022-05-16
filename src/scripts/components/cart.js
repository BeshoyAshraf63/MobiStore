const { customInput } = require("./customInput");
const $ = require("jquery");
let { order } = require("./products");

let products;
class Cart {
  constructor() {
    this.numberInputs = $(".custom-number-input");
    this.addToCartBtns = $(".product-add-to-cart");

    if ($(".cart-items-wrapper").length) {
      this.numberInputs.each(function (i, el) {
        customInput(el);
      });

      $(document).on("click", ".product-add-to-cart", (e) => {
        e.preventDefault();
        this.addToOrder($(e.target).attr("data-product-id"));
      });

      $(document).on("change", ".cart-item .number-input", (e) => {
        this.updateOrder($(e.target).parents(".cart-item"));
      });
      if ($(".home-page").length) {
        products = window.allProducts;
      } else if (
        ($(".cart-popup").length || $(".cart-page").length) &&
        localStorage.getItem("cart")
      ) {
        products = JSON.parse(localStorage.getItem("cart"));
      } else {
        products = [];
      }
      this.initialUpdate();
    }

    if ($(".auth-page").length) {
      window.localStorage.clear();
    }
  }

  addToOrder(productId) {
    let index = 0;
    products.every((product) => {
      if (product.id === parseInt(productId)) {
        return false;
      }
      index++;
      return true;
    });
    let isFoundInOrder = false;
    order.every((product) => {
      if (product.index === index) {
        isFoundInOrder = true;
        return false;
      }
      return true;
    });

    if (!isFoundInOrder) {
      order.push({
        index: index,
        qty: 1,
      });
      $(`.product-add-to-cart[data-product-id="${productId}"]`)
        .text("Added to Cart")
        .addClass("btn-outline-primary disabled")
        .removeClass("btn-primary");
      this.addToCart(index, order.length - 1);
    }
    window.localStorage.removeItem("cart");
    let cart = order.map((cartItem) => {
      return { ...products[cartItem.index], qty: cartItem.qty };
    });
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }

  addToCart(productIndex, orderIndex) {
    const product = products[productIndex];
    let cartHtml = `
        <div class="cart-item new-cart-item" data-product-index="${productIndex}" data-order-index="${orderIndex}">
            <div class="row gx-0">
            <div class="col-3 pe-2">
                <img src="assets/imgs/products/${product.img}" alt="${product.name}" class="img-fluid">
            </div>
            <div class="col-9">
                <p class="cart-item__product-name">${product.name}</p>
                <div class="d-flex justify-content-between pe-2">
                    <p class="cart-item__product-price">$${product.price}</p>
                    <div class="custom-number-input">
                        <input
                            type="number"
                            min="0"
                            max="100"
                            step="1"
                            class="number-input"
                            value="1"
                        />
        
                        <button class="btn btn-decrement">-</button>
                        <button class="btn btn-increment">+</button>
                        </div>
                </div>
            </div>
        </div>
    </div>`;
    $(".cart-items-wrapper").append(cartHtml);
    customInput(document.querySelector(".new-cart-item .custom-number-input"));
    $(".new-cart-item").removeClass("new-cart-item");
    $(".cart-empty-text").addClass("d-none");
    $(".cart-btns").removeClass("d-none");
    $(".navbar__cart-number").text(order.length);
    if ($(".cart-total-price").length) {
      $(".cart-total-price").text("$" + this.calculateTotalPrice());
    }
  }

  updateOrder(cartItem) {
    const qty = parseInt(cartItem.find(".number-input").val());
    // console.log(qty);
    if (qty == 0) {
      const orderIndex = parseInt(cartItem.attr("data-order-index"));
      $(
        `.product-add-to-cart[data-product-id="${
          products[order[orderIndex].index].id
        }"]`
      )
        .text("Add to Cart")
        .addClass("btn-primary")
        .removeClass("btn-outline-primary disabled");
      order.splice(parseInt(cartItem.attr("data-order-index")), 1);
      this.removeFromCart(cartItem);
      $(".cart-item").each((i, item) => {
        item = $(item);
        if (parseInt(item.attr("data-order-index")) > orderIndex) {
          item.attr(
            "data-order-index",
            parseInt(item.attr("data-order-index")) - 1
          );
        }
      });
    } else {
      order[parseInt(cartItem.attr("data-order-index"))].qty = qty;
    }
    window.localStorage.removeItem("cart");
    // let cart = { ...products[order.index], qty: order.qty };
    let cart = order.map((cartItem) => {
      return { ...products[cartItem.index], qty: cartItem.qty };
    });
    window.localStorage.setItem("cart", JSON.stringify(cart));
    if ($(".cart-total-price").length) {
      $(".cart-total-price").text("$" + this.calculateTotalPrice());
    }
  }

  removeFromCart(cartItem) {
    cartItem.remove();
    if (order.length == 0) {
      $(".cart-empty-text").removeClass("d-none");
      $(".cart-btns").addClass("d-none");
    }
    $(".navbar__cart-number").text(order.length);
  }

  initialUpdate() {
    const prevOrders = window.localStorage.getItem("cart");
    if (prevOrders) {
      const cartItems = JSON.parse(prevOrders);
      let counter = 0;
      cartItems.every((product) => {
        this.addToOrder(product.id);
        if (product.qty > 1) {
          order[counter].qty = product.qty;
          $(`.cart-item[data-order-index="${counter}"] .number-input`).val(
            product.qty
          );
          if ($(".cart-total-price").length) {
            $(".cart-total-price").text("$" + this.calculateTotalPrice());
          }
        }
        counter++;
        return true;
      });
      window.localStorage.setItem("cart", prevOrders);
    }
  }

  calculateTotalPrice() {
    let price = 0;
    let cart = order.map((cartItem) => {
      return { ...products[cartItem.index], qty: cartItem.qty };
    });
    cart.every((item) => {
      const qty = item.qty;
      const itemPrice = item.price;
      price += qty * itemPrice;
      return true;
    });
    return price;
  }
}

module.exports = {
  Cart,
};
