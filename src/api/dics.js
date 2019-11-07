import request from "@/utils/request"

export function getDics (type, params) {
  return request({
    url: "api/system/dics/" + type,
    method: "get",
    params
  })
}

export function getDicTypes (groupid) {
  return request({
    url: "api/system/dics/" + groupid + "/type",
    method: "get"
  })
}

export function doAdd (params) {
  return request({
    url: "api/system/dic",
    method: "POST",
    params
  })
}

export function doUpdate (params) {
  return request({
    url: "api/system/dic",
    method: "PATCH",
    params
  })
}

export function doDel (ids) {
  return request({
    url: "api/system/dic/" + ids,
    method: "DELETE"
  })
}

export function getCodeByType (type) {
  return request({
    url: "api/system/getCodeByType/" + type,
    method: "get"
  })
}
