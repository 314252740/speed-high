import request from "@/utils/request"

export function getOrganizationTypes () {
  return request({
    url: "institutions/organization/getOrganizationTypes",
    method: "get"
  })
}

export function doAdd (data) {
  console.log(data);
  return request({
    url: "institutions/organization/addOrganization",
    method: "POST",
    data
  })
}

export function doUpdate (data) {
  return request({
    url: "institutions/organization/updateOrganization",
    method: "PATCH",
    data
  })
}

export function doDel(ids) {
  return request({
    url: "institutions/organization/deleteOrganization/" + ids,
    method: "DELETE"
  })
}
