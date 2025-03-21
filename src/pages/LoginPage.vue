<template>
  <q-page padding style="min-height: calc(100vh - 112px)">
    <div class="q-pa-md text-center" style="max-width: 400px; width: 100%">
      <!-- Заголовок, вместо "Login" -->
      <h1>{{ t('loginPage.heading') }}</h1>

      <!-- Форма (q-form) -->
      <q-form @submit.prevent="onNativeSubmit">
        <!-- Поле email -->
        <q-input filled v-model="email" type="email" :label="t('loginPage.emailLabel')" clearable :error="!!emailError"
          :error-message="emailError" />

        <!-- Поле password -->
        <q-input filled v-model="password" type="password" :label="t('loginPage.passwordLabel')" clearable
          class="q-mt-md" :error="!!passwordError" :error-message="passwordError" />

        <!-- Кнопка "Login" -->
        <q-btn :label="t('loginPage.loginBtn')" type="submit" color="primary" class="q-mt-md" />
      </q-form>

      <!-- Ошибка бэкенда (401 / 422 и т. д.) -->
      <div v-if="errorMessage" class="error-box q-mt-md bigger-alert">
        {{ errorMessage }}
      </div>

      <!-- Ссылка на регистрацию -->
      <div class="q-mt-md">
        <router-link to="/auth/register">{{ t('loginPage.dontHaveAccount') }}</router-link>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

// VeeValidate & Yup
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

// Импортируем useI18n для локализации
import { useI18n } from 'vue-i18n'

// 1) Получаем { t } из useI18n()
const { t } = useI18n()

// 2) Определяем схему Yup, используя локализованные сообщения
const schema = yup.object({
  email: yup
    .string()
    .required(t('loginPage.validation.emailRequired'))
    .email(t('loginPage.validation.emailFormat'))
    .test(
      'no-spaces',
      t('loginPage.validation.emailNoSpaces'),
      value => {
        if (!value) return false
        return !/\s/.test(value)
      }
    )
    .test(
      'has-dot-in-domain',
      t('loginPage.validation.emailDomainDot'),
      value => {
        if (!value) return false
        const domainPart = value.split('@')[1]
        if (!domainPart) return false
        return domainPart.includes('.')
      }
    ),
  password: yup
    .string()
    .required(t('loginPage.validation.passRequired'))
    .min(8, t('loginPage.validation.passMin'))
    .test(
      'no-spaces',
      t('loginPage.validation.passNoSpaces'),
      value => {
        if (!value) return false
        return !/\s/.test(value)
      }
    ),
})

// 3) Инициализируем useForm
const { handleSubmit } = useForm({
  validationSchema: schema
})

// 4) Привязываем поля
const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')

// Ошибка с бэкенда
const errorMessage = ref('')

// Роутер
const router = useRouter()

// 5) Функция при успешной локальной валидации
async function onSubmit(values) {
  errorMessage.value = ''

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login', {
      email: values.email,
      password: values.password
    })
    console.log('Login success:', response.data)

    if (response.data.token) {
      localStorage.setItem('api_token', response.data.token)
    }

    router.push('/profile')
  } catch (error) {
    console.error('Login error:', error.response?.data || error)
    if (error.response?.status === 422 || error.response?.status === 401) {
      errorMessage.value = t('loginPage.invalidCreds')
    } else {
      errorMessage.value = t('loginPage.somethingWrong')
    }
  }
}

// q-form вызывает onNativeSubmit => handleSubmit(onSubmit)
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
