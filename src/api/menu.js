import request from "@/utils/request"
let menuAPIRoot = "api/system/menus"
// 获取所有的菜单树
export function loadMenus () {
  return request({
    url: menuAPIRoot + "/tree",
    method: "get"
  })
}

// 获取用户的菜单
export function buildMenus (uid) {
  return request({
    url: menuAPIRoot + "/tree/" + uid,
    method: "get"
  })
}

export function loadTree (roleid, uid) {
  return request({
    url: menuAPIRoot + "/checktree/" + roleid + "/" + uid,
    method: "get"
  })
}

// 添加菜单
export function doAddMenu (data) {
  return request({
    url: menuAPIRoot + "/doAddMenu",
    method: "post",
    data
  })
}

// 添加模块
export function doAddModule (data) {
  return request({
    url: menuAPIRoot + "/doAddModule",
    method: "post",
    data
  })
}
// 添加增删改按钮
export function addBtns (id) {
  return request({
    url: menuAPIRoot + "/addbtns/" + id,
    method: "post"
  })
}

export function del (id) {
  return request({
    url: menuAPIRoot + "/" + id,
    method: "delete"
  })
}

export function edit (data) {
  return request({
    url: menuAPIRoot,
    method: "PATCH",
    data
  })
}
