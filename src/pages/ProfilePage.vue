<template>
  <q-page class="flex flex-center column" padding style="text-align: center">
    <h1>Profile Page</h1>
    <p class="big-text">Hello, {{ userName }}</p>
    <p class="big-text">Your email: {{ userEmail }}</p>

    <q-btn label="Logout" color="primary" class="q-mt-md" @click="logout" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

// Поля для имени и email
const userName = ref('')
const userEmail = ref('')

// Роутер для перенаправления
const router = useRouter()

onMounted(() => {
  getUserProfile()
})

function getUserProfile() {
  // Достаём токен из localStorage
  const token = localStorage.getItem('api_token')
  if (!token) {
    // Если токена нет — переходим на логин
    router.push('/auth/login')
    return
  }

  // Делаем запрос к /api/me
  axios.get('http://127.0.0.1:8000/api/me', {
    headers: {
      // Передаём заголовок Authorization
      'Authorization': 'Bearer ' + token
    }
  })
    .then(response => {
      // Сервер должен вернуть { id, name, email }
      userName.value = response.data.name
      userEmail.value = response.data.email
    })
    .catch(error => {
      console.error('Error fetching profile:', error.response?.data || error)
      // Если токен недействителен (401), отправляем на логин
      if (error.response?.status === 401) {
        router.push('/auth/login')
      }
    })
}

function logout() {
  const token = localStorage.getItem('api_token')
  if (!token) {
    router.push('/auth/login')
    return
  }

  // Вызываем POST /api/logout, передаём токен
  axios.post('http://127.0.0.1:8000/api/logout', null, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(response => {
      console.log('Logout success:', response.data)
      // Удаляем токен с фронта
      localStorage.removeItem('api_token')
      // Переходим на логин
      router.push('/auth/login')
    })
    .catch(error => {
      console.error('Logout error:', error.response?.data || error)
    })
}
</script>

<style scoped>
/* Дополнительные стили */
.big-text {
  font-size: 1.5rem; /* или 2rem, если хотите ещё крупнее */
  margin: 0.5rem 0;  /* небольшой отступ сверху/снизу */
}
</style>
