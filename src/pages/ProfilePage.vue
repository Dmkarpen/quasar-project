<template>
  <q-page class="flex flex-center column" padding style="text-align: center">
    <!-- Заголовок (перевод) -->
    <h1>{{ t('profilePage.heading') }}</h1>

    <!-- Приветствие -->
    <p class="big-text">
      {{ t('profilePage.hello') }}, {{ userName }}
    </p>

    <!-- Email -->
    <p class="big-text">
      {{ t('profilePage.yourEmail') }}: {{ userEmail }}
    </p>

    <!-- Кнопка "Logout" -->
    <q-btn :label="t('profilePage.logoutBtn')" color="primary" class="q-mt-md" @click="logout" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
// Подключаем useI18n
import { useI18n } from 'vue-i18n'

// Поля для имени и email
const userName = ref('')
const userEmail = ref('')

// Роутер для перенаправления
const router = useRouter()

// Получаем функцию перевода t(...)
const { t } = useI18n()

onMounted(() => {
  loadProfile()
})

function loadProfile() {
  const token = localStorage.getItem('api_token')
  if (!token) {
    router.push('/auth/login')
    return
  }

  axios.get('http://127.0.0.1:8000/api/me', {
    headers: { 'Authorization': 'Bearer ' + token }
  })
    .then(response => {
      userName.value = response.data.name
      userEmail.value = response.data.email
    })
    .catch(error => {
      console.error('Error fetching profile:', error.response?.data || error)
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

  axios.post('http://127.0.0.1:8000/api/logout', null, {
    headers: { 'Authorization': 'Bearer ' + token }
  })
    .then(response => {
      console.log('Logout success:', response.data)
      localStorage.removeItem('api_token')
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
