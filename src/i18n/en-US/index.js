export default {
  about: {
    heading: "About<br />My Shop",
    description1:
      "My Shop is an online store dedicated to providing high-quality products at competitive prices. Our mission is to offer an exceptional shopping experience by combining quality, affordability, and outstanding customer service.",
    description2:
      "This website is built using the Quasar Framework and Vue.js, leveraging modern web technologies to deliver a seamless and responsive interface for our customers.",
    description3:
      "Thank you for visiting our store. We are continuously working to improve and expand our offerings.",
  },

  layout: {
    myShop: "My Shop",
    navigation: "Navigation",
    home: "Home",
    products: "Products",
    profile: "Profile",
    cart: "Cart",
    contactUs: "Contact Us",
    about: "About",
  },

  userLayout: {
    myShop: "My Shop",
    navigation: "Navigation",
    home: "Home",
    products: "Products",
    profile: "Profile",
    cart: "Cart",
    contactUs: "Contact Us",
    about: "About",
    login: "Login",
    register: "Register",
  },

  cart: {
    heading: "Shopping Cart",
    price: "Price",
    total: "Total",
    checkout: "Checkout",
  },

  contact: {
    heading: "Contact Us",
    name: "Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    send: "Send",
  },

  errorNotFound: {
    message: "Oops. Nothing here...",
    goHome: "Go Home",
  },

  index: {
    heading: "Welcome to My Shop!",
    description:
      "We are glad to have you here. Discover high-quality products at the best prices.",
    viewProducts: "View Products",
  },

  loginPage: {
    heading: "Login",
    emailLabel: "Email",
    passwordLabel: "Password",
    loginBtn: "Login",
    dontHaveAccount: "Don't have an account? Register",
    invalidCreds: "Invalid credentials. Please check your Email/Password.",
    somethingWrong: "Something went wrong. Please try again.",

    validation: {
      emailRequired: "Email is required",
      emailFormat: "Invalid email format",
      emailNoSpaces: "Email cannot contain spaces",
      emailDomainDot: "Email domain must contain a dot",
      passRequired: "Password is required",
      passMin: "Password must be at least 8 characters",
      passNoSpaces: "Password cannot contain spaces",
    },
  },

  registerPage: {
    heading: "Register",
    nameLabel: "Name",
    emailLabel: "Email",
    passwordLabel: "Password",
    confirmPasswordLabel: "Confirm Password",
    registerBtn: "Register",
    alreadyHaveAccount: "Already have an account? Login",

    notAuthorized: "You are not authorized to register.",
    somethingWrong: "Something went wrong. Please try again.",

    validation: {
      nameRequired: "Name is required",
      nameMax: "Name must be at most 255 characters",
      nameNoSpaces: "Name cannot be only spaces",
      nameNoDigits: "Name cannot be only digits",

      emailRequired: "Email is required",
      emailFormat: "Invalid email format",
      emailNoSpaces: "Email cannot contain spaces",
      emailDomainDot: "Email domain must contain a dot",

      passRequired: "Password is required",
      passMin: "Password must be at least 8 characters",
      passNoSpaces: "Password cannot contain spaces",

      passMatch: "Passwords must match",
      passConfirm: "Please confirm your password",
    },
  },

  productsPage: {
    heading: "Products",
    searchFilter: "Search & Filter",
    searchPlaceholder: "Search products...",
    allCategories: "All categories",
    allProducts: "All products:",
    addToCart: "Add to Cart",
  },

  profilePage: {
    heading: "Profile Page",
    hello: "Hello",
    yourEmail: "Your email",
    logoutBtn: "Logout",
  },
};
