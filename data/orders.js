import { getProduct } from "./products.js";

export const orders = [] || JSON.parse(localStorage.getItem(orders));

export function addOrder(order) {
  orders.unshift(order);
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

export function generateOrders(cart) {
  // window.location.href = "orders.html";
  let html = "";
  let product;
  cart.cartItems.forEach((order) => {
    product = getProduct(order.productId);
    const { id, name, image } = product;
    console.log("qt", order.quantity);
    console.log(id);
    console.log(name);
    console.log(image);

    html += ` <div class="order-container">

                <div class="order-header">
                    <div class="order-header-left-section">
                        <div class="order-date">
                            <div class="order-header-label">Order Placed:</div>
                            <div>June 10</div>
                        </div>
                        <div class="order-total">
                            <div class="order-header-label">Total:</div>
                            <div>$41.90</div>
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

  //window.location.href = "orders.html";

  const orderGrid = document.querySelector(".order-container");
  console.log("grid", orderGrid);
  // console.log(document.querySelector(".js-order-placed"));
  // document.querySelector(".js-orders-placed");
}

//generateOrders(orders);
