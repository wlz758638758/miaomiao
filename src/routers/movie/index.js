export default {
    path: '/movie',
    component: () =>
        import ('@/views/Movie'),
    children: [{
            path: 'city',
            component: () =>
                import ('@/components/City')
        },
        {
            path: 'nowPlaying',
            component: () =>
                import ('@/components/NowPlaying')
        },
        {
            path: 'comingSoon',
            component: () =>
                import ('@/components/ComingSoon')
        },
        {
            path: 'search',
            component: () =>
                import ('@/components/Search')
        },

        {
            path: 'detail/1/:movieId',
            //命名视图
            components: {
                default: () =>
                    import ('@/components/NowPlaying'),
                //引入detail路由的组件
                detail: () =>
                    import ('@/views/Movie/detail')
            },
            props: {
                detail: true
            }
        },

        {
            path: 'detail/2/:movieId',
            //命名视图
            components: {
                default: () =>
                    import ('@/components/ComingSoon'),
                //引入detail路由的组件
                detail: () =>
                    import ('@/views/Movie/detail')
            },
            props: {
                detail: true
            }
        },

        {
            path: '/movie',
            redirect: '/movie/nowPlaying'
        }

    ]
}