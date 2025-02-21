<template>
  <!-- Основной контейнер страницы корзины с паддингом и базовой разметкой -->
  <q-page padding>
    <div class="q-pa-md">
      <!-- Заголовок страницы "Shopping Cart" -->
      <h1>Shopping Cart</h1>

      <!-- Список товаров в корзине -->
      <q-list bordered>
        <!-- Перебор элементов корзины: для каждого товара (item) и его индекса (index) -->
        <template v-for="(item, index) in cartStore.items" :key="item.id">
          <q-item v-ripple>
            <!-- Блок для отображения изображения товара -->
            <q-item-section avatar>
              <q-img :src="item.thumbnail" :alt="item.title" style="width: 60px; height: 60px" />
            </q-item-section>

            <!-- Блок для информации о товаре и управления его количеством -->
            <q-item-section>
              <!-- Название товара -->
              <div class="text-h6">{{ item.title }}</div>
              <!-- Цена товара -->
              <div>Price: ${{ item.price }}</div>
              <!-- Блок управления количеством товара -->
              <div class="row items-center q-mt-xs">
                <!-- Кнопка для уменьшения количества товара -->
                <q-btn dense round flat icon="remove" @click="decrement(item)" />
                <!-- Отображение текущего количества товара -->
                <div class="q-mx-sm">{{ item.quantity }}</div>
                <!-- Кнопка для увеличения количества товара -->
                <q-btn dense round flat icon="add" @click="increment(item)" />
              </div>
            </q-item-section>

            <!-- Блок с кнопкой удаления товара из корзины -->
            <q-item-section side>
              <q-btn icon="delete" color="red" flat @click="cartStore.removeFromCart(item.id)" />
            </q-item-section>
          </q-item>

          <!-- Разделитель между товарами, не добавляется после последнего элемента -->
          <q-separator v-if="index < cartStore.items.length - 1" />
        </template>
      </q-list>

      <!-- Отображение общей суммы товаров, округленной до 2 знаков после запятой -->
      <div class="text-h5 q-mt-md">Total: ${{ cartStore.totalPrice.toFixed(2) }}</div>

      <!-- Кнопка Checkout, выровненная по центру -->
      <div class="flex justify-center q-mt-md">
        <q-btn label="Checkout" color="primary" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useCartStore } from 'src/stores/cartStore'

// Получаем доступ к глобальному магазину (store) для корзины
const cartStore = useCartStore()

// Функция для увеличения количества товара в корзине
function increment(item) {
  // Если товар уже есть в корзине, увеличиваем его количество
  cartStore.addToCart(item)
}

// Функция для уменьшения количества товара в корзине
function decrement(item) {
  // Ищем товар в корзине по его id
  const cartItem = cartStore.items.find((i) => i.id === item.id)
  if (cartItem) {
    // Если количество больше 1, уменьшаем его
    if (cartItem.quantity > 1) {
      cartItem.quantity--
    } else {
      // Если количество равно 1, удаляем товар из корзины
      cartStore.removeFromCart(item.id)
    }
  }
}
</script>

<style scoped>
/* Здесь можно добавить дополнительные стили, если необходимо */
</style>
