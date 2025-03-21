<template>
  <q-page padding style="min-height: calc(100vh - 112px)">
    <div class="q-pa-md text-center" style="max-width: 400px; width: 100%">
      <!-- Заголовок "Register" (локализован) -->
      <h1>{{ t('registerPage.heading') }}</h1>

      <!-- q-form -->
      <q-form @submit.prevent="onNativeSubmit">
        <!-- Поле name -->
        <q-input filled v-model="name" :label="t('registerPage.nameLabel')" clearable :error="!!nameError"
          :error-message="nameError" />

        <!-- Поле email -->
        <q-input filled v-model="email" type="email" :label="t('registerPage.emailLabel')" clearable class="q-mt-md"
          :error="!!emailError" :error-message="emailError" />

        <!-- Поле password -->
        <q-input filled v-model="password" type="password" :label="t('registerPage.passwordLabel')" clearable
          class="q-mt-md" :error="!!passwordError" :error-message="passwordError" />

        <!-- Поле confirmPassword -->
        <q-input filled v-model="confirmPassword" type="password" :label="t('registerPage.confirmPasswordLabel')"
          clearable class="q-mt-md" :error="!!confirmPasswordError" :error-message="confirmPasswordError" />

        <q-btn :label="t('registerPage.registerBtn')" type="submit" color="primary" class="q-mt-md" />
      </q-form>

      <!-- Ошибки с бэкенда (422, 401, и т. д.) -->
      <div v-if="errorMessages.length" class="error-box q-mt-md bigger-alert">
        <ul>
          <li v-for="(msg, i) in errorMessages" :key="i">{{ msg }}</li>
        </ul>
      </div>

      <!-- Ссылка на логин -->
      <div class="q-mt-md">
        <router-link to="/auth/login">
          {{ t('registerPage.alreadyHaveAccount') }}
        </router-link>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

// VeeValidate & Yup
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

// Подключаем useI18n
import { useI18n } from 'vue-i18n'

// Получаем { t } для переводов
const { t } = useI18n()

// Определяем схему Yup, используя локализованные сообщения
const schema = yup.object({
  name: yup
    .string()
    .required(t('registerPage.validation.nameRequired'))
    .max(255, t('registerPage.validation.nameMax'))
    .test(
      'not-only-spaces',
      t('registerPage.validation.nameNoSpaces'),
      value => !!value && value.trim().length > 0
    )
    .test(
      'not-only-digits',
      t('registerPage.validation.nameNoDigits'),
      value => {
        if (!value) return false
        return !/^\d+$/.test(value.trim())
      }
    ),

  email: yup
    .string()
    .required(t('registerPage.validation.emailRequired'))
    .email(t('registerPage.validation.emailFormat'))
    .test(
      'no-spaces',
      t('registerPage.validation.emailNoSpaces'),
      value => !!value && !/\s/.test(value)
    )
    .test(
      'has-dot-in-domain',
      t('registerPage.validation.emailDomainDot'),
      value => {
        if (!value) return false
        const domainPart = value.split('@')[1]
        if (!domainPart) return false
        return domainPart.includes('.')
      }
    ),

  password: yup
    .string()
    .required(t('registerPage.validation.passRequired'))
    .min(8, t('registerPage.validation.passMin'))
    .test(
      'no-spaces',
      t('registerPage.validation.passNoSpaces'),
      value => !!value && !/\s/.test(value)
    ),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], t('registerPage.validation.passMatch'))
    .required(t('registerPage.validation.passConfirm'))
})

// Инициализируем useForm
const { handleSubmit } = useForm({
  validationSchema: schema
})

// Привязываем поля
const { value: name, errorMessage: nameError } = useField('name')
const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')
const { value: confirmPassword, errorMessage: confirmPasswordError } =
  useField('confirmPassword')

// Храним ошибки с бэкенда
const errorMessages = ref([])

// Роутер
const router = useRouter()

// Функция сабмита
async function onSubmit(values) {
  errorMessages.value = []

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/register', {
      name: values.name,
      email: values.email,
      password: values.password,
      password_confirmation: values.confirmPassword
    })

    console.log('Registration success:', response.data)
    if (response.data.token) {
      localStorage.setItem('api_token', response.data.token)
    }

    router.push('/profile')
  } catch (error) {
    console.error('Registration error:', error.response?.data || error)
    if (error.response?.status === 422) {
      const allErrors = error.response.data.errors || {}
      let combined = []
      for (const field in allErrors) {
        combined = combined.concat(allErrors[field])
      }
      errorMessages.value = combined
    } else if (error.response?.status === 401) {
      errorMessages.value = [t('registerPage.notAuthorized')]
    } else {
      errorMessages.value = [t('registerPage.somethingWrong')]
    }
  }
}

// Вызываем handleSubmit(onSubmit) вручную из-за q-form
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
