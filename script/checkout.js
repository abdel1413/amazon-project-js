import {
  cart,
  cartItemRemover,
  calculateItemQuantity,
  updateQuantity as addQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { currencyFormatter } from "./sharedScripts/currencyFormatter.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

const deliveryOptionsHTML = (matching, cartItem) => {
  let html = ``;
  deliveryOptions.forEach((option) => {
    let isChecked = option.id === cartItem.deliveryOptionId ? "checked" : "";
    //get the today date

    //will come back
    const getDeliveryDate = () => {
      const today = dayjs();
      const deliveryDate = today.add(option.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");
      return dateString;
    };
    //getDeliveryDate();

    const today = dayjs();
    const deliveryDate = today.add(option.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    const priceString =
      option.priceCents === 0
        ? "FREE"
        : `$${currencyFormatter(option.priceCents)}`;

    html += ` <div class="delivery-option">
                <input type="radio"
                 ${isChecked}
                class="delivery-option-input"
                 name="delivery-option-${matching.id}">
                <div>
                    <div class="delivery-option-date">
                       ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} - Shipping
                    </div>
                </div>
            </div>`;
  });

  return html;
};

let cartItemSection = document.querySelector(".cart-item-section");

let cartItems = ``;

// collect some data/
// generate an HTML with the collected data
// make the HTML page interactive

let matching;
cart.forEach((cartItem) => {
  let cartProductId;
  let quantity;
  cartProductId = cartItem.productId;
  quantity = cartItem.quantity;

  products.forEach((element) => {
    if (cartProductId == element.id) {
      matching = element;
    }
  });

  const image = matching.image;
  const name = matching.name;
  const price = matching.priceCents;

  //   document.querySelector(".checkout-total-items").innerHTML =
  //     calculateItemQuantity();
  let delivery;
  let deliveryOptionId = cartItem.deliveryOptionId;
  deliveryOptions.forEach((option) => {
    if (option.id == deliveryOptionId) {
      delivery = option;
    }
  });

  //create a delivery date using dayjs()
  // add a date we want to dayjs()
  // format the date
  const day = dayjs();
  const deliveryday = day.add(delivery.deliveryDays, "days");
  const deliveryDateString = deliveryday.format("dddd MMMM D");

  cartItems += ` <div class="cart-item-container 
  js-cart-item-container-${matching.id}">
    <div class="delivery-date">
        Delivery date: ${deliveryDateString}
    </div>

    <div class="cart-item-details-grid">
        <img class="product-image" src="${image}">
        <div class="cart-item-details">
            <div class="product-name">
                ${name}
            </div>
            <div class="product-price">
                $${currencyFormatter(price)}
            </div>
            <div class="product-quantity">
                <span>
                    Quantity:<span class="quantity-label js-quantity-label
                    js-quantity-label-${matching.id}
                    data-product-id="${matching.id}"
                    ">${quantity}</span>
                </span>
                <span class="update-quantity-link link-primary
                    js-update-quantity-link
                    js-update-quantity-link-${matching.id}"
                    data-product-id="${matching.id}">
                    Update
                </span>
        
                       <input type=text value="${quantity}" class="quantity-input 
                       js-quantity-input-${matching.id}"/>
                       <span class="save-quantity-link
                       link-primary
                       js-save-quantity-link"
                       data-product-id="${matching.id}">Save</span>
                   
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                  matching.id
                }">
                    Delete
                </span>
            </div>
        </div>

        <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matching, cartItem)}
        </div>
    </div>
</div>
`;

  cartItemSection.innerHTML = cartItems;
});

//when clicked on ,
//1 delete remove item from cart
//2 and updata the html
let productId;
document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    productId = link.dataset.productId;

    cartItemRemover(productId);

    //after item's been removed from cart, update the html
    // 1 get element to remvoe from dom
    // 2 use .remove() method to remove the element form html page

    //NOTE: to know which specific element to delete from
    //page, we added a class with specific id atteched to it
    //so the delete btn knows which  to deal with;

    let cartItemContainer = document.querySelector(
      `.js-cart-item-container-${productId}`
    );

    cartItemContainer.remove();
    updateShoppingCart();
  });
});

//underline the delete element when mouse is over

const updateDeleteStyler = (string) => {
  document.querySelectorAll(string).forEach((link) => {
    link.addEventListener("mouseover", () => {
      link.style.textDecoration = "underline";
      link.style.color = "red";
    });
    link.addEventListener("mouseout", () => {
      link.style.textDecoration = "none";
      link.style.color = "rgb(32, 165, 218)";
    });
  });
};

updateDeleteStyler(".link-primary");

// display number of items
const updateShoppingCart = () => {
  let total = 0;
  cart.forEach((element) => {
    total += element.quantity;
  });

  document.querySelector(".checkout-total-items").innerHTML = total;

  let checkoutLabel = document.querySelector(".checkout-total-items-label");
  total < 2
    ? (checkoutLabel.innerHTML = "Item")
    : (checkoutLabel.innerHTML = "Items");
};

updateShoppingCart();

document.querySelectorAll(`.js-update-quantity-link`).forEach((element) => {
  element.addEventListener("click", () => {
    let productId = element.dataset.productId;

    //get the specific cart container
    let cartItem = document.querySelector(
      `.js-cart-item-container-${productId}`
    );

    cartItem.classList.add("is-editing-quantity");
  });
});

document.querySelectorAll(".js-save-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    let productId = link.dataset.productId;

    //get the specific cart container
    let cartItem = document.querySelector(
      `.js-cart-item-container-${productId}`
    );

    cartItem.classList.remove("is-editing-quantity");

    let inputValue = document.querySelector(`.js-quantity-input-${productId}`);
    inputValue = Number(inputValue.value);

    //update the cart
    //update the html page
    // update the header containing number of items

    addQuantity(productId, inputValue);
    document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
      inputValue;
    inputValue = "";
    updateShoppingCart();
  });
});

//deliveryOptionsHTML(matching);
