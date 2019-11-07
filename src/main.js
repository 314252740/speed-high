import Vue from 'vue'

import App from './App'

import store from './store'

import router from './router'

import ElementUI from 'element-ui'

import Icon from 'vue-awesome/components/Icon'

import NormailizeCss from 'normalize.css'

import 'element-ui/lib/theme-chalk/index.css'

import 'font-awesome/css/font-awesome.css'

import 'video.js/dist/video-js.css' // videojs

import 'vue-awesome/icons'

import '@/styles/index.css'

import './assets/font/iconfont.css'

import '@/icons' // icon

import '@/utils/global'// 全局

// 控制路由表的js文件
import '@/utils/permission.js'

// 控制按钮权限的js文件
import '@/directive/authorityButton.js'

// 引入导出excel插件
// eslint-disable-next-line no-unused-vars
import Blob from '@/excel/Blob.js'

// eslint-disable-next-line no-unused-vars
import Export2Excel from '@/excel/Export2Excel.js'
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'mini', zIndex: 3000 })
Vue.use(NormailizeCss)
Vue.use(Icon)
/* eslint-disable no-new */
new Vue({
  router,
  store,
  components: { App },
  render: h => h(App)
}).$mount('#app')
