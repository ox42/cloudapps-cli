import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import notes from './notes';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: auth,
    notes: notes
  }
});
