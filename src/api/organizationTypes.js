import request from "@/utils/request"

export function doAdd (data) {
  console.log(data);
  return request({
    url: "institutions/organization/addOrganizationType",
    method: "POST",
    data
  })
}

export function doUpdate (data) {
  return request({
    url: "institutions/organization/updateOrganizationType",
    method: "PATCH",
    data
  })
}

export function doDel(ids) {
  return request({
    url: "institutions/organization/deleteOrganizationType/" + ids,
    method: "DELETE"
  })
}
