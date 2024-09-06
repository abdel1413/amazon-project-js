let data = [
  {
    image: "./images/products/black-2-slot-toaster.jpg",
    name: "black and White",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceInCent: 1090,
  },
  {
    image: "/images/products/intermediate-composite-basketball.jpg",
    name: "intermediate size basketball",
    rating: {
      stars: 4.5,
      count: 127,
    },
    priceInCent: 2099,
  },
  {
    image: "/images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton Tshirt-2 Pack",
    rating: {
      stars: 4.5,
      count: 56,
    },
    priceInCent: 799,
  },
];

let html = ``;
const htmlGenerator = (product) => {
  product.forEach((element, index) => {
    console.log(element.rating.stars);
    html += ` <div class="products-container">
            <img src= ${element.image} alt="" class="product-img">
            <div class="product-description">
                <p class="description-el">${element.name} </p>
                <div class="rating-div">
                    <img src="/images/ratings/rating-${
                      element.rating.stars * 10
                    }.png" alt="" class="rating"><span class="review-el">${
      element.rating.count
    }</span>
                </div>
                <p class="price-el">$${(element.priceInCent / 100).toFixed(
                  2
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
                <button class="add-btn">Add to Cart</button>
          </div>
        </div>
    
`;
  });
};

htmlGenerator(data);

document.querySelector(".products-grid").innerHTML = html;
