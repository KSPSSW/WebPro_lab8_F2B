<template>
  <q-page>
    <div class="q-pa-md">
      <div class="q-gutter-md" style="max-width: 300px">
        <h5>Temperature Page</h5>
        <q-input type="number" v-model="temperature" />
        <div>{{ fahrenheit }}</div>
        <q-btn @click="convertToFahrenheit">Convert</q-btn>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { api } from 'src/boot/axios'
import { ref } from 'vue'
const temperature = ref<number>(0)
const fahrenheit = ref<number>(0)
function convertToFahrenheit() {
  // fahrenheit.value = (temperature.value * 9) / 5 + 32
  api
    .post('/temperature/convert-body/', { celsius: temperature.value })
    .then((res) => {
      console.log(res)
      console.log(res.data)
      fahrenheit.value = res.data.fahrenheit
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      console.log('finally')
    })
}
</script>
