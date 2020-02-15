import { debounce } from '~/plugins/debounce.js'
export default {
  bind: function (el, bindings) {
    const { wait, func, immediate } = bindings.value;
    el.addEventListener(bindings.arg, debounce(func, wait, immediate))
  },
}

