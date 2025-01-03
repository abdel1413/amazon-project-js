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

// loadProductsFromBackend(loadOrderPage);

async function loadOrderPage() {
  await loadProductFetch();
  let orderHtml = ``;

  orders.forEach((order) => {
    const orderTime = dayjs(order.orderTime).format("MMMM D");
    const orderTotal = order.totalCostCents;
    const orderId = order.id;
    // const { orderDate, orderTotal, orderId, } = order;
    // const v = generateOrderGridHtml(order);
    // console.log(v);

    orderHtml += `
         <div class="order-container">
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
        <div class="order-details-grid js-order-details-grid">
         ${generateOrderGridHtml(order)}
        </div>
      </div>`;
  });
  document.querySelector(".js-order-grid").innerHTML = orderHtml;

  const updataShopingCartValue = cart.updateShoppingCart();
  document.querySelector(".cart-quantity").innerHTML = updataShopingCartValue;

  document.querySelectorAll(".js-buy-again-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      let productId = btn.dataset.productId;
      cart.addToCart(productId);
      cart.saveToLocalStorage();
      btn.innerHTML = "Added";
      setTimeout(() => {
        btn.innerHTML = `
        <img class="buy-again-icon" src="images/icons/buy-again.png">
         <span class="buy-again-message">Buy it again</span>
         `;
      }, 1000);
    });
  });
}

loadOrderPage();

function generateOrderGridHtml(order) {
  let orderGridHtml = "";

  //WILL COME BACK TO FIND OUT WHY ALL THE ORDERS DOMT DISPLAY
  order.products.forEach((productDetails) => {
    let product;

    const { estimatedDeliveryTime, quantity } = productDetails;

    product = getProduct(productDetails.productId);

    const { id, image, name } = product;

    orderGridHtml += `
        <div class="product-image-container"
        data-product=${id}>
            <img src="${image}">
        </div>
        <div class="product-details">
          <div class="product-name">
            ${name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${dayjs(estimatedDeliveryTime).format("ddd MMMM D")}
          </div>
            <div class="product-quantity">
              Quantity: ${quantity}
            </div>
          <button class="buy-again-button button-primary js-buy-again-btn"
            data-product-id="${product.id}">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
        <div class="product-actions track-package-${product.id}">
          <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
          <button class="track-package-button
            button-secondary js-track-package-btn"
            data-product-id=${product.id}>
              Track package
          </button>
          </a>
        </div>
        `;
  });

  return orderGridHtml;
}

function generateTracking(name) {
  document.querySelectorAll(name).forEach((btn) => {
    btn.addEventListener("click", () => {
      let url = new URL(window.location.href);
      let productId = btn.dataset.productId;
      let product = getProduct(productId);
      // window.location.href = "tracking.html";
    });
  });
}

//get a specific order from all the orders
export const getOrder = (orderId) => {
  let matchingOrder;
  orders.forEach((order) => {
    if (order.id == orderId) {
      matchingOrder = order;
    }
  });
  return matchingOrder;
};

//PRACTICE
async function postGreeting() {
  try {
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
  } catch (e) {
    console.log("An error occured", e);
  }
}

postGreeting().then((r) => console.log("posted data: ", r));

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

const greeting = () => {
  let xml = new XMLHttpRequest();

  xml.addEventListener("load", () => {
    console.log(xml.response);
  });
  xml.open("GET", "https://supersimplebackend.dev/greeting");
  xml.send();
};

//greeting();
