export default function({redirect, store, route, app}) {
  if (!store.getters['authUser/isAuthenticated']) {
    app.$cookies.set('history', JSON.stringify(route), {
      path: '/',
      maxAge: 60 * 60
    });
    redirect('/?message=login')
  }
}
