// import { cart } from "./cart.js";

// import { getProduct, products } from "./products.js";
import { loadProductsFromBackend } from "./products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { currencyFormatter } from "../script/sharedScripts/currencyFormatter.js";
import { cart } from "./Cart-class.js";

export let orders = [];

export function addOrder(order) {
  orders.unshift(order);
  saveToLocalStorage();
}

// let load = await loadProductFecth();

function saveToLocalStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

console.log(JSON.parse(localStorage.getItem("orders")));

//let c = await loadProductFecth();
// loadProductsFromBackend(loadOrderPage);

async function loadOrderPage() {
  let orderHtml = ``;
  console.log(orders);
  orders.forEach((order) => {
    const orderTime = dayjs(order.orderTime).format("MMMM D");
    let v = generateOrders(order);
    console.log("v", v);

    orderHtml += ` <div class="order-container">
                <div class="order-header">
                    <div class="order-header-left-section">
                        <div class="order-date">
                            <div class="order-header-label">Order Placed:</div>
                            <div>${orderTime}</div>
                        </div>
                        <div class="order-total">
                            <div class="order-header-label">Total:</div>
                            <div>$${currencyFormatter(
                              order.totalCostCents
                            )}</div>
                        </div>
                    </div>
                    <div class="order-header-right-section">
                        <div class="order-header-label">Order ID:</div>
                        <div>${order.id}</div>
                    </div>
                    <div> ${generateOrders(order)}</div>
                </div
                
            </div> `;
  });
  return orderHtml;

  //document.querySelector(".js-orders-grid").innerHTML = orderHtml;

  function generateOrders(order) {
    //review later
    console.log("orde", order);
    let orderHtml = ``;
    order.products.forEach((item) => {
      let product = getProduct(item.productId);

      let { estimatedDeliveryTime, quantity } = item;
      //review later
      estimatedDeliveryTime = dayjs(estimatedDeliveryTime).format("MMMM D");
      console.log("jprd", product);
      const { id, image, name, priceCents } = product;

      orderHtml += `
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
          <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>`;
    });

    return orderHtml;
  }
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
