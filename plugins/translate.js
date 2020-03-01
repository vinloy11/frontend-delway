import Vue from "vue";

export default  ({store, req, app}) => {
  if (process.client) {
    if (store.getters['translate/translated']) return;
    store.dispatch('translate/translatePage');

  }
  if (!req) {
    let language = navigator.language.substr(0, 2);
    if (app.$cookies.get('language') === language) return;
    app.$cookies.set('language', language, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7 * 4
    });
    return
  }
  let language = req.headers['accept-language'].substr(0, 2);

  if (app.$cookies.get('language') === language) return;
  app.$cookies.set('language', JSON.stringify(language), {
    path: '/',
    maxAge: 60 * 60 * 24 * 7 * 4
  });
}

export const words = store => (store.getters['translate/words']);

