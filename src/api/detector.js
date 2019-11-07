import request from "@/utils/request"
import http from "@/utils/http"
// 设备重启、设备开关、无人机返航
export function decControl (type, params) {
  return request({
    url: `/devcontrol/power/${type}`,
    method: "POST",
    params
  })
}
const devType = {
  stakeNum: "pileinfo",
  serviceArea: "serviceareainfo",
  tollStation: "tollstationinfo",
  trafficHub: "pubinfo",
  sensor: "sensorinfo",
  led: "ledinfo",
  uav: "aerialvericleinfo",
  highHorn: "highnumberinfo",
  screenSpeed: "speedlimitscreeninfo",
  screenComposite: "compositepanelinfo",
  screenMessage: "messageinfo",
  screenInduction: "inductionscreeninfo",
  camera: "camerainfo",
  policeCar: "gpshistorytop"
}
// 单一设备详情
export function parameter (type, devid) {
  let typeUrl = devType[type]
  if (typeUrl === "gpshistorytop") {
    return request({
      url: `module/${typeUrl}`,
      method: "GET",
      params: {
        policeId: devid
      }
    })
  } else {
    return request({
      url: `module/${typeUrl}/${devid}`,
      method: "GET"
    })
  }
}
// 设备、地标周边
export function getAroundList (center, radius) {
  return request({
    url: "module/querys_hit",
    method: "post",
    params: {
      distance: radius + "m",
      point: center.reverse().toString(),
      fields: "geoms"
    }
  })
}
// 获取关联视频
export function getCameraList (layerid, params) {
  return request({
    url: `module/devCamera/${layerid}`,
    method: "GET",
    params
  })
}
// 获取引导灯能见度
export function getLedVisibility (id) {
  return request({
    url: `module/visibilityinfos/${id}`,
    method: "GET"
  })
}
// 获取引导灯列表
export function getLeadstatus (id) {
  return request({
    url: `module/leadstatus/${id}`,
    method: "GET"
  })
}
// ---------------------------------------------------------------------------------------------------------------------------------
// POST / 跟新诱导灯状态"lead/updateLead",
export function updataLampStatus (params) {
  return http({
    url: `lead/updateLead`,
    method: "POST",
    params
  })
}
// 获取主控状态/GET /lead/getMainStatus
export function getMasterStatus (params) {
  return http({
    url: `lead/getMainStatus`,
    method: "GET",
    params
  })
}
// GET /lead/manualAuto 设置工作模式
export function manualAuto (params) {
  return http({
    url: `lead/manualAuto`,
    method: "GET",
    params
  })
}
