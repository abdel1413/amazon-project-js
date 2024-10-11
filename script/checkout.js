import { renderOrderSummary as orderSummary } from "./checkouts/orderSummary.js";
import { renderPaymentSummary as paymentSummary } from "./checkouts/paymentSummary.js";
import "../data/cart-oop.js";
import "../data/cart-class.js";
// import { loadProductsFromBackend } from "../data/products.js";
//import "../data/car.js";
// import { Cart } from "../data/cart-class.js";

new Promise((resolve) => {
  orderSummary();
  paymentSummary();
  resolve("values availabe");
}).then((val) => {
  console.log(val);
});

// loadProductsFromBackend(() => {
//   orderSummary();
//   paymentSummary();
// }

// orderSummary();
// paymentSummary();
