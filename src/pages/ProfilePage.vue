<template>
  <q-page class="q-pa-md">
    <!-- Заголовок -->
    <h1 class="q-pa-md text-center">{{ t('profilePage.heading') }}</h1>

    <!-- Приветствие + кнопка Logout справа -->
    <div class="row items-center justify-between q-mb-sm" style="max-width: 600px">
      <div class="row items-center q-gutter-sm">
        <q-icon name="account_circle" size="32px" color="primary" />
        <div class="text-h5 text-bold text-dark">
          {{ t('profilePage.hello') }}, {{ userName }}
        </div>
      </div>

      <q-btn :label="t('profilePage.logoutBtn')" icon="logout" color="primary" size="sm" @click="logout" />
    </div>

    <!-- Email в рамке с иконкой -->
    <q-card flat bordered class="q-pa-sm text-body1 q-mb-md" style="max-width: 400px">
      <div class="row items-center q-gutter-sm">
        <q-icon name="email" size="20px" color="grey-8" />
        <div>
          {{ t('profilePage.yourEmail') }}:
          <strong>{{ userEmail }}</strong>
        </div>
      </div>
    </q-card>

    <!-- Список избранных товаров -->
    <div class="q-mt-xl">
      <div class="text-h6 text-bold q-mb-sm">
        {{ t('profilePage.wishlistTitle') }}
      </div>

      <!-- Если вишлист пуст -->
      <div v-if="!wishlistProducts.length" class="text-grey-7 q-mt-sm">
        {{ t('profilePage.wishlistEmpty') }}
      </div>

      <!-- Список товаров -->
      <q-list v-else bordered separator>
        <q-item v-for="product in wishlistProducts" :key="product.id" clickable v-ripple>
          <q-item-section avatar @click="goToProduct(product.id)">
            <q-img :src="product.thumbnail || product.images?.[0]?.url" style="width: 64px; height: 64px" />
          </q-item-section>

          <q-item-section @click="goToProduct(product.id)">
            <div class="text-subtitle1 text-primary">{{ product.title }}</div>
            <div class="text-body2">{{ product.price }} ₴</div>
          </q-item-section>

          <q-item-section side class="row items-center q-gutter-sm">
            <!-- Кнопка добавления в корзину -->
            <q-btn :icon="isInCart(product.id) ? 'shopping_cart' : 'add_shopping_cart'"
              :color="isInCart(product.id) ? 'positive' : 'primary'" flat round
              @click.stop="handleCartAction(product)" />

            <!-- Кнопка удаления -->
            <q-btn flat round color="red" icon="delete" @click.stop="removeFromWishlist(product.id)" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCartStore } from 'src/stores/cartStore'

// Поля для имени и email
const userName = ref('')
const userEmail = ref('')

// Роутер для перенаправления
const router = useRouter()

// Получаем функцию перевода t(...)
const { t } = useI18n()

const userId = ref(null)
const wishlistProducts = ref([])
const cartStore = useCartStore()

onMounted(() => {
  loadProfile()
})

async function loadProfile() {
  const token = localStorage.getItem('api_token')
  if (!token) {
    router.push('/auth/login')
    return
  }

  try {
    const response = await axios.get('http://127.0.0.1:8000/api/me', {
      headers: { Authorization: 'Bearer ' + token }
    })

    userName.value = response.data.name
    userEmail.value = response.data.email
    userId.value = response.data.id

    const wishlistRes = await axios.get(`http://127.0.0.1:8000/api/wishlist?user_id=${response.data.id}`)
    wishlistProducts.value = wishlistRes.data

  } catch (error) {
    console.error('Error fetching profile:', error.response?.data || error)
    if (error.response?.status === 401) {
      localStorage.removeItem('api_token')
      router.push('/auth/login')
    }
  }
}

function logout() {
  const token = localStorage.getItem('api_token')
  if (!token) {
    router.push('/auth/login')
    return
  }

  axios.post('http://127.0.0.1:8000/api/logout', null, {
    headers: { 'Authorization': 'Bearer ' + token }
  })
    .then(response => {
      console.log('Logout success:', response.data)
      localStorage.removeItem('api_token')
      router.push('/auth/login')
    })
    .catch(error => {
      console.error('Logout error:', error.response?.data || error)
    })
}

function goToProduct(id) {
  router.push(`/products/${id}`)
}

function isInCart(productId) {
  return cartStore.items.some(item => item.id === productId)
}

function handleCartAction(product) {
  if (isInCart(product.id)) {
    router.push('/cart')
  } else {
    cartStore.addToCart(product)
  }
}

async function removeFromWishlist(productId) {
  try {
    await axios.post('http://127.0.0.1:8000/api/wishlist/remove', {
      user_id: userId.value,
      product_id: productId
    })

    wishlistProducts.value = wishlistProducts.value.filter(p => p.id !== productId)
  } catch (e) {
    console.error('Ошибка при удалении из Wishlist:', e)
  }
}
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style>
