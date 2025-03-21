<template>
  <!-- Основной контейнер страницы "Contact Us" с отступами и центрированием содержимого -->
  <q-page padding class="flex flex-center">
    <!-- Внутренний контейнер с фиксированной максимальной шириной и центрированным содержимым -->
    <div class="q-pa-md" style="max-width: 600px; width: 100%">
      <!-- Заголовок страницы, переводим "Contact Us" -->
      <h1 class="text-center">{{ t('contact.heading') }}</h1>

      <!-- Форма обратной связи -->
      <q-form @submit.prevent="onSubmit" class="q-gutter-md">
        <!-- Поле ввода для имени -->
        <q-input v-model="name" filled :label="t('contact.name')" required />

        <!-- Поле ввода для email -->
        <q-input v-model="email" filled type="email" :label="t('contact.email')" required />

        <!-- Поле ввода для темы сообщения -->
        <q-input v-model="subject" filled :label="t('contact.subject')" required />

        <!-- Поле ввода для самого сообщения -->
        <q-input v-model="message" filled type="textarea" :label="t('contact.message')" required autogrow :min-rows="5"
          class="my-textarea" />

        <!-- Кнопка отправки -->
        <div class="flex justify-center">
          <q-btn :label="t('contact.send')" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
// Импортируем useI18n
import { useI18n } from 'vue-i18n'

// Получаем функцию перевода t(...)
const { t } = useI18n()

// Реактивные переменные для хранения данных формы
const name = ref('')
const email = ref('')
const subject = ref('')
const message = ref('')

// Функция-обработчик отправки формы
function onSubmit() {
  console.log('Feedback message:', {
    name: name.value,
    email: email.value,
    subject: subject.value,
    message: message.value
  })

  // Очистка формы
  name.value = ''
  email.value = ''
  subject.value = ''
  message.value = ''
}
</script>

<style scoped>
/* Переопределение минимальной высоты для текстового поля "Message" */
::v-deep .my-textarea .q-field__native {
  min-height: 150px;
}
</style>
