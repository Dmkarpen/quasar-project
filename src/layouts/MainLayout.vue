<template>
  <!-- Основной контейнер layout с заданным фоновым стилем -->
  <q-layout view="lHh Lpr lFf" class="bg-layout">
    <!-- HEADER: Верхняя панель страницы -->
    <q-header elevated>
      <!-- Q-TOOLBAR: Содержит кнопку меню, заголовок и кнопки справа -->
      <q-toolbar>
        <!-- Кнопка для открытия/закрытия бокового меню -->
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <!-- Заголовок, обернутый в router-link для перехода на главную страницу -->
        <q-toolbar-title>
          <router-link to="/" style="color: inherit; text-decoration: none"> My Shop </router-link>
        </q-toolbar-title>

        <!-- Заполнение свободного пространства для выравнивания элементов справа -->
        <q-space />

        <!-- Блок с иконкой корзины и бейджем, отображающим количество товаров -->
        <div class="relative-badge">
          <q-btn
            flat
            dense
            round
            icon="shopping_cart"
            aria-label="Cart"
            @click="$router.push('/cart')"
          />
          <q-badge
            v-if="cartStore.itemCount > 0"
            color="red"
            floating
            anchor="top right"
            :label="cartStore.itemCount"
            class="badge-style"
          />
        </div>

        <!-- Кнопка пользователя, переход на страницу логина -->
        <q-btn
          flat
          dense
          round
          icon="person"
          aria-label="User"
          @click="$router.push('/auth/login')"
        />
      </q-toolbar>
      <!-- Удалён блок q-tabs, поэтому header отображается в один ряд -->
    </q-header>

    <!-- DRAWER: Боковое меню -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2">
      <q-scroll-area class="fit q-pa-sm">
        <q-list>
          <!-- Заголовок бокового меню -->
          <q-item non-clickable>
            <q-item-section>
              <div class="text-h6 q-pa-sm">Navigation</div>
            </q-item-section>
          </q-item>
          <!-- Разделитель между заголовком и пунктами меню -->
          <q-separator />

          <!-- Пункт меню "Home" -->
          <q-item clickable v-ripple @click="$router.push('/')">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section> Home </q-item-section>
          </q-item>

          <!-- Пункт меню "Products" -->
          <q-item clickable v-ripple @click="$router.push('/products')">
            <q-item-section avatar>
              <q-icon name="shopping_basket" />
            </q-item-section>
            <q-item-section> Products </q-item-section>
          </q-item>

          <!-- Пункт меню "Profile" -->
          <q-item clickable v-ripple @click="$router.push('/auth/login')">
            <q-item-section avatar>
              <q-icon name="account_circle" />
            </q-item-section>
            <q-item-section> Profile </q-item-section>
          </q-item>

          <!-- Пункт меню "Cart" -->
          <q-item clickable v-ripple @click="$router.push('/cart')">
            <q-item-section avatar>
              <q-icon name="shopping_cart" />
            </q-item-section>
            <q-item-section> Cart </q-item-section>
          </q-item>

          <!-- Пункт меню "Contact Us" -->
          <q-item clickable v-ripple @click="$router.push('/contact')">
            <q-item-section avatar>
              <q-icon name="mail_outline" />
            </q-item-section>
            <q-item-section> Contact Us </q-item-section>
          </q-item>

          <!-- Пункт меню "About" -->
          <q-item clickable v-ripple @click="$router.push('/about')">
            <q-item-section avatar>
              <q-icon name="info" />
            </q-item-section>
            <q-item-section> About </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- PAGE CONTAINER: Здесь подставляются компоненты страниц согласно маршрутам -->
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
        <!-- Правая часть футера: Текст футера -->
        <div class="text-body1">Ⓒ 2025 My Shop</div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
// Импортируем ref для создания реактивных переменных
import { ref } from 'vue'
// Импортируем глобальное хранилище корзины (Pinia store)
import { useCartStore } from 'src/stores/cartStore'
// Импортируем PNG-иконку сайта
import logo from 'src/assets/logo.png'

// Реактивная переменная для управления состоянием бокового меню (drawer)
const leftDrawerOpen = ref(false)
// Получаем доступ к данным корзины через магазин
const cartStore = useCartStore()

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

/* Класс для обёртки, содержащей иконку корзины с бейджем */
.relative-badge {
  position: relative;
  display: inline-block;
}
</style>
