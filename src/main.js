import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'

import axios from 'axios'
Vue.prototype.axios = axios; //之后就可以通过this的方式引入axios

//设置全局的过滤器，设置电影图片的大小
Vue.filter('setWH', (url, arg) => {
    return url.replace(/w\.h/, arg); //replace w和h，变成自己传进来的arg
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')