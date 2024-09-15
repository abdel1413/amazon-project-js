export const cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

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
