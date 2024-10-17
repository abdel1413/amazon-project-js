export const orders = [] || JSON.parse(localStorage.getItem(orders));

export function addOrder(order) {
  orders.unshift(order);
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

console.log("oders", orders);
export function generateOrders(cart) {
  // window.location.href = "orders.html";
  let html = "";

  console.log("cart", cart);

  // console.log(document.querySelector(".js-order-placed"));
  // document.querySelector(".js-orders-placed");
}

generateOrders();
