<template>
  <q-page padding class="flex flex-center">
    <div class="q-pa-md text-center">
      <!-- Заголовок (с <br />), используем v-html для HTML-разметки -->
      <h1 v-html="t('about.heading')"></h1>

      <!-- Параграфы -->
      <p>{{ t('about.description1') }}</p>
      <p>{{ t('about.description2') }}</p>
      <p>{{ t('about.description3') }}</p>
    </div>
  </q-page>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

// В Composition API подключаем i18n
const { t } = useI18n()
</script>
