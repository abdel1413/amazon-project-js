// import {
//   cart,
//   cartItemRemover,
//   updateQuantity as addQuantity,
//   updateDeliveryOption,
//   updateShoppingCart,
// } from "../../data/cart.js";
import { cart } from "../../data/Cart-class.js";
import { getProduct, products } from "../../data/products.js";
import { currencyFormatter } from "../sharedScripts/currencyFormatter.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { renderPaymentSummary } from "./paymentSummary.js";
//import "../../data/backend-practice.js";

/*
new Promise(() => {
  console.log(products);
});
*/

export const renderOrderSummary = () => {
  //function to easy reading date format:
  //1 create a delivery date using dayjs() function
  //2 add() a date we want to dayjs()
  //3 format() to formate the date
  const getDeliveryDate = (option) => {
    const today = dayjs();
    const deliveryDate = today.add(option.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");
    return dateString;
  };

  const deliveryOptionsHTML = (matching, cartItem) => {
    let html = ``;

    deliveryOptions.forEach((option) => {
      let isChecked = option.id === cartItem.deliveryOptionId ? "checked" : "";

      const priceString =
        option.priceCents === 0
          ? "FREE"
          : `$${currencyFormatter(option.priceCents)}`;

      html += ` <div class="delivery-option js-delivery-option" 
      data-product-id="${cartItem.productId}"
      data-delivery-option-id="${option.id}">
                  <input type="radio"
                  ${isChecked}
                  class="delivery-option-input"
                  name="delivery-option-${matching.id}">

                  <div>
                      <div class="delivery-option-date">
                        ${getDeliveryDate(option)}
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
  // make the HTML page interactivel

  cart.cartItems.forEach((cartItem) => {
    // let matchingProduct;
    let cartProductId;
    let quantity;
    cartProductId = cartItem.productId;
    console.log("ci", cartProductId);
    quantity = cartItem.quantity;

    // let match;
    // products.forEach((element) => {
    //   if (cartProductId == element.id) {
    //     match = element;
    //   }
    // });

    let matchingProduct = getProduct(cartItem.productId);
    console.log(matchingProduct);

    const image = matchingProduct.image;
    const name = matchingProduct.name;
    const price = matchingProduct.priceCents;

    let deliveryOptionId = cartItem.deliveryOptionId;

    // deliveryOptions.forEach((option) => {
    //   if (option.id == deliveryOptionId) {
    //     delivery = option;
    //   }
    // });

    const delivery = getDeliveryOption(deliveryOptionId);

    cartItems += `<div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
          Delivery date: ${getDeliveryDate(delivery)}
      </div>

      <div class="cart-item-details-grid">
          <img class="product-image" src="${image}">
          <div class="cart-item-details">
              <div class="product-name">
                  ${name}
              </div>
              <div class="product-price">
                  ${matchingProduct.getPrice()}
              </div>
              <div class="product-quantity">
                  <span>
                      Quantity:<span class="quantity-label js-quantity-label
                      js-quantity-label-${matchingProduct.id}
                      data-product-id="${matchingProduct.id}"
                      ">${quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary
                      js-update-quantity-link
                      js-update-quantity-link-${matchingProduct.id}"
                      data-product-id="${matchingProduct.id}">
                      Update
                  </span>
          
                        <input type=text value="${quantity}" class="quantity-input 
                        js-quantity-input-${matchingProduct.id}"/>
                        <span class="save-quantity-link
                        link-primary
                        js-save-quantity-link"
                        data-product-id="${matchingProduct.id}">Save</span>
                    
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                    matchingProduct.id
                  }">
                      Delete
                  </span>
              </div>
          </div>

          <div class="delivery-options">
              <div class="delivery-options-title">
                  Choose a delivery option:
              </div>
              ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
      </div>
   </div>
   `;

    cartItemSection.innerHTML = cartItems;
  });

  //when clicked on ,
  //1) remove item from cart
  //2) and updata the html
  let productId;
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      productId = link.dataset.productId;

      cart.cartItemRemover(productId);

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
      // updateShoppingCart();
      renderOrderSummary();
      renderPaymentSummary();
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
  //  const updateShoppingCart = () => {
  //   let totalItems = 0;
  //   cart.forEach((element) => {
  //     totalItems += element.quantity;
  //   });

  let totalItems = cart.updateShoppingCart();

  document.querySelector(".checkout-total-items").innerHTML =
    cart.updateShoppingCart();

  let checkoutLabel = document.querySelector(".checkout-total-items-label");
  totalItems < 2
    ? (checkoutLabel.innerHTML = "Item")
    : (checkoutLabel.innerHTML = "Items");

  //  return totalItems;
  // };

  // updateShoppingCart();
  // let total = updateShoppingCart();
  // console.log("update ship", total);
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

  //remove class is-editing-quantity when we done editing
  //so update btn is displayed
  document.querySelectorAll(".js-save-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      let productId = link.dataset.productId;
      //get the specific cart container
      let cartItem = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      cartItem.classList.remove("is-editing-quantity");

      let inputValue = document.querySelector(
        `.js-quantity-input-${productId}`
      );

      inputValue = Number(inputValue.value);

      //1update the cart
      //2update the html page
      //3 update the header containing number of items
      cart.updateQuantity(productId, inputValue);
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
        inputValue;
      inputValue = "";
      //updateShoppingCart();
      //totalItems;
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  //When clicked on :
  // 1 update the data  by collecting product id and deliver id
  // 2 then regenerate the page / all htmls
  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { deliveryOptionId, productId } = element.dataset;
      cart.updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
};

renderOrderSummary();
