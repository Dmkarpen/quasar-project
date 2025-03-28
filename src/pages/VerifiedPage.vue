<template>
  <q-page class="flex flex-center column text-center q-pa-lg">
    <q-icon name="check_circle" size="100px" color="green" class="q-mb-md" />
    <h2 class="text-h5 q-mb-sm">{{ t('verified.title') }}</h2>
    <p class="text-subtitle1 q-mb-md">{{ t('verified.description') }}</p>

    <p class="text-caption text-grey q-mb-md">
      {{ t('verified.closingIn') }} {{ countdown }}...
    </p>

    <p v-if="showManualMessage" class="text-caption text-negative">
      {{ t('verified.manualClose') }}
    </p>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const countdown = ref(10)
const showManualMessage = ref(false)

onMounted(() => {
  const interval = setInterval(() => {
    countdown.value--

    if (countdown.value <= 0) {
      clearInterval(interval)

      // Спроба закрити вкладку
      const closed = window.close()
      if (!closed) {
        showManualMessage.value = true
      }
    }
  }, 1000)
})
</script>
