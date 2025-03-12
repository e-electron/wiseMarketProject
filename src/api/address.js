import request from '@/utils/request'

// 添加收货地址
export const addAddressList = () => {
  return request.post('/address/add', {
    form: {
      name: '张小二',
      phone: '18999292929',
      region: [
        {
          value: 782,
          label: '上海'
        },
        {
          value: 783,
          label: '上海市'
        },
        {
          value: 785,
          label: '徐汇区'
        }
      ],
      detail: '北京路1号楼8888室'
    }
  })
}

// 获取订单地址列表
export const getAddressList = () => {
  return request.get('/address/list')
}
