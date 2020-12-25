// 将系统默认的路由规则废除，重新配路由规则
module.exports = {
    router: {
        linkActiveClass: 'active',
        extendRoutes(routes, resolve) {
            routes.splice(0)
            routes.push(...[
                {
                    path: '/',
                    component: resolve(__dirname, 'pages/layout/'),
                    children: [{
                        path: '/',
                        name: 'home',
                        component: resolve(__dirname, 'pages/home/')
                    },
                    {
                        path: '/login',
                        name: 'login',
                        component: resolve(__dirname, 'pages/login/')
                    },
                    {
                        path: '/register',
                        name: 'register',
                        component: resolve(__dirname, 'pages/login/')
                    },
                    {
                        path: '/settings',
                        name: 'settings',
                        component: resolve(__dirname, 'pages/settings/')
                    },
                    {
                        path: '/article/:slug',
                        name: 'article',
                        component: resolve(__dirname, 'pages/article/')
                    },
                    {
                        path: '/profile/:username',
                        name: 'profile',
                        component: resolve(__dirname, 'pages/profile/')
                    },
                    {
                        path: '/create',
                        name: 'create',
                        component: resolve(__dirname, 'pages/create/')
                    }
                    ]
                }
            ])
        }
    },
    server: {
        host: '0.0.0.0',
        port: 3000
    },
    // 注册插件
    plugins: [
        '~/plugins/request.js',
        '~/plugins/dayjs.js'
    ]
}