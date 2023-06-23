import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    cart_delivery: {},
    cart_pickup: {},

    customer: {},
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
  },
});
