import request from '@/utils/request'

// 订单结算
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode, // （buyNow立即购买 cart购物车）
      delivery: 10, // 快递
      couponId: 0, // 优惠券ID
      isUsePoints: 0, // 否使用积分抵扣（1使用 0不使用）
      ...obj// 将传过来的参数自定义展开
    }
  })
}

// 提交订单
// mode:cart =>obj{catIds,ramark}
// mode:buyNow=> obj{goodsId goodsNum goodsSkuId ramark}
export const submitOrder = (mode, obj) => {
  console.log(obj)

  return request.post('/checkout/submit', {
    mode,
    delivery: '10', // 快递
    couponId: 0, // 优惠券ID
    isUsePoints: 0, // 否使用积分抵扣（1使用 0不使用）
    // payType: 10,
    ...obj
  })
}

// 我的订单
export const getMyorderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
