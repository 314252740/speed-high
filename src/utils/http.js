import axios from 'axios'
// 包装param参数
import router from '@/router'
import { Notification, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import Config from '@/config'
// 创建axios实例
const service = axios.create({
  baseURL: window.VUE_URLS.VUE_APP_LAMP_API, // api 的 base_url
  timeout: Config.timeout // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['token'] = getToken('LED') // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const code = parseInt(response.data.code)
    if (code === 1) {
      return response.data
    } else {
      Notification.error({
        title: response.data.msg || response.data.message,
        offset: 50
      })
      if (code === 1006) {
        router.push('/404')
      }
      if (code === 1013) {
        router.push('login')
      }
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('error')
    }
  },
  error => {
    let code = 0
    try {
      code = error.response.code
    } catch (e) {
      if (error.toString().indexOf('timeout')) {
        Notification.error({
          title: '请求超时',
          duration: 2500,
          offset: 50
        })
        return Promise.reject(error)
      }
    }
    // 代码未修改
    if (code === 1013) {
      MessageBox.confirm(
        '登录状态已过期，您可以继续留在该页面，或者重新登录',
        '系统提示',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    } else if (code === 1006) {
      router.push({ path: '/404' })
    } else {
      const errorMsg = error.response.data.message
      if (errorMsg !== undefined) {
        Notification.error({
          title: errorMsg,
          duration: 2500,
          offset: 50
        })
      }
    }
    return Promise.reject(error)
  }
)
export default service
