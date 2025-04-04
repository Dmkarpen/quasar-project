export default {
  about: {
    heading: "О магазине<br />My Shop",
    description1:
      "My Shop — это интернет-магазин, специализирующийся на товарах высокого качества по конкурентным ценам. Наша миссия — предоставить исключительный опыт покупок, сочетая качество, доступность и отличное обслуживание клиентов.",
    description2:
      "Этот сайт создан с использованием Quasar Framework и Vue.js, опираясь на современные веб-технологии для обеспечения плавного и адаптивного интерфейса для наших клиентов.",
    description3:
      "Спасибо за посещение нашего магазина. Мы постоянно работаем над улучшением и расширением ассортимента.",
  },

  layout: {
    myShop: "My Shop",
    navigation: "Навигация",
    home: "Главная",
    products: "Товары",
    profile: "Профиль",
    cart: "Корзина",
    contactUs: "Контакты",
    about: "О магазине",
  },

  userLayout: {
    myShop: "My Shop",
    navigation: "Навигация",
    home: "Главная",
    products: "Товары",
    profile: "Профиль",
    cart: "Корзина",
    contactUs: "Контакты",
    about: "О магазине",
    login: "Вход",
    register: "Регистрация",
  },

  cart: {
    heading: "Корзина",
    price: "Цена",
    total: "Итого",
    checkout: "Оформить",
  },

  contact: {
    heading: "Свяжитесь с нами",
    name: "Имя",
    email: "Эл. почта",
    subject: "Тема",
    message: "Сообщение",
    send: "Отправить",
    success: "Ваше сообщение успешно отправлено!",

    validation: {
      nameRequired: "Введите имя",
      nameMax: "Максимум 255 символов",
      notOnlySpaces: "Поле не может состоять только из пробелов",
      emailRequired: "Введите Email",
      emailFormat: "Неверный формат Email",
      subjectRequired: "Введите тему сообщения",
      subjectMax: "Максимум 255 символов",
      messageRequired: "Введите сообщение",
      messageMin: "Минимальная длина сообщения — 10 символов",
    },
  },

  errorNotFound: {
    message: "Ой, здесь ничего нет...",
    goHome: "На главную",
  },

  index: {
    heading: "Добро пожаловать в My Shop!",
    description:
      "Мы рады видеть вас здесь. Исследуйте качественные товары по лучшим ценам.",
    viewProducts: "Смотреть товары",
  },

  loginPage: {
    heading: "Вход",
    emailLabel: "Эл. почта",
    passwordLabel: "Пароль",
    loginBtn: "Войти",
    dontHaveAccount: "Нет аккаунта? Зарегистрируйтесь",
    invalidCreds: "Неверные учетные данные. Проверьте Email/Пароль.",
    somethingWrong: "Произошла ошибка. Попробуйте ещё раз.",
    emailNotVerified:
      "Ваш email ещё не подтверждён. Пожалуйста, проверьте почту.",
    resend: "Отправить письмо повторно",
    resentSuccess: "Письмо отправлено повторно. Проверьте почту.",

    validation: {
      emailRequired: "Укажите Email",
      emailFormat: "Неверный формат email",
      emailNoSpaces: "Email не может содержать пробелы",
      emailDomainDot: "В домене email должна быть точка",
      passRequired: "Укажите пароль",
      passMin: "Минимальная длина пароля: 8 символов",
      passNoSpaces: "Пароль не может содержать пробелы",
    },
  },

  registerPage: {
    heading: "Регистрация",
    nameLabel: "Имя",
    emailLabel: "Эл. почта",
    passwordLabel: "Пароль",
    confirmPasswordLabel: "Подтвердите пароль",
    registerBtn: "Зарегистрироваться",
    alreadyHaveAccount: "Уже есть аккаунт? Войти",
    successTitle: "Регистрация успешна!",
    successText:
      "Мы отправили письмо на вашу почту. Подтвердите e-mail, чтобы войти.",
    goToLogin: "Перейти ко входу",
    notAuthorized: "У вас нет прав для регистрации.",
    somethingWrong: "Произошла ошибка. Попробуйте снова.",

    validation: {
      nameRequired: "Введите имя",
      nameMax: "Максимум 255 символов",
      nameNoSpaces: "Имя не может состоять только из пробелов",
      nameNoDigits: "Имя не может состоять только из цифр",

      emailRequired: "Введите Email",
      emailFormat: "Неверный формат Email",
      emailNoSpaces: "Email не может содержать пробелы",
      emailDomainDot: "В домене Email должна быть точка",

      passRequired: "Введите пароль",
      passMin: "Минимальная длина пароля — 8 символов",
      passNoSpaces: "Пароль не может содержать пробелы",

      passMatch: "Пароли должны совпадать",
      passConfirm: "Подтвердите пароль",
    },
  },

  productsPage: {
    heading: "Товары",
    searchFilter: "Поиск и фильтр",
    searchPlaceholder: "Поиск товаров...",
    allCategories: "Все категории",
    allProducts: "Все товары:",
    addToCart: "В корзину",
  },

  profilePage: {
    heading: "Профиль",
    hello: "Привет",
    yourEmail: "Ваш email",
    logoutBtn: "Выйти",
  },

  verified: {
    title: "Email подтвержден",
    description:
      "Ваш email успешно подтвержден. Теперь вы можете войти в систему.",
    closingIn: "Страница будет закрыта через",
    manualClose: "Вы можете закрыть эту страницу вручную и вернуться к входу.",
  },

  productPage: {
    addToCart: "Добавить в корзину",
    backToList: "Назад к товарам",
  }
};
