import request from "@/utils/request"

export function getConstructionTypes (type) {
  return request({
    url: "api/system/getNameByType/" + type,
    method: "get"
  })
}

export function getConstructionList () {
  return request({
    url: "plan/getConstructionList",
    method: "get"
  })
}

export function doAdd (data) {
  return request({
    url: "plan/addConstructionBack",
    method: "POST",
    data
  })
}

export function doUpdate (data) {
  return request({
    url: "plan/updateConstruction",
    method: "PATCH",
    data
  })
}

export function doDel (ids) {
  return request({
    url: "plan/deleteConstruction/" + ids,
    method: "DELETE"
  })
}
