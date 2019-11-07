import request from "@/utils/request"
// 获取团雾详情信息
export function getFogInfo (id) {
  return request({
    url: `module/getFogById/${id}`,
    method: "GET",
    params: {id: id}
  })
}
// 获取系统推荐预案详情信息
export function getSystemPlan (id) {
  return request({
    url: `plan/getRecommendedPlans/${id}`,
    method: "GET"
  })
}
// 获取系统推荐预案详情信息
export function addSystemPlan (params) {
  return request({
    url: `plan/addRecommendedPlans`,
    method: "POST",
    params
  })
}
// 获取施工养护信息
export function getConstructionInfo (id) {
  return request({
    url: `map/event/getConstructionById/${id}`,
    method: "GET"
  })
}
// 获取交通事故信息
export function getTrafficAccidentInfo (id) {
  return request({
    url: `module/getLatestWeather`, // ???????????????
    method: "GET"
  })
}
// 获取天气状况故信息
export function getWeatherInfo (id) {
  return request({
    url: `module/getLatestWeather`, // ???????????????
    method: "GET"
  })
}
// 获取能见度信息
export function getVisibilityInfo (id) {
  return request({
    url: `module/getLatestVisibility`, // ???????????????
    method: "GET"
  })
}
// 获取路面温度信息
export function getRoadTemInfo (id) {
  return request({
    url: `module/getLatestTemperature`, // ???????????????
    method: "GET"
  })
}
// test wensocket
export function wensocketFogInfo (params) {
  return request({
    url: `module/sendmsg`, // ???????????????
    method: "GET",
    params
  })
}
