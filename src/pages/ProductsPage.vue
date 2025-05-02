<template>
  <q-page padding>
    <!-- Заголовок страницы (перевод) -->
    <div class="q-pa-md text-center">
      <h1>{{ t('productsPage.heading') }}</h1>
    </div>

    <!-- Блок поиска и фильтрации -->
    <div class="q-pa-md">
      <!-- Заголовок для блока поиска и фильтрации (перевод) -->
      <div class="text-h6 q-mb-xs">{{ t('productsPage.searchFilter') }}</div>

      <!-- Поле поиска: placeholder берём из i18n -->
      <q-input v-model="searchQuery" filled :placeholder="t('productsPage.searchPlaceholder')" clearable
        class="q-mb-md">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <!-- Селектор категорий: placeholder тоже берём из i18n -->
      <q-select v-model="categoryFilter" :options="categoryOptions" option-value="value" option-label="label" emit-value
        map-options filled clearable :placeholder="t('productsPage.allCategories')" class="q-mb-md" />
    </div>

    <!-- Заголовок для списка товаров (перевод) -->
    <div class="q-pa-md">
      <div class="text-h6 q-mb-xs">{{ t('productsPage.allProducts') }}</div>
    </div>

    <!-- Список продуктов -->
    <q-list bordered separator>
      <q-item v-for="product in paginatedProducts" :key="product.id" clickable v-ripple
        @click="goToProduct(product.id)">
        <q-item-section avatar>
          <q-img :src="product.thumbnail" :alt="product.title" style="width: 80px; height: 80px" />
        </q-item-section>

        <q-item-section>
          <div class="text-h6">{{ product.title }}</div>
          <div class="text-subtitle2 text-primary">$ {{ product.price }}</div>
          <div class="text-body2 q-mt-xs">{{ product.description }}</div>
          <div class="q-mt-xs">
            <div v-if="product.reviews_count && product.reviews_count > 0" class="flex items-center gap-1">
              <q-rating :model-value="Number(product.reviews_avg_rating)" max="5" size="20px" color="deep-orange"
                color-inactive="deep-orange" icon="star_border" icon-selected="star" icon-half="star_half"
                :no-dimming="true" />
              <span class="text-body1">({{ product.reviews_count }} {{ t('productPage.reviews') }})</span>
            </div>
            <div v-else class="text-caption text-grey">
              {{ t('productPage.noReviews') }}
            </div>
          </div>
          <div class="row q-mt-sm">
            <!-- Кнопка корзины — занимает всё доступное пространство -->
            <q-btn :label="isInCart(product) ? t('productsPage.inCart') : t('productsPage.addToCart')"
              :color="isInCart(product) ? 'positive' : 'primary'" icon="add_shopping_cart"
              @click.stop="handleCartClick(product)" class="col" />

            <!-- Кнопка вишлиста справа -->
            <q-btn v-if="userId" flat round size="md" :icon="isInWishlist(product.id) ? 'favorite' : 'favorite_border'"
              :color="isInWishlist(product.id) ? 'red' : 'grey-7'" @click.stop="toggleWishlist(product.id)"
              class="q-ml-sm" />
          </div>
        </q-item-section>
      </q-item>
    </q-list>

    <div class="q-mt-md flex flex-center">
      <q-pagination v-model="currentPage" :max="totalPages" max-pages="5" boundary-numbers color="primary" size="md"
        direction-links boundary-links icon-prev="chevron_left" icon-next="chevron_right" icon-first="first_page"
        icon-last="last_page" />
    </div>

    <!-- Карусель переглянутих товарів -->
    <q-card class="q-mt-xl q-pa-md" v-if="viewedProducts.length">
      <div class="text-h6 q-mb-md">{{ t('productsPage.recentlyViewed') }}</div>

      <q-carousel v-model="carouselIndex" padding height="200px" arrows navigation-color="primary"
        control-color="primary">
        <q-carousel-slide v-for="(product, i) in viewedProducts" :key="product.id" :name="i">
          <div class="row justify-center items-center q-gutter-md">
            <q-img :src="product.images?.[0]?.url" :alt="product.title" style="width: 120px; height: 120px"
              @click="goToProduct(product.id)" class="cursor-pointer" />
            <div>
              <div class="text-subtitle2">{{ product.title }}</div>
              <div class="text-body2 text-primary">{{ product.price }} ₴</div>
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { useCartStore } from 'src/stores/cartStore'
import { watch } from 'vue'
import { onMounted } from 'vue'
import axios from 'axios'

// Подключаем useI18n
import { useI18n } from 'vue-i18n'

// Получаем функцию перевода t()
const { t } = useI18n()

const products = ref([])
const searchQuery = ref('')
const categoryFilter = ref('all')

const router = useRouter()
const cartStore = useCartStore()

const currentPage = ref(1)
const itemsPerPage = 10

const userId = ref(null)
const wishlist = ref([])
const viewedProducts = ref([])
const carouselIndex = ref(0)

function goToProduct(productId) {
  router.push(`/products/${productId}`)
}

function isInCart(product) {
  return cartStore.items.some(item => item.id === product.id)
}

function handleCartClick(product) {
  if (isInCart(product)) {
    router.push('/cart')
  } else {
    cartStore.addToCart(product)
  }
}

function isInWishlist(productId) {
  return wishlist.value.includes(productId)
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

// Загружаем список продуктов
// api('http://3123379.ki574762.web.hosting-test.net/api/products')
//   .then(({ data }) => {
//     products.value = data
//     console.log('products:', products.value)
//   })
//   .catch((error) => {
//     console.error('Ошибка при загрузке продуктов:', error)
//   })

// Определяем категории
const categoryOptions = computed(() => {
  const cats = new Set()
  products.value.forEach((p) => {
    if (p.category) cats.add(p.category)
  })
  const options = Array.from(cats).map((cat) => ({ label: cat, value: cat }))
  // Добавляем опцию "All categories"
  options.unshift({ label: t('productsPage.allCategories'), value: 'all' })
  return options
})

// Фильтрация продуктов
const filteredProducts = computed(() => {
  let filtered = products.value
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p => p.title.toLowerCase().includes(q))
  }
  if (categoryFilter.value && categoryFilter.value !== 'all') {
    const cat = categoryFilter.value.toLowerCase()
    filtered = filtered.filter(p => p.category.toLowerCase() === cat)
  }
  return filtered
})

// Після фільтрації — нарізаємо на сторінки
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProducts.value.slice(start, end)
})

// Для підрахунку загальної кількості сторінок
const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage)
})

watch(currentPage, () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // або 'auto' для миттєвого переходу
  })
})

// Завантажуємо переглянуті товари для залогіненого користувача
onMounted(async () => {
  const token = localStorage.getItem('api_token')

  try {
    const { data: userData } = await axios.get('http://127.0.0.1:8000/api/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    userId.value = userData?.id

    if (userId.value) {
      const { data: viewed } = await axios.get(`http://127.0.0.1:8000/api/products-viewed?user_id=${userId.value}`)
      viewedProducts.value = viewed

      const { data: wish } = await axios.get(`http://127.0.0.1:8000/api/wishlist?user_id=${userId.value}`)
      wishlist.value = wish.map(p => p.id)
    }

    // 🔥 Вот это добавь:
    const { data: productList } = await axios.get('http://127.0.0.1:8000/api/products')
    products.value = productList

    // console.log('products:', products.value)

  } catch (err) {
    console.error('Не вдалося завантажити дані користувача або переглянуті товари:', err)
  }
})
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style>
