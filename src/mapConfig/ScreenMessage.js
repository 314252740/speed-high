// 信息屏
// eslint-disable-next-line no-unused-vars
let callback_ = function () {}
let defaultObj = {
  'container': null, // 团雾容器
  'verDirection': 'topMiddle',
  'data': ['安全出行', '平安回家'],
  'directionStyle': ['infoleftTop', 'inforightTop', 'infoleftBottom', 'inforightBottom', 'infoleftMiddle', 'inforightMiddle', 'infotopMiddle', 'infobottomMiddle']
}
export default {
  constructor (info) {
    defaultObj = Object.assign(defaultObj, info)
    return this.createdUI_(defaultObj)
  },
  changeValue (callback) {
    if (callback) {
      callback_ = callback
    }
  },
  createdUI_ (defaultObj) {
    // 容器className
    // callback_(info)
    let infoDom = document.createElement('ul')
    // infoDom.id = defaultObj.id
    infoDom.style.cssText = `
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    `
    // 挂载元素位置
    if (defaultObj.container) {
      defaultObj.container.appendChild(infoDom)
    }
    // 创建li
    let len = defaultObj.data.length
    for (let i = 0; i < len; i++) {
      let infoItemDom = document.createElement('li')
      infoItemDom.className = 'info_item'
      // 字段未确定（待修改）
      infoItemDom.innerHTML = `
          ${defaultObj.data[i]}
          <span class="empty"></span>
      `
      infoDom.appendChild(infoItemDom)
    }
    // 提示框的位置
    switch (defaultObj.verDirection) {
      case 'leftTop' : infoDom.className = 'infoleftTop'
        break
      case 'rightTop' : infoDom.className = 'inforightTop'
        break
      case 'leftBottom' : infoDom.className = 'infoleftBottom'
        break
      case 'rightBottom' : infoDom.className = 'inforightBottom'
        break
      case 'leftMiddle' : infoDom.className = 'infoleftMiddle'
        break
      case 'rightMiddle' : infoDom.className = 'inforightMiddle'
        break
      case 'topMiddle' : infoDom.className = 'infotopMiddle'
        break
      case 'bottomMiddle' : infoDom.className = 'infobottomMiddle'
        break
      default : infoDom.className = 'infoleftBottom'
    }
    // 信息屏状态
    if (defaultObj.networkStatus !== 0) {
      infoDom.classList.add('infotopMiddleError')
      infoDom.classList.remove('infotopMiddle')
    }
    return infoDom
  }
}
