import {getContacts} from './../../config';

const state = {
    contacts: {},
    messages: [],
}

const mutations = {
    SET_USER_CONTACTS(state, payload) {
        state.contacts = payload
    }
}

const actions = {
getContacts({commit}, payload){
        axios({
        url: getContacts, 
        method: 'GET'
        }).then(resp => {    
            console.log(resp)
        if (resp.status == 200)
        {
            const payload = resp.data
            console.log(payload)
            commit('SET_USER_CONTACTS', payload)
        }
          })        
    }
}

const getters = {
    getAllContacts: state => state.contacts
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  }