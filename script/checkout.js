//import { renderOrderSummary as orderSummary } from "./checkouts/orderSummary.js";
//import { renderPaymentSummary as paymentSummary } from "./checkouts/paymentSummary.js";
import "../data/cart-oop.js";
import "../data/cart-class.js";
import { Product, products } from "../data/products.js";
// import {
//   // loadProductFecth,
//   products,
//   loadProductsFromBackend,
// } from "../data/products.js";
//import { laodCartFromStorage, loadCart } from "../data/cart.js";
import {
  cart,
  cartItemRemover,
  saveToLocalStorage,
  updateDeliveryOption,
  updateQuantity,
  updateShoppingCart,
} from "../data/cart.js";
import { currencyFormatter } from "./sharedScripts/currencyFormatter.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

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

// Promise.all([
//   //loadProductFecth(),
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

//4) using Promise.all() methd to
// wait for all the promise to finish at
//the same time bf going to next step

// Promise.all([
//   new Promise((resolve) => {
//     loadProductsFromBackend(() => {
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
// });

//individual call
// orderSummary();
// paymentSummary()

function renderCheckoutPage() {
  let checkoutpage = ``;
  let matchingProduct;
  cart.forEach((cartItem) => {
    let productId = cartItem.productId;

    //get deliveryoptionid from the cart
    //and use it to pull the whole objct from
    // deliveryoptions
    ////then use delivery option to return a
    //formated date
    let deliveryObject;
    deliveryOptions.forEach((option) => {
      if (option.id === cartItem.deliveryOptionId) {
        deliveryObject = option;
      }
    });

    let ddate = deliveryFormtedDate(deliveryObject);

    products.forEach((product) => {
      if (product.id === productId) matchingProduct = product;
    });

    let matching;
    let shipping;
    let tot = 0;
    cart.forEach((item) => {
      products.forEach((prod) => {
        if (item.productId == prod.id) matching = prod;
      });

      // let price = matchingProduct.priceCents;
      // console.log(price);
      // subTot += item.quantity * price;

      tot += item.quantity * currencyFormatter(matching.priceCents);

      deliveryOptions.forEach((option) => {
        if (item.deliveryOptionId === option.id) {
          shipping = option;
        }
      });
    });

    console.log(shipping);
    console.log(tot);

    const { id, image, name, priceCents } = matchingProduct;

    if (matchingProduct) {
      checkoutpage += `<div class="cart-item-container 
    js-cart-item-container-${id}
    "
    data-product-id=${id}>
    <div class="delivery-date">
        Delivery date: <span class="js-delivery-date"> ${ddate}</span>
    </div>
    <div class="cart-item-details-grid">
    <img class="product-image" src="${image}">
    <div class="cart-item-details">
        <div class="product-name">
            ${name}
        </div>
        <div class="product-price">
            $${currencyFormatter(priceCents)}
        </div>
        <div class="product-quantity">
            <span class="quantity">
                Quantity: <span class="quantity-label">${
                  cartItem.quantity
                }</span>
            </span>
            <span class="update-quantity-link
            link-primary js-update-quantity-link
            "
              data-update-quantity-link-id=${id}>
                Update
            </span>

            <input class="quantity-input
            js-quantity-input-${id}"
            value="${cartItem.quantity}"/>

            <span class="save-quantity-link
            link-primary
            js-save-quantity-link"
            data-save-quantity-id=${id}>
            Save</span>

            <span class="delete-quantity-link
            link-primary
            js-delete-quantity-link"
              data-delete-by-id=${id}>
                Delete
            </span>
        </div>
    </div>

    <div class="delivery-options">
        <div class="delivery-options-title">
            Choose a delivery option:
        </div>
        ${deliveryHTMl(matchingProduct, cartItem)}
        </div>
    </div>
</div>
   `;
    }
  });
  document.querySelector(".js-order-summary").innerHTML = checkoutpage;

  // delet elment from both cart and page
  document.querySelectorAll(".js-delete-quantity-link").forEach((link) => {
    const removeById = link.dataset.deleteById;
    link.addEventListener("click", () => {
      cartItemRemover(removeById);

      let removeElement = document.querySelector(
        `.js-cart-item-container-${removeById}`
      );
      removeElement.remove();

      renderCheckoutPage();
    });
  });

  //update the cart and page
  function cartElment(id) {
    return document.querySelector(`.js-cart-item-container-${id}`);
  }

  document.querySelectorAll(".js-update-quantity-link").forEach((element) => {
    element.addEventListener("click", () => {
      let updateLink = element.dataset.updateQuantityLinkId;

      //access the specific cart container

      // let cartItem = document.querySelector(
      //   `.js-cart-item-container-${updateLink}`
      // );

      //add class to that specific container
      // cartItem.classList.add("is-editing-quantity");

      let editingElement = cartElment(updateLink);
      editingElement.classList.add("is-editing-quantity");
    });
  });

  //grab the save link element using data attribute
  // using the id remove the class is-editing from cart
  document.querySelectorAll(".js-save-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      let saveLinkId = link.dataset.saveQuantityId;

      // let cartItem = document.querySelector(
      //   `.js-cart-item-container-${saveLinkId}`
      // );
      // cartItem.classList.remove("is-editing-quantity");

      let newInputValue = document.querySelector(
        `.js-quantity-input-${saveLinkId}`
      ).value;

      updateQuantity(saveLinkId, newInputValue);
      renderCheckoutPage();

      let removesaveLink = cartElment(saveLinkId);
      removesaveLink.classList.remove("is-editing-quantity");
      // console.log(saveLinkId, newInputValue);
    });
  });

  const numbItems =
    updateShoppingCart() > 1
      ? `${updateShoppingCart()} items`
      : `${updateShoppingCart()} item`;
  document.querySelector(".js-checkout-total-label").innerHTML = numbItems;

  // let deliverDate = document.querySelector(".js-delivery-date");
  // console.log(deliverDate);

  // document.querySelectorAll(".delivery-option").forEach((element) => {
  //   //console.log(element);
  // });
  // const dateString = (delivery) => {
  //   delivery.forEach((option) => {
  //     const now = dayjs();
  //     const date = now.add(option.deliveryDays, "days");
  //     const formatedDate = date.format("dddd, MMMM, D");
  //     return formatedDate;
  //   });
  // };

  function deliveryHTMl(matching, cartItem) {
    let html = "";

    deliveryOptions.forEach((option) => {
      // Deliver date
      // 1 get today's date dayjs()
      //2 do the calculations by adding 7 days : daysjs.add(7, 'days')
      // convert the data into easy-to-read format days.format('dddd, MM, D')

      const isChecked =
        option.id === cartItem.deliveryOptionId ? "checked" : "";

      let priceString =
        option.priceCents === 0
          ? "FREE"
          : `${currencyFormatter(option.priceCents)}`;

      html += `<div class="delivery-option "
      data-product-id="${cartItem.productId}"
      data-delivery-id="${option.id}">
            <input type="radio"  ${isChecked}
            class="delivery-option-input"
            name="delivery-option-${matching.id}">
            <div>
                <div class="delivery-option-date">
                    ${deliveryFormtedDate(option)}
                </div>
                <div class="delivery-option-price">
                    ${priceString} - Shipping
                </div>
            </div>
        </div>`;
    });

    return html;
  }

  //update the delivery date when clicked on the radio input
  document.querySelectorAll(".delivery-option").forEach((input) => {
    input.addEventListener("click", () => {
      //
      const { deliveryId, productId } = input.dataset;

      let match;
      cart.forEach((item) => {
        if (item.productId == productId) {
          match = item;
        }
      });

      match.deliveryOptionId = deliveryId;
      saveToLocalStorage();
      renderCheckoutPage();

      //use dlivery id and product id to update the cart's
      //delivery option id and the page
    });
  });

  function deliveryFormtedDate(option) {
    let now = dayjs();
    let date = now.add(option.deliveryDays, "days");
    let format = date.format("dddd, MMMM, D");
    return format;
  }

  document.querySelector(
    ".js-total-items"
  ).innerHTML = `Items: (${updateShoppingCart()})`;

  console.log(document.querySelector(".payment-summary-money").innerHTML);
}

renderCheckoutPage();
