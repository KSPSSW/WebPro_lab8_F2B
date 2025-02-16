<template>
  <q-page padding>
    <div>First Page</div>
    <div v-for="u in userStore.users" :key="u.id">{{ u.login }}</div>
    <div v-for="p in products" :key="p.id">
      <ProductCard :product="p" @select="select"></ProductCard>
    </div>
    <CounterComponent
      :num="2"
      @update="
        (num: number) => {
          console.log('Update counter 1: ' + num)
        }
      "
    ></CounterComponent>
    <CounterComponent :num="4" @update="update2"></CounterComponent>
    <button
      @click="
        router.push({
          name: 'RoutePage',
          params: { id: 10, name: 'Hello' },
          query: { size: 10 },
          hash: '#abc',
        })
      "
    >
      Goto Route Page with name
    </button>
  </q-page>
</template>

<script setup lang="ts">
import CounterComponent from 'src/components/CounterComponent.vue'
import ProductCard from 'src/components/ProductCard.vue'
import type { Product } from 'src/models'
import { useUserStore } from 'src/stores/userStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = useUserStore()
const products = ref<Product[]>([
  {
    id: 1,
    name: 'Coffee 1',
    price: 20,
    image: 'product1.png',
    size: 'ML',
  },
  {
    id: 2,
    name: 'Coffee 2',
    price: 20,
    image: 'product2.png',
    size: 'ML',
  },
  {
    id: 3,
    name: 'Coffee 3',
    price: 20,
    image: 'product3.png',
    size: 'ML',
  },
  {
    id: 4,
    name: 'Coffee 4',
    price: 20,
    image: 'product4.png',
    size: 'ML',
  },
  {
    id: 5,
    name: 'Coffee 5',
    price: 20,
    image: 'product5.png',
    size: 'ML',
  },
  {
    id: 6,
    name: 'Coffee 6',
    price: 20,
    image: 'product6.png',
    size: 'ML',
  },
  {
    id: 7,
    name: 'Coffee 7',
    price: 20,
    image: 'product7.png',
    size: 'ML',
  },
  {
    id: 8,
    name: 'Coffee 8',
    price: 20,
    image: 'product8.png',
    size: 'ML',
  },
])

function update2(num: number) {
  console.log('Update counter 2: ' + num)
}
function select(product: Product) {
  console.log(product)
}
</script>
