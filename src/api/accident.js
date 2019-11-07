import request from "@/utils/request"

export function getRoadNames (type) {
  return request({
    url: "api/system/getNameByType/" + type,
    method: "get"
  })
}

export function getAccidentTypes (type) {
  return request({
    url: "api/system/getNameByType/" + type,
    method: "get"
  })
}

export function getAccidentLevels (type) {
  return request({
    url: "api/system/getNameByType/" + type,
    method: "get"
  })
}

export function getProcessingMethods (type) {
  return request({
    url: "api/system/getNameByType/" + type,
    method: "get"
  })
}

export function getTrafficAccidentList () {
  return request({
    url: "plan/getTrafficAccidentList",
    method: "get"
  })
}

export function doAdd (data) {
  return request({
    url: "plan/addTrafficAccidentBack",
    method: "POST",
    data
  })
}

export function doUpdate (data) {
  return request({
    url: "plan/updateTrafficAccident",
    method: "PATCH",
    data
  })
}

export function doDel (ids) {
  return request({
    url: "plan/deleteTrafficAccident/" + ids,
    method: "DELETE"
  })
}

export function getTrafficAccident () {
  return request({
    url: "plan/getTrafficAccident",
    method: "get"
  })
}
