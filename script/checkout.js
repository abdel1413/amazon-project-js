import { renderOrderSummary as orderSummary } from "./checkouts/orderSummary.js";
import { renderPaymentSummary as paymentSummary } from "./checkouts/paymentSummary.js";
import "../data/cart-oop.js";
import "../data/cart-class.js";
import {
  loadProductFecth,
  products,
  // loadProductsFromBackend,
} from "../data/products.js";
import { laodCartFromStorage, loadCart } from "../data/cart.js";
// import { loadProductsFromBackend } from "../data/products.js";
// import '../data/cart-class.js';

// import { Cart } from "../data/cart-class.js";

//NOTE: use async function over Promise and Callbacks
//as it  returns promise and is shorter and makes
//code clear and easy to read.

// 7) using async/await functioins

// async function loadProductAsync() {
//   try {
//     await loadProductFecth();
//     await new Promise((resolve) => {
//       loadCartFetch(() => {
//         resolve();
//       });
//     });
//   } catch (e) {
//     console.log("error has occured, ", e);
//   }

//   orderSummary();
//   paymentSummary();
// }

//loadProductAsync();
// try {
//   await loadProductAsync();
//   await loadCartFetch();

//   await Promise.all([loadCartFetch(), loadProductAsync()]);
// } catch (e) {
//   console.log("unexpected error occured. Please try again later");
// }

// async function loadPage() {
//   await loadProductFecth();
//   await new Promise((resolve) => {
//     loadCartFetch(() => {
//       resolve();
//     });
//   });

//   // orderSummary();
//   //paymentSummary();
//   return "Next step after finish loading";
// }

// loadPage();

// 6) async func returns promise as it is a short cut of func
//returning promise
// async function loadPage2() {
//   console.log("async load page ");
//   await loadProductFecth();

//   orderSummary();
//   paymentSummary();
//   return "value 2";
// }

// loadPage2().then((val) => {
//   console.log("next step");
//   console.log(val);
// });

// 5) func that return promise
// function laodPage1() {
//   return new Promise((resolve) => {
//     console.log("page 1 loaded");
//     resolve("value1");
//   });
// }
// laodPage1().then((v) => {
//   console.log("v", v);
// });

Promise.all([
  loadProductFecth(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve("val2");
    });
  }),
]).then((values) => {
  console.log(values); // [val1, val2]
  orderSummary();
  paymentSummary();
});

//4) using Promise.all() methd to
// wait for all the promise to finish at
//the same time bf going to next step

// Promise.all([
//   new Promise((resolve) => {
//     loadProduct(() => {
//       resolve("val1");
//     });
//   }),

//   new Promise((resolve) => {
//     loadCart(() => {
//       resolve("val2");
//     });
//   }),
// ]).then((values) => {
//   console.log(values); // [val1, val2]
//   orderSummary();
//   paymentSummary();
// });

// 3) using Promises
// NOTE: promises make code look flatter as oppose to call backs
// which are

/*
new Promise((resolve) => {
  loadProductsFromBackend(() => {
    resolve("val");
  });
})
  .then((value) => {
    console.log(value); //=> val
    return new Promise((resolve) => {
      loadCart(() => {
        resolve(val2);
      });
    });
  })
  .then((values) => {
    console.log(values); //=> val2,
    orderSummary();
    paymentSummary();
  });
*/

/* 2) 
new Promise(resolve => {
  loadPduct(() => {
    resolve()
  })
}).then(() => {
  orderSummary()
  paymentSummary()
})
*/

//call back with nested functions
// loadProductsFromBackend(() => {
//   loadCart(() => {
//     orderSummary();
//     paymentSummary();
//   });
// });

// 1) using call backs
// call ananymous function inside loadProdFromBackend()
//inside which we call ordersummary and paymensummary
// loadProductsFromBackend(() => {
//   orderSummary();
//   paymentSummary();
// }

//individual call
// orderSummary();
// paymentSummary()
