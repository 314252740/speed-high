import request from "@/utils/request"
export function changeUrlRq (params, url) {
  return request({
    url: `yhl/${url}`,
    method: "get",
    params
  })
}
// 过车总数实时统计
export function getAllCar (params) {
  return request({
    url: "yhl/getAllCar",
    method: "get",
    params
  })
}
// 两客一危数量实时统计
export function getListDgCar (params) {
  return request({
    url: "yhl/getListDgCar",
    method: "get",
    params
  })
}
// 外地车数量统计
export function getNonlocalCar (params) {
  return request({
    url: "yhl/getNonlocalCar",
    method: "get",
    params
  })
}
// 过车频率统计
export function getHzCarByMonth (params) {
  return request({
    url: "yhl/getHzCarByMonth",
    method: "get",
    params
  })
}
// 货车违法变道记录
export function getIllegalChangeCar (params) {
  return request({
    url: "yhl/getIllegalChangeCar",
    method: "get",
    params
  })
}
// 货车变道频率统计
// export function getListDgCar (params) {
//   return request({
//     url: "yhl/getListDgCar",
//     method: "get",
//     params
//   })
// }

// 速度分析
// 路段平均速度统计(易华录数据应该是没有速度值的，根据卡口之间的距离和通行时间来判断车辆形式的平均速度，如果这两个卡口之间有服务区把这条数据进行标注)
export function getAverageSpeedCar (params) {
  return request({
    url: "yhl/getAverageSpeedCar",
    method: "get",
    params
  })
}
// .低速路段统计(速度<60)
export function getLowSpeedCar (params) {
  return request({
    url: "yhl/getLowSpeedCar",
    method: "get",
    params
  })
}
// 超速路段统计(速度>120)
export function getHighSpeedCar (params) {
  return request({
    url: "yhl/getHighSpeedCar",
    method: "get",
    params
  })
}
// 获取卡口列表(速度>120)
export function getBayonetList (params) {
  return request({
    url: "module/camerainfos",
    method: "get",
    params
  })
}
// 获取下一卡口
export function getNextBayonet (params) {
  return request({
    url: "module/camerainfos",
    method: "get",
    params
  })
}
// 添加卡口信息
export function doAdd (data) {
  return request({
    url: "module/tbuckleinfo",
    method: "POST",
    data
  })
}
// 修改卡口信息
export function doUpdate (data) {
  return request({
    url: "module/tbuckleinfo",
    method: "PATCH",
    data
  })
}
// 删除卡口信息
export function doDelete (ids) {
  return request({
    url: "module/tbuckleinfo/" + ids,
    method: "DELETE"
  })
}
// 添加卡口路段信息
export function doAddtr (data) {
  return request({
    url: "module/troadcloudidinfo",
    method: "POST",
    data
  })
}
// 修改卡口路段信息
export function doUpdatetr (data) {
  return request({
    url: "module/troadcloudidinfo",
    method: "PATCH",
    data
  })
}
// 删除卡口路段信息
export function doDeletetr (ids) {
  return request({
    url: "module/troadcloudidinfo/" + ids,
    method: "DELETE"
  })
}
