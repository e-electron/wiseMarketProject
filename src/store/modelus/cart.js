import { getCartList, changeCount, delSelect } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    // 提供一个设置cartList的mutation
    setCartList (state, newList) {
      state.cartList = newList
    },
    toggleCheck (state, id) {
      // 让对应的id项的状态取反
      const goods = state.cartList.find(item => item.goods_id === id)
      goods.isChecked = !goods.isChecked
    },
    // 全选
    toggleAllCheck (state, flag) {
      // 让所有小选框同步设置
      state.cartList.forEach(item => { item.isChecked = flag })
    },
    changeCount (state, { goodsNum, goodsId }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      // console.log(goods)

      goods.goods_num = goodsNum
    }
  },
  getters: {
    // 求所有商品累加总数
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品项
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中的总数
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中商品总价
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_min, 0).toFixed(2)
    },
    // 是否全选
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  },
  actions: {
    async getCartAction (context) {
      const { data } = await getCartList()
      // 后台返回数据中不包含复选框的选中状态 为了实现将来功能
      // 需要手动维护数据 给每一项 添加一个ischeked状态 标记当前商品是否选中
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    },
    async changeCountAction (context, obj) {
      const { goodsNum, goodsId, goodsSkuId } = obj
      // 先本地修改 再同步到后台
      context.commit('changeCount', { goodsNum, goodsId })
      await changeCount(goodsId, goodsNum, goodsSkuId)
      // console.log(res)
    },
    async delSelect (context) {
      const selCartList = context.getters.selCartList
      const cartIds = await selCartList.map(item => item.id)
      delSelect(cartIds)
      Toast('删除成功')

      // 重新拉取购物车数据
      context.dispatch('getCartAction')
    }
  }
}
