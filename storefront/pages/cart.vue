<template>
  <div
    class="cart-page w-full bg-primary-blue text-off-white p-8 flex flex-col items-center gap-4"
  >
    <h2 class="text-2xl my-4">My Cart:</h2>
    <div class="w-4/5 flex flex-col justify-center gap-8">
      <div class="border rounded border-dull-orange p-2 w-full">
        <ul class="p-4 w-full">
          <li v-for="item in cartItems" class="w-full flex justify-between">
            <div class="flex gap-4 items-center my-2">
              <button
                class="flex items-center gap-1 p-2 border rounded border-off-white hover:border-warning hover:bg-warning"
                @click="removeItem(item, 'delivery')"
              >
                <Icon name="mdi:delete-outline" />
              </button>
              <img :src="item.thumbnail" :alt="item.title" width="96" />
              <div class="flex flex-col gap-2">
                <span class="flex gap-4 items-center">
                  <p class="border rounded border-off-white p-2 text-center">
                    {{ item.variant.title }}
                  </p>
                  <p class="text-2xl">{{ item.title }}</p>
                </span>
                <span class="flex gap-4 items-center ml-4">
                  <p>
                    Qty:
                    {{
                      Math.ceil(Number(item.total) / Number(item.unit_price))
                    }}
                  </p>
                  <p class="text-vivid-amber text-xl">
                    ${{ Number(item.total) / 100 }}
                  </p>
                </span>
              </div>
            </div>
            <div class="flex gap-4 items-center justify-center w-2/5">
              <button
                v-if="item.cart_id === main.cart_pickup.id"
                disabled
                class="w-1/2 text-vivid-amber"
              >
                Picking up in store.
              </button>
              <button
                v-else
                class="w-1/2 border rounded border-vivid-amber p-2"
                @click="
                  () => {
                    movePtoS(item, main.cart_delivery.id);
                  }
                "
              >
                I want to pick this item up in store
              </button>
              <button
                v-if="item.cart_id === main.cart_pickup.id"
                class="w-1/2 border rounded border-vivid-amber p-2"
                @click="
                  () => {
                    movePtoS(item, main.cart_pickup.id);
                  }
                "
              >
                I want this item shipped
              </button>
              <button v-else disabled class="w-1/2 text-vivid-amber">
                Shipping to home.
              </button>
            </div>
          </li>
        </ul>
      </div>
      <!-- <div class="w-2/5 border rounded border-dull-orange p-2">
        <h3 class="text-xl border-b-2 border-vivid-amber">Shipping to Home:</h3>
        <ul class="p-4">
          <li v-for="item in deliveryItems">
            <div class="flex gap-4 items-center my-2">
              <button
                class="flex items-center gap-1 p-2 border rounded border-off-white hover:border-warning hover:bg-warning"
                @click="removeItem(item, 'delivery')"
              >
                <Icon name="mdi:delete-outline" />
              </button>
              <img :src="item.thumbnail" :alt="item.title" width="96" />
              <div class="flex flex-col gap-2">
                <span class="flex gap-4 items-center">
                  <p class="border rounded border-off-white p-2 text-center">
                    {{ item.variant.title }}
                  </p>
                  <p class="text-2xl">{{ item.title }}</p>
                </span>
                <span class="flex gap-4 items-center ml-4">
                  <p>
                    Qty:
                    {{
                      Math.ceil(Number(item.total) / Number(item.unit_price))
                    }}
                  </p>
                  <p class="text-vivid-amber text-xl">
                    ${{ Number(item.total) / 100 }}
                  </p>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="w-2/5 border rounded border-dull-orange p-2">
        <h3 class="text-xl border-b-2 border-vivid-amber">
          Picking up in store:
        </h3>
        <ul class="p-4">
          <li v-for="item in pickupItems">
            <div class="flex gap-4 items-center my-2">
              <button
                class="flex items-center gap-1 p-2 border rounded border-off-white hover:border-warning hover:bg-warning"
                @click="removeItem(item, 'pickup')"
              >
                <Icon name="mdi:delete-outline" />
              </button>
              <img :src="item.thumbnail" :alt="item.title" width="96" />
              <div class="flex flex-col gap-2">
                <span class="flex gap-4 items-center">
                  <p class="border rounded border-off-white p-2 text-center">
                    {{ item.variant.title }}
                  </p>
                  <p class="text-2xl">{{ item.title }}</p>
                </span>
                <span class="flex gap-4 items-center ml-4">
                  <p>
                    Qty:
                    {{
                      Math.ceil(Number(item.total) / Number(item.unit_price))
                    }}
                  </p>
                  <p class="text-vivid-amber text-xl">
                    ${{ Number(item.total) / 100 }}
                  </p>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div> -->
    </div>

    <div
      class="flex items-center justify-end gap-8 border-t-2 border-b-2 border-light-amber p-8 mx-12"
    >
      <h3 class="text-xl">
        Subtotal:
        <strong class="text-vivid-amber mx-8"
          >${{
            (Number(main.cart_pickup.subtotal) +
              Number(main.cart_delivery.subtotal)) /
            100
          }}</strong
        >
      </h3>
      <NuxtLink
        to="/checkout"
        class="p-2 border rounded border-off-white hover:bg-off-white hover:text-primary-blue hover:border-primary-blue"
        >Proceed to Checkout <Icon name="mdi:chevron-right"
      /></NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { sdk } from '../../sdk/packages/sdk.config';
import { useMainStore } from '~/store/main';
const main = useMainStore();

const cartItems = ref([]);

const calculateCartTaxes = async () => {
  const pickupTax = await sdk.medusa.calculateCartTaxes({
    id: main.cart_pickup.id,
  });
  const deliveryTax = await sdk.medusa.calculateCartTaxes({
    id: main.cart_delivery.id,
  });

  main.setPickupCart(pickupTax.data.cart);
  main.setDeliveryCart(deliveryTax.data.cart);
};

const removeItem = async (item: any, type: string) => {
  const id = type === 'pickup' ? main.cart_pickup.id : main.cart_delivery.id;
  const line_id = item.id;

  const { data } = await sdk.medusa.removeLineItem({ id, line_id });

  if (type === 'pickup') {
    main.setPickupCart(data.cart);
  } else {
    main.setDeliveryCart(data.cart);
  }
};

// Move Pickup to Shipping (or vice versa...)
// Takes in the item we want to move, and the id of the cart it is currently in
// We then call `removeItem` to remove the line from cart A
// and then `addCartLineItem` to cart B
const movePtoS = async (item: any, cartId: string) => {
  if (cartId === main.cart_pickup.id) {
    await removeItem(item, 'pickup');
    const newItemForDelivery = {
      id: main.cart_delivery.id,
      variant_id: item.variant_id,
      quantity: item.quantity,
      pickup: false,
    };
    const newDeliveryCart = await sdk.medusa.addCartLineItem(
      newItemForDelivery
    );
    main.setDeliveryCart(newDeliveryCart.data.cart);
  } else if (cartId === main.cart_delivery.id) {
    await removeItem(item, 'delivery');
    const newItemForPickup = {
      id: main.cart_pickup.id,
      variant_id: item.variant_id,
      quantity: item.quantity,
      pickup: false,
    };
    const newPickupCart = await sdk.medusa.addCartLineItem(newItemForPickup);
    main.setPickupCart(newPickupCart.data.cart);
  }
};

onMounted(() => {
  calculateCartTaxes();
});

watchEffect(() => {
  // we want to display all items from both carts
  cartItems.value = main.cart_delivery.items.concat(main.cart_pickup.items);
});
</script>
