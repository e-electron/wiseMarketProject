import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/layout'
// 二级路由
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'

import store from '@/store'

// 改写成异步组件 按需加载
const Login = () => import('@/views/login')
const Search = () => import('@/views/search')
const Searchlist = () => import('@/views/search/list')
const ProDetail = () => import('@/views/prodetail')
const Pay = () => import('@/views/pay')
const MyOrder = () => import('@/views/myorder')

// 如果到一个文件夹里边的vue是index开头的，只用配置到文件夹名字
// 它会自动加载到下边的index文件

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: 'home', component: Home },
        { path: 'category', component: Category },
        { path: 'cart', component: Cart },
        { path: 'user', component: User }
      ]
    },
    { path: '/search', component: Search },
    { path: '/searchlist', component: Searchlist },
    // 动态路由传参 确认将来你是那个商品 路由参数中携带id
    { path: '/proDetail/:id', component: ProDetail },
    { path: '/pay', component: Pay },
    { path: '/myOrder', component: MyOrder }
  ]
})

// 所有的路由一旦被匹配到（真正被访问到之前），都会先经过全局前置守卫
// 只有全局前置守卫放行，才会真正解析渲染组件，才能看到页面内容
// 全局前置导航守卫
// to: Route: 即将要进入的目标 路由对象
// from: Route: 当前导航正要离开的路由
// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。\
// 1. next(): 直接放行,去to要去的路径
// 2. next(路径):进行拦截 拦截到next里面的路径去

// 定义一个数组 专门存储用户存放放的所有需要权限的页面
const authUrls = ['/pay', '/myorder']

router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  // 看to.path是否在authUrls中出现过
  if (!authUrls.includes(to.path)) {
    // 非权限页面直接放行
    next()
    return
  }

  // 是权限页面 需要token
  const token = store.getters.token
  // console.log(token)
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
