export const state = () => ({
  errors: [],
});

export const getters = {
  errors: state => state.errors,
};

export const mutations = {
  addError: (state, error) => state.errors.unshift(error),
  popError: state => state.errors.pop(),
};

export const actions = {
  populateErrors: ({ commit }, error) => {
    commit('addError', error);
    // setTimeout(() => commit('popError'), 3000);
  },
};

