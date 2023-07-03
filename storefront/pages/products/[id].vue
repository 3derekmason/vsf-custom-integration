<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="product-details w-full p-2 flex justify-center gap-2 px-10">
      <div class="flex flex-col gap-4 w-2/5">
        <h1 class="text-6xl">
          {{ product?.title }}
        </h1>
        <h3 class="text-xl">By <strong class="underline">Medusa</strong></h3>
        <div class="image-container w-full flex gap-2">
          <div class="prod-images flex flex-col gap-1">
            <img
              v-for="image in product?.images"
              :key="image.id"
              width="150"
              height="80"
              :alt="product.title"
              :src="image.url"
              @click="imageToShow = image.id"
              :class="
                imageToShow === image.id
                  ? 'shown border-2 border-primary-blue'
                  : 'border-2 border-dull-orange'
              "
            />
          </div>

          <div
            class="shown-image max-w-md overflow-hidden border-2 border-dull-orange p-2"
          >
            <div v-for="image in product?.images" :key="image.id">
              <div v-if="image.id === imageToShow">
                <img :alt="product.title" :src="image.url" width="400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="prod-actions flex flex-col gap-4 w-2/5 rounded border border-dull-orange p-8"
      >
        <p
          v-if="product?.variants"
          class="text-4xl border-b border-dull-orange p-2"
        >
          ${{ (product.variants[0].prices[0].amount / 100).toFixed(2) }}
        </p>

        <div v-for="option in options" :key="option.id">
          <div>
            <p>{{ option.title }}:</p>
            <div class="option-picker mt-1 flex gap-1 w-full">
              <button
                :disabled="selected === value.value"
                v-for="value in option.values"
                :key="value.id"
                @click="setVariant(value.value)"
                class="w-24 h-10 rounded-full text-gray bg-off-white border-2 border-dull-orange"
              >
                {{ value.value }}
              </button>
            </div>
          </div>
        </div>
        <div class="cart-actions flex flex-col gap-4">
          <span class="fulfillment flex gap-4 my-2">
            <button
              class="h-36 w-48 flex flex-col items-center justify-center text-primary-blue text-2xl bg-transparent border-4 rounded border-dull-orange disabled:border-primary-blue disabled:bg-off-white"
              :disabled="pickup"
              @click="pickup = true"
            >
              Store Pickup
              <Icon name="mdi:check-bold" v-if="pickup" />
            </button>
            <button
              class="h-36 w-48 flex flex-col items-center justify-center text-primary-blue text-2xl bg-transparent border-4 rounded border-dull-orange disabled:border-primary-blue disabled:bg-off-white"
              :disabled="!pickup"
              @click="pickup = false"
            >
              Ship to Home
              <Icon name="mdi:check-bold" v-if="!pickup" />
            </button>
          </span>
          <div class="my-store flex gap-2">
            <h4>Pickup at <strong class="underline">Denver</strong></h4>
            <button class="underline text-primary-blue">
              Check other stores
            </button>
          </div>
          <span
            class="w-full h-12 p-4 flex gap-1 items-center justify-between text-gray bg-off-white text-2xl border rounded border-dull-orange"
          >
            <button
              class="h-full flex items-center bg-transparent text-lg"
              @click="
                if (quantity > 0) {
                  quantity = quantity - 1;
                }
              "
            >
              –
            </button>
            <caption>
              {{
                JSON.stringify(quantity)
              }}
            </caption>
            <button @click="quantity = quantity + 1">+</button>
          </span>
          <span class="w-full flex justify-center gap-4">
            <button
              class="toCart rounded-full bg-primary-blue text-off-white h-14 w-1/2 border-2 border-primary-blue"
              @click="addToCart"
            >
              + Add to cart
            </button>
            <button
              class="toCart rounded-full bg-off-white text-dark-blue h-14 w-1/2 border-2 border-primary-blue"
              @click="addToCart"
            >
              Buy now & checkout
            </button>
          </span>
        </div>
      </div>
    </div>
    <div>
      <div
        class="details mt-1 p-10 border-y border-dull-orange flex flex-col gap-2"
      >
        <h1 class="text-4xl">About This Item</h1>
        <p class="p-4">
          {{ product?.description }}
        </p>
        <div>
          <button
            :class="
              showDetails
                ? 'w-full flex justify-between bg-primary-blue text-off-white h-16 p-4 text-2xl'
                : 'w-full flex justify-between bg-dull-orange h-16 p-4 text-2xl'
            "
            type="button"
            @click="showDetails = !showDetails"
          >
            <span>Details</span>
            <span>
              <span
                ><Icon
                  :name="showDetails ? 'mdi:chevron-up' : 'mdi:chevron-down'"
              /></span>
            </span>
          </button>
          <div v-if="showDetails" class="bg-off-white h-32 p-4">
            <div>
              <ul class="m-2 list-none">
                <li>
                  Weight:
                  {{ product.weight ? `${product.weight} g` : '--' }}
                </li>
                <li>
                  Width:
                  {{ product.width ? `${product.width} cm` : '--' }}
                </li>
                <li>
                  Height:
                  {{ product.height ? `${product.height} cm` : '--' }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <button
            class="w-full flex justify-between bg-dull-orange h-16 p-4 text-2xl"
            type="button"
          >
            <span>Reviews</span>
            <span>
              <span><Icon name="mdi:chevron-down" /></span>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { sdk } from '../../../sdk/packages/sdk.config';
import { useMainStore } from '~/store/main';

definePageMeta({
  layout: 'product',
});

const main = useMainStore();
const route = useRoute();

const productId = route.params.id.toString();

const options = ref();
const product = ref();

let imageToShow = ref();
let pickup = ref(true);
let quantity = ref(1);
let selected = ref();
let showDetails = ref(false);
let variantId = ref('');

// When an item is added to cart, we check for a variant_id of the product,
// depending on the fulfillment option selected we associate the corresponding cartId
// a line item is then added to cart with { pickup: boolean, quantity: number, id: string, variant_id: string}
const addToCart = async () => {
  if (variantId.value === '') {
    alert('Please choose a size/variant');
    return new Error('No Variant Id');
  }

  const cartId = pickup.value ? main.cart_pickup.id : main.cart_delivery.id;

  const body = {
    pickup: pickup.value,
    quantity: quantity.value,
    id: cartId,
    variant_id: variantId,
  };

  const { data } = await sdk.medusa.addCartLineItem(body);

  if (pickup.value) {
    main.setPickupCart(data.cart);
  } else {
    main.setDeliveryCart(data.cart);
  }
  selected.value = false;
  quantity.value = 1;
};

const getProduct = async () => {
  const { data } = await sdk.medusa.getProduct({ id: productId });
  product.value = data.product;
  imageToShow.value = data.product.images[0].id;
  options.value = data.product.options;
};

const setVariant = (value: string) => {
  selected.value = value;
  product.value.variants.forEach((variant: any) => {
    if (variant.title === value) {
      variantId = variant.id;
    }
  });
};

onMounted(() => {
  getProduct();
});
</script>

<style>
.prod-images img.shown {
  opacity: 0.6;
}

.shown-image img {
  transition: 0.2s ease-in-out;
}

.shown-image:hover img {
  scale: 1.5;
  transition: 0.2s ease-in-out;
}

.option-picker button:disabled {
  opacity: 0.8;
  border: 2px solid #003b5c;
}
</style>
