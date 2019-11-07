import request from "@/utils/request.js"
// 获取施工养护类型信息
export function getConstructionType () {
  return request({
    url: `api/system/getNameByType/curingType`,
    method: "GET"
  })
}
// 添加施工养护
export function addConstructionInfo (params) {
  return request({
    url: `plan/addConstruction`,
    method: "POST",
    params
  })
}
// 获取组织机构信息
export function getOrganization () {
  return request({
    url: `institutions/organization/getOrganizationTypes`,
    method: "GET"
  })
}
// 获取交通事故类型信息
export function getTrafficType () {
  return request({
    url: `api/system/getNameByType/accidentType`,
    method: "GET"
  })
}
// 获取交通事故道路名称
export function getTrafficPosition () {
  return request({
    url: `api/system/getNameByType/roadName`,
    method: "GET"
  })
}
// 获取交通事故道路名称
export function getTrafficGrade () {
  return request({
    url: `api/system/getNameByType/accidentLevel`,
    method: "GET"
  })
}
// 获取事故处理方法下拉列表
export function getTrafficMethod () {
  return request({
    url: `api/system/getNameByType/processingMethod`,
    method: "GET"
  })
}
// 获取事故辖区下拉列表
export function getAllOrg () {
  return request({
    url: "system/org/getall",
    method: "GET"
  })
}
// 添加交通事故
export function addTrafficInfo (params) {
  return request({
    url: `plan/addTrafficAccident`,
    method: "POST",
    params
  })
}
