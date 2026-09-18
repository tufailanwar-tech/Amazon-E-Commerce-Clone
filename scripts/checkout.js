import { renderOrderSummary } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentsummary.js";
import { loadProducts ,loadProductsFetch} from "../data/products.js";

import { loadCarts } from "../data/cart.js";
// import '../data/cart-class.js';
// import {Car} from '../data/car.js';
// import  '../data/backend-practice.js'

async function loadPage(){
 

  await loadProductsFetch();

  await new Promise((resolve)=>{
    loadCarts(()=>{
      resolve();
    });
  })

  renderOrderSummary();
  renderPaymentSummary();
  
}
loadPage()
/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve)=>{
    loadCarts(()=>{
      console.log('2')
      resolve();
    });
  }),

]).then(()=>{
  console.log('3')
  renderOrderSummary();
  renderPaymentSummary();
})
  */

/*
new Promise((resolve)=>{
  loadProducts(()=>{
    resolve();
  });

}).then(()=>{
  return new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  });
 
}).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
})


/*
loadProducts(()=>{
  loadCart(()=>{
    
  })
  
})

*/
