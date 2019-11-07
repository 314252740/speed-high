import request from "@/utils/request"

export function doAdd (data) {
  console.log(data);
  return request({
    url: "api/system/params/add",
    method: "POST",
    data
  })
}

export function doUpdate (data) {
  return request({
    url: "api/system/params/update",
    method: "PATCH",
    data
  })
}

export function doDel(ids) {
  return request({
    url: "api/system/params/delete/" + ids,
    method: "DELETE"
  })
}
