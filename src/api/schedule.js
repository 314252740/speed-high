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
    url: "module/tschedule",
    method: "POST",
    data
  })
}

export function doUpdate (data) {
  return request({
    url: "module/tschedule",
    method: "PATCH",
    data
  })
}

export function doDelete (ids) {
  return request({
    url: "module/tschedule/" + ids,
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
// src\views\service\schedule\module
// 获取值班信息
export function getLeaderShip (orgid) {
  return request({
    url: "module/syspoliceusers/" + orgid,
    method: "GET"
  })
}
// 获取大队ID
export function getOrgid () {
  return request({
    url: "system/org/getall",
    method: "GET"
  })
}

export function geAll () {
  return request({
    url: "system/org/geAll",
    method: "GET"
  })
}

// 移除
export function deletePerson (id) {
  return request({
    url: "module/updatepolicestatus/" + id,
    method: "DELETE"
  })
}
// 获取最后一天
export function getMon (params) {
  return request({
    url: "module/policeusers",
    method: "GET",
    params
  })
}
// 获取中队
export function getSquadron (params) {
  return request({
    url: "system/getbyparid/org",
    method: "GET",
    params
  })
}
// 获取每一天的值班信息
export function policeuserByDate (params) {
  return request({
    url: "module/policeuserByDate",
    method: "GET",
    params
  })
}

export function syspoliceuser (id) {
  return request({
    url: "module/syspoliceuser/" + id,
    method: "GET"
  })
}

//  获取值班路段信息
export function troadpostbyoid (orgid) {
  return request({
    url: "module/troadpostbyoid/" + orgid,
    method: "GET"
  })
}
//  获取大队名
export function getbyid (id) {
  return request({
    url: "system/org/getbyid/" + id,
    method: "GET"
  })
}

export function tscheduleByDate (params) {
  return request({
    url: "module/tscheduleByDate",
    method: "GET",
    params
  })
}

export function tscheduleByMonth (params) {
  return request({
    url: "module/tscheduleByMonth",
    method: "GET",
    params
  })
}
// 向后台传入值班表
export function addTschedule (params) {
  return request({
    url: "module/addTschedule",
    method: "POST",
    params
  })
}
