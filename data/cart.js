export const cart = [];

//method to add new item if it doesn't exist or to
// increment quantity by one if the item already exist
//in the cart
export const addToCart = (productId) => {
  // creata a var to save a matching item;
  let matchingId;
  cart.forEach((item) => {
    if (item.productId == productId) {
      matchingId = item;
    }
  });

  if (matchingId) {
    matchingId.quantity++;
  } else {
    cart.push({ productId: productId, quantity: 1 });
  }
};
