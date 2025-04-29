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
        <q-card-actions align="center" class="q-mt-xs q-mb-xs">
          <q-btn :label="isInCart(product) ? t('productPage.inCart') : t('productPage.addToCart')"
            :color="isInCart(product) ? 'positive' : 'primary'" icon="add_shopping_cart" @click="handleCartClick"
            style="min-width: 220px" />

          <q-btn v-if="userId" flat round size="lg" :icon="isInWishlist(product.id) ? 'favorite' : 'favorite_border'"
            :color="isInWishlist(product.id) ? 'red' : 'grey-7'" @click="toggleWishlist(product.id)" class="q-ml-sm" />
        </q-card-actions>

        <!-- Кнопка "Назад к товарам" -->
        <q-card-actions align="center" class="q-mt-xs q-mb-xs">
          <q-btn color="secondary" flat icon="arrow_back" :label="t('productPage.backToList')" @click="goBack" />
        </q-card-actions>
      </q-card>
    </div>

    <!-- Відгуки -->
    <q-card class="q-mt-xs q-pa-md">
      <!-- Заголовок -->
      <div class="text-h6 q-mb-md">{{ t('productPage.reviewsTitle') }}</div>

      <!-- 🟡 Середня оцінка -->
      <div v-if="reviews.length" class="q-mb-md">
        <q-icon name="star" color="amber" size="24px" />
        <span class="text-subtitle2">
          {{ t('productPage.averageRating') }}: {{ averageRating.toFixed(1) }} / 5
          ({{ reviews.length }})
        </span>
      </div>

      <!-- 📃 Список відгуків -->
      <div v-if="reviews.length">
        <q-list bordered separator>
          <q-item v-for="review in reviews" :key="review.id">
            <q-item-section>
              <q-rating readonly size="20px" :model-value="review.rating" color="amber" />
              <div class="text-body2 q-mt-xs">{{ review.comment }}</div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div v-else class="text-grey-7">
        {{ t('productPage.noReviews') }}
      </div>

      <!-- ✍️ Додавання відгуку -->
      <div v-if="userId" class="q-mt-xl">
        <!-- Якщо вже залишено відгук -->
        <q-card v-if="myReview && !editingReview" flat bordered class="q-pa-md q-mb-md">
          <div class="text-subtitle2 q-mb-sm">
            {{ t('productPage.alreadyReviewed') }}
          </div>
          <q-btn color="primary" @click="startEditing" icon="edit">
            {{ t('productPage.editReview') }}
          </q-btn>
        </q-card>

        <!-- Форма: лише якщо ще не залишено або йде редагування -->
        <div v-if="!myReview || editingReview">
          <div class="text-subtitle2 q-mb-sm">{{ t('productPage.yourReview') }}</div>

          <q-rating v-model="reviewRating" max="5" color="amber" size="32px" class="q-mb-sm" />

          <q-input v-model="reviewComment" type="textarea" :placeholder="t('productPage.reviewPlaceholder')" autogrow />

          <q-btn class="q-mt-sm" color="primary" icon="send"
            :label="myReview ? t('productPage.updateReview') : t('productPage.submitReview')" @click="submitReview" />
        </div>
      </div>
    </q-card>

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

const reviews = ref([])
const reviewRating = ref(0)
const reviewComment = ref('')
const averageRating = ref(0)
const myReview = ref(null)
const editingReview = ref(false)

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

function startEditing() {
  if (myReview.value) {
    reviewRating.value = myReview.value.rating
    reviewComment.value = myReview.value.comment
    editingReview.value = true
  }
}

async function submitReview() {
  const token = localStorage.getItem('api_token')
  if (!token || !product.value?.id || !reviewRating.value) return

  try {
    await axios.post(
      'http://127.0.0.1:8000/api/reviews',
      {
        product_id: product.value.id,
        rating: reviewRating.value,
        comment: reviewComment.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    // Оновлюємо власний відгук одразу для відображення
    myReview.value = {
      rating: reviewRating.value,
      comment: reviewComment.value
    }

    editingReview.value = false

    // Перезавантажуємо всі відгуки
    const reviewsRes = await axios.get(`http://127.0.0.1:8000/api/reviews/${product.value.id}`)
    reviews.value = reviewsRes.data.reviews
    averageRating.value = reviewsRes.data.average_rating
  } catch (e) {
    console.error('Ошибка при отправке отзыва:', e)
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

    // 4. Завантажуємо відгуки (видимі для всіх)
    try {
      const reviewsRes = await axios.get(`http://127.0.0.1:8000/api/reviews/${id}`)
      reviews.value = reviewsRes.data.reviews
      averageRating.value = reviewsRes.data.average_rating

      if (userId.value) {
        myReview.value = reviews.value.find(r => r.user_id === userId.value) || null
      }
    } catch (e) {
      console.error('Помилка при завантаженні відгуків:', e)
    }

  } catch (error) {
    console.error('Помилка при завантаженні даних:', error)
  }
})

</script>

<style scoped></style>
