import { getProduct, Product } from "./products.js";

export async function generateTrack(id, item) {
  let product = getProduct(id);

  const { productId, name, image } = product;
  //console.log((window.location.href = "tracking.html"));

  const main = document.querySelector(".main");

  const html = `
        <div class="order-tracking">
            <a class="back-to-orders-link link-primary" href="orders.html">
                View all orders
            </a>
               <div class="js-product-details" id="js-product-details">
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

  //   console.log("trachking", window.location.href);
  //   const body = document.getElementsByTagName("body")[0];
  //   body.innerHTML = html;

  //   let del = document.querySelector(".delivery-date");
  //   del.style.color = "red";
  //   let img = document.querySelector(".product-image");
  //   img.style.height = "150px";

  //   console.log("bod", body);

  //   generateTrack(id, item);
  //   main.innerHTML = html;
  //document.querySelector(".main").innerHTML = html;

  // window.location.href = "tracking.html";
}

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
