export const state = () => ({
  fields: []
});

export const getters = {
  fields: state => (state.fields),
  value: (state, name) => (state.fields[name])
};

export const mutations = {
  createField(state, name) {
    state.push(name)
  },
  async updateValue({commit, state}, field) {
    if (state[field.name]) {
      state[field.name] = state.value;
      return
    }
    await commit.createField();
    state[field.name] = state.value
  }
};

export const actions = {

};
