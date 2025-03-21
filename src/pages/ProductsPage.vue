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
      <q-item v-for="product in filteredProducts" :key="product.id" clickable v-ripple @click="goToProduct(product.id)">
        <q-item-section avatar>
          <q-img :src="product.thumbnail" :alt="product.title" style="width: 80px; height: 80px" />
        </q-item-section>

        <q-item-section>
          <div class="text-h6">{{ product.title }}</div>
          <div class="text-subtitle2 text-primary">$ {{ product.price }}</div>
          <div class="text-body2 q-mt-xs">{{ product.description }}</div>
          <!-- Кнопка "Add to Cart" (перевод) -->
          <q-btn :label="t('productsPage.addToCart')" color="primary" size="sm" class="q-mt-sm"
            @click.stop="addToCart(product)" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { useCartStore } from 'src/stores/cartStore'

// Подключаем useI18n
import { useI18n } from 'vue-i18n'

// Получаем функцию перевода t()
const { t } = useI18n()

const products = ref([])
const searchQuery = ref('')
const categoryFilter = ref('all')

const router = useRouter()
const cartStore = useCartStore()

function goToProduct(productId) {
  router.push(`/products/${productId}`)
}

function addToCart(product) {
  cartStore.addToCart(product)
}

// Загружаем список продуктов
api('http://3123379.ki574762.web.hosting-test.net/api/products')
  .then(({ data }) => {
    products.value = data
  })
  .catch((error) => {
    console.error('Ошибка при загрузке продуктов:', error)
  })

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
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style>
