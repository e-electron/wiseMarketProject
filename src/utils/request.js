import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
// import qs from 'qs'

// /创建axios实例，将来对创建出来的实例 进行自定义的配置
// 好处：不会污染原始的axios实例
// axios官网直接粘贴 的axios实例代码
const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded', // 添加全局Content-Type
    platform: 'H5'
  }
})

// 自定义配置-请求响应拦截器-官网粘贴

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 添加 loading 提示的好处：
  // 节流处理：防止多次点击，发送无效请求
  // 友好提示：请耐心等待，用户体验会更好
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    // 自定义配置loding 图标
    loadingType: 'spinner',
    // 默认等待两秒后自动消失,值为0时不会消失
    duration: 0
  })

  // 在发送请求之前做些什么
  // 只要有token 就在请求时携带 便于请求需要授权的接口
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么 (默认axios会多包装一层data 需要响应拦截器处理一下
  const res = response.data
  if (res.status !== 200) {
    // 给提示 抛出错误promise
    // toast默认是单例模式:后面的toast调用了,会覆盖前一个toast效果
    // 只能同时存在一个toast
    Toast(res.message)
    return Promise.reject(res.message)
  }
  // 正确逻辑 直接走业务核心逻辑 清除咯顶效果
  Toast.clear()
  // console.log(res)
  return res
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出配置好的实例
export default instance
