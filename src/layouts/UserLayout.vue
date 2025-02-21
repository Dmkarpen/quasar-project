<template>
  <!-- Основной layout страницы с заданным фоновым стилем -->
  <q-layout view="lHh Lpr fFf" class="bg-layout">
    <!-- HEADER: Верхняя панель страницы -->
    <q-header elevated>
      <!-- Первая часть header – q-toolbar с кнопкой меню и заголовком -->
      <q-toolbar>
        <!-- Кнопка для открытия бокового меню (drawer) -->
        <q-btn flat round dense icon="menu" @click="toggleLeftDrawer" />
        <!-- Заголовок, обернутый в router-link для перехода на главную страницу -->
        <q-toolbar-title>
          <router-link to="/" style="color: inherit; text-decoration: none"> My Shop </router-link>
        </q-toolbar-title>
      </q-toolbar>

      <!-- Второй ряд header – q-tabs с вкладками для логина и регистрации -->
      <q-tabs>
        <!-- Вкладка "Login": при клике переходит на страницу /auth/login -->
        <q-route-tab icon="login" to="/auth/login" replace label="Login" />
        <!-- Вкладка "Register": при клике переходит на страницу /auth/register -->
        <q-route-tab icon="person_add" to="/auth/register" replace label="Register" />
      </q-tabs>
    </q-header>

    <!-- DRAWER: Боковое меню -->
    <q-drawer v-model="leftDrawerOpen" side="left" bordered class="bg-grey-2">
      <!-- Область с прокруткой для бокового меню -->
      <q-scroll-area class="fit q-pa-sm">
        <q-list>
          <!-- Заголовок бокового меню -->
          <q-item non-clickable>
            <q-item-section>
              <div class="text-h6 q-pa-sm">Navigation</div>
            </q-item-section>
          </q-item>
          <!-- Разделитель между заголовком и списком пунктов меню -->
          <q-separator />

          <!-- Пункт "Home" -->
          <q-item clickable v-ripple @click="$router.push('/')">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section> Home </q-item-section>
          </q-item>

          <!-- Пункт "Products" -->
          <q-item clickable v-ripple @click="$router.push('/products')">
            <q-item-section avatar>
              <q-icon name="shopping_basket" />
            </q-item-section>
            <q-item-section> Products </q-item-section>
          </q-item>

          <!-- Пункт "Profile" -->
          <q-item clickable v-ripple @click="$router.push('/auth/login')">
            <q-item-section avatar>
              <q-icon name="account_circle" />
            </q-item-section>
            <q-item-section> Profile </q-item-section>
          </q-item>

          <!-- Пункт "Cart" -->
          <q-item clickable v-ripple @click="$router.push('/cart')">
            <q-item-section avatar>
              <q-icon name="shopping_cart" />
            </q-item-section>
            <q-item-section> Cart </q-item-section>
          </q-item>

          <!-- Пункт "Contact Us" -->
          <q-item clickable v-ripple @click="$router.push('/contact')">
            <q-item-section avatar>
              <q-icon name="mail_outline" />
            </q-item-section>
            <q-item-section> Contact Us </q-item-section>
          </q-item>

          <!-- Пункт "About" -->
          <q-item clickable v-ripple @click="$router.push('/about')">
            <q-item-section avatar>
              <q-icon name="info" />
            </q-item-section>
            <q-item-section> About </q-item-section>
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
        <!-- Правая часть футера: Текст -->
        <div class="text-body1">Ⓒ 2025 My Shop</div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
// Импортируем ref для создания реактивных переменных
import { ref } from 'vue'
// Импортируем PNG-иконку сайта
import logo from 'src/assets/logo.png'

// Реактивная переменная для управления состоянием бокового меню (drawer)
const leftDrawerOpen = ref(false)

// Функция для переключения состояния бокового меню (открыть/закрыть)
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style scoped>
/* Стили для основного фона layout */
.bg-layout {
  background-color: #e0f7fa;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

/* Класс для обёртки иконки корзины с бейджем */
.relative-badge {
  position: relative;
  display: inline-block;
}
</style>
