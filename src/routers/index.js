import Vue from 'vue'
import Router from 'vue-router'
import movieRouter from './movie'
import mineRouter from './mine'
import cinemaRouter from './cinema'


Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        movieRouter,
        mineRouter,
        cinemaRouter,
        // 输入任意位置， 跳转回movie页面
        {
            path: '/*',
            redirect: '/movie'
        }
    ]
})