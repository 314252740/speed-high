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
    url: "module/syspoliceuser",
    method: "POST",
    data
  })
}

export function doUpdate (data) {
  return request({
    url: "module/syspoliceuser",
    method: "PATCH",
    data
  })
}

export function doDelete (ids) {
  return request({
    url: "module/syspoliceuser/" + ids,
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

export function getPoliceType(){
  return request({
    url: "module/getPoliceType",
    method: "get"
  })
}

export function getLeaders(orgId){
  return request({
    url: "module/getLeaders/"+orgId,
    method: "get"
  })
}

export function getListByName(name){
  return request({
    url: "module/getListByName/"+name,
    method: "get"
  })
}



