import { defineBoot } from "#q-app/wrappers";
import { createI18n } from "vue-i18n";
import messages from "src/i18n";

export default defineBoot(({ app }) => {
  const browserLocale = navigator.language || navigator.userLanguage;
  const supportedLocales = ["en-US", "ru-RU"];

  const savedLocale = localStorage.getItem("locale");

  const locale =
    savedLocale && supportedLocales.includes(savedLocale)
      ? savedLocale
      : supportedLocales.includes(browserLocale)
      ? browserLocale
      : supportedLocales.find((lang) =>
          browserLocale.startsWith(lang.split("-")[0])
        ) || "en-US";

  const i18n = createI18n({
    legacy: false,
    locale,
    fallbackLocale: "en-US",
    globalInjection: true,
    messages,
  });

  app.use(i18n);
});
