import Vue from "vue";
import DwDebounce from '~/plugins/directives/dw-debounce.js'
import {mask, masked} from 'vue-the-mask'

Vue.directive('dw-debounce', DwDebounce);
Vue.directive('dw-mask', mask);
Vue.directive('dw-masked', masked);
