import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
let cartItemSection = document.querySelector(".cart-item-section");
console.log("cart", cartItemSection);

let cartItems = ``;

// console.log("pr", products);
// console.log("pr", cart);

// collect some data
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
  //   console.log("img", matching.image);
  //   console.log("name", matching.name);
  //   console.log("price", matching.priceCents);
  const image = matching.image;
  const name = matching.name;

  const price = matching.priceCents;

  cartItems += ` <div class="cart-item-container">
    <div class="delivery-date">
        Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
        <img class="product-image" src="${image}">
        <div class="cart-item-details">
            <div class="product-name">
                ${name}
            </div>
            <div class="product-price">
                $${(price / 100).toFixed(2)}
            </div>
            <div class="product-quantity">
                <span>
                    Quantity: <span class="quantity-label">${quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                    Update
                </span>
                <span class="delete-quantity-link link-primary">
                    Delete
                </span>
            </div>
        </div>

        <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            <div class="delivery-option">
                <input type="radio" checked class="delivery-option-input" name="delivery-option-1">
                <div>
                    <div class="delivery-option-date">
                        Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                        FREE Shipping
                    </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-1">
                <div>
                    <div class="delivery-option-date">
                        Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                        $4.99 - Shipping
                    </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-1">
                <div>
                    <div class="delivery-option-date">
                        Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                        $9.99 - Shipping
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`;

  cartItemSection.innerHTML = cartItems;
  console.log(cartItemSection);
});
