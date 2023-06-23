import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    cart_pickup: {},
    cart_delivery: {},
    customer: {},
  }),
  actions: {
    setPickupCart(newCart) {
      this.cart_pickup = newCart;
    },
    setDeliveryCart(newCart) {
      this.cart_delivery = newCart;
    },
    setCustomer(customer) {
      this.customer = customer;
    },
  },
});
