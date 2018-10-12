import Vue from 'vue'
import {userListUrl, getHeader} from './../../config'

const state = {
  userList: {}
}

const mutations = {
  SET_USER_LIST(state, userList) {
    state.userList = userList
  }
}

const action = {
  setUserList: ({commit}, userList) => {
    return axios.get(userListUrl, {headers: getHeader()})
    .then(response => {
      console.log(response)
      if (response.status = 200) {
        commit('SET_USER_LIST', response.data)
        return response.data
      }
    })
  }
}

export default {
  state, mutations, action
}
