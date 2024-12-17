// import { cart } from "./cart.js";

import { getProduct, products } from "./products.js";
import { loadProductFetch, loadProductsFromBackend } from "./products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { currencyFormatter } from "../script/sharedScripts/currencyFormatter.js";
import { cart } from "./Cart-class.js";

export let orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveOrderToLocalStorage();
}

function saveOrderToLocalStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

await loadProductFetch();
// loadProductsFromBackend(loadOrderPage);

let orderProducts = [];

export async function loadOrderPage() {
  let orderHtml = ``;

  orders.forEach((order) => {
    const orderTime = dayjs(order.orderTime).format("MMMM D");
    const orderTotal = order.totalCostCents;
    const orderId = order.id;

    orderProducts = order.products;

    orderHtml += `<div class="order-header-left-section">
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
                        ${generateOrderGridHtml(orderProducts)}
                    `;
    // console.log(orderHtml);
    return orderHtml;
  });
}

loadOrderPage().then((data) => {
  console.log(data);
});
console.log(document.querySelector(".main"));
//document.querySelector(".main").innerHTML

function generateOrderGridHtml(productDetails) {
  let orderDetailHthml = "";
  productDetails.forEach((product) => {
    let getProd = getProduct(product.productId);

    const quantity = product.quantity;
    const estimatedDeliveryTime = dayjs(product.estimatedDeliveryTime).format(
      "MMMM D"
    );

    const { id, image, name, priceCents } = getProd;
    //image
    //name
    //estimed deli time
    //quantity
    orderDetailHthml += `
                <div class="order-details-grid">
                    <div class="product-image-container">
                        <img src="${image}">
                    </div>

                    <div class="product-details">
                        <div class="product-name">
                           ${name}
                        </div>
                        <div class="product-delivery-date">
                            Arriving on: ${estimatedDeliveryTime}
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

                </div>`;
    //console.log(orderDetailHthml);
    return orderDetailHthml;
  });
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
