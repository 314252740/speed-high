// policeCar
// eslint-disable-next-line no-unused-vars
let callback_ = function () {}
let defaultObj = {
  'container': null,
  'verDirection': 'topMiddle',
  'id': 'id',
  'data': '',
  'state': 'normal',
  'directionStyle': ['infoleftTop', 'inforightTop', 'infoleftBottom', 'inforightBottom', 'infoleftMiddle', 'inforightMiddle', 'infotopMiddle', 'policeCarTopMiddle']
}
export default {
  constructor (screen) {
    defaultObj = Object.assign(defaultObj, screen)
    return this.createdUI_(screen)
  },
  changeValue (callback) {
    if (callback) {
      callback_ = callback
    }
  },
  createdUI_ (screen) {
    // 容器className
    // callback_(screen)
    let infoDom = document.createElement('div')
    // infoDom.id = this.id
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
        width:70px;
      `
    } else {
      infoDom.style.cssText = `
        border: 3px solid #1ca728;
      `
    }
    // 创建p
    let pDom = document.createElement('p')
    pDom.style.cssText = `
      font-size: 14px;
      text-align: center,
    `
    pDom.innerHTML = screen.name
    infoDom.appendChild(pDom)
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
      case 'topMiddle' : infoDom.className = 'policeCarTopMiddle'
        break
      case 'bottomMiddle' : infoDom.className = 'policeCarTopMiddle'
        break
      default : infoDom.className = 'policeCarTopMiddle'
    }
    return infoDom
  }
}
// export default class PoliceCar {
//   // eslint-disable-next-line no-useless-constructor
//   constructor (info) {
//     let defaultObj = {
//       "container": null, // 团雾容器
//       "verDirection": "topMiddle",
//       "id": "id",
//       "data": "",
//       "state": "normal",
//       "directionStyle": ["infoleftTop", "inforightTop", "infoleftBottom", "inforightBottom", "infoleftMiddle", "inforightMiddle", "infotopMiddle", "policeCarTopMiddle"]
//     }
//     // 属性合并
//     for (let key in defaultObj) {
//       if (info[key] === undefined) {
//         this[key] = defaultObj[key]
//       } else {
//         this[key] = info[key]
//       }
//     }
//     for (let key in info) {
//       this[key] = info[key]
//     }
//     this.Dom = this.createdUI()
//   }
//   // 创建容器div标签
//   createdUI () {
//     // 容器className
//     let infoDom = document.createElement("div")
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
//         width:70px;
//       `
//     } else {
//       infoDom.style.cssText = `
//         border: 3px solid #1ca728;
//       `
//     }
//     // 创建p
//     let pDom = document.createElement("p")
//     pDom.style.cssText = `
//       font-size: 14px;
//       text-align: center,
//     `
//     pDom.innerHTML = this.name
//     infoDom.appendChild(pDom)
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
//       case "topMiddle" : infoDom.className = "policeCarTopMiddle"
//         break
//       case "bottomMiddle" : infoDom.className = "policeCarTopMiddle"
//         break
//       default : infoDom.className = "policeCarTopMiddle"
//     }
//     return infoDom
//   }
// }
