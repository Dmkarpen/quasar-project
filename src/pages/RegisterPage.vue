<template>
  <q-page padding style="min-height: calc(100vh - 112px)" class="relative-position">
    <q-inner-loading :showing="loading" class="dark-overlay">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>

    <div class="q-pa-md text-center" style="max-width: 400px; width: 100%">

      <h1>{{ t('registerPage.heading') }}</h1>

      <!-- Успешная регистрация -->
      <div v-if="success" class="q-mt-lg">
        <q-icon name="mark_email_read" size="64px" color="primary" class="q-mb-md" />
        <div class="text-h6 q-mb-sm">{{ t('registerPage.successTitle') }}</div>
        <p class="text-subtitle2 q-mb-md">{{ t('registerPage.successText') }}</p>
        <q-btn to="/auth/login" color="primary" :label="t('registerPage.goToLogin')" icon="login" no-caps />
      </div>

      <!-- ❗ Всё остальное — в v-else, чтобы скрывалось после success -->
      <div v-else>
        <!-- Ошибки с бэкенда -->
        <q-card v-if="errorMessages.length" class="bg-red-1 text-black q-pa-md q-mb-md" flat bordered>
          <div class="row items-center q-col-gutter-sm">
            <q-icon name="error_outline" size="24px" color="red-8" />
            <div class="col text-left">
              <div v-for="(msg, i) in errorMessages" :key="i" class="text-body1">
                {{ msg }}
              </div>
            </div>
          </div>
        </q-card>

        <!-- Форма регистрации -->
        <q-form @submit.prevent="onNativeSubmit">
          <q-input filled v-model="name" :label="t('registerPage.nameLabel')" clearable :error="!!nameError"
            :error-message="nameError" />

          <q-input filled v-model="email" type="email" :label="t('registerPage.emailLabel')" clearable class="q-mt-md"
            :error="!!emailError" :error-message="emailError" />

          <q-input filled v-model="password" type="password" :label="t('registerPage.passwordLabel')" clearable
            class="q-mt-md" :error="!!passwordError" :error-message="passwordError" />

          <q-input filled v-model="confirmPassword" type="password" :label="t('registerPage.confirmPasswordLabel')"
            clearable class="q-mt-md" :error="!!confirmPasswordError" :error-message="confirmPasswordError" />

          <q-btn :label="t('registerPage.registerBtn')" type="submit" color="primary" class="q-mt-md" />
        </q-form>

        <!-- Ссылка на логин -->
        <div class="q-mt-md">
          <router-link to="/auth/login">
            {{ t('registerPage.alreadyHaveAccount') }}
          </router-link>
        </div>
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

const { t } = useI18n()

const loading = ref(false)

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

const { handleSubmit } = useForm({
  validationSchema: schema
})

const { value: name, errorMessage: nameError } = useField('name')
const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')
const { value: confirmPassword, errorMessage: confirmPasswordError } =
  useField('confirmPassword')

const errorMessages = ref([])
const success = ref(false)

const router = useRouter()

async function onSubmit(values) {
  errorMessages.value = []
  loading.value = true

  try {
    await axios.post('http://127.0.0.1:8000/api/register', {
      name: values.name,
      email: values.email,
      password: values.password,
      password_confirmation: values.confirmPassword
    })

    success.value = true
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
  } finally {
    loading.value = false
  }
}

function onNativeSubmit() {
  handleSubmit(onSubmit)()
}
</script>

<style scoped>
.dark-overlay {
  background-color: rgba(0, 0, 0, 0.3);
  /* темне прозоре затемнення */
}
</style>
