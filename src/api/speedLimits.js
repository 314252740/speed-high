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

export function doAdd (data) {
  return request({
    url: "plan/addSpeedLimits",
    method: "POST",
    data
  })
}

export function doUpdate (data) {
  return request({
    url: "plan/updateSpeedLimits",
    method: "PATCH",
    data
  })
}

export function doDel (ids) {
  return request({
    url: "plan/deleteSpeedLimits/" + ids,
    method: "DELETE"
  })
}
