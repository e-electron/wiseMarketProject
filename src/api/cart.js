import request from '@/utils/request'

// 加入购物车
// goodsId商品id  goodsSkuId商品规格id
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 获取购物车列表
// 想把发请求这个异步的操作放到vuex中去统一管理
export const getCartList = () => {
  return request.get('/cart/list')
}

// 更新购物车数据
export const changeCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 删除购物车
export const delSelect = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
