import request from "@/utils/request"
export function getList (params) {
  return request({
    url: "api/system/roles",
    method: "get",
    params
  })
}

export function doAdd (data) {
  return request({
    url: "module/sensorinfo",
    method: "POST",
    data
  })
}

export function doUpdate (data) {
  return request({
    url: "module/sensorinfo",
    method: "PATCH",
    data
  })
}

export function doDelete (ids) {
  return request({
    url: "module/sensorinfo/" + ids,
    method: "DELETE"
  })
}

export function doGrantRes (roleid, params) {
  return request({
    url: "api/system/role/resource/" + roleid,
    method: "POST",
    params
  })
}
// 获取检测仪实时信息
export function getSensorsInfos () {
  return request({
    url: "module/sensormessagetop",
    method: "GET"
  })
}
export function getAllList () {
  return request({
    url: "module/getSensorInfoList",
    method: "get"
  })
}
