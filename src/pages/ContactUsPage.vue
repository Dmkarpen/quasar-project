<template>
  <q-page padding class="flex flex-center">
    <div class="q-pa-md" style="max-width: 600px; width: 100%">
      <h1 class="text-center">{{ t('contact.heading') }}</h1>

      <!-- Успешное сообщение -->
      <div v-if="successMessage" class="q-mt-md q-mb-md success-box bigger-alert text-center">
        {{ successMessage }}
      </div>

      <!-- q-form -->
      <q-form @submit.prevent="onNativeSubmit" class="q-gutter-md">
        <!-- Поле name -->
        <q-input v-model="name" filled :label="t('contact.name')" required :error="!!nameError"
          :error-message="nameError" />

        <!-- Поле email -->
        <q-input v-model="email" filled type="email" :label="t('contact.email')" required :error="!!emailError"
          :error-message="emailError" />

        <!-- Поле subject -->
        <q-input v-model="subject" filled :label="t('contact.subject')" required :error="!!subjectError"
          :error-message="subjectError" />

        <!-- Поле message (textarea) -->
        <q-input v-model="message" filled type="textarea" :label="t('contact.message')" required autogrow :min-rows="5"
          class="my-textarea" :error="!!messageError" :error-message="messageError" />

        <div class="flex justify-center">
          <q-btn :label="t('contact.send')" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useI18n } from 'vue-i18n'

// VeeValidate + Yup
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

// Получаем функцию перевода
const { t } = useI18n()

// 1) Определяем схему Yup
const schema = yup.object({
  name: yup
    .string()
    .required(t('contact.validation.nameRequired'))
    .max(255, t('contact.validation.nameMax'))
    .test(
      'not-only-spaces',
      t('contact.validation.notOnlySpaces'),
      value => !!value && value.trim().length > 0
    ),
  email: yup
    .string()
    .required(t('contact.validation.emailRequired'))
    .email(t('contact.validation.emailFormat'))
    .test(
      'not-only-spaces',
      t('contact.validation.notOnlySpaces'),
      value => !!value && value.trim().length > 0
    ),
  subject: yup
    .string()
    .required(t('contact.validation.subjectRequired'))
    .max(255, t('contact.validation.subjectMax'))
    .test(
      'not-only-spaces',
      t('contact.validation.notOnlySpaces'),
      value => !!value && value.trim().length > 0
    ),
  message: yup
    .string()
    .required(t('contact.validation.messageRequired'))
    .min(10, t('contact.validation.messageMin'))
    .test(
      'not-only-spaces',
      t('contact.validation.notOnlySpaces'),
      value => !!value && value.trim().length > 0
    )
})

// 2) Инициализируем useForm
const { handleSubmit, resetForm } = useForm({
  validationSchema: schema
})

// 3) Привязываем поля
const { value: name, errorMessage: nameError } = useField('name')
const { value: email, errorMessage: emailError } = useField('email')
const { value: subject, errorMessage: subjectError } = useField('subject')
const { value: message, errorMessage: messageError } = useField('message')

// Успешное сообщение
const successMessage = ref('')

// При монтировании проверяем, залогинен ли пользователь
onMounted(() => {
  const token = localStorage.getItem('api_token')
  if (token) {
    axios.get('http://127.0.0.1:8000/api/me', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => {
        name.value = response.data.name || ''
        email.value = response.data.email || ''
      })
      .catch(error => {
        console.error('Error fetching user for contact form:', error.response?.data || error)
      })
  }
})

// Функция при успешной локальной валидации
async function onSubmit(values) {
  successMessage.value = '' // сбрасываем прошлый успех

  try {
    const res = await axios.post('http://127.0.0.1:8000/api/contact-messages', {
      name: values.name,
      email: values.email,
      subject: values.subject,
      message: values.message
    })
    console.log('Message stored:', res.data)

    // Вызываем resetForm() для сброса значений и ошибок
    resetForm({
      values: {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    })

    // Показываем сообщение об успехе
    successMessage.value = t('contact.success')

  } catch (error) {
    console.error('Error storing contact message:', error.response?.data || error)
    // Здесь можно вывести уведомление об ошибке
  }
}

// q-form вызывает onNativeSubmit => handleSubmit(onSubmit)
function onNativeSubmit() {
  handleSubmit(onSubmit)()
}
</script>

<style scoped>
::v-deep .my-textarea .q-field__native {
  min-height: 150px;
}

.success-box {
  color: green;
  background-color: #e6ffe6;
  border: 1px solid green;
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

.bigger-alert {
  font-size: 1.2rem;
}
</style>
