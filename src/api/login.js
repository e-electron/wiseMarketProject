// 此处用于存放所有跟登录相关的接口请求
import request from '@/utils/request'

// 按需导出

// 1. 获取图形验证码
export const getPicCode = () => {
  return request.get('/captcha/image')
}

// 2. 获取短信验证码
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

// 3. 登录接口
export const codeLogin = (mobile, smsCode) => {
  return request.post('/passport/login',
    { // 正确嵌套的请求体结构
      form: {
        isParty: false,
        mobile,
        partyData: {},
        smsCode: smsCode
      }
    },
    { // 配置项 (第三个参数)
      headers: {
        platform: 'H5',
        'Content-Type': 'application/json' // 明确指定JSON格式
      }
    }
  )
}
