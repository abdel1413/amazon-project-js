export default class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems =
      JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];

    

    if (!this.cartItems) {
      this.cartItems.push();
    }
  }

  saveToLocalStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    let matchingItem;
    if (this.cartItems) {
      this.cartItems.forEach((item) => {
        if (item.productId == productId) {
          matchingItem = item;
        }
      });
    }

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: "1",
      });
    }

    this.saveToLocalStorage();
  }

  cartItemRemover(id) {
    let newCart = [];
    this.cartItems.forEach((item) => {
      if (item.productId !== id) {
        newCart.push(item);
      }
    });
    this.cartItems = newCart;
    this.saveToLocalStorage();
  }

  filterCart(id) {
    this.cartItems.filter((item) => {
      console.log("items", item.productId);
      console.log("id", id);
      return item.productId !== id;
    });
    this.saveToLocalStorage();
  }

  calculateItemQuantity() {
    let totalItems = 0;
    this.cartItems.forEach((item) => {
      return (totalItems += item.quantity);
    });
  }

  updateQuantity(id, newQuantity) {
    let matching;
    this.cartItems.forEach((item) => {
      if (item.productId === id) {
        matching = item;
      }
    });
    if (matching) {
      matching.quantity = newQuantity;
    }
    this.saveToLocalStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matching;
    this.cartItems.forEach((item) => {
      if (item.productId === productId) matching = item;
    });

    matching.deliveryOptionId = deliveryOptionId;
    this.saveToLocalStorage();
  }

  updateShoppingCart() {
    let totalItems = 0;
    this.cartItems.forEach((element) => {
      totalItems += element.quantity;
    });
    return totalItems;
  }
}

export const cart = new Cart("cart-class");

export const bcart = new Cart("besiness-cart");

// //cart.addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
// bcart.loadFromStorage();

// cart.#localStorageKey = "aaa";
