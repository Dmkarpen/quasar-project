<template>
  <!-- Основной контейнер, который занимает весь экран (fullscreen) -->
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <!-- Крупный текст "404" -->
      <div style="font-size: 20vh; line-height: 1">404</div>

      <!-- Сообщение об ошибке (перевод) -->
      <div class="text-h2" style="opacity: 0.4">
        {{ t('errorNotFound.message') }}
      </div>

      <!-- Кнопка "Go Home" (перевод) -->
      <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/" :label="t('errorNotFound.goHome')"
        no-caps />
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

// Получаем функцию перевода t(...)
const { t } = useI18n()
</script>

<style scoped>
/* Стили остаются без изменений */
</style>
