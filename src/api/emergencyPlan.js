import request from "@/utils/request"
// 启动预案
export function startUpPlan (params) {
  return request({
    url: "",
    method: "GET",
    params
  })
}
// 撤销预案
export function cancelPlan (params) {
  return request({
    url: "",
    method: "GET",
    params
  })
}
// 撤销预案
export function saveHistoryList (params) {
  return request({
    url: "plan/addEvents",
    method: "POST",
    params
  })
}
export function getHistoryList () {
  return request({
    url: "plan/getEvents",
    method: "GET"
  })
}
