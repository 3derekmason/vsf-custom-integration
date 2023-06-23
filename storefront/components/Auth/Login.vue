<template>
  <div class="login w-1/3">
    <form
      class="flex flex-col items-center gap-4 border-2 rounded border-primary-blue p-4 w-full"
    >
      <h2>Log in to your account</h2>
      <input
        type="text"
        placeholder="Email"
        class="w-4/5 border rounded border-primary-blue p-2"
        v-model="email"
      />
      <input
        type="password"
        placeholder="Password"
        class="w-4/5 border rounded border-primary-blue p-2"
        v-model="password"
      />
      <button
        class="w-4/5 border rounded border-primary-blue p-2 bg-primary-blue text-off-white"
        @click="login"
      >
        Log in
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { sdk } from '../../../sdk/packages/sdk.config';
import { useMainStore } from '~/store/main';
const main = useMainStore();

const email = ref('');
const password = ref('');

const addCustomerToCart = async (customer_id: string) => {
  const body = {
    customer_id: customer_id,
  };
  const { data } = await sdk.medusa.updateCart({
    id: main.cart.id,
    body,
  });
  main.setCart(data.cart);
  console.log(main.cart);
};

const login = async (e: any) => {
  e.preventDefault();
  const body = {
    email: email.value,
    password: password.value,
  };
  try {
    const { data } = await sdk.medusa.login(body);
    console.log(data);
    main.setCustomer(data.customer);
    addCustomerToCart(data.customer.id);
  } catch (e) {
    console.error(e);
  }
};
</script>
