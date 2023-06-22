import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    cart: {},
    customer: {},
  }),
  actions: {
    setCart(newCart) {
      this.cart = newCart;
    },
    setCustomer(customer) {
      this.customer = customer;
    },
  },
});
