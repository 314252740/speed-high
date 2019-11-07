import request from "@/utils/request"
// 统计-设备工作状态
export function getWorkingState () {
  return request({
    url: "module/getWorkingState",
    method: "get"
  })
}
// 统计-设备分布التحليل الإحصائي
export function getEquipmentDistribution () {
  return request({
    url: "module/getEquipmentDistribution",
    method: "get"
  })
}
// 统计-能见度最低时段统计
export function getVisibility (params) {
  return request({
    url: "module/getvisibility",
    method: "get",
    params
  })
}
// 统计-能见度等级统计
export function getVisibilityLevel () {
  return request({
    url: "module/getVisibilityLevel",
    method: "get"
  })
}
// 统计-能见度低于500专题统计
export function getvisibilityForDistance () {
  return request({
    url: "module/getvisibilityForDistance",
    method: "get"
  })
}
// 统计-恶劣天气现象统计
export function getBadWeather () {
  return request({
    url: "module/getBadWeather",
    method: "get"
  })
}
// 统计-恶劣道路状况统计
export function getConditionStatistics () {
  return request({
    url: "module/getconditionStatistics",
    method: "get"
  })
}
// 统计-led屏修改频率统计
export function getLedModifyHz () {
  return request({
    url: "module/getLedModifyHz",
    method: "get"
  })
}
// 统计-led屏修改方式对比
export function getLedModifyWay () {
  return request({
    url: "module/getLedModifyWay",
    method: "get"
  })
}
// 统计-能见度，天气现象，路面温度综合统计
export function getColligate (params) {
  return request({
    url: "module/getColligate",
    method: "get",
    params
  })
}
