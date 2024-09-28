export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

//use delivery option id to get the machting option
// check if any id matches the param
export function getDeliveryOption(deliveryOptionId) {
  let delivery;
  deliveryOptions.forEach((option) => {
    if (option.id == deliveryOptionId) {
      delivery = option;
    }
  });
  return delivery;
}
