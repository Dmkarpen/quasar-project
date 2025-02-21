<template>
  <q-page padding>
    <!-- Заголовок страницы "Products" по центру -->
    <div class="q-pa-md text-center">
      <h1>Products</h1>
    </div>

    <!-- Блок поиска и фильтрации -->
    <div class="q-pa-md">
      <!-- Заголовок для блока поиска и фильтрации -->
      <div class="text-h6 q-mb-xs">Search & Filter</div>

      <!-- Поле поиска: пользователю доступен ввод поискового запроса -->
      <q-input
        v-model="searchQuery"
        filled
        placeholder="Search products..."
        clearable
        class="q-mb-md"
      >
        <!-- Иконка поиска, отображается справа внутри поля ввода -->
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <!-- Селектор фильтрации по категориям -->
      <q-select
        v-model="categoryFilter"
        :options="categoryOptions"
        option-value="value"
        option-label="label"
        emit-value
        map-options
        filled
        clearable
        placeholder="All categories"
        class="q-mb-md"
      />
    </div>

    <!-- Заголовок для списка товаров (можно оставить, если нужен) -->
    <div class="q-pa-md">
      <div class="text-h6 q-mb-xs">All products:</div>
    </div>

    <!-- Список продуктов -->
    <q-list bordered separator>
      <!-- Перебор всех отфильтрованных продуктов -->
      <q-item
        v-for="product in filteredProducts"
        :key="product.id"
        clickable
        v-ripple
        @click="goToProduct(product.id)"
      >
        <!-- Блок с изображением продукта -->
        <q-item-section avatar>
          <q-img :src="product.thumbnail" :alt="product.title" style="width: 80px; height: 80px" />
        </q-item-section>

        <!-- Блок с информацией о продукте -->
        <q-item-section>
          <!-- Название продукта -->
          <div class="text-h6">{{ product.title }}</div>
          <!-- Цена продукта (отображается с классом text-primary для яркости) -->
          <div class="text-subtitle2 text-primary">$ {{ product.price }}</div>
          <!-- Описание продукта -->
          <div class="text-body2 q-mt-xs">{{ product.description }}</div>
          <!-- Кнопка "Add to Cart": добавляет товар в корзину, клики не всплывают -->
          <q-btn
            label="Add to Cart"
            color="primary"
            size="sm"
            class="q-mt-sm"
            @click.stop="addToCart(product)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
// Импортируем необходимые функции из Vue
import { ref, computed } from 'vue'
// Импортируем настроенный axios из boot/axios для выполнения запросов
import { api } from 'boot/axios'
// Импортируем useRouter для навигации между страницами
import { useRouter } from 'vue-router'
// Импортируем глобальный магазин корзины для управления товарами в корзине
import { useCartStore } from 'src/stores/cartStore'

// Референс для хранения списка продуктов, полученных с сервера
const products = ref([])
// Референс для хранения поискового запроса
const searchQuery = ref('')
// Референс для хранения выбранной категории (по умолчанию 'all')
const categoryFilter = ref('all')

// Инициализируем роутер для переходов между страницами
const router = useRouter()
// Инициализируем глобальное хранилище для корзины
const cartStore = useCartStore()

// Функция для перехода на страницу с деталями продукта по его ID
function goToProduct(productId) {
  router.push(`/products/${productId}`)
}

// Функция для добавления продукта в корзину
function addToCart(product) {
  cartStore.addToCart(product)
  // Можно добавить уведомление о том, что товар добавлен в корзину
}

// Выполняем API-запрос к DummyJSON для загрузки списка продуктов
api('http://127.0.0.1:8000/api/products')
  .then(({ data }) => {
    products.value = data
  })
  .catch((error) => {
    console.error('Ошибка при загрузке продуктов:', error)
  })

// Вычисляем список уникальных категорий на основе загруженных продуктов
const categoryOptions = computed(() => {
  const cats = new Set()
  products.value.forEach((product) => {
    if (product.category) {
      cats.add(product.category)
    }
  })
  // Преобразуем Set в массив объектов, подходящих для q-select
  const options = Array.from(cats).map((cat) => ({ label: cat, value: cat }))
  // Добавляем опцию по умолчанию "All categories"
  options.unshift({ label: 'All categories', value: 'all' })
  return options
})

// Вычисляем список продуктов, отфильтрованных по поисковому запросу и выбранной категории
const filteredProducts = computed(() => {
  let filtered = products.value

  // Если введен поисковый запрос, фильтруем продукты по названию (без учета регистра)
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter((product) => product.title.toLowerCase().includes(query))
  }
  // Если выбрана конкретная категория (не 'all'), фильтруем продукты по категории
  if (categoryFilter.value && categoryFilter.value !== 'all') {
    const selectedCat = categoryFilter.value.toLowerCase()
    filtered = filtered.filter((product) => product.category.toLowerCase() === selectedCat)
  }
  return filtered
})
</script>

<style scoped>
/* При необходимости можно добавить дополнительные стили для заголовков или других элементов */
</style>
