import { defineBoot } from '#q-app/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n' // <-- тут import { 'en-US': {...}, 'ru-RU': {...} }

export default defineBoot(({ app }) => {
  const i18n = createI18n({
    locale: 'en-US',           // язык по умолчанию
    fallbackLocale: 'en-US',   // если строка не найдена, берем из en-US
    globalInjection: true,     // чтобы можно было использовать $t('...') во всех компонентах
    messages                   // объект с переводами (из src/i18n/index.js)
  })

  // Регистрируем i18n во Vue-приложении
  app.use(i18n)
})
