<template>
  <q-page padding style="min-height: calc(100vh - 112px)">
    <div class="q-pa-md text-center" style="max-width: 400px; width: 100%">
      <h1>Register</h1>

      <!-- Используем q-form -->
      <q-form @submit.prevent="onNativeSubmit">
        <!-- Поле name -->
        <q-input filled v-model="name" label="Name" clearable :error="!!nameError" :error-message="nameError" />
        <!-- Поле email -->
        <q-input filled v-model="email" type="email" label="Email" clearable class="q-mt-md" :error="!!emailError"
          :error-message="emailError" />
        <!-- Поле password -->
        <q-input filled v-model="password" type="password" label="Password" clearable class="q-mt-md"
          :error="!!passwordError" :error-message="passwordError" />
        <!-- Поле confirmPassword -->
        <q-input filled v-model="confirmPassword" type="password" label="Confirm Password" clearable class="q-mt-md"
          :error="!!confirmPasswordError" :error-message="confirmPasswordError" />

        <q-btn label="Register" type="submit" color="primary" class="q-mt-md" />
      </q-form>

      <!-- Блок для вывода ошибок с бэкенда (Laravel) -->
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
import { useRouter } from 'vue-router'
import axios from 'axios'

// Импорт из vee-validate
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

// 1) Определяем схему Yup
const schema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .max(255, 'Name must be at most 255 characters')
    .test(
      'not-only-spaces',
      'Name cannot be only spaces',
      value => !!value && value.trim().length > 0
    )
    .test(
      'not-only-digits',
      'Name cannot be only digits',
      value => {
        if (!value) return false
        // Проверяем, не состоит ли строка только из цифр
        return !/^\d+$/.test(value.trim())
      }
    ),

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
        // Запрещаем любые пробелы (пробел, табуляция, перевод строки и т. д.)
        return !/\s/.test(value)
      }
    ),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
})

// 2) Инициализируем useForm, привязываем схему
const { handleSubmit } = useForm({
  validationSchema: schema,
})

// 3) Привязываем поля
const { value: name, errorMessage: nameError } = useField('name')
const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')
const { value: confirmPassword, errorMessage: confirmPasswordError } =
  useField('confirmPassword')

// Храним ошибки с бэкенда
const errorMessages = ref([])

// Роутер
const router = useRouter()

// 4) Функция сабмита, вызывается если локальная валидация прошла
async function onSubmit(values) {
  // Сбрасываем ошибки бэкенда
  errorMessages.value = []

  try {
    // Отправляем запрос на сервер
    const response = await axios.post('http://127.0.0.1:8000/api/register', {
      name: values.name,
      email: values.email,
      password: values.password,
      password_confirmation: values.confirmPassword,
    })

    console.log('Registration success:', response.data)
    if (response.data.token) {
      localStorage.setItem('api_token', response.data.token)
    }

    // Переходим на /profile
    router.push('/profile')
  } catch (error) {
    console.error('Registration error:', error.response?.data || error)
    // Обрабатываем ошибки с бэкенда (Laravel)
    if (error.response?.status === 422) {
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
  }
}

// 5) Из-за q-form, сабмит перехватывается Quasar
// Поэтому вызываем handleSubmit(onSubmit) вручную
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
  border: 1px solid red;
  border-radius: 4px;
  padding: 0.5rem;
}
</style>
