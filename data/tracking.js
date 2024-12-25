import { getOrder } from "./orders.js";
import { getProduct, loadProductFetch } from "./products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export async function generateTracker() {
  await loadProductFetch();

  const main = document.querySelector(".main");
  let url = new URL(window.location.href);

  let orderId = url.searchParams.get("orderId");

  let productId = url.searchParams.get("productId");

  let product = getProduct(productId);

  let order = getOrder(orderId);

  let foundProduct;
  order.products.forEach((element) => {
    if (element.productId === product.id) foundProduct = element;
  });

  const { quantity, estimatedDeliveryTime } = foundProduct;
  const { image, name, id } = product;

  const html = `
        <div class="order-tracking">
            <a class="back-to-orders-link link-primary" href="orders.html">
                View all orders
            </a>
               <div class="js-product-details" id="js-product-details">
                    <div class="delivery-date">
                    Arriving on ${dayjs(estimatedDeliveryTime).format("MMMM D")}
                   </div>
                    <div class="product-info">
                        ${name}
                    </div>
                    <div class="product-info">
                        Quantity: ${quantity}
                    </div>
                   <img class="product-image" src="${image}">
               </div>
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
        </div
    `;

  main.innerHTML = html;
}

generateTracker();

async function greeting() {
  const resp = await fetch("https://supersimplebackend.dev/greeting");
  const text = await resp.text();
  console.log(text);
}

//greeting();

async function getAmazon() {
  try {
    const resp = await fetch("https://amazon.com");
    const text = await resp.text();
    console.log(text);
  } catch (er) {
    console.log("CORS error. your request was blocked by the backend");
  }
}

//getAmazon();

async function post() {
  try {
    const resp = await fetch("https://supersimplebackend.dev/greeting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        name: "Aboulaye",
      },
    });

    if (resp.status >= 400) {
      throw resp;
    }

    const text = await resp.text();
    console.log("here is yor respon ", text);
  } catch (e) {
    if (e.status == 400) {
      const erMsg = await e.json();
      console.log(erMsg);
    } else {
      console.log("Network error");
    }
  }
}

//post();

async function loadPage() {
  await loadProductFecth();
}

//loadPage();
