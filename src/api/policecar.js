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
    url: "module/syspolicecar",
    method: "POST",
    data
  })
}

export function doUpdate (data) {
  return request({
    url: "module/syspolicecar",
    method: "PATCH",
    data
  })
}

export function doDelete (ids) {
  return request({
    url: "module/syspolicecar/" + ids,
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
// 获取警车历史轨迹
export function historyTrack (params) {
  return request({
    url: "module/gpshistorydate",
    method: "GET",
    params
  })
}

export function getPoliceCar(){
  return request({
    url: "module/getPoliceCar",
    method: "get"
  })
}