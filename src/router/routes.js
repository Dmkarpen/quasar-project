const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'about', component: () => import('pages/AboutPage.vue') },
      { path: 'products', component: () => import('pages/ProductsPage.vue') },
      { path: 'cart', component: () => import('pages/CartPage.vue') },
      { path: 'contact', component: () => import('pages/ContactUsPage.vue') },
    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/UserLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'register', component: () => import('pages/RegisterPage.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
