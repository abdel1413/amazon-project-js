import { getProduct } from "./products.js";

let ordersHtml = document.querySelector(".js-order-details-grid");
export const orders = JSON.parse(localStorage.getItem("orders")) || [];

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

    html += ` <div class="order-details-grid js-order-details-grid">
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
                            Quantity: ${order.quantity}
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
                </div>`;
  });

  //console.log("htm", html);

  if (!ordersHtml) {
  } else {
    console.log("hh", ordersHtml.innerHTML);
    ordersHtml.innerHTML = html;
  }

  return ordersHtml;
}
//window.location.href = "orders.html";

generateOrders();

// console.log(document.querySelector(".js-order-placed"));

//generateOrders(orders);
