<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- Кнопка меню -->
        <q-btn flat dense round icon="menu" @click="toggleLeftDrawer" />

        <!-- Название/логотип -->
        <q-toolbar-title>
          <!-- Вместо "My Shop" используем перевод -->
          <router-link to="/" style="color: inherit; text-decoration: none">
            {{ t('layout.myShop') }}
          </router-link>
        </q-toolbar-title>

        <!-- Кнопки переключения языка -->
        <q-btn label="EN" color="yellow" text-color="primary" class="q-ml-md" @click="switchLang('en-US')" />
        <q-btn label="RU" color="green" text-color="primary" class="q-ml-md" @click="switchLang('ru-RU')" />

        <!-- Иконка корзины -->
        <div class="relative-badge q-ml-md">
          <q-btn flat dense round icon="shopping_cart" @click="$router.push('/cart')" />
          <q-badge v-if="cartStore.itemCount > 0" color="red" floating anchor="top right" :label="cartStore.itemCount"
            class="badge-style" />
        </div>

        <!-- Кнопка пользователя -->
        <q-btn flat dense round icon="person" @click="goToProfileOrLogin" class="q-ml-md" />
      </q-toolbar>
    </q-header>

    <!-- DRAWER: Боковое меню -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2">
      <q-scroll-area class="fit q-pa-sm">
        <q-list>
          <q-item non-clickable>
            <q-item-section>
              <!-- Вместо "Navigation" -->
              <div class="text-h6 q-pa-sm">{{ t('layout.navigation') }}</div>
            </q-item-section>
          </q-item>
          <q-separator />

          <q-item clickable v-ripple @click="$router.push('/')">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <!-- Вместо "Home" -->
            <q-item-section>{{ t('layout.home') }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="$router.push('/products')">
            <q-item-section avatar>
              <q-icon name="shopping_basket" />
            </q-item-section>
            <!-- Вместо "Products" -->
            <q-item-section>{{ t('layout.products') }}</q-item-section>
          </q-item>

          <!-- Пункт меню "Profile" -->
          <q-item clickable v-ripple @click="goToProfileOrLogin">
            <q-item-section avatar>
              <q-icon name="account_circle" />
            </q-item-section>
            <!-- Вместо "Profile" -->
            <q-item-section>{{ t('layout.profile') }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="$router.push('/cart')">
            <q-item-section avatar>
              <q-icon name="shopping_cart" />
            </q-item-section>
            <!-- Вместо "Cart" -->
            <q-item-section>{{ t('layout.cart') }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="$router.push('/contact')">
            <q-item-section avatar>
              <q-icon name="mail_outline" />
            </q-item-section>
            <!-- Вместо "Contact Us" -->
            <q-item-section>{{ t('layout.contactUs') }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="$router.push('/about')">
            <q-item-section avatar>
              <q-icon name="info" />
            </q-item-section>
            <!-- Вместо "About" -->
            <q-item-section>{{ t('layout.about') }}</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- PAGE CONTAINER -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- FOOTER -->
    <q-footer class="bg-primary text-white">
      <q-toolbar class="justify-between">
        <div>
          <img :src="logo" alt="Site Icon" style="height: 40px" />
        </div>
        <!-- Вместо "Ⓒ 2025 My Shop" -->
        <div class="text-body1">
          © 2025 {{ t('layout.myShop') }}
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from 'src/stores/cartStore'
import logo from 'src/assets/logo.png'

// Подключаем useI18n из vue-i18n
import { useI18n } from 'vue-i18n'

const router = useRouter()
const leftDrawerOpen = ref(false)
const cartStore = useCartStore()

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

// Проверяем токен
const hasToken = computed(() => {
  return !!localStorage.getItem('api_token')
})

function goToProfileOrLogin() {
  if (hasToken.value) {
    router.push('/profile')
  } else {
    router.push('/auth/login')
  }
}

// Получаем locale и t из i18n
const { locale, t } = useI18n()

// Функция переключения языка
function switchLang(lang) {
  locale.value = lang
  localStorage.setItem('locale', lang)
}
</script>

<style scoped>
.relative-badge {
  position: relative;
  display: inline-block;
}
</style>
