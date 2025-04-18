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
    success: "Your message has been sent successfully!",

    validation: {
      nameRequired: "Name is required",
      nameMax: "Name must be at most 255 characters",
      notOnlySpaces: "Field cannot be only spaces",
      emailRequired: "Email is required",
      emailFormat: "Invalid email format",
      subjectRequired: "Subject is required",
      subjectMax: "Subject must be at most 255 characters",
      messageRequired: "Message is required",
      messageMin: "Message must be at least 10 characters",
    },
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
    emailNotVerified: "Your email is not verified. Please check your inbox.",
    resend: "Resend verification email",
    resentSuccess: "Verification email resent. Please check your inbox.",

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
    successTitle: "Registration Successful!",
    successText:
      "We’ve sent a verification email. Please confirm it before logging in.",
    goToLogin: "Go to Login",
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
    inCart: "In Cart",
    recentlyViewed: "Recently Viewed",
  },

  profilePage: {
    heading: "Profile Page",
    hello: "Hello",
    yourEmail: "Your email",
    logoutBtn: "Logout",
    wishlistTitle: "Items in your Wishlist",
    wishlistEmpty: "You have no items in your Wishlist yet",
  },

  verified: {
    title: "Email Verified",
    description:
      "Your email has been successfully verified. You can now log in.",
    closingIn: "This page will close in",
    manualClose: "You can close this tab manually and return to login.",
  },

  productPage: {
    addToCart: "Add to Cart",
    backToList: "Back to Products",
    recentlyViewed: "Recently Viewed",
    noViewed: "No viewed products yet",
    inCart: "In Cart",
    relatedProducts: "You may also like",
  },
};
