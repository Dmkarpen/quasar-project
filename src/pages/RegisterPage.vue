<template>
  <q-page padding class="flex flex-center" style="min-height: calc(100vh - 112px)">
    <div class="q-pa-md text-center" style="max-width: 400px; width: 100%">
      <h1>Register</h1>

      <!-- Форма регистрации -->
      <q-form @submit.prevent="onSubmit">
        <q-input filled v-model="name" label="Name" clearable />
        <q-input filled v-model="email" type="email" label="Email" clearable class="q-mt-md" />
        <q-input filled v-model="password" type="password" label="Password" clearable class="q-mt-md" />
        <q-input filled v-model="confirmPassword" type="password" label="Confirm Password" clearable class="q-mt-md" />
        <q-btn label="Register" type="submit" color="primary" class="q-mt-md" />
      </q-form>

      <div class="q-mt-md">
        <router-link to="/auth/login"> Already have an account? Login </router-link>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

// Поля формы
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

// Получаем роутер, чтобы потом делать router.push('/profile')
const router = useRouter()

// При сабмите отправляем POST /api/register
function onSubmit() {
  axios.post('http://127.0.0.1:8000/api/register', {
    name: name.value,
    email: email.value,
    password: password.value,
    password_confirmation: confirmPassword.value
  })
    .then(response => {
      console.log('Registration success:', response.data)
      // Допустим, сервер возвращает response.data.token
      // Сохраняем токен в localStorage
      if (response.data.token) {
        localStorage.setItem('api_token', response.data.token)
      }
      // Перенаправляем на /profile
      router.push('/profile')
    })
    .catch(error => {
      console.error('Registration error:', error.response?.data || error)
    })
}
</script>
