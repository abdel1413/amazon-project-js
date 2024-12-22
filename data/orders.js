// import { cart } from "./cart.js";

import { getProduct, products } from "./products.js";
import { loadProductFetch, loadProductsFromBackend } from "./products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { currencyFormatter } from "../script/sharedScripts/currencyFormatter.js";
import { cart } from "./Cart-class.js";
console.log(cart);

export let orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveOrderToLocalStorage();
}

function saveOrderToLocalStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

// loadProductsFromBackend(loadOrderPage);

async function loadOrderPage() {
  await loadProductFetch();
  let orderHtml = ``;

  console.log(orders.length);

  orders.forEach((order) => {
    const orderTime = dayjs(order.orderTime).format("MMMM D");
    const orderTotal = order.totalCostCents;
    const orderId = order.id;
    // const { orderDate, orderTotal, orderId, } = order;
    // console.log(orderDate)
    // console.log(orderId)
    // console.log(orderTotal)

    orderHtml = ` <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTime}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${currencyFormatter(orderTotal)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${orderId}</div>
          </div>
        </div>
        <div class="order-details-grid">
         ${generateOrderGridHtml(order)}
        </div>
      </div>`;
  });

  document.querySelector(".js-order-grid").innerHTML = orderHtml;
}

loadOrderPage();

function generateOrderGridHtml(order) {
  let orderGridHtml = "";
  let product;

  order.products.forEach((productDetails) => {
    product = getProduct(productDetails.productId);

    // const quantity = productDetails.quantity;
    // const estimatedDeliveryTime = dayjs(
    //   productDetails.estimatedDeliveryTime
    // ).format("MMMM D");

    const { quantity, estimatedDeliveryTime } = productDetails;
    const { id, image, name } = product;

    orderGridHtml += `
          <div class="product-image-container">
              <img src="${image}">
          </div>
          <div class="product-details">
              <div class="product-name">
                ${name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${dayjs(estimatedDeliveryTime).format("MMM D")}
              </div>
                <div class="product-quantity">
                  Quantity: ${quantity}
                </div>
              <button class="buy-again-button button-primary">
                  <img class="buy-again-icon" src="images/icons/buy-again.png">
                  <span class="buy-again-message">Buy it again</span>
              </button>
          </div>
          <div class="product-actions">
              <a href="tracking.html">
                  <button class="track-package-button button-secondary js-track-package-btn">
                      Track package
                  </button>
              </a>
          </div>
          `;
  });

  //document.querySelector(".js-order-grid").innerHTML = orderGridHtml;
  return orderGridHtml;
}

// document.querySelectorAll(".js-track-package-btn").forEach((btn) => {
//   btn.addEventListener("click", () => {
//     let url = new URL(window.location.href);
//     console.log("url", url.href);
//     console.log(window.location.href);
//     console.log(product);

//     // window.location.href = "tracking.html";
//   });
// });

//PRACTICE
const greeting = () => {
  let xml = new XMLHttpRequest();

  xml.addEventListener("load", () => {
    console.log(xml.response);
  });
  xml.open("GET", "https://supersimplebackend.dev/greeting");
  xml.send();
};

//greeting();

const greetingFetch = () => {
  let promise = fetch("https://supersimplebackend.dev/greeting").then(
    (response) => {
      return response.text();
    }
  );
  return promise;
};
greetingFetch().then((d) => {
  console.log("fetched data:", d);
});

async function greetingAsync() {
  const promise = await fetch("https://supersimplebackend.dev/greeting").then(
    (response) => {
      return response.text();
    }
  );
  return promise;
}

greetingAsync().then((data) => {
  console.log("async fetched data: ", data);
});

async function postGreeting() {
  const response = await fetch("https://supersimplebackend.dev/greeting", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Tchakoura Aboulaye",
    }),
  });

  const data = await response.text();
  return data;
}

postGreeting().then((r) => console.log("posted data: ", r));

function getErrorFetch() {
  try {
    fetch("https://amazon.com")
      .then((response) => {
        return response.json();
      })
      .then((r) => {
        console.log(r);
      });
  } catch (er) {
    console.log("CORS error, Your request was blocked by the backend");
  }
}
//getErrorFetch();
