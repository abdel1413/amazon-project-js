import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { currencyFormatter } from "./sharedScripts/currencyFormatter.js";

//Hard code
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

let html = ``;
const htmlGenerator = (product) => {
  product.forEach((element, index) => {
    html += ` <div class="products-container">
           <div class="products-img">
            <img src= ${element.image} alt="" class="product-img">
            </div>
            <div class="product-description">
                <p class="description-el" >${element.name} </p>
                <div class="rating-div">
                    <img src="/images/ratings/rating-${
                      element.rating.stars * 10
                    }.png" alt="" class="rating"><span class="review-el">${
      element.rating.count
    }</span>
                </div>
                <p class="price-el">$${currencyFormatter(
                  element.priceCents
                )}</p>
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
                <button class="add-btn js-add-to-cart" data-product-id ="${
                  element.id
                }" >Add to Cart</button>
          </div>
        </div>
    
`;
  });
};

htmlGenerator(products);

document.querySelector(".products-grid").innerHTML = html;

//method to update the chopping cart
// let totalItem = 0;
// console.log(totalItem);
const updateCartQuantity = () => {
  let totalItem = 0;
  // console.log(totalItem);
  cart.forEach((item) => {
    totalItem += item.quantity;
  });
  let cartQuantity = document.querySelector(".cart-quantity");

  cartQuantity.innerHTML = totalItem;
};

// access the data attribute  using dataset.attribute value

let productId;
document.querySelectorAll(".js-add-to-cart").forEach((btn) => {
  btn.addEventListener("click", () => {
    productId = btn.dataset.productId;
    //cart.push({ productDescription, quantity: 1 });
    addToCart(productId);

    //add totItem selected in the cart
    updateCartQuantity();
  });
});
