import { renderOrderSummary } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentsummary.js";
import { loadProducts } from "../data/products.js";
// import '../data/cart-class.js';
// import {Car} from '../data/car.js';
// import  '../data/backend-practice.js'

loadProducts(()=>{
  renderOrderSummary();
  renderPaymentSummary();
})

