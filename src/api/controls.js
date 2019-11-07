import request from "@/utils/request"

export function getDics (type, params) {
  return request({
    url: "api/system/dics/" + type,
    method: "get",
    params
  })
}

export function getControls () {
  return request({
    url: "plan/getControls",
    method: "get"
  })
}

export function doAdd (data) {
  return request({
    url: "plan/addControls",
    method: "POST",
    data
  })
}

export function doUpdate (data) {
  return request({
    url: "plan/updateControls",
    method: "PATCH",
    data
  })
}

export function doDel (ids) {
  return request({
    url: "plan/deleteControls/" + ids,
    method: "DELETE"
  })
}
