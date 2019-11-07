import request from "@/utils/request"
import http from "@/utils/http"

export function login (username, password) {
  return request({
    url: "auth/login",
    method: "post",
    data: {
      username: username,
      password: password
    }
  })
}

export function getInfo () {
  return request({
    url: "auth/info",
    method: "get"
  })
}
// GET /system/loginMap 客户登录
export function loginMap (params) {
  return http({
    url: `system/loginMap`,
    method: "GET",
    params
  })
}
