import Vue from 'vue'
import Router from 'vue-router'

const index = resolve=>System.import('@/container/index')
const wangList = resolve=>System.import('@/container/wangList')
const redPackage = resolve=>System.import('@/container/redPackage')
const bind = resolve=>System.import('@/container/bind')
const bank = resolve=>System.import('@/container/bank')
const wx_info = resolve=>System.import('@/container/wx_info')

Vue.use(Router);

const router = new Router({
  routes: [
  {
    path: '/index',
    name:"首页",
    component: index,
    children:[
    {
      path: '/wangList',
      name:"账号列表",
      component: wangList
    },
    {
      path: '/redPackage',
      name:"红包列表",
      component: redPackage
    }
    ]
  },
  {
    path: '/bind',
    name:"绑定账号",
    component: bind
  },
  {
    path: '/bank',
    name:"绑定银行卡",
    component: bank
  },
  {
    path: '/wx_info',
    name:"个人资料",
    component: wx_info
  }
  

  ]
})
// 路由跳转前的钩子
router.beforeEach( (to, from, next) => {
  document.title = to.name
  next()
})
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}



export default router;
