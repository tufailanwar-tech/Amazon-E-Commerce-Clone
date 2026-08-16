import {cart,removeFromCart,updateDeliveryOption} from '../../data/cart.js';

import { products,getProduct } from '../../data/products.js';

import { formatCurrency } from '../utils/money.js';


import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

import {deliveryOptions,getDeliveryOption} from '../../data/deliveryOptions.js'
const today=dayjs();
const deliveryDate=today.add(7,'days');
// deliveryDate.format('dddd , MMMM ,D');


export function renderOrderSummary(){

  let cartSummaryHtml='';
  cart.forEach((cartItems)=>{
    const productId=cartItems.productId;

    const matchingProduct=getProduct(productId);
    
    
    const deliveryOptionsId = cartItems.deliveryOptionsId;

    const deliveryOption = getDeliveryOption(deliveryOptionsId);
  

    // console.log(deliveryOption);
    const today=dayjs();
    const deliveryDate=today.add(
      deliveryOption.deliveryDays,
      'days'
    )
    const dateString=deliveryDate.format(
      'dddd,MMMM,D'
    )

    cartSummaryHtml +=`
    <div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItems.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          ${deliveryOptionsHTML(matchingProduct,cartItems)}
        </div>
      </div>
    </div>
    `
  })

  function deliveryOptionsHTML(matchingProduct,cartItems){
    let html='';

    deliveryOptions.forEach((deliveryOptions)=>{
      const today=dayjs();
      const deliveryDate=today.add(
        deliveryOptions.deliveryDays,
        'days'
      )
      const dateString=deliveryDate.format(
        'dddd,MMMM,D'
      )

      const priceString=deliveryOptions.priceCents===0 ? 'Free':`$${formatCurrency(deliveryOptions.priceCents)} -`;

      const isChecked=deliveryOptions.id===cartItems.deliveryOptionsId;

      html+= `
        <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOptions.id}">
            <input type="radio"
              ${isChecked ? 'checked': ' '}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
          </div>
      `
    })
    return html;
  }

  document.querySelector('.js-order-summary').innerHTML=cartSummaryHtml;


  document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      removeFromCart(productId);

      let cartQuantity = 0;
      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });

      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
    });
  });

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click',()=>{
        const { productId, deliveryOptionId } = element.dataset;

        updateDeliveryOption(productId, deliveryOptionId);
        
        renderOrderSummary();
      })
    })
  }
 