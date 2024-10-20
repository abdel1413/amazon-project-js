import { cart } from "./Cart-class.js";
import { getProduct } from "./products.js";
import { generateTrack } from "./tracking.js";

let ordersHtml = document.querySelector(".js-order-details-grid");
export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToLocalStorage();
  //    console.log("OD", localStorage.getItem("orders"));
  //   let ordersArray = JSON.parse(localStorage.getItem("orders"));
  //   console.log("ooo", ordersArray);
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

  //come back later
  //   let all = [];
  //   for (let i = ordersArray.length - 1; i >= 0; i--) {
  //     all.push(ordersArray[i]);
  //   }
  // console.log("all", all);

  ordersArray.forEach((order) => {
    product = getProduct(order.productId);

    const { id, name, image, priceCents } = product;

    html += ` <div class="order-details-grid js-order-details-grid"
    >
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
                      
                            <button class="track-package-button button-secondary
                            js-track-package-button"
                            data-product-id="${id}"
                            >
                                Track package
                            </button>
                    
                    </div>
                </div>`;
  });

  if (!ordersHtml) {
  } else {
    ordersHtml.innerHTML = html;
  }

  return ordersHtml;
}

generateOrders();

let trackingBtn = document.querySelectorAll(".js-track-package-button");

trackingBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    let id = btn.dataset.productId;
    let matchingItem;

    cart.cartItems.forEach((element) => {
      if (element.productId === id) {
        matchingItem = element;
      }
    });
    generateTrack(id, matchingItem);
    //window.location.href = "tracking.html";
  });
});
