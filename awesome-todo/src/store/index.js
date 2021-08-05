import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import mainPage from './main-page/index'
import users from './users/index'
import wallets from './wallets/index'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      mainPage,
      users,
      wallets
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
