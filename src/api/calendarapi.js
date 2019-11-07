import request from "@/utils/request"
// 添加维护记录
export function doAdd (data) {
  return request({
    url: "module/maintaininfo",
    method: "POST",
    data
  })
}
// 修改维护记录
export function doUpdate (data) {
  return request({
    url: "module/maintaininfo",
    method: "PATCH",
    data
  })
}
// 删除维护记录
export function doDelete (ids) {
  return request({
    url: "module/maintaininfo/" + ids,
    method: "DELETE"
  })
}
// 获取维护记录
export function getCalendaraListForID (id) {
  return request({
    url: `/module/maintaininfo/${id}`,
    method: "GET"
  })
}
// 获取维护记录不带分页
export function getCalendaraLists () {
  return request({
    url: `/module/maintaininfoslist`,
    method: "GET"
  })
}
// 获取维护记录分页
export function getLists () {
  return request({
    url: `/module/maintaininfoslists`,
    method: "GET"
  })
}
