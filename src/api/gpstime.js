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
    url: "module/gpsrealtime",
    method: "POST",
    data
  })
}

export function doUpdate (data) {
  return request({
    url: "module/gpsrealtime",
    method: "PATCH",
    data
  })
}

export function doDelete (ids) {
  return request({
    url: "module/gpsrealtime/" + ids,
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
