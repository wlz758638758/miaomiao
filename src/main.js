import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'

import axios from 'axios'
Vue.prototype.axios = axios; //之后就可以通过this的方式引入axios

//设置全局的过滤器，设置电影图片的大小
Vue.filter('setWH', (url, arg) => {
    return url.replace(/w\.h/, arg); //replace w和h，变成自己传进来的arg
});

//全局的滑动组件
import Scroller from '@/components/Scroller'
Vue.component('Scroller', Scroller);

//全局的loading组件
import Loading from '@/components/Loading'
Vue.component('Loading', Loading);


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')