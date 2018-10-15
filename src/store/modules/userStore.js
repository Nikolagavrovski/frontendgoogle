import {getUserToken, getUserObject} from './../../config'

const state = {
  status: '',
  token: localStorage.getItem('token') || '',
  user: ''
}

const mutations = {
  AUTH_REQUEST(state){
    state.status = 'loading'
  },
  AUTH_SUCCESS(state, token, user){
    console.log(user)
    console.log(state)
    console.log(token)
    state.status = 'success'
    state.token = token
    state.user = user
  },
  AUTH_ERROR(state){
    state.status = 'error'
  },
  LOGOUT(state){
    state.status = ''
    state.token = ''
  }
}

const actions = {
  login({commit}, user){
    return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        axios({
          url: getUserToken, 
          data: user, 
          method: 'POST'
        }).then(resp => {
          console.log(resp)
            //const user = {}
            const token = resp.data.access_token
            //user.access_token = resp.data.access_token
            axios.get(getUserObject, {headers: {'Access': "application/json",'Authorization': 'Bearer ' + token}})
            .then(resp =>{
              const userObject = "12cwckporakpowxr12"
              //user.name = resp.data.name
              //user.email = resp.data.email
              window.localStorage.setItem('token', token)
              window.localStorage.setItem('user', userObject)
              //localStorage.setItem('user', JSON.stringify(user))
              console.log(userObject)
              commit('AUTH_SUCCESS', token, userObject)
              resolve(resp)
            })
        })
        .catch(err => {
            commit('AUTH_ERROR')
            localStorage.removeItem('token')
            reject(err)
        })
    })
},
register({commit}, user){
  return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        axios({url: 'http://localhost:3000/register', data: user, method: 'POST' })
        .then(resp => {
            console.log(resp);
            const token = resp.data.token
            const user = resp.data.user
           // window.localStorage.setItem('token', token)
            // Add the following line:
            axios.defaults.headers.common['Authorization'] = token
            commit('AUTH_ERROR', token, user)
            resolve(resp)
        })
        .catch(err => {
            commit('auth_error', err)
            window.localStorage.removeItem('token')
            reject(err)
        })
    })
},
  logout({commit}){
    return new Promise((resolve, reject) => {
        commit('LOGOUT')
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('user')
        delete axios.defaults.headers.common['Authorization']
        resolve()
    })
  }
}

const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
