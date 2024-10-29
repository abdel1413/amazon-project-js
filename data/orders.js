import { cart } from "./cart.js";
import { getProduct } from "./products.js";
export let orders = JSON.parse(localStorage.getItem("orders")) || [];

let id;
cart.forEach((item) => {
  id = item.productId;
});

let product = getProduct(id);

export function addOrder(order) {
  console.log("order", order);
  cart.unshift(order.cartItems);
  saveToLocalStorage();
  generateOrders(order);
}

function saveToLocalStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

console.log(document.querySelector(".main"));
export function generateOrders(order) {
  order.cartItems.forEach((item) => {
    console.log("item", item);
  });
}

document.querySelectorAll(".js-track-package-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    let url = new URL(window.location.href);
    console.log("url", url.href);
    console.log(window.location.href);
    console.log(product);

    // window.location.href = "tracking.html";
  });
});
