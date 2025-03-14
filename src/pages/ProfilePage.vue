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
  loadProfile()
})

function loadProfile() {
  const token = localStorage.getItem('api_token')
  if (!token) {
    // Нет токена -> логин
    router.push('/auth/login')
    return
  }

  // Делаем запрос /api/me
  axios.get('http://127.0.0.1:8000/api/me', {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then(response => {
    // Сервер вернёт { id, name, email }
    userName.value = response.data.name
    userEmail.value = response.data.email
  })
  .catch(error => {
    console.error('Error fetching profile:', error.response?.data || error)
    // Если токен недействителен (401), удаляем токен и отправляем на логин
    if (error.response?.status === 401) {
      localStorage.removeItem('api_token')
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

  // Вызываем POST /api/logout
  axios.post('http://127.0.0.1:8000/api/logout', null, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then(response => {
    console.log('Logout success:', response.data)
    // Удаляем токен на фронтенде
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
.big-text {
  font-size: 1.5rem;
  margin: 0.5rem 0;
}
</style>
