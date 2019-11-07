import request from "@/utils/request"
export function getList (params) {
  return request({
    url: "api/system/orgs",
    method: "get",
    params
  })
}

export function doAdd (data) {
  return request({
    url: "api/system/org",
    method: "POST",
    data
  })
}

export function doUpdate (data) {
  return request({
    url: "api/system/org",
    method: "PATCH",
    data
  })
}

export function doDelete (ids) {
  return request({
    url: "api/system/org/" + ids,
    method: "DELETE"
  })
}

export function getSysOrgLevels(){
  return request({
    url: "system/org/getSysOrgLevels",
    method: "get"
  })
}

export function getSysOrgByParid(pid){
  return request({
    url: "system/org/getSysOrgByParid/"+pid,
    method: "get"
  })
}

export function selecOrg(pid){
  return request({
    url: "system/org/getSysOrgByPid/"+pid,
    method: "get"
  })
}

// 获取大队ID
export function getOrgid () {
  return request({
    url: "system/org/getall",
    method: "GET"
  })
}