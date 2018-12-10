// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export const serverBus = new Vue();

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ChatPage from './pages/ChatPage'
import store from './store/store'
import _ from 'lodash'

// Infinitve scroll
import InfiniteLoading from 'vue-infinite-loading';
Vue.use(InfiniteLoading, { /* options */ });

Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(axios)
Vue.config.productionTip = false
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
Vue.component('app', App)
var $ = require("jquery");

const routes = [
  {path: '/', component: LoginPage, name: 'home'},
  {path: '/dashboard', component: DashboardPage, name: 'dashboard', meta: {requiresAuth: true}},
  {path: '/chat', component: ChatPage, name: 'chat', meta: {requiresAuth: true}},
  {path: '/register', component: RegisterPage, name: 'register'},
  {path: '*', redirect: '/' } // implement 'Page not found'
]

const router = new VueRouter ({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth) {
    let userObject = JSON.parse(window.localStorage.getItem('user'))
    if (userObject) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

new Vue({
  router, store
}).$mount('#app')
