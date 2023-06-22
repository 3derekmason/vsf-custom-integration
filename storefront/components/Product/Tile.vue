<template>
  <div class="productCard">
    <NuxtLink :to="`/products/${item.id}`">
      <div>
        <div class="thumbnail">
          <img
            :alt="item.title"
            :src="item.thumbnail"
            width="300"
            height="300"
          />
        </div>
        <div class="productLabel">
          <h3>
            {{ item.title }}
          </h3>
          <p>
            from {{ getLowestPrice(item).amount / 100 }}
            {{ getLowestPrice(item).currency_code.toUpperCase() }}
          </p>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    default() {
      return {
        id: 1,
        title: 'Kitchen Table',
        thumbnail: 'https://picsum.photos/600/600',
        variants: [{ prices: [{ amount: 0 }] }],
      };
    },
  },
});

const getLowestPrice = (item: any) => {
  const lowestPrice = item.variants.reduce(
    (acc: any, curr: { prices: any[] }) => {
      return curr.prices.reduce(
        (lowest: { amount: number }, current: { amount: number }) => {
          if (lowest.amount > current.amount) {
            return current;
          }
          return lowest;
        }
      );
    },
    { amount: 0 }
  );

  return lowestPrice || { amount: 10, currency_code: 'usd' };
};
</script>

<style scoped>
.productCard {
  border: 0.5px solid transparent;
  transition: 0.2s ease-in-out;
}
.productCard:hover {
  border: 0.5px dashed var(--primary-main);
  transition: 0.2s ease-in-out;
}
.productCard h3,
.productCard p {
  color: var(--primary-main);
}
.productCard a:hover {
  text-decoration: none;
}

.thumbnail {
  width: 300px;
  height: 300px;
  overflow: hidden;
}

.productCard img {
  transition: 0.2s ease-in-out;
}
.productCard:hover img {
  scale: 1.15;
  rotate: -15deg;
  transition: 0.2s ease-in-out;
}

.productLabel {
  padding: 0px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.productLabel h3 {
  font-size: 1em;
}
.productLabel p {
  font-size: 14px;
}
</style>
