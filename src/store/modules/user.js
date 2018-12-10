import {getUserToken, getUserObject, userRegister, updateUser} from './../../config'

const state = {
  status: '',
  token: localStorage.getItem('token') || '',
  user: localStorage.getItem('user') || {}
}

const mutations = {
  AUTH_REQUEST(state){
    state.status = 'loading'
  },
  AUTH_SUCCESS(state, user){
    state.status = 'success'
    state.token = user.token
    state.user = user
  },
  AUTH_SUCCESS_UPDATE(state){
    state.status = 'success'
  },
  AUTH_ERROR(state){
    state.status = 'error'
  },
  LOGOUT(state){
    state.status = ''
    state.token = ''
    state.user = {}
  }
}
const actions = {
  /*
//    Login user function
//
*/
  login({commit}, user){
    return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        axios({
          url: getUserToken, 
          data: user, 
          method: 'POST'
        }).then(resp => {
            const token = resp.data.access_token
            axios.get(getUserObject, {headers: {'Access': "application/json",'Authorization': 'Bearer ' + token}})
            .then(resp =>{
              let user = {}
              user.id = resp.data.id
              user.name = resp.data.name
              user.email = resp.data.email
              user.token = token
              window.localStorage.setItem('user', JSON.stringify(user))
              window.localStorage.setItem('token', token)
              commit('AUTH_SUCCESS', user)
              resolve(resp)
            })
        })
        .catch(err => {
            let errorMessage = err.response.data 
            commit('alert/error', errorMessage,{ root: true })
            commit('AUTH_ERROR')
            window.localStorage.removeItem('token')
            localStorage.removeItem('user')
            reject(err)
        })
    })
},
/*
//    Register new user function
//
*/
register({commit}, user){
  return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        axios({url: userRegister, data: user, method: 'POST'})
        .then(resp => {
            let token = resp.data.token
            let user = {}
              user.name = resp.data.name
              user.email = resp.data.email
              user.token = token
            axios.defaults.headers.common['Authorization'] = token
            commit('AUTH_SUCCESS', user)
            resolve(resp)
        })
        .catch(err => {
            commit('alert/error', err.response.data ,{ root: true })
            commit('AUTH_ERROR', )
            console.log(err)
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('user')
            reject(err)
        })
    })
},
/*
//    Logout user
//
*/
update({commit}, content){
  return new Promise((resolve, reject) => {
      commit('AUTH_REQUEST')
      let userObj = JSON.parse(localStorage.getItem('user'))
      axios({
        url: updateUser + userObj.id, 
        data: content, 
        method: 'POST'
      }).then(resp => {
        commit('AUTH_SUCCESS_UPDATE')
        commit('alert/success', 'Language has been succesfully changed!',{ root: true })
        resolve(resp)
      })
      .catch(err => {
          let errorMessage = err.response.data 
          console.log(errorMessage)
          commit('alert/error', err,{ root: true })
          commit('AUTH_ERROR')
          reject(err)
          window.localStorage.removeItem('token')
          window.localStorage.removeItem('user')
          
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
  userObject: state => state.user
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
