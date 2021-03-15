const cookieparser = process.server ? require("cookieparser") : undefined

export const state = () => {
  return {
    user: null
  }
}

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  }
}

export const actions = {
  /**
   * nuxtServerInit 是一个特殊的action方法
   * 在服务端渲染期间自动调用
   * 作用: 初始化容器数据, 传递数据给客户端使用
   * @param {*} param0 
   * @param {*} param1 
   */
  nuxtServerInit({ commit }, { req }) {
    let user = null
    const cookie = req.headers.cookie
    if (cookie) {
      const parsed = cookieparser.parse(cookie)
      try {
        user = parsed.user ? JSON.parse(parsed.user) : undefined
      } catch (error) {
        console.log(error)
      }
    }
    commit("setUser", user)
  }
}