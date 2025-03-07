<template>
  <q-page padding style="min-height: calc(100vh - 112px)">
    <div class="q-pa-md text-center" style="max-width: 400px; width: 100%">
      <h1>Login</h1>

      <!-- Форма логина -->
      <q-form @submit.prevent="onSubmit">
        <q-input filled v-model="email" type="email" label="Email" clearable />
        <q-input
          filled
          v-model="password"
          type="password"
          label="Password"
          clearable
          class="q-mt-md"
        />
        <q-btn label="Login" type="submit" color="primary" class="q-mt-md" />
      </q-form>

      <!-- Ошибка в обычном div -->
      <div v-if="errorMessage" class="error-box q-mt-md bigger-alert">
        {{ errorMessage }}
      </div>

      <div class="q-mt-md">
        <router-link to="/auth/register">Don't have an account? Register</router-link>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

// Роутер
const router = useRouter()

// Поля формы
const email = ref('')
const password = ref('')

// Переменная для хранения текста ошибки
const errorMessage = ref('')

// При сабмите
function onSubmit() {
  errorMessage.value = '' // сбрасываем ошибку

  axios.post('http://127.0.0.1:8000/api/login', {
    email: email.value,
    password: password.value
  })
  .then(response => {
    if (response.data.token) {
      localStorage.setItem('api_token', response.data.token)
    }
    router.push('/profile')
  })
  .catch(error => {
    if (error.response?.status === 422 || error.response?.status === 401) {
      errorMessage.value = 'Invalid credentials. Please check your Email/Password.'
    } else {
      errorMessage.value = 'Something went wrong. Please try again.'
    }
  })
}
</script>

<style scoped>
.bigger-alert {
  font-size: 1.2rem;
}

/* Дополнительные стили для div с ошибкой */
.error-box {
  color: red;              /* Текст красный */
  background-color: #ffe5e5; /* Светло-красный фон (по желанию) */
  padding: 0.5rem 1rem;   /* Отступы */
  border-radius: 4px;     /* Скруглённые углы */
  border: 1px solid red;  /* Красная рамка */
}
</style>
