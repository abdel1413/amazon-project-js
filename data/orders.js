import { cart } from "./cart.js";
export let orders = JSON.parse(localStorage.getItem("orders")) || [];

console.log("cart", cart);

export function addOrder(order) {
  cart.unshift(order);
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

export function generateOrders(params) {}
