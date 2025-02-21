<template>
  <!-- Основной контейнер, который занимает весь экран (fullscreen) -->
  <!-- Классы bg-blue и text-white задают синий фон и белый текст соответственно -->
  <!-- text-center выравнивает текст по центру, q-pa-md добавляет отступы, а flex flex-center центрируют содержимое по вертикали и горизонтали -->
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <!-- Внутренний контейнер для содержимого ошибки -->
    <div>
      <!-- Большой текст "404", который занимает 20% высоты окна (20vh) и имеет line-height: 1 для плотного размещения строк -->
      <div style="font-size: 20vh; line-height: 1">404</div>

      <!-- Сообщение об ошибке с уменьшенной непрозрачностью (opacity: 0.4) и классом text-h2 для стилизации заголовка -->
      <div class="text-h2" style="opacity: 0.4">Oops. Nothing here...</div>

      <!-- Кнопка "Go Home": -->
      <!-- q-btn с классом q-mt-xl добавляет отступ сверху -->
      <!-- Цвет кнопки задан как белый (color="white"), а текст — синим (text-color="blue") -->
      <!-- unelevated убирает тень кнопки, to="/" задаёт переход на главную страницу при клике -->
      <!-- no-caps предотвращает преобразование текста в верхний регистр -->
      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script setup>
// Здесь можно добавить дополнительную логику, если потребуется
</script>
