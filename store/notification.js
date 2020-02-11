export const state = () => ({
  notifications: [
    {name: 'message', count: 12},
    {name: 'partner', count: 5},
    {name: 'partner', count: 22}
  ]
});

export const getters = {
  notifyCount: state => {
    const total = state.notifications
      .reduce((total, notify) => (total + notify.count), 0);
    if (total > 9 ) return '9+';
    return total
  }
};
