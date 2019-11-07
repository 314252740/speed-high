import Vue from 'vue'
import Router from 'vue-router'
const layout = () => import('@/views/layout/index')
// 登录页
const Login = () => import('@/views/login/index')
const main = () => import('@/views/index')
Vue.use(Router)
// 固定的路由表
export const fixedRouter = [
  { path: '', component: Login, hidden: true },
  {
    path: '/redirect',
    component: layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '',
    component: layout, // 整体页面的布局(包含左侧菜单跟主内容区域)
    children: [{
      path: 'main',
      component: main,
      meta: {
        title: '首页', // 菜单名称
        roles: ['user', 'admin'], // 当前菜单哪些角色可以看到
        icon: 'el-icon-info' // 菜单左侧的icon图标
      }
    }]
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  // 登入地图界面
  {
    path: '/map',
    name: 'map',
    component: () => import('@/views/map/index')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/testAPI/testAPI')
  }
]
export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: fixedRouter
})
