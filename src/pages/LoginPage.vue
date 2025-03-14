<template>
  <q-page padding style="min-height: calc(100vh - 112px)">
    <div class="q-pa-md text-center" style="max-width: 400px; width: 100%">
      <h1>Login</h1>

      <!-- q-form -->
      <q-form @submit.prevent="onNativeSubmit">
        <!-- Поле email -->
        <q-input filled v-model="email" type="email" label="Email" clearable :error="!!emailError"
          :error-message="emailError" />
        <!-- Поле password -->
        <q-input filled v-model="password" type="password" label="Password" clearable class="q-mt-md"
          :error="!!passwordError" :error-message="passwordError" />

        <q-btn label="Login" type="submit" color="primary" class="q-mt-md" />
      </q-form>

      <!-- Ошибка бэкенда (401 / 422 и т. д.) -->
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

// VeeValidate
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

// 1) Определяем схему Yup
const schema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format')
    // 1) Запрещаем пробелы
    .test(
      'no-spaces',
      'Email cannot contain spaces',
      value => {
        if (!value) return false
        // Проверяем, что нет пробелов
        return !/\s/.test(value)
      }
    )
    // 2) Требуем точку после @
    .test(
      'has-dot-in-domain',
      'Email domain must contain a dot',
      value => {
        if (!value) return false
        const domainPart = value.split('@')[1]
        // Если нет доменной части (нет '@' или строка пустая)
        if (!domainPart) return false
        // Проверяем, есть ли точка в доменной части
        return domainPart.includes('.')
      }
    ),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .test(
      'no-spaces',
      'Password cannot contain spaces',
      value => {
        if (!value) return false
        return !/\s/.test(value)
      }
    ),
})

// 2) Инициализируем useForm с этой схемой
const { handleSubmit } = useForm({
  validationSchema: schema,
})

// 3) Привязываем поля
const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')

// Переменная для ошибок с бэкенда
const errorMessage = ref('')

// Роутер
const router = useRouter()

// 4) Функция при успешной локальной валидации
async function onSubmit(values) {
  // Очищаем старое сообщение
  errorMessage.value = ''

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login', {
      email: values.email,
      password: values.password
    })
    console.log('Login success:', response.data)

    // Если сервер вернул токен
    if (response.data.token) {
      localStorage.setItem('api_token', response.data.token)
    }

    // Переходим на /profile
    router.push('/profile')
  } catch (error) {
    console.error('Login error:', error.response?.data || error)

    if (error.response?.status === 422 || error.response?.status === 401) {
      errorMessage.value = 'Invalid credentials. Please check your Email/Password.'
    } else {
      errorMessage.value = 'Something went wrong. Please try again.'
    }
  }
}

// 5) Поскольку используем <q-form>, нужно вручную вызывать handleSubmit(onSubmit)
function onNativeSubmit() {
  handleSubmit(onSubmit)()
}
</script>

<style scoped>
.bigger-alert {
  font-size: 1.2rem;
}

.error-box {
  color: red;
  background-color: #ffe5e5;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid red;
}
</style>
