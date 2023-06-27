import { defineStore } from 'pinia';

// This is where we keep track of both carts, the associated customer, and applied discounts
// These values and actions can be accessed by importing { useMainStore }

export const useMainStore = defineStore('main', {
  state: () => ({
    cart_delivery: {},
    cart_pickup: {},

    customer: {},
    discounts: [],
  }),
  actions: {
    setCustomer(customer) {
      this.customer = customer;
    },
    setDeliveryCart(newCart) {
      this.cart_delivery = newCart;
    },
    setPickupCart(newCart) {
      this.cart_pickup = newCart;
    },
    setDiscounts(discountArray) {
      this.discounts = discountArray;
    },
  },
});
