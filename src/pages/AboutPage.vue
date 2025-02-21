<template>
  <!-- Основной контейнер страницы About. Используем компонент q-page с паддингом и flex-центровкой -->
  <q-page padding class="flex flex-center">
    <!-- Внутренний блок с отступами и центрированием текста -->
    <div class="q-pa-md text-center">
      <!-- Заголовок страницы, где "About" и "My Shop" разделены переносом строки -->
      <h1>About<br />My Shop</h1>

      <!-- Первый параграф с описанием магазина -->
      <p>
        My Shop is an online store dedicated to providing high-quality products at competitive
        prices. Our mission is to offer an exceptional shopping experience by combining quality,
        affordability, and outstanding customer service.
      </p>

      <!-- Второй параграф с информацией о технологии, на которой построен сайт -->
      <p>
        This website is built using the Quasar Framework and Vue.js, leveraging modern web
        technologies to deliver a seamless and responsive interface for our customers.
      </p>

      <!-- Третий параграф с благодарностью посетителям и информацией о постоянном развитии -->
      <p>
        Thank you for visiting our store. We are continuously working to improve and expand our
        offerings.
      </p>
    </div>
  </q-page>
</template>

<script setup>
// Здесь можно добавить дополнительную логику для страницы About, если потребуется
</script>
