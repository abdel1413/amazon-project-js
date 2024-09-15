import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
let checkoutGrid = document.querySelector(".checkout-grid");

let deliveryOptiontHTML = ``;

// console.log("pr", products);

// collect some data
// generate an HTML with the collected data
// make the HTML page interactive

let matching;
cart.forEach((cartItem) => {
  let cartProductId;

  cartProductId = cartItem.productId;

  products.forEach((element) => {
    if (cartProductId == element.id) {
      matching = element;
    }
  });
  console.log("image", matching.image);
  deliveryOptiontHTML += ``;

  //checkoutGrid.innerHTML = deliveryOptiontHTML;
});
