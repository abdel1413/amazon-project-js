//import { cart, updateShoppingCart } from "../../data/cart.js";
import { cart } from "../../data/Cart-class.js";
// import "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { addOrder, generateOrders } from "../../data/orders.js";
import { getProduct } from "../../data/products.js";
import { currencyFormatter } from "../sharedScripts/currencyFormatter.js";

export function renderPaymentSummary() {
  let totalProductCost = 0;
  let totalShippingCost = 0;
  cart.cartItems.forEach((item) => {
    //we use productid to pull the full item from product
    let product = getProduct(item.productId);

    //we used delivery option id to pull the full item from delivery option
    let deliveryOption = getDeliveryOption(item.deliveryOptionId);

    totalProductCost += item.quantity * product.priceCents;
    totalShippingCost += item.quantity * deliveryOption.priceCents;
  });

  const totalBeforeTax = totalProductCost + totalShippingCost;

  const tax = totalBeforeTax * 0.1;
  const totalAfterTax = totalBeforeTax + tax;

  let paymentSummaryHtml = `
      <div class="payment-summary-title">
              Order Summary
      </div>
      <div class="payment-summary-row">
          <div>Items ( ${cart.updateShoppingCart()}):</div>
          <div class="payment-summary-money">$${currencyFormatter(
            totalProductCost
          )}</div>
      </div>
      <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money shipping-price">$${currencyFormatter(
            totalShippingCost
          )}</div>
      </div>
      <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${currencyFormatter(
            totalBeforeTax
          )}</div>
      </div>
      <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${currencyFormatter(tax)}</div>
      </div>
      <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${currencyFormatter(
            totalAfterTax
          )}</div>
      </div>
      <button class="place-order-button button-primary js-place-order">
          Place your order
      </button>
  `;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHtml;

  const orderContainer = document.querySelector(".order-container");

  document.querySelector(".js-place-order").addEventListener("click", () => {
    console.log("cart", cart);
    addOrder(cart);

    console.log(orderContainer);

    let orderHtml = `<div class="order-details-grid">
                    <div class="product-image-container">
                        <img src="images/products/athletic-cotton-socks-6-pairs.jpg">
                    </div>

                    <div class="product-details">
                        <div class="product-name">
                            Black and Gray Athletic Cotton Socks - 6 Pairs
                        </div>
                        <div class="product-delivery-date">
                            Arriving on: August 15
                        </div>
                        <div class="product-quantity">
                            Quantity: 1
                        </div>
                        <button class="buy-again-button button-primary">
                            <img class="buy-again-icon" src="images/icons/buy-again.png">
                            <span class="buy-again-message">Buy it again</span>
                        </button>
                    </div>

                    <div class="product-actions">
                        <!-- <a href="tracking.html"> -->
                            <button class="track-package-button button-secondary js-track-package-btn">
                                Track package
                            </button>
                        <!-- </a> -->
                    </div>

                    <div class="product-image-container">
                        <img src="images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg">
                    </div>

                    <div class="product-details">
                        <div class="product-name">
                            Adults Plain Cotton T-Shirt - 2 Pack
                        </div>
                        <div class="product-delivery-date">
                            Arriving on: August 19
                        </div>
                        <div class="product-quantity">
                            Quantity: 2
                        </div>
                        <button class="buy-again-button button-primary">
                            <img class="buy-again-icon" src="images/icons/buy-again.png">
                            <span class="buy-again-message">Buy it again</span>
                        </button>
                    </div>

                    <div class="product-actions">
                        <!-- <a href="tracking.html"> -->
                            <button class="track-package-button button-secondary js-track-package-btn">
                                Track package
                            </button>
                        <!-- </a> -->
                    </div>
                </div>`;

    // window.location.href = "orders.html";
  });
}
