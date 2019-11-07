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
    url: "module/camerainfo",
    method: "POST",
    data
  })
}

export function doUpdate (data) {
  return request({
    url: "module/camerainfo",
    method: "PATCH",
    data
  })
}

export function doDelete (ids) {
  return request({
    url: "module/camerainfo/" + ids,
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
// 视频巡检
export function getVideoInspection (params) {
  return request({
    url: "module/camerainfos/onroad",
    method: "GET",
    params
  })
}
