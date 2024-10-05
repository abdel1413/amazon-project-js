function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
      if (!this.cartitem) {
        this.cartItems = [
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
    },

    saveToLocalStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this));
    },

    addToCart(productId) {
      let matchingId;
      this.cartItems.forEach((item) => {
        if (item.productId == productId) {
          matchingId = item;
        }
      });

      if (matchingId) {
        matchingId.quantity++;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: "1",
        });
      }
      this.saveToLocalStorage();
    },

    cartItemRemover(id) {
      let newCart = [];
      this.cartitem.forEach((item) => {
        if (item.productId !== id) {
          newCart.push(item);
        }
      });
      this.saveToLocalStorage();
      this.cartItems = newCart;
    },
    calculateItemQuantity() {
      let totalItems = 0;
      this.cartItems.forEach((item) => {
        return (totalItems += item.quantity);
      });
    },

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
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      let matching;
      this.cartItems.forEach((item) => {
        if (item.productId === productId) matching = item;
      });

      matching.deliveryOptionId = deliveryOptionId;
      this.saveToLocalStorage();
    },

    updateShoppingCart() {
      let totalItems = 0;
      this.cartItems.forEach((element) => {
        totalItems += element.quantity;
      });
      return totalItems;
    },
  };

  return cart;
}

const cart = Cart("cart-oop");
const businessCart = Cart("bussiness-cart");

cart.loadFromStorage();
businessCart.loadFromStorage();
cart.addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");

// console.log("c", cart);
// console.log("bc", businessCart);
