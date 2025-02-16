<template>
  <q-page padding style="width: 600px">
    <div>Pos Page</div>
    <div class="row full-width">
      <div class="col-6">
        <q-scroll-area style="height: 100%; max-width: 600px">
          <div class="row">
            <div v-for="p in products" :key="p.id" class="col-4">
              <ProductCard :product="p" @select="select"></ProductCard>
            </div>
          </div>
        </q-scroll-area>
      </div>
      <div class="col-6">
        <q-scroll-area style="height: 400px; max-width: 400px">
          <table class="q-table">
            <thead>
              <th>id</th>
              <th>name</th>
              <th>price</th>
              <th>amount</th>
            </thead>
            <tbody>
              <tr v-for="item in productItems" :key="item.id">
                <td class="text-center">{{ item.id }}</td>
                <td class="text-center">{{ item.product.name }}</td>
                <td class="text-center">{{ item.product.price }}</td>
                <td class="text-center">{{ item.amount }}</td>
              </tr>
            </tbody>
          </table>
        </q-scroll-area>
        <div class="text-h1">{{ sumPrice }}</div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ProductCard from 'src/components/ProductCard.vue'
import type { Product } from 'src/models'
import { computed, ref } from 'vue'
interface ProductItem {
  id: number
  product: Product
  amount: number
}
let lastProductItemId = 1
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
const productItems = ref<ProductItem[]>([])
function select(product: Product) {
  console.log(product)
  productItems.value.push({ id: lastProductItemId++, product: product, amount: 1 })
}
const sumPrice = computed(() => {
  let sum = 0
  for (let i = 0; i < productItems.value.length; i++) {
    sum = sum + productItems.value[i]!.product.price
  }
  return sum
})
</script>
