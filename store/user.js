const user = {
  name: 'Андрей',
  lastName: 'Шторк',
  photo: '',
  email: 'zomoro@mail.ru',
  phone: '88005553535',
  country: 'Russia',
  city: 'Novosibirsk'
};

export const state = () => ({
  user: {}
});

export const getters = {
  user(state) {
    return user
  }
};

export const mutations = {
  fetchUser(state, user) {
    return state.user = user
  }
};

export const actions = {
  async fetchUser({commit}) {
    return commit('fetchUser', user)
  },
};
