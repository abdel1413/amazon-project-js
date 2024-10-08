//import { cart, updateShoppingCart } from "../../data/cart.js";
import { cart } from "../../data/Cart-class.js";
// import "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
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
      <button class="place-order-button button-primary">
          Place your order
      </button>
  `;
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHtml;
}
