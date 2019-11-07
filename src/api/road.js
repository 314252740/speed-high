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
    url: "module/roadinfo",
    method: "POST",
    data
  })
}

export function doUpdate (data) {
  return request({
    url: "module/roadinfo",
    method: "PATCH",
    data
  })
}

export function doDelete (ids) {
  return request({
    url: "module/roadinfo/" + ids,
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
// module/roadinfos 获取道路列表
export function roadList (type) {
  return request({
    url: `module/roadinfos/${type}`,
    method: "GET"
  })
}

export function selectRoadStart (roadId) {
  return request({
    url: "module/selectRoadStart/"+roadId,
    method: "GET"
  })
}

export function getRoadinfo (roadId) {
  return request({
    url: "module/roadinfo/"+roadId,
    method: "GET"
  })
}
