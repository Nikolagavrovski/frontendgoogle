const state = {
    type: null,
    message: null
}

const actions = {
    success({ commit }, message) {
        commit('success', message);
    },
    error({ commit }, message) {
        commit('error', message);
    },
    clear({ commit }, message) {
        commit('success', message);
    }
}

const mutations = {
    success(state, message) {
        state.type = 'alert-success';
        state.message = message;
    },
    error(state, message) {
        state.type = 'alert-danger';
        state.message = message;
    },
    clear(state) {
        state.type = null;
        state.message = null;
    }
}

const getters = {
    errorType: state => state.type,
    errorMessage: state => state.message
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  }