import { defineStore } from 'pinia'

// Создаем Pinia store с именем "cart" для управления состоянием корзины товаров
export const useCartStore = defineStore('cart', {
  // Состояние (state) магазина: здесь хранится массив товаров, добавленных в корзину
  state: () => ({
    items: [], // Массив объектов, каждый из которых представляет товар в корзине
  }),

  // Действия (actions) для изменения состояния корзины
  actions: {
    // Функция для добавления товара в корзину
    addToCart(product) {
      // Проверяем, существует ли уже товар с таким же id в корзине
      const existing = this.items.find((item) => item.id === product.id)
      if (existing) {
        // Если товар найден, увеличиваем его количество на 1
        existing.quantity += 1
      } else {
        // Если товара нет, добавляем новый объект товара с полями товара и количеством, равным 1
        this.items.push({ ...product, quantity: 1 })
      }
    },

    // Функция для удаления товара из корзины по его id
    removeFromCart(productId) {
      // Фильтруем массив, оставляя только те товары, у которых id не совпадает с productId
      this.items = this.items.filter((item) => item.id !== productId)
    },

    // Функция для очистки корзины (удаления всех товаров)
    clearCart() {
      this.items = []
    },
  },

  // Геттеры (getters) позволяют вычислять значения на основе состояния
  getters: {
    // Геттер для вычисления общей стоимости товаров в корзине
    totalPrice: (state) =>
      state.items.reduce((total, item) => total + item.price * item.quantity, 0),

    // Геттер для вычисления общего количества товаров в корзине
    itemCount: (state) => state.items.reduce((acc, item) => acc + item.quantity, 0),
  },
})
