import Vue from 'vue'
import Vuex from 'vuex'
import getters from 'store/getters'
import appMain from 'store/modules/appMain'

Vue.use(Vuex);
const store = new Vuex.Store({
   modules: {
     appMain
   },
  getters
});

export default store
