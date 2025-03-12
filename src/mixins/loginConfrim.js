export default {
  // 此处编写的就是vue组件实例的配置项 通过一定语法 可以直接混入到组件内部
  // data methods computed 生命周期函数...
  // 1、如果此处提供了和组件内同名的data或methods 则组件内的优先级更高
  // 2、弱国此处编写了周期函数 则mixins中的生命周期函数 和 页面中的生命周期函数
  // 则会将其统一用数组管理 不会冲突
  methods: {
    loginConfirm () {
      // 判断token是否存在
      // 1. 若存在：继续加入购物车操作
      // 2. 不存在：提示用户未登录，引导到登录页
      if (!this.$store.getters.token) {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '此操作需要登录才能继续操作哟',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        })
          .then(() => {
            // on confirm 确认后操作
            // 希望登录后能回弹回来 需要在跳转去携带参数 (当前路径地址)
            // this.$route.fullPath(会包含查询参数)
            this.$router.replace({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {
            // on cancel 取消后操作
          })
        return true
      }
      return false
    }
  }
}
