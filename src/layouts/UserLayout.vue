<template>
  <!-- Основной layout страницы с заданным фоновым стилем -->
  <q-layout view="lHh Lpr fFf" class="bg-layout">
    <!-- HEADER: Верхняя панель страницы -->
    <q-header elevated>
      <!-- Первая часть header – q-toolbar с кнопкой меню и заголовком -->
      <q-toolbar>
        <!-- Кнопка для открытия бокового меню (drawer) -->
        <q-btn flat round dense icon="menu" @click="toggleLeftDrawer" />

        <!-- Заголовок (с переводом) -->
        <q-toolbar-title>
          <router-link to="/" style="color: inherit; text-decoration: none">
            {{ t('userLayout.myShop') }}
          </router-link>
        </q-toolbar-title>

        <!-- Кнопки переключения языка -->
        <q-btn label="EN" color="yellow" text-color="primary" class="q-ml-md" @click="switchLang('en-US')" />
        <q-btn label="RU" color="green" text-color="primary" class="q-ml-md" @click="switchLang('ru-RU')" />
      </q-toolbar>

      <!-- Второй ряд header – q-tabs с вкладками для логина и регистрации -->
      <q-tabs>
        <!-- Вкладка "Login" (перевод) -->
        <q-route-tab icon="login" to="/auth/login" replace :label="t('userLayout.login')" />
        <!-- Вкладка "Register" (перевод) -->
        <q-route-tab icon="person_add" to="/auth/register" replace :label="t('userLayout.register')" />
      </q-tabs>
    </q-header>

    <!-- DRAWER: Боковое меню -->
    <q-drawer v-model="leftDrawerOpen" side="left" bordered class="bg-grey-2">
      <q-scroll-area class="fit q-pa-sm">
        <q-list>
          <!-- Заголовок бокового меню (перевод) -->
          <q-item non-clickable>
            <q-item-section>
              <div class="text-h6 q-pa-sm">{{ t('userLayout.navigation') }}</div>
            </q-item-section>
          </q-item>
          <q-separator />

          <q-item clickable v-ripple @click="$router.push('/')">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <!-- "Home" (перевод) -->
            <q-item-section>{{ t('userLayout.home') }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="$router.push('/products')">
            <q-item-section avatar>
              <q-icon name="shopping_basket" />
            </q-item-section>
            <!-- "Products" (перевод) -->
            <q-item-section>{{ t('userLayout.products') }}</q-item-section>
          </q-item>

          <!-- Пункт "Profile" -->
          <q-item clickable v-ripple @click="$router.push('/auth/login')">
            <q-item-section avatar>
              <q-icon name="account_circle" />
            </q-item-section>
            <!-- "Profile" (перевод) -->
            <q-item-section>{{ t('userLayout.profile') }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="$router.push('/cart')">
            <q-item-section avatar>
              <q-icon name="shopping_cart" />
            </q-item-section>
            <!-- "Cart" (перевод) -->
            <q-item-section>{{ t('userLayout.cart') }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="$router.push('/contact')">
            <q-item-section avatar>
              <q-icon name="mail_outline" />
            </q-item-section>
            <!-- "Contact Us" (перевод) -->
            <q-item-section>{{ t('userLayout.contactUs') }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="$router.push('/about')">
            <q-item-section avatar>
              <q-icon name="info" />
            </q-item-section>
            <!-- "About" (перевод) -->
            <q-item-section>{{ t('userLayout.about') }}</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- КОНТЕЙНЕР СТРАНИЦ: Здесь выводятся компоненты, соответствующие маршрутам -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- FOOTER: Нижняя панель страницы -->
    <q-footer class="bg-primary text-white">
      <q-toolbar class="justify-between">
        <!-- Левая часть футера: PNG-иконка сайта -->
        <div>
          <img :src="logo" alt="Site Icon" style="height: 40px" />
        </div>
        <!-- Правая часть футера: "© 2025 My Shop" (перевод) -->
        <div class="text-body1">
          © 2025 {{ t('userLayout.myShop') }}
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import logo from 'src/assets/logo.png'
// Подключаем useI18n из vue-i18n
import { useI18n } from 'vue-i18n'

// Реактивная переменная для управления состоянием бокового меню (drawer)
const leftDrawerOpen = ref(false)

// Функция для переключения состояния бокового меню (открыть/закрыть)
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

// Получаем доступ к locale и t через useI18n()
const { locale, t } = useI18n()

// Функция переключения языка
function switchLang(lang) {
  locale.value = lang
  localStorage.setItem('locale', lang)
}
</script>

<style scoped>
.bg-layout {
  background-color: #e0f7fa;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

.relative-badge {
  position: relative;
  display: inline-block;
}
</style>
