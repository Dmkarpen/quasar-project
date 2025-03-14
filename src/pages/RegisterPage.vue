<template>
  <q-page padding style="min-height: calc(100vh - 112px)">
    <div class="q-pa-md text-center" style="max-width: 400px; width: 100%">
      <h1>Register</h1>

      <!-- Форма регистрации -->
      <q-form @submit.prevent="onSubmit">
        <q-input filled v-model="name" label="Name" clearable />
        <q-input
          filled
          v-model="email"
          type="email"
          label="Email"
          clearable
          class="q-mt-md"
        />
        <q-input
          filled
          v-model="password"
          type="password"
          label="Password"
          clearable
          class="q-mt-md"
        />
        <q-input
          filled
          v-model="confirmPassword"
          type="password"
          label="Confirm Password"
          clearable
          class="q-mt-md"
        />
        <q-btn label="Register" type="submit" color="primary" class="q-mt-md" />
      </q-form>

      <!-- Блок для вывода ошибок -->
      <div v-if="errorMessages.length" class="error-box q-mt-md bigger-alert">
        <ul>
          <li v-for="(msg, i) in errorMessages" :key="i">{{ msg }}</li>
        </ul>
      </div>

      <div class="q-mt-md">
        <router-link to="/auth/login">Already have an account? Login</router-link>
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

// Массив для хранения сообщений об ошибках
const errorMessages = ref([])

// Роутер
const router = useRouter()

function onSubmit() {
  // Сбрасываем старые ошибки
  errorMessages.value = []

  axios.post('http://127.0.0.1:8000/api/register', {
    name: name.value,
    email: email.value,
    password: password.value,
    password_confirmation: confirmPassword.value
  })
  .then(response => {
    console.log('Registration success:', response.data)
    // Предположим, сервер возвращает JSON вида:
    // {
    //   "message": "User registered successfully",
    //   "user": { ... },
    //   "token": "<plainTextToken>"
    //   // мы не возвращаем expires_at на фронт
    // }

    if (response.data.token) {
      // Сохраняем только токен (Bearer) в localStorage
      localStorage.setItem('api_token', response.data.token)
    }

    // Переходим, например, на страницу профиля
    router.push('/profile')
  })
  .catch(error => {
    console.error('Registration error:', error.response?.data || error)

    if (error.response?.status === 422) {
      // Laravel валидация
      const allErrors = error.response.data.errors || {}
      let combined = []
      for (const field in allErrors) {
        combined = combined.concat(allErrors[field])
      }
      errorMessages.value = combined
    } else if (error.response?.status === 401) {
      errorMessages.value = ['You are not authorized to register.']
    } else {
      errorMessages.value = ['Something went wrong. Please try again.']
    }
  })
}
</script>

<style scoped>
.bigger-alert {
  font-size: 1.2rem;
}

.error-box {
  color: red;
  background-color: #ffe5e5;
  border: 1px solid red;
  border-radius: 4px;
  padding: 0.5rem;
}
</style>
