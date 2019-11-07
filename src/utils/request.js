import axios from 'axios'
// 包装param参数
import router from '@/router'
import store from '../store'
import Config from '@/config'

import { Notification, MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
// 创建axios实例
const service = axios.create({
  baseURL: window.VUE_URLS.VUE_APP_BASE_API, // api 的 base_url
  timeout: Config.timeout // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
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
    const code = parseInt(response.data.status)
    if (code < 200) {
      Notification.error({
        title: response.data.message,
        offset: 50
      })
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('error')
    } else if (code === 4002) {
      Notification.error({
        title: response.data.message,
        duration: 2500,
        offset: 50
      })
    } else if (code === 40010) {
      MessageBox.confirm(
        '登录状态已过期，您可以继续留在该页面，或者重新登录',
        '系统提示',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
          offset: 50
        }
      ).then(() => {
        store.dispatch('Logout').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    } else if (code === 403) {
      router.push({ path: '/401' })
    } else if (code === 404) {
      router.push({ path: '/404' })
    } else if (code === 400) {
      router.push({ path: '/400' })
    } else {
      return response.data
    }
  },
  error => {
    let code = 0
    try {
      code = error.response.data.status
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
    if (code === 40010) {
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
    } else if (code === 403) {
      router.push({ path: '/401' })
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
