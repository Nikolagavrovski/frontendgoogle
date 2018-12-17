const state = {
    isLoading: false,
    isCancable: false,
    infinityState: +new Date(),
}

const mutations = {
    setLoadingState(state, data) {
        state.isLoading = data
    },
    setCancelability(state, data) {
        state.isCancable = data
    },
    setInfinityState(state) {
        state.infinityState += 1
    }
}

const actions = {
    setLoadingState({ commit }, data) {
        commit('setLoadingState', data)     
    },
    setCancelability({ commit }, data) {
        commit('setCancelability', data)
    },
    setInfinityState({ commit }) {
        commit('setInfinityState')
    }
}

const getters = {
    isLoadingStateActive: state => state.isLoading,
    isCancableState: state => state.isCancable,
    infinityValue: state => state.infinityState
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  }