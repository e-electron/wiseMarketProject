<template>
  <div class="login">
    <!-- 头部的静态结构 -->
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input class="inp" maxlength="11" placeholder="请输入手机号码" type="text" v-model="mobile">
        </div>
        <div class="form-item">
          <input class="inp" maxlength="5" placeholder="请输入图形验证码" type="text" v-model="picCode">
          <img v-if="picUrl" :src="picUrl" alt="" @click="getPicCode">
        </div>
        <div class="form-item">
          <input v-model="msgCode" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getCode">{{second===totalSecond?'获取验证码':second+'秒后重新发送'}}</button>
        </div>
      </div>

      <div @click="login" class="login-btn">登录</div>
    </div>
  </div>
</template>

<script>
// 按需导入
import { getPicCode, getMsgCode, codeLogin } from '@/api/login'
// import { Toast } from 'vant'
export default {
  data () {
    return {
      picKey: '', // 请求传递的图形验证码唯一标识
      picUrl: '', // 存储请求渲染的图片地址
      totalSecond: 60, // 总秒数
      second: 60, // 当前秒数，开定时器对 second
      timer: null, // 定时器id
      picCode: '', // 用户输入的图形验证码
      mobile: '', // 手机号
      msgCode: ''// 短信验证码
    }
  },
  name: 'LoginPage',
  created () {
    this.getPicCode()
    // console.log('created', this.$store.state.user.userInfo)
  },
  destroyed () {
    // 离开页面清除定时器
    clearInterval(this.timer)
  },
  methods: {
    // 获取图形验证码
    async getPicCode () {
      // 直接当成普通的axios使用就可以
      const { data: { base64, key } } = await getPicCode()
      this.picKey = key // 存储唯一标识
      this.picUrl = base64// 存储地址

      // Toast('获取图形验证码成功')
      // this.$toast('获取成功')
    },
    // 校验手机号和图形验证码是否合法
    valFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    // 获取短信验证码
    async getCode () {
      if (!this.valFn()) {
        // 如果没通过校验 不必再往下走
        return
      }

      // 当目前没有定时器开着 且 totalsecon === second 一致（秒数归位） 才可以倒计时
      if (!this.timer && this.totalSecond === this.second) {
        // 发送请求(如果响应status非200 最好抛出一个promise错误 await只会等待成功的promise)
        const res = await getMsgCode(this.picCode, this.picKey, this.mobile)
        console.log(res)
        this.$toast('短信发送成功，注意查收')

        // 开启倒计时
        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null// 定时器重置id
            this.second = this.totalSecond// 归位
          }
        }, 1000)
      }
    },

    // 登录
    async  login () {
      if (!this.valFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的短信验证码')
        return
      }

      console.log('发送登录请求')

      const res = await codeLogin(this.mobile, this.msgCode)
      this.$store.commit('user/setUserInfo', res.data)
      // console.log(this.$store.state.user.userInfo)
      this.$toast('登录成功')

      // 进行判断 看地址栏有无回跳地址
      // 1.有 : 其他页面拦截过来的 回跳
      // 2. 无 正常跳转进入首页
      const url = this.$route.query.backUrl || '/'
      // push 商品列表页=>商品详情页=>登录=>商品详情页
      // 导致点击回退 会退到登录页面 不希望这样 而是希望
      // 商品列表页=>商品详情页(登录页(商品详情页)) 回退时不退到登录页和再次退到商品详情页
      // this.$router.push(url)
      this.$router.replace(url)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
