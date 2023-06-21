<template>
  <div class="cart-page w-full bg-primary-blue text-off-white p-8">
    <h2>Available Shipping Options:</h2>
    <ul>
      <li v-for="option in shippingOptions" class="flex gap-4">
        <caption>
          {{
            option.is_return ? 'Shipping' : 'Return'
          }}
        </caption>
        <p>{{ option.name }}</p>
        <p>{{ Number(option.amount) / 100 }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { sdk } from '../../sdk/playground/app/sdk.config';

interface ShippingOption {
  id: string;
  amount: number;
  name: string;
  is_return: boolean;
}

const shippingOptions: Ref<ShippingOption[] | undefined> = ref([]);

const fetchShippingOptoins = async () => {
  const { data } = await sdk.medusa.getShippingMethods('');

  shippingOptions.value = data.shipping_options;
};

onMounted(() => {
  fetchShippingOptoins();
});
</script>
