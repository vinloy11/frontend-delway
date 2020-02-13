import Vue from "vue";
import VueLazyload from "vue-lazyload";

import error from "~/assets/svg/logo.svg";
import loading from "~/assets/svg/user/notify.svg";

Vue.use(VueLazyload, {
  preLoad: 1,
  lazyComponent: true,
  error: error,
  loading: loading,
  attempt: 1
});
