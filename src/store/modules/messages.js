const state = {
    pageNumber: 2,
}

const mutations = {
    increase(state) {
        state.pageNumber++
    },
    clear(state) {
        state.pageNumber = 2
    }
}

const actions = {
    incrementPage(context) {
        context.commit('increase')
    },
    clearPage(context) {
        context.commit('clear')
    }
}

const getters = {
    getCurrentPN: state => state.pageNumber,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  }