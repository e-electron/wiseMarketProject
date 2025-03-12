import { getInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      // 个人权证相关：每次刷新页面从本地拿 如果没有也是空
      userInfo: getInfo()
    }
  },
  getters: {

  },
  mutations: {
    // 所有mutations所有参数第一个都是state
    setUserInfo (state, newObj) {
      state.userInfo = newObj
      setInfo(newObj)
    }
  },
  actions: {
    logout (context) {
      // 个人人信息重置
      context.commit('setUserInfo', {})

      // 购物车信息重置（跨模块调用mutation） cart/mutations
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  modules: {
  }
}
