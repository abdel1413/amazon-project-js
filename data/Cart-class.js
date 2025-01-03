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

    // I) reformate
    // if (!this.cartItems) {
    //   this.cartItems = [
    //     {
    //       productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    //       quantity: 2,
    //       deliveryOptionId: "1",
    //     },
    //     {
    //       productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    //       quantity: 1,
    //       deliveryOptionId: "2",
    //     },
    //   ];
    // }

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
// console.log("ccc", cart);

export const bcart = new Cart("besiness-cart");

// cart.loadFromStorage();
// //cart.addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
// bcart.loadFromStorage();

// cart.#localStorageKey = "aaa";
