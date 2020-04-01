import Vue from "vue";
import Vuex from "vuex";
import getters from "store/getters";
import appMain from "store/modules/appMain";
import channelization from "store/modules/channelization";

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    appMain,
    channelization
  },
  getters
});

export default store;
