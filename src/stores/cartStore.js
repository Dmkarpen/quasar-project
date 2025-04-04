import { defineStore } from "pinia";

// Загружаем сохранённые данные (если есть)
const savedItems = JSON.parse(localStorage.getItem("cartItems")) || [];

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: savedItems, // Массив товаров с localStorage
  }),

  actions: {
    addToCart(product) {
      const existing = this.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }

      // Сохраняем в localStorage
      this.saveCart();
    },

    removeFromCart(productId) {
      this.items = this.items.filter((item) => item.id !== productId);
      this.saveCart();
    },

    clearCart() {
      this.items = [];
      this.saveCart();
    },

    // 🆕 Метод сохранения корзины в localStorage
    saveCart() {
      localStorage.setItem("cartItems", JSON.stringify(this.items));
    },
  },

  getters: {
    totalPrice: (state) =>
      state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),

    itemCount: (state) =>
      state.items.reduce((acc, item) => acc + item.quantity, 0),
  },
});
