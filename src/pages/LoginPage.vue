<template>
  <q-page padding class="flex flex-center" style="min-height: calc(100vh - 112px)">
    <div class="q-pa-md text-center" style="max-width: 400px; width: 100%">
      <h1>Login</h1>

      <!-- Форма логина -->
      <q-form @submit.prevent="onSubmit">
        <q-input filled v-model="email" type="email" label="Email" clearable />
        <q-input filled v-model="password" type="password" label="Password" clearable class="q-mt-md" />
        <q-btn label="Login" type="submit" color="primary" class="q-mt-md" />
      </q-form>

      <div class="q-mt-md">
        <router-link to="/auth/register"> Don't have an account? Register </router-link>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

// Получаем роутер, чтобы затем вызывать router.push()
const router = useRouter()

// Поля для email и password
const email = ref('')
const password = ref('')

// При сабмите отправляем POST /api/login
function onSubmit() {
  axios.post('http://127.0.0.1:8000/api/login', {
    email: email.value,
    password: password.value
  })
    .then(response => {
      console.log('Login success:', response.data)

      // Сохраняем токен, который вернул сервер
      if (response.data.token) {
        localStorage.setItem('api_token', response.data.token)
      }

      // Переходим на страницу профиля
      router.push('/profile')
    })
    .catch(error => {
      console.error('Login error:', error.response?.data || error)
      // Можно вывести сообщение об ошибке, если нужно
    })
}
</script>
