// eslint-disable-next-line no-unused-vars
let callback_ = function () {}
let defaultObj = {
  'container': null, // 团雾容器
  'limitValue': 120, // 传入的复合屏的实时数据
  'verDirection': 'topMiddle',
  'directionStyle': ['speleftTop', 'sperightTop', 'speleftBottom', 'sperightBottom', 'speleftMiddle', 'sperightMiddle', 'spetopMiddle', 'spebottomMiddle']
}
export default {
  constructor (screen) {
    defaultObj = Object.assign(defaultObj, screen)
    return this.createdUI_(defaultObj)
  },
  changeValue (callback) {
    if (callback) {
      callback_ = callback
    }
  },
  createdUI_ (defaultObj) {
    // callback_(screen)
    let speedScreen = document.createElement('div')
    speedScreen.style.cssText = `
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    `
    speedScreen.innerHTML = `
      <span class="speedScreen">${defaultObj.limitValue}</span>  
      <span class="tri"></span>
    `
    // 挂载元素位置
    if (defaultObj.container) {
      defaultObj.container.appendChild(speedScreen)
    }
    // 提示框的位置
    switch (defaultObj.verDirection) {
      case 'leftTop' : speedScreen.className = 'speleftTop'
        break
      case 'rightTop' : speedScreen.className = 'sperightTop'
        break
      case 'leftBottom' : speedScreen.className = 'speleftBottom'
        break
      case 'rightBottom' : speedScreen.className = 'sperightBottom'
        break
      case 'leftMiddle' : speedScreen.className = 'speleftMiddle'
        break
      case 'rightMiddle' : speedScreen.className = 'sperightMiddle'
        break
      case 'topMiddle' : speedScreen.className = 'spetopMiddle'
        break
      case 'bottomMiddle' : speedScreen.className = 'spebottomMiddle'
        break
      default : speedScreen.className = 'topMiddle'
    }
    // 信息屏状态
    if (defaultObj.networkStatus !== 0) {
      speedScreen.classList.add('spetopMiddleError')
      speedScreen.classList.remove('spetopMiddle')
    }
    return speedScreen
  }
}
// export default class ScreenSpeed {
//   // eslint-disable-next-line no-useless-constructor
//   constructor (screen) {
//     let defaultObj = {
//       "container": null, // 团雾容器
//       "limitValue": 120, // 传入的复合屏的实时数据
//       "verDirection": "topMiddle",
//       "id": "id",
//       "state": "normal",
//       "directionStyle": ["speleftTop", "sperightTop", "speleftBottom", "sperightBottom", "speleftMiddle", "sperightMiddle", "spetopMiddle", "spebottomMiddle"]
//     }
//     // 属性合并
//     for (let key in defaultObj) {
//       if (screen[key] === undefined) {
//         this[key] = defaultObj[key]
//       } else {
//         this[key] = screen[key]
//       }
//     }
//     this.Dom = this.createdUI()
//   }
//   // 创建容器div标签
//   createdUI () {
//     // 创建容器
//     let speedScreen = document.createElement("div")
//     speedScreen.id = this.id
//     speedScreen.style.cssText = `
//       -webkit-user-select: none;
//       -moz-user-select: none;
//       -ms-user-select: none;
//       user-select: none;
//     `
//     speedScreen.innerHTML = `
//       <span class="speedScreen">${this.limitValue}</span>
//       <span class="tri"></span>
//     `
//     // 挂载元素位置
//     if (this.container !== null) {
//       this.container.appendChild(speedScreen)
//     }
//     // 信息屏状态
//     if (this.state !== "normal") {
//       speedScreen.style.cssText = `
//         border: 3px solid #fb5a5a;
//       `
//     } else {
//       speedScreen.style.cssText = `
//         border: 3px solid #1ca728;
//       `
//     }
//     // 提示框的位置
//     switch (this.verDirection) {
//       case "leftTop" : speedScreen.className = "speleftTop"
//         break
//       case "rightTop" : speedScreen.className = "sperightTop"
//         break
//       case "leftBottom" : speedScreen.className = "speleftBottom"
//         break
//       case "rightBottom" : speedScreen.className = "sperightBottom"
//         break
//       case "leftMiddle" : speedScreen.className = "speleftMiddle"
//         break
//       case "rightMiddle" : speedScreen.className = "sperightMiddle"
//         break
//       case "topMiddle" : speedScreen.className = "spetopMiddle"
//         break
//       case "bottomMiddle" : speedScreen.className = "spebottomMiddle"
//         break
//       default : speedScreen.className = "spebottomMiddle"
//     }
//     return speedScreen
//   }
//   getOverlayerInfo (screen) {
//     return screen
//   }
// }
