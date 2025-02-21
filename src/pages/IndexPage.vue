<template>
  <!-- Основной контейнер страницы с отступами и центровкой содержимого -->
  <q-page padding class="flex flex-center">
    <!-- Внутренний блок для контента страницы с ограниченной шириной и выравниванием по центру -->
    <div class="q-pa-md text-center" style="max-width: 600px; width: 100%">
      <!-- Заголовок главной страницы -->
      <h1 class="text-center">Welcome to My Shop!</h1>

      <!-- Карусель баннеров с добавленными стрелками для навигации -->
      <q-carousel
        v-model="slide"
        swipeable
        animated
        navigation
        arrows
        control-color="white"
        height="300px"
        class="q-mb-md"
      >
        <!-- Перебор массива баннеров. Каждый баннер отображается с помощью q-carousel-slide -->
        <q-carousel-slide
          v-for="(banner, index) in banners"
          :key="index"
          :name="index"
          :img-src="banner"
        />
      </q-carousel>

      <!-- Остальной контент страницы (например, описание, кнопка "View Products" и т.д.) -->
      <p>We are glad to have you here. Discover high-quality products at the best prices.</p>
      <q-btn label="View Products" color="primary" @click="$router.push('/products')" />
    </div>
  </q-page>
</template>

<script setup>
// Импортируем ref для создания реактивных переменных
import { ref } from 'vue'

// Импорт изображений баннеров из папки src/assets
import banner1 from 'src/assets/banner1.jpg'
import banner2 from 'src/assets/banner2.jpg'
import banner3 from 'src/assets/banner3.jpg'

// Массив баннеров с импортированными изображениями
const banners = ref([banner1, banner2, banner3])

// Реактивная переменная для хранения номера текущего слайда
const slide = ref(0)
</script>

<style scoped>
/* Здесь можно добавить дополнительные стили для баннеров, если необходимо */
</style>
