const cookieParser = process.server ? require('cookieparser') : undefined
// 在服务端渲染期间运行都是同一个实例
// 为了防止数据冲突，务必要把state定义成一个函数，返回数据对象
export const state = () => {
    return {
        // 当前登录用户的登录状态
        user: null
    }
}

export const mutations = {
    setUser(state, data) {
        state.user = data
    }
}

export const actions = {
    // nuxtServeInit是一个特殊的action方法
    // 这个action会在服务端渲染期间自动调用
    // 作用：初始化容器数据，传递数据给客户端使用
    nuxtServerInit({ commit }, { req }) {
        // 初始化容器以及需要传递给客户端的数据
        // 这个特殊的action只会在服务端渲染期间运行
        let user = null
        // 如果请求头中有Cookie
        if (req.headers.cookie) {
            // 使用cookieparser把cookie字符串解析成js对象
            const parsed = cookieParser.parse(req.headers.cookie)
            try {
                user = JSON.parse(parsed.user)
            } catch (err) {

            }
        }
        // 提交mutations修改state状态
        commit('setUser', user)
    }
}