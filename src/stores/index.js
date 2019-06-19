import Vue from 'vue'
import Vuex from 'vuex'
import city from './city';
Vue.use(Vuex)

export default new Vuex.Store({
    state: {

    },
    mutations: {

    },
    actions: {

    },
    //引入子状态
    modules: {
        city
    }
})