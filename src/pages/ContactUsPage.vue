<template>
  <!-- Основной контейнер страницы "Contact Us" с отступами и центрированием содержимого -->
  <q-page padding class="flex flex-center">
    <!-- Внутренний контейнер с фиксированной максимальной шириной и центрированным содержимым -->
    <div class="q-pa-md" style="max-width: 600px; width: 100%">
      <!-- Заголовок страницы "Contact Us", выровнен по центру -->
      <h1 class="text-center">Contact Us</h1>

      <!-- Форма обратной связи -->
      <q-form @submit.prevent="onSubmit" class="q-gutter-md">
        <!-- Поле ввода для имени пользователя (Name) -->
        <q-input v-model="name" filled label="Name" required />

        <!-- Поле ввода для email пользователя -->
        <q-input v-model="email" filled type="email" label="Email" required />

        <!-- Поле ввода для темы сообщения (Subject) -->
        <q-input v-model="subject" filled label="Subject" required />

        <!-- Поле ввода для самого сообщения (Message) -->
        <!-- Используется тип textarea с autogrow, минимальное число строк задается через :min-rows="5" -->
        <!-- Класс "my-textarea" используется для дополнительного переопределения стилей (см. секцию style) -->
        <q-input
          v-model="message"
          filled
          type="textarea"
          label="Message"
          required
          autogrow
          :min-rows="5"
          class="my-textarea"
        />

        <!-- Контейнер для кнопки отправки формы, выравненный по центру -->
        <div class="flex justify-center">
          <q-btn label="Send" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
// Импортируем ref из Vue для создания реактивных переменных
import { ref } from 'vue'

// Создаем реактивные переменные для хранения данных формы
const name = ref('')
const email = ref('')
const subject = ref('')
const message = ref('')

// Функция-обработчик отправки формы
// При вызове выводит данные в консоль и очищает поля формы
function onSubmit() {
  console.log('Feedback message:', {
    name: name.value,
    email: email.value,
    subject: subject.value,
    message: message.value,
  })
  // Очистка формы после отправки
  name.value = ''
  email.value = ''
  subject.value = ''
  message.value = ''
}
</script>

<style scoped>
/* Переопределение минимальной высоты для текстового поля "Message" */
/* Используем ::v-deep, чтобы изменить стили внутреннего элемента QInput, отвечающего за textarea */
::v-deep .my-textarea .q-field__native {
  min-height: 150px; /* Задаем необходимую минимальную высоту (150px, можно изменить по необходимости) */
}
</style>
