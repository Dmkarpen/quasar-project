<template>
  <q-page padding>
    <div v-if="product">
      <q-card flat class="bg-transparent q-pa-md">

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
          <div class="text-body2 q-mt-xs">
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
          <q-btn :label="isInCart(product) ? t('productPage.inCart') : t('productPage.addToCart')"
            :color="isInCart(product) ? 'positive' : 'primary'" icon="add_shopping_cart" @click="handleCartClick"
            style="min-width: 220px" />

          <q-btn v-if="userId" flat round size="lg" :icon="isInWishlist(product.id) ? 'favorite' : 'favorite_border'"
            :color="isInWishlist(product.id) ? 'red' : 'grey-7'" @click="toggleWishlist(product.id)" class="q-ml-sm" />
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

const userId = ref(null)
const wishlist = ref([])

function isInWishlist(productId) {
  return wishlist.value.includes(productId)
}

function isInCart(product) {
  return cartStore.items.some(item => item.id === product.id)
}

function handleCartClick() {
  if (isInCart(product.value)) {
    router.push('/cart')
  } else {
    cartStore.addToCart(product.value)
  }
}

function goBack() {
  router.push('/products')
}

async function toggleWishlist(productId) {
  if (!userId.value) return

  const url = isInWishlist(productId)
    ? 'http://127.0.0.1:8000/api/wishlist/remove'
    : 'http://127.0.0.1:8000/api/wishlist/add'

  await axios.post(url, {
    user_id: userId.value,
    product_id: productId
  })

  if (isInWishlist(productId)) {
    wishlist.value = wishlist.value.filter(id => id !== productId)
  } else {
    wishlist.value.push(productId)
  }
}

onMounted(async () => {
  const id = route.params.id
  const token = localStorage.getItem('api_token')

  try {
    // Загружаем сам товар
    const productRes = await axios.get(`http://127.0.0.1:8000/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    product.value = productRes.data

    // Если токен есть — пробуем получить пользователя и вишлист
    if (token) {
      const { data: userData } = await axios.get('http://127.0.0.1:8000/api/me', {
        headers: { Authorization: `Bearer ${token}` }
      })

      userId.value = userData?.id

      if (userId.value) {
        const { data: wish } = await axios.get(`http://127.0.0.1:8000/api/wishlist?user_id=${userId.value}`)
        wishlist.value = wish.map(p => p.id)
      }
    }
  } catch (error) {
    console.error('Ошибка при загрузке товара или вишлиста:', error)
  }
})

</script>

<style scoped></style>
