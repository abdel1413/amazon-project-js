import { renderOrderSummary as orderSummary } from "./checkouts/orderSummary.js";
import { renderPaymentSummary as paymentSummary } from "./checkouts/paymentSummary.js";
import "../data/cart-oop.js";
import "../data/cart-class.js";
import { loadProductFecth, products } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";
// import { loadProductsFromBackend } from "../data/products.js";
// import '../data/cart-class.js';

// import { Cart } from "../data/cart-class.js";

//NOTE: use async function over Promise and Callbacks
//as it is short and make code clear and easy to read.

//using async/await functioins
async function loadProductAsync() {
  try {
    await loadProductFecth();
    const val = await new Promise((resolve) => {
      resolve("value");
    });
  } catch (e) {
    console.log("error has occured, ", e);
  }

  orderSummary();
  paymentSummary();
}

try {
  await loadCartFetch();
  await loadProductAsync();

  await Promise.all([loadCartFetch(), loadProductAsync()]);
} catch (e) {
  console.log("unexpected error occured. Please try again later");
}

//using Promises
// new Promise((resolve) => {
//   orderSummary();
//   paymentSummary();
//   resolve("values availabe");
// }).then((val) => {
//   console.log(val);
// });

// using call backs
// loadProductsFromBackend(() => {
//   orderSummary();
//   paymentSummary();
// }

// orderSummary();
// paymentSummary();
