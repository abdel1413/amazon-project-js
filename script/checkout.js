import { renderOrderSummary as orderSummary } from "./checkouts/orderSummary.js";
import { renderPaymentSummary as paymentSummary } from "./checkouts/paymentSummary.js";
import "../data/cart-oop.js";
import "../data/cart-class.js";
import { loadProductFecth } from "../data/products.js";
// import { loadProductsFromBackend } from "../data/products.js";
//import "../data/car.js";
// import { Cart } from "../data/cart-class.js";

//NOTE: use async function over Promise and Callbacks
//as it is short and make code clear and easy to read.

//using async/await functioins
async function loadProductAsync() {
  console.log("1load page");
  await loadProductFecth();
  const val = await new Promise((resolve) => {
    console.log("inside promise");
    orderSummary();
    paymentSummary();
    resolve("vvaluess");
  });
  console.log("val", val);
}

loadProductAsync();

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
