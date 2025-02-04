export const state = () => ({
  token: false
});

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = null
  }
};

export const actions = {
  async login({commit, dispatch, getters}, formData) {
    console.log('lle')
    try {
      console.log(getters['isAuthenticated']);
      const token = await new Promise((resolve, reject) => {
        setTimeout(() => resolve('mock-token'), 1000)
      });
      dispatch('setToken', token);
      console.log(getters['isAuthenticated']);
    } catch (e) {
      commit('setError', e, {root: true});
      throw e
    }
  },
  async createUser({commit}, formData) {
    try {
      console.log('createUser', formData)
    } catch (e) {

    }
  },
  setToken({commit}, token) {
    commit('setToken', token)
  },
  logout({commit}) {
    commit('clearToken')
  }
};

export const getters = {
  isAuthenticated: state => Boolean(state.token)
};
