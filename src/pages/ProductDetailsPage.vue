<template>
  <q-page padding>
    <div v-if="product">
      <q-card class="q-pa-md shadow-2 flat bordered">

        <!-- Слайдер с изображениями -->
        <q-carousel v-if="product.images && product.images.length" v-model="carouselIndex" navigation padding
          height="300px" class="q-mb-md bg-white" navigation-color="primary" control-color="primary">
          <q-carousel-slide v-for="(img, i) in product.images" :key="i" :name="i" :img-src="img.url" />
        </q-carousel>

        <!-- Название и описание -->
        <q-card-section class="text-center">
          <div class="text-h4 text-primary text-weight-bold q-mb-sm">
            {{ product.title }}
          </div>
          <div class="text-subtitle2 text-grey-7">
            {{ product.description }}
          </div>
        </q-card-section>

        <q-separator />

        <!-- Цена -->
        <q-card-section class="text-center">
          <div class="text-h5 text-positive">
            {{ product.price }} ₴
          </div>
        </q-card-section>

        <!-- Кнопка "Добавить в корзину" -->
        <q-card-actions align="center" class="q-mt-sm">
          <q-btn color="primary" icon="add_shopping_cart" :label="t('productPage.addToCart')" @click="addToCart" />
        </q-card-actions>

        <!-- Кнопка "Назад к товарам" -->
        <q-card-actions align="center" class="q-mt-sm">
          <q-btn color="secondary" flat icon="arrow_back" :label="t('productPage.backToList')" @click="goBack" />
        </q-card-actions>
      </q-card>
    </div>

    <div v-else>
      <q-spinner size="40px" color="primary" />
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useI18n } from 'vue-i18n'
import { useCartStore } from 'src/stores/cartStore'

const route = useRoute()
const router = useRouter()
const product = ref(null)
const carouselIndex = ref(0) // индекс активного слайда
const { t } = useI18n()
const cartStore = useCartStore()

onMounted(async () => {
  const id = route.params.id
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}`)
    product.value = response.data
  } catch (error) {
    console.error('Ошибка при получении продукта:', error)
  }
})

function addToCart() {
  cartStore.addToCart(product.value)
}

function goBack() {
  router.push('/products')
}
</script>

<style scoped></style>
