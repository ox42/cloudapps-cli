import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false;

Vue.directive('focus', {
  inserted: function (el, binding) {
    if (el.tagName === 'INPUT') {
      el.focus()
    } else {
      el.querySelector('input').focus()
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
