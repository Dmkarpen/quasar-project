<template>
  <q-page padding style="min-height: calc(100vh - 112px)" class="relative-position">
    <q-inner-loading :showing="loading" class="dark-overlay">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>

    <div class="q-pa-md text-center" style="max-width: 400px; width: 100%">
      <h1>{{ t('loginPage.heading') }}</h1>

      <!-- Ошибка: Email не подтверждён -->
      <q-card v-if="emailNotVerified" class="bg-orange-1 text-black q-pa-md q-mb-md" flat bordered>
        <div class="row items-center q-col-gutter-sm">
          <q-icon name="warning" size="28px" color="orange-9" />
          <div class="col text-left">
            <div class="text-body1 q-mb-sm">
              {{ t('loginPage.emailNotVerified') }}
            </div>

            <div v-if="!resendSuccess">
              <q-btn size="md" color="orange" :label="t('loginPage.resend')" @click="resendEmail" flat no-caps />
            </div>

            <div v-else class="text-positive text-body2 q-mt-sm">
              {{ t('loginPage.resentSuccess') }}
            </div>
          </div>
        </div>
      </q-card>

      <!-- Общая ошибка -->
      <q-card v-if="errorMessage" class="bg-red-1 text-black q-pa-md q-mb-md" flat bordered>
        <div class="row items-center q-col-gutter-sm">
          <q-icon name="error_outline" size="24px" color="red-8" />
          <div class="col text-left">
            <div class="text-body1">
              {{ errorMessage }}
            </div>
          </div>
        </div>
      </q-card>

      <!-- Форма входа -->
      <q-form @submit.prevent="onNativeSubmit">
        <q-input filled v-model="email" type="email" :label="t('loginPage.emailLabel')" clearable :error="!!emailError"
          :error-message="emailError" />

        <q-input filled v-model="password" type="password" :label="t('loginPage.passwordLabel')" clearable
          class="q-mt-md" :error="!!passwordError" :error-message="passwordError" />

        <q-btn :label="t('loginPage.loginBtn')" type="submit" color="primary" class="q-mt-md" />
      </q-form>

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
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const loading = ref(false)

const schema = yup.object({
  email: yup
    .string()
    .required(t('loginPage.validation.emailRequired'))
    .email(t('loginPage.validation.emailFormat'))
    .test('no-spaces', t('loginPage.validation.emailNoSpaces'), val => !!val && !/\s/.test(val))
    .test('has-dot-in-domain', t('loginPage.validation.emailDomainDot'), val => {
      if (!val) return false
      const domain = val.split('@')[1]
      return domain?.includes('.')
    }),
  password: yup
    .string()
    .required(t('loginPage.validation.passRequired'))
    .min(8, t('loginPage.validation.passMin'))
    .test('no-spaces', t('loginPage.validation.passNoSpaces'), val => !!val && !/\s/.test(val))
})

const { handleSubmit } = useForm({ validationSchema: schema })
const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')

const errorMessage = ref('')
const emailNotVerified = ref(false)
const emailForResend = ref('')
const resendSuccess = ref(false)

const router = useRouter()

async function onSubmit(values) {
  errorMessage.value = ''
  emailNotVerified.value = false
  resendSuccess.value = false
  loading.value = true

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login', {
      email: values.email,
      password: values.password
    })

    if (response.data.token) {
      localStorage.setItem('api_token', response.data.token)
    }

    router.push('/profile')
  } catch (error) {
    if (error.response?.status === 403) {
      emailNotVerified.value = true
      emailForResend.value = email.value
    } else if (error.response?.status === 422 || error.response?.status === 401) {
      errorMessage.value = t('loginPage.invalidCreds')
    } else {
      errorMessage.value = t('loginPage.somethingWrong')
    }
  } finally {
    loading.value = false
  }
}


function onNativeSubmit() {
  handleSubmit(onSubmit)()
}

async function resendEmail() {
  try {
    await axios.post('http://127.0.0.1:8000/api/resend-verification', {
      email: emailForResend.value
    })
    resendSuccess.value = true
  } catch (e) {
    console.error('Resend error', e)
  }
}
</script>

<style scoped>
.dark-overlay {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
