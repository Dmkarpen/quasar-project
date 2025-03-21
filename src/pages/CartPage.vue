<template>
  <!-- Основной контейнер страницы корзины -->
  <q-page padding class="flex flex-center">
    <div class="q-pa-md text-center">
      <!-- Заголовок: "Shopping Cart" -->
      <h1>{{ t('cart.heading') }}</h1>

      <!-- Список товаров -->
      <q-list bordered>
        <template v-for="(item, index) in cartStore.items" :key="item.id">
          <q-item v-ripple>
            <!-- Картинка товара -->
            <q-item-section avatar>
              <q-img :src="item.thumbnail" :alt="item.title" style="width: 60px; height: 60px" />
            </q-item-section>

            <!-- Основная информация о товаре -->
            <q-item-section>
              <div class="text-h6">{{ item.title }}</div>
              <!-- Вместо "Price: $" -->
              <div>{{ t('cart.price') }}: ${{ item.price }}</div>

              <!-- Блок управления количеством -->
              <div class="row items-center q-mt-xs">
                <q-btn dense round flat icon="remove" @click="decrement(item)" />
                <div class="q-mx-sm">{{ item.quantity }}</div>
                <q-btn dense round flat icon="add" @click="increment(item)" />
              </div>
            </q-item-section>

            <!-- Кнопка удаления -->
            <q-item-section side>
              <q-btn icon="delete" color="red" flat @click="cartStore.removeFromCart(item.id)" />
            </q-item-section>
          </q-item>

          <!-- Разделитель между товарами -->
          <q-separator v-if="index < cartStore.items.length - 1" />
        </template>
      </q-list>

      <!-- Итоговая сумма -->
      <div class="text-h5 q-mt-md">
        {{ t('cart.total') }}: ${{ cartStore.totalPrice.toFixed(2) }}
      </div>

      <!-- Кнопка Checkout -->
      <div class="flex justify-center q-mt-md">
        <q-btn :label="t('cart.checkout')" color="primary" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useCartStore } from 'src/stores/cartStore'
// Подключаем useI18n из vue-i18n
import { useI18n } from 'vue-i18n'

// Получаем доступ к хранилищу корзины
const cartStore = useCartStore()

// Получаем функцию перевода t(...)
const { t } = useI18n()

// Увеличить количество товара
function increment(item) {
  cartStore.addToCart(item)
}

// Уменьшить количество товара (или удалить, если достигли 1)
function decrement(item) {
  const cartItem = cartStore.items.find(i => i.id === item.id)
  if (cartItem) {
    if (cartItem.quantity > 1) {
      cartItem.quantity--
    } else {
      cartStore.removeFromCart(item.id)
    }
  }
}
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style>
