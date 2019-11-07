// 取到需要权限判断的路由表
import router from '@/router'
import { filterAsyncRouter } from '@/store/modules/asyncMenu'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { buildMenus } from '@/api/menu'
router.beforeEach((to, from, next) => {
  // 取到用户的角色
  let token = getToken()
  // 如果登录了
  if (token && token.length > 0 && token !== undefined) {
    var userstate = store.state.user.user
    // 判断当前用户是否已拉取完user_info信息
    if (!global.addRouFlag) {
      global.addRouFlag = true
      // 拉取user_info
      store.dispatch('GetInfo').then(res => {
        // 动态路由，拉取菜单
        loadMenus(res.id, next, to)
        store.commit('SET_USER', res)
      }).catch((err) => {
        console.log(err)
        store.dispatch('Logout').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
      // 登录时未拉取 菜单，在此处拉取
    } else if (store.getters.loadMenus) {
      // 修改成false，防止死循环
      store.dispatch('updateLoadMenus').then(res => {})
      loadMenus(userstate.id, next, to)
    } else {
      next()
    }
  } else {
    // 用户没登录，跳转到登录页面
    if (to.path === '/') {
      next()
    } else {
      next('/')
    }
  }
})

export const loadMenus = (uid, next, to) => {
  buildMenus(uid).then(res => {
    const asyncRouter = filterAsyncRouter(res.data)
    asyncRouter.push({ path: '*', redirect: '/404', hidden: true })
    // 1.利用global属性，让渲染菜单的组件sideMeuns.vue重新生成左侧菜单
    global.antRouter = asyncRouter
    // 2.将生成好的路由addRoutes
    router.addRoutes(asyncRouter)
    // 3.push之后，会重新进入到beforeEach的钩子里,直接进入第一个if判断
    // router.push({path: to.path})
    // hack方法 确保addRoutes已完成
    next({ ...to, replace: true })
  })
}
