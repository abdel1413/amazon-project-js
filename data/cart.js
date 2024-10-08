export let cart;

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "2",
      },
    ];
  }
}

loadFromStorage();

//function to save data to localstorage
const saveToLocalStorage = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

//method to add new item if it doesn't exist or to
// increment quantity by one if the item already exist
//in the cart
export const addToCart = (productId) => {
  let matchingId;
  cart.forEach((item) => {
    if (item.productId == productId) {
      matchingId = item;
    }
  });

  if (matchingId) {
    matchingId.quantity++;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: "1",
    });
  }
  saveToLocalStorage();
};

//1 create a newcart array
// 2 push all item whose id != paramid
// 3 set cart to newcart
export function cartItemRemover(id) {
  let newCart = [];
  cart.forEach((item) => {
    if (item.productId !== id) {
      newCart.push(item);
    }
  });
  cart = newCart;
  saveToLocalStorage();
}

//calculate cart item quantities
//and display it on the shopping cart
let totalItems = 0;
export function calculateItemQuantity() {
  cart.forEach((item) => {
    return (totalItems += item.quantity);

    // shoppingCart.innerHTML = total;
  });
}

//create a functon to update the quantity
export const updateQuantity = (id, newQuantity) => {
  let matching;
  cart.forEach((item) => {
    if (item.productId === id) {
      matching = item;
    }
  });
  if (matching) {
    matching.quantity = newQuantity;
  }
  saveToLocalStorage();
};

//function to find the macthing item in cart
// and update its delivery option id
// pass product id and delivery option id we got from html and
//use them to find the maching item then update its delivery option id
export const updateDeliveryOption = (productId, deliveryOptionId) => {
  let matching;
  cart.forEach((item) => {
    if (item.productId === productId) matching = item;
  });

  matching.deliveryOptionId = deliveryOptionId;
  saveToLocalStorage();
};

export const updateShoppingCart = () => {
  let totalItems = 0;
  cart.forEach((element) => {
    totalItems += element.quantity;
  });

  return totalItems;
};
