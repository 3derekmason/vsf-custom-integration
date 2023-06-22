<template>
  <div class="register w-1/3">
    <form
      class="flex flex-col items-center gap-4 border-2 rounded border-primary-blue p-4 w-full"
    >
      <h2>Sign up and earn rewards</h2>
      <div class="flex gap-2 justify-center">
        <input
          type="text"
          placeholder="First Name"
          class="w-2/5 border rounded border-primary-blue p-2"
          v-model="firstName"
        />
        <input
          type="text"
          placeholder="Last Name"
          class="w-2/5 border rounded border-primary-blue p-2"
          v-model="lastName"
        />
      </div>
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
        @click="register"
      >
        Register
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { sdk } from '../../../sdk/packages/sdk.config';
import { useMainStore } from '~/store/main';
const main = useMainStore();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');

const register = async (e: any) => {
  e.preventDefault();
  const body = {
    first_name: firstName.value,
    last_name: lastName.value,
    email: email.value,
    password: password.value,
  };

  const { data } = await sdk.medusa.createCustomer(body);
  main.setCustomer(data.customer);
};
</script>
