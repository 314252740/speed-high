// 信息屏
// eslint-disable-next-line no-unused-vars
let callback_ = function () {}
let defaultObj = {
  'container': null, // 团雾容器
  'verDirection': 'topMiddle',
  'id': 'id',
  'data': ['安全出行', '平安回家'],
  'state': 'normal',
  'directionStyle': ['infoleftTop', 'inforightTop', 'infoleftBottom', 'inforightBottom', 'infoleftMiddle', 'inforightMiddle', 'infotopMiddle', 'infobottomMiddle']
}
export default {
  constructor (info) {
    defaultObj = Object.assign(defaultObj, info)
    return this.createdUI_(info)
  },
  changeValue (callback) {
    if (callback) {
      callback_ = callback
    }
  },
  createdUI_ (info) {
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
    // 信息屏状态
    if (defaultObj.state !== 'normal') {
      infoDom.style.cssText = `
        border: 3px solid #fb5a5a;
      `
    } else {
      infoDom.style.cssText = `
        border: 3px solid #1ca728;
      `
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
    return infoDom
  }
}
// export default class ScreenMessage {
//   // eslint-disable-next-line no-useless-constructor
//   constructor (info) {
//     let defaultObj = {
//       "container": null, // 团雾容器
//       "verDirection": "topMiddle",
//       "id": "id",
//       "data": ["安全出行", "平安回家"],
//       "state": "normal",
//       "directionStyle": ["infoleftTop", "inforightTop", "infoleftBottom", "inforightBottom", "infoleftMiddle", "inforightMiddle", "infotopMiddle", "infobottomMiddle"]
//     }
//     // 属性合并
//     for (let key in defaultObj) {
//       if (info[key] === undefined) {
//         this[key] = defaultObj[key]
//       } else {
//         this[key] = info[key]
//       }
//     }
//     this.Dom = this.createdUI()
//   }
//   // 创建容器div标签
//   createdUI () {
//     // 容器className
//     let infoDom = document.createElement("ul")
//     infoDom.id = this.id
//     infoDom.style.cssText = `
//       -webkit-user-select: none;
//       -moz-user-select: none;
//       -ms-user-select: none;
//       user-select: none;
//     `
//     // 挂载元素位置
//     if (this.container !== null) {
//       this.container.appendChild(infoDom)
//     }
//     // 信息屏状态
//     if (this.state !== "normal") {
//       infoDom.style.cssText = `
//         border: 3px solid #fb5a5a;
//       `
//     } else {
//       infoDom.style.cssText = `
//         border: 3px solid #1ca728;
//       `
//     }
//     // 创建li
//     let len = this.data.length
//     for (let i = 0; i < len; i++) {
//       let infoItemDom = document.createElement("li")
//       infoItemDom.className = "info_item"
//       // 字段未确定（待修改）
//       infoItemDom.innerHTML = `
//           ${this.data[i]}
//           <span class="empty"></span>
//       `
//       infoDom.appendChild(infoItemDom)
//     }
//     // 提示框的位置
//     switch (this.verDirection) {
//       case "leftTop" : infoDom.className = "infoleftTop"
//         break
//       case "rightTop" : infoDom.className = "inforightTop"
//         break
//       case "leftBottom" : infoDom.className = "infoleftBottom"
//         break
//       case "rightBottom" : infoDom.className = "inforightBottom"
//         break
//       case "leftMiddle" : infoDom.className = "infoleftMiddle"
//         break
//       case "rightMiddle" : infoDom.className = "inforightMiddle"
//         break
//       case "topMiddle" : infoDom.className = "infotopMiddle"
//         break
//       case "bottomMiddle" : infoDom.className = "infobottomMiddle"
//         break
//       default : infoDom.className = "infoleftBottom"
//     }
//     return infoDom
//   }
// }
