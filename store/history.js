export const state = () => ({
  route: {
    path: null,
    params: null
  }
});

export const getters =  {
  oldValue: state => (state.route)
};

export const mutations = {
  updateRoute(state, newRoute) {
    state.route = newRoute
  }
};
