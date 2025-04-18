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
        <q-card-section class="text-center q-pb-sm q-pt-sm">
          <div class="text-h5 text-positive">
            {{ product.price }} ₴
          </div>
        </q-card-section>

        <!-- Кнопка "Добавить в корзину" -->
        <q-card-actions align="center" class="q-mt-xs">
          <q-btn :label="isInCart(product) ? t('productPage.inCart') : t('productPage.addToCart')"
            :color="isInCart(product) ? 'positive' : 'primary'" icon="add_shopping_cart" @click="handleCartClick"
            style="min-width: 220px" />

          <q-btn v-if="userId" flat round size="lg" :icon="isInWishlist(product.id) ? 'favorite' : 'favorite_border'"
            :color="isInWishlist(product.id) ? 'red' : 'grey-7'" @click="toggleWishlist(product.id)" class="q-ml-sm" />
        </q-card-actions>

        <!-- Кнопка "Назад к товарам" -->
        <q-card-actions align="center" class="q-mt-xs">
          <q-btn color="secondary" flat icon="arrow_back" :label="t('productPage.backToList')" @click="goBack" />
        </q-card-actions>
      </q-card>
    </div>

    <!-- Рекомендовані товари -->
    <q-card class="q-mt-lg q-pa-md" v-if="relatedProducts.length">
      <div class="text-h6 q-mb-md">{{ t('productPage.relatedProducts') }}</div>

      <q-carousel v-model="relatedIndex" padding height="200px" arrows navigation-color="primary"
        control-color="primary">
        <q-carousel-slide v-for="(product, i) in relatedProducts" :key="product.id" :name="i">
          <div class="row justify-center items-center q-gutter-md">
            <q-img :src="product.images?.[0]?.url || product.thumbnail" :alt="product.title"
              style="width: 120px; height: 120px" class="cursor-pointer" @click="goToProduct(product.id)" />
            <div>
              <div class="text-subtitle2">{{ product.title }}</div>
              <div class="text-body2 text-primary">{{ product.price }} ₴</div>
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </q-card>

    <!-- Карусель переглянутих товарів -->
    <q-card class="q-mt-md q-pa-md" v-if="userId && viewedLoaded && viewedProducts.length">
      <div class="text-h6 q-mb-md">{{ t('productsPage.recentlyViewed') }}</div>

      <q-carousel v-model="viewedCarouselIndex" padding height="200px" arrows navigation-color="primary"
        control-color="primary" class="bg-white">
        <q-carousel-slide v-for="(product, i) in viewedProducts" :key="product.id" :name="i">
          <div class="row justify-center items-center q-gutter-md">
            <q-img :src="product.images?.[0]?.url" :alt="product.title" style="width: 120px; height: 120px"
              @click="goToProduct(product.id)" class="cursor-pointer" />
            <div>
              <div class="text-subtitle2 text-primary">{{ product.title }}</div>
              <div class="text-body2">{{ product.price }} ₴</div>
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </q-card>

    <!-- Спіннер тільки якщо userId є і ще не завантажено -->
    <div v-else-if="userId && !viewedLoaded" class="q-mt-md">
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
const viewedProducts = ref([])
const viewedLoaded = ref(false)
const viewedCarouselIndex = ref(0)
const relatedProducts = ref([])
const relatedIndex = ref(0)


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

function goToProduct(id) {
  router.push(`/products/${id}`)
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
    // 1. Завантажуємо товар
    const productRes = await axios.get(`http://127.0.0.1:8000/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    product.value = productRes.data

    // 2. Завантажуємо товари з такої ж категорії
    if (product.value?.category) {
      const { data: allProducts } = await axios.get(`http://3123379.ki574762.web.hosting-test.net/api/products`)
      relatedProducts.value = allProducts
        .filter(p => p.category === product.value.category && p.id !== product.value.id)
        .slice(0, 10)
    }

    // 3. Якщо є токен — завантажуємо користувача, вишлист і переглянуті
    if (token) {
      const { data: userData } = await axios.get('http://127.0.0.1:8000/api/me', {
        headers: { Authorization: `Bearer ${token}` }
      })

      userId.value = userData?.id

      if (userId.value) {
        // 3.1 Вишлист
        const { data: wish } = await axios.get(`http://127.0.0.1:8000/api/wishlist?user_id=${userId.value}`)
        wishlist.value = wish.map(p => p.id)

        // 3.2 Переглянуті товари
        const { data: viewed } = await axios.get(`http://127.0.0.1:8000/api/products-viewed?user_id=${userId.value}`)
        viewedProducts.value = viewed
          .filter(p => p.id !== product.value.id)
          .slice(0, 10)
      }
      viewedLoaded.value = true  // ✅ сюди краще винести
    } else {
      viewedLoaded.value = true  // ✅ а це — на випадок відсутності токена
    }
  } catch (error) {
    console.error('Помилка при завантаженні даних:', error)
  }
})


</script>

<style scoped></style>
