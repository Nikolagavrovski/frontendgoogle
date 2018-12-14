import Vue from 'vue'
import Vuex from 'vuex'


import user from './modules/user'
import alert from './modules/alert'
import messages from './modules/messages'

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user,
    alert,
    messages
  },
  strict: debug
})