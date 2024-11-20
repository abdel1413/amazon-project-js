//import { cart, addToCart } from "../data/cart.js";
import { cart } from "../data/cart-class.js";
import {
  products,
  // loadProductsFromBackend
} from "../data/products.js";
//import { loadProductFecth, products } from "../data/products.js";
//import { currencyFormatter } from "./sharedScripts/currencyFormatter.js";

//loadProductFecth();
//loadProductsFromBackend(renderProducts);

//loadP(renderProducts);

//Hard code for test;
/*let data = [
  {
    image: "./images/products/black-2-slot-toaster.jpg",
    name: "black and White",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceInCents: 1090,
  },
  {
    image: "/images/products/intermediate-composite-basketball.jpg",
    name: "intermediate size basketball",
    rating: {
      stars: 4.5,
      count: 127,
    },
    priceInCents: 2099,
  },
  {
    image: "/images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton Tshirt-2 Pack",
    rating: {
      stars: 4.5,
      count: 56,
    },
    priceInCents: 799,
  },
];

*/

function renderProducts() {
  let html = ``;
  // const htmlGenerator = (product) => {

  products.forEach((element) => {
    html += `<div class="products-container">
                <div class="products-img">
                        <img src= ${element.image} alt="" class="product-img">
                </div>
                  <div class="product-description">
                        <p class="description-el" >${element.name} </p>
                      <div class="rating-div">
                        <img src="${element.getStarUrl()}" alt="" class="rating">
                        <span class="review-el">${element.rating.count}
                        </span>
                    </div>
                    <p class="price-el">${element.getPrice()}</p>
                    <div class="option-chart">
                      <form action="">
                      <select name="" id="" class="selector">
                          <option value="one">1</option>
                          <option value="two">2</option>
                          <option value="three">3</option>
                          <option value="four">4</option>
                          <option value="five">5</option>
                          <option value="six">6</option>
                          <option value="seven">7</option>
                          <option value="eight">8</option>
                          <option value="nine">9</option>
                          <option value="ten">10</option>
                      </select>
                    </form>
                    <div class='info-div'>
                    ${element.getExtraInfoHTML()}
                    </div>
                    </div>
                    <button class="add-btn js-add-to-cart" data-product-id ="${
                      element.id
                    }" >Add to Cart
                  </button>
            </div>
        </div>
      
    `;
  });
  // };

  // htmlGenerator(products);

  document.querySelector(".products-grid").innerHTML = html;

  //method to update the chopping cart
  const updateShoppingCart = () => {
    let totalItem = 0;

    cart.cartItems.forEach((item) => {
      totalItem += item.quantity;
    });
    let cartQuantity = document.querySelector(".cart-quantity");

    cartQuantity.innerHTML = totalItem;
    //cartQuantity.innerHTML = calculateItemQuantity();
  };

  //call update function so it display items number in the cart
  updateShoppingCart();

  // access the data attribute  using dataset.attribute value
  //and add it to the cart
  let productId;
  document.querySelectorAll(".js-add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      productId = btn.dataset.productId;
      //cart.push({ productDescription, quantity: 1 });

      cart.addToCart(productId);

      //update the shopping cart with newly selected item numb
      updateShoppingCart();
      //calculateItemQuantity();
    });
  });
}

renderProducts();
