import { renderOrderSummary as orderSummary } from "./checkouts/orderSummary.js";
import { renderPaymentSummary as paymentSummary } from "./checkouts/paymentSummary.js";
import "../data/cart-oop.js";
import "../data/cart-class.js";
import "../data/car.js";
import { Cart } from "../data/cart-class.js";

orderSummary();
paymentSummary();
