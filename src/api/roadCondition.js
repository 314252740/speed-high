import request from "@/utils/request.js"
export function conditionDetail (params) {
  return request({
    url: ``,
    methods: "get"
  })
}
// 获取系统推荐应急预案方案
export function planProgram () {
  return request({
    url: `/plan/getMapPlannedEventTyps`,
    method: "get"
  })
}
// 设备控制信息修改
export function updataDecValue (type, params) {
  return request({
    url: `/devcontrol/msg/${type}`,
    method: "POST",
    params
  })
}
// 获取管控措施方案详情
export function getControlsList () {
  return request({
    url: `/plan/getAllControlsList`,
    method: "GET"
  })
}
// 获取限速措施方案详情
export function getSpeedLimitsList () {
  return request({
    url: `/plan/getAllSpeedLimitsList`,
    method: "GET"
  })
}
// 获取辅助措施方案详情
export function getAuxiliaryMeasuresList () {
  return request({
    url: `/plan/getAllAuxiliaryMeasuresList`,
    method: "GET"
  })
}
// 获取检查仪
export function getBrigadeRoadDevInfo () {
  return request({
    url: `/module/sensorinfosForRoadname`,
    method: "GET"
  })
}
// 获取表格数据
export function getScreenData (id) {
  return request({
    url: `/module/speedAndcomposites/${id}`,
    method: "GET"
  })
}
// 初始化时获取全部数据
export function getAllScreenData () {
  return request({
    url: `/module/speedAndcomposites`,
    method: "GET"
  })
}
