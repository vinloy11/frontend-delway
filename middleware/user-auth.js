import Cookie from 'cookie'
import Cookies from 'js-cookie'
export default function({redirect, store, route}) {
  if (!store.getters['authUser/isAuthenticated']) {

    // store.commit('history/updateRoute', route);
    // console.log(store.getters['history/oldValue'])
    redirect('/?message=login')
  }
}
// export default function (context) {
//   console.log(context)
// }
