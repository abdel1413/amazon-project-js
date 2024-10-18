import { getProduct } from "./products.js";

let ordersHtml = document.querySelector(".js-orders-grid");
export const orders = [] || JSON.parse(localStorage.getItem(orders));

console.log("hh", ordersHtml);

export function addOrder(order) {
  orders.unshift(order);
  saveToLocalStorage();
  // console.log("OD", localStorage.getItem("orders"));
  // let ordersArray = JSON.parse(localStorage.getItem("orders"));
  generateOrders();
}

function saveToLocalStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

export function generateOrders() {
  //window.location.href = "orders.html";

  const ordersArray = JSON.parse(localStorage.getItem("orders"))[0].cartItems;

  let html = ``;
  let product;

  ordersArray.forEach((order) => {
    product = getProduct(order.productId);
    const { id, name, image, priceCents } = product;

    html += `<div class="order-container">

                <div class="order-header">
                    <div class="order-header-left-section">
                        <div class="order-date">
                            <div class="order-header-label">Order Placed:</div>
                            <div>June 10</div>
                        </div>
                        <div class="order-total">
                            <div class="order-header-label">Total:</div>
                            <div>${priceCents}</div>
                        </div>
                    </div>

                    <div class="order-header-right-section">
                        <div class="order-header-label">Order ID:</div>
                        <div>b6b6c212-d30e-4d4a-805d-90b52ce6b37d</div>
                    </div>
                </div>

                <div class="order-details-grid">
                    <div class="product-image-container">
                        <img src="${image}">
                    </div>

                    <div class="product-details">
                        <div class="product-name">
                          ${name}
                        </div>
                        <div class="product-delivery-date">
                            Arriving on: June 17
                        </div>
                        <div class="product-quantity">
                            Quantity:  ${order.quantity}
                        </div>
                        <button class="buy-again-button button-primary">
                            <img class="buy-again-icon" src="images/icons/buy-again.png">
                            <span class="buy-again-message">Buy it again</span>
                        </button>
                    </div>
                    <div class="product-actions">
                        <a href="tracking.html">
                            <button class="track-package-button button-secondary">
                                Track package
                            </button>
                        </a>
                    </div>
                </div>
            </div>`;
  });

  //console.log("htm", html);

  return ordersHtml;
}
//window.location.href = "orders.html";

generateOrders();

// console.log(document.querySelector(".js-order-placed"));

//generateOrders(orders);
