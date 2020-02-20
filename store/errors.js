export const state = () => ({
  errors: [],
  ids: [],
  isValid: false,
  hints: {}
});

export const getters = {
  errors: state => state.errors,
  ids: state => state.ids,
  isValid: state => state.isValid
};

export const mutations = {
  addError: (state, error) => state.errors.unshift(error),
  popError: state => state.errors.pop(),
  addHint: (state, id) => {
    const match = state.ids.find(item => item === id);
    state.isValid = false ;
    return match ? '' : state.ids.push(id)
  },
  removeHint: (state, id) => {
    state.ids = state.ids.filter(item => item !== id);
    return state.ids.length ? state.isValid = false : state.isValid = true
  },
  removeHints: async state => {
    state.ids = [];
    state.hints = {};
  },
};

export const actions = {
  populateErrors: ({ commit }, error) => {
    // commit('addError', error);
    // setTimeout(() => commit('popError'), 3000);
  },
};
