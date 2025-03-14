<template>
  <q-layout view="lHh Lpr lFf" class="bg-layout">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <router-link to="/" style="color: inherit; text-decoration: none">
            My Shop
          </router-link>
        </q-toolbar-title>
        <q-space />

        <!-- Иконка корзины -->
        <div class="relative-badge">
          <q-btn flat dense round icon="shopping_cart" @click="$router.push('/cart')" />
          <q-badge
            v-if="cartStore.itemCount > 0"
            color="red"
            floating
            anchor="top right"
            :label="cartStore.itemCount"
            class="badge-style"
          />
        </div>

        <!-- Кнопка пользователя -->
        <q-btn
          flat
          dense
          round
          icon="person"
          @click="goToProfileOrLogin"
        />
      </q-toolbar>
    </q-header>

    <!-- DRAWER: Боковое меню -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2">
      <q-scroll-area class="fit q-pa-sm">
        <q-list>
          <q-item non-clickable>
            <q-item-section>
              <div class="text-h6 q-pa-sm">Navigation</div>
            </q-item-section>
          </q-item>
          <q-separator />

          <q-item clickable v-ripple @click="$router.push('/')">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>Home</q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="$router.push('/products')">
            <q-item-section avatar>
              <q-icon name="shopping_basket" />
            </q-item-section>
            <q-item-section>Products</q-item-section>
          </q-item>

          <!-- Пункт меню "Profile" -->
          <q-item clickable v-ripple @click="goToProfileOrLogin">
            <q-item-section avatar>
              <q-icon name="account_circle" />
            </q-item-section>
            <q-item-section>Profile</q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="$router.push('/cart')">
            <q-item-section avatar>
              <q-icon name="shopping_cart" />
            </q-item-section>
            <q-item-section>Cart</q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="$router.push('/contact')">
            <q-item-section avatar>
              <q-icon name="mail_outline" />
            </q-item-section>
            <q-item-section>Contact Us</q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="$router.push('/about')">
            <q-item-section avatar>
              <q-icon name="info" />
            </q-item-section>
            <q-item-section>About</q-item-section>
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
        <div class="text-body1">Ⓒ 2025 My Shop</div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from 'src/stores/cartStore'
import logo from 'src/assets/logo.png'

const router = useRouter()
const leftDrawerOpen = ref(false)
const cartStore = useCartStore()

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

/*
   hasToken: проверяем только наличие "api_token" в localStorage.
   Если token отсутствует, считаем, что пользователь не залогинен.
*/
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
