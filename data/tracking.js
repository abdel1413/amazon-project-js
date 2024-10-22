import { getProduct } from "./products.js";
export function generateTrack(id, item) {
  let product = getProduct(id);

  const { productId, name, image } = product;
  const main = document.querySelector(".main");

  const html = `
        <div class="order-tracking">
            <a class="back-to-orders-link link-primary" href="orders.html">
                View all orders
            </a>
                  
                   <div class="delivery-date">
                    Arriving on Monday, June 13
                   </div>
                    <div class="product-info">
                       ${name}
                    </div>
                    <div class="product-info">
                        Quantity: ${item.quantity}
                    </div>
                   <img class="product-image" src="${image}">
              
            <div class="progress-labels-container">
                <div class="progress-label">
                    Preparing
                </div>
                <div class="progress-label current-status">
                    Shipped
                </div>
                <div class="progress-label">
                    Delivered
                </div>
            </div>
    
            <div class="progress-bar-container">
                <div class="progress-bar"></div>
            </div>
        </div>
    `;

  main.innerHTML = html;

  window.location.href = "tracking.html";
}
