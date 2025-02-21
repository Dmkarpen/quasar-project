<template>
  <!-- Основной контейнер страницы "Login" с отступами, центровкой содержимого по вертикали и горизонтали,
       а также с минимальной высотой, рассчитанной как 100vh минус 112px (учитывая высоту header и tabs) -->
  <q-page padding class="flex flex-center" style="min-height: calc(100vh - 112px)">
    <!-- Внутренний блок с отступами и центрированием текста; ограничен максимальной шириной 400px -->
    <div class="q-pa-md text-center" style="max-width: 400px; width: 100%">
      <!-- Заголовок страницы "Login" -->
      <h1>Login</h1>

      <!-- Форма логина: при отправке предотвращается стандартное поведение и вызывается функция onSubmit -->
      <q-form @submit.prevent="onSubmit">
        <!-- Поле ввода для Email, с заполненным стилем (filled) и возможностью очистки (clearable) -->
        <q-input filled v-model="email" type="email" label="Email" clearable />
        <!-- Поле ввода для Password, с заполненным стилем, возможностью очистки и отступом сверху (q-mt-md) -->
        <q-input
          filled
          v-model="password"
          type="password"
          label="Password"
          clearable
          class="q-mt-md"
        />
        <!-- Кнопка отправки формы с надписью "Login", цветом primary и отступом сверху -->
        <q-btn label="Login" type="submit" color="primary" class="q-mt-md" />
      </q-form>

      <!-- Блок со ссылкой для перехода на страницу регистрации -->
      <div class="q-mt-md">
        <router-link to="/auth/register"> Don't have an account? Register </router-link>
      </div>
    </div>
  </q-page>
</template>

<script setup>
// Импортируем ref из Vue для создания реактивных переменных
import { ref } from 'vue'

// Создаем реактивные переменные для хранения значений полей email и password
const email = ref('')
const password = ref('')

// Функция для обработки отправки формы (логин)
// При вызове выводит в консоль введенные данные (email и password)
function onSubmit() {
  console.log('Login attempt:', email.value, password.value)
}
</script>
