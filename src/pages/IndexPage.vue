<template>
  <!-- Основной контейнер страницы -->
  <q-page padding class="flex flex-center">
    <div class="q-pa-md text-center" style="max-width: 600px; width: 100%">
      <!-- Заголовок -->
      <h1 class="text-center">{{ t('index.heading') }}</h1>

      <!-- Карусель баннеров -->
      <q-carousel v-model="slide" swipeable animated navigation arrows control-color="white" height="300px"
        class="q-mb-md">
        <q-carousel-slide v-for="(banner, index) in banners" :key="index" :name="index" :img-src="banner" />
      </q-carousel>

      <!-- Описание -->
      <p>{{ t('index.description') }}</p>

      <!-- Кнопка "View Products" -->
      <q-btn :label="t('index.viewProducts')" color="primary" @click="$router.push('/products')" />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
// Подключаем useI18n из vue-i18n
import { useI18n } from 'vue-i18n'

// Импорт изображений
import banner1 from 'src/assets/banner1.jpg'
import banner2 from 'src/assets/banner2.jpg'
import banner3 from 'src/assets/banner3.jpg'

// Массив баннеров
const banners = ref([banner1, banner2, banner3])
// Текущий слайд
const slide = ref(0)

// Получаем функцию перевода
const { t } = useI18n()
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style>
