import request from "@/utils/request"

export function getDics (type, params) {
  return request({
    url: "api/system/dics/" + type,
    method: "get",
    params
  })
}

export function getPlannedEventTypes (params) {
  return request({
    url: "plan/getPlannedEventTyps/"+params,
    method: "get"
  })
}

export function getEventTyps () {
  return request({
    url: "plan/getEventTyps",
    method: "get"
  })
}

export function doAdd (data) {
  return request({
    url: "plan/addPlannedEventType",
    method: "POST",
    data
  })
}

export function doUpdate (data) {
  return request({
    url: "plan/updatePlannedEventType",
    method: "PATCH",
    data
  })
}

export function doDel(ids) {
  return request({
    url: "plan/deletePlannedEventType/" + ids,
    method: "DELETE"
  })
}
