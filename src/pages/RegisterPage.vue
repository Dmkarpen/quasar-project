<template>
  <!-- Основной контейнер страницы "Register": 
       - q-page с отступами (padding) 
       - flex flex-center центрирует содержимое по вертикали и горизонтали
       - min-height: calc(100vh - 112px) обеспечивает минимальную высоту, учитывая высоту header и tabs -->
  <q-page padding class="flex flex-center" style="min-height: calc(100vh - 112px)">
    <!-- Внутренний блок для формы регистрации с отступами и ограничением максимальной ширины -->
    <div class="q-pa-md text-center" style="max-width: 400px; width: 100%">
      <!-- Заголовок страницы "Register" -->
      <h1>Register</h1>

      <!-- Форма регистрации, которая предотвращает стандартное поведение отправки (prevent) и вызывает onSubmit -->
      <q-form @submit.prevent="onSubmit">
        <!-- Поле ввода для имени пользователя -->
        <q-input filled v-model="name" label="Name" clearable />

        <!-- Поле ввода для email -->
        <q-input filled v-model="email" type="email" label="Email" clearable class="q-mt-md" />

        <!-- Поле ввода для пароля -->
        <q-input
          filled
          v-model="password"
          type="password"
          label="Password"
          clearable
          class="q-mt-md"
        />

        <!-- Поле ввода для подтверждения пароля -->
        <q-input
          filled
          v-model="confirmPassword"
          type="password"
          label="Confirm Password"
          clearable
          class="q-mt-md"
        />

        <!-- Кнопка отправки формы "Register" с отступом сверху -->
        <q-btn label="Register" type="submit" color="primary" class="q-mt-md" />
      </q-form>

      <!-- Ссылка для перехода на страницу логина, если у пользователя уже есть аккаунт -->
      <div class="q-mt-md">
        <router-link to="/auth/login"> Already have an account? Login </router-link>
      </div>
    </div>
  </q-page>
</template>

<script setup>
// Импортируем ref из Vue для создания реактивных переменных
import { ref } from 'vue'

// Создаем реактивные переменные для хранения значений полей формы регистрации
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

// Функция обработки отправки формы регистрации
// При вызове выводит в консоль введенные значения (это можно заменить вызовом API)
function onSubmit() {
  console.log(
    'Registration attempt:',
    name.value,
    email.value,
    password.value,
    confirmPassword.value,
  )
}
</script>
