import request from "@/utils/request"
export function getUsers (params) {
  return request({
    url: "api/system/users",
    method: "get",
    params
  })
}

export function doAdd (data) {
  return request({
    url: "api/system/user",
    method: "POST",
    data
  })
}

export function doUpdate (data) {
  return request({
    url: "api/system/user",
    method: "PATCH",
    data
  })
}

export function doDelete (ids) {
  return request({
    url: "api/system/user/" + ids,
    method: "DELETE"
  })
}

export function doGrantRole (userids, roleids) {
  return request({
    url: "api/system/user/roles/" + userids + "/" + roleids,
    method: "POST"
  })
}

//查找警员信息
export function policeName () {
  return request({
    url:"module/syspoliceusers",
    method:"GET"
  })
}
