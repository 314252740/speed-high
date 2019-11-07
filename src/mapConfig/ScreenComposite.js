// 团雾
import composite from '../views/map/config/infoDevice'
// eslint-disable-next-line no-unused-vars
let matchKey = { visibility: 'visibility', roadCond: 'visualState', weatherCond: 'weatherCondition' }
// eslint-disable-next-line no-unused-vars
let callback_ = function () {}
let defaultObj = {
  'container': null,
  'data': { visibility: { name: '能见度', detail: '' }, roadCond: { name: '路面状况', detail: '' }, weatherCond: { name: '天气状况', detail: '' } }, // 传入的复合屏的实时数据,
  'verDirection': 'topMiddle',
  'directionStyle': ['comleftTop', 'comrightTop', 'comleftBottom', 'comrightBottom', 'comleftMiddle', 'comtopMiddle', 'comrightMiddle', 'combottomMiddle']
}
export default {
  constructor (screen) {
    defaultObj = Object.assign(defaultObj, screen)
    for (let key in defaultObj) {
      this[key] = defaultObj[key]
      if (key === 'data') {
        for (let item in defaultObj.data) {
          if (composite.screenComposite[item][screen[item]]) {
            defaultObj.data[item].detail = composite.screenComposite[item][screen[item]].name
          } else {
            defaultObj.data[item].detail = ''
          }
        }
        this[key] = defaultObj[key]
      }
    }
    return this.createdUI_(defaultObj)
  },
  changeValue (callback) {
    if (callback) {
      callback_ = callback
    }
  },
  createdUI_ (defaultObj) {
    // 容器className
    // callback_(defaultObj)
    let compositeScreenDom = document.createElement('div')
    // compositeScreenDom.id = this.id
    compositeScreenDom.style.cssText = `
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    `
    // 挂载元素位置
    if (defaultObj.container) {
      defaultObj.container.appendChild(compositeScreenDom)
    }
    // 提示框的位置
    switch (defaultObj.verDirection) {
      case 'leftTop' : compositeScreenDom.className = 'comleftTop'
        break
      case 'rightTop' : compositeScreenDom.className = 'comrightTop'
        break
      case 'leftBottom' : compositeScreenDom.className = 'comleftBottom'
        break
      case 'rightBottom' : compositeScreenDom.className = 'comrightBottom'
        break
      case 'leftMiddle' : compositeScreenDom.className = 'comleftMiddle'
        break
      case 'rightMiddle' : compositeScreenDom.className = 'comrightMiddle'
        break
      case 'topMiddle' : compositeScreenDom.className = 'comtopMiddle'
        break
      case 'bottomMiddle' : compositeScreenDom.className = 'combottomMiddle'
        break
      default : compositeScreenDom.className = 'comtopMiddle'
    }
    // 创建复合屏头部标题
    let screenTitle = document.createElement('div')
    screenTitle.classList.add('list_tit', 'list_item')
    screenTitle.innerHTML = `
      可变限速路段
      <span class="empty"></span>
    `
    compositeScreenDom.appendChild(screenTitle)

    // 创建复合屏内容容器
    let screenContent = document.createElement('ul')
    screenContent.className = 'screen_list'
    compositeScreenDom.appendChild(screenContent)

    // 创建复合屏内容列表
    for (let key in defaultObj.data) {
      let screenItem = document.createElement('li')
      screenItem.className = 'list_item'
      screenItem.innerHTML = `
    <div class="item item_name">${defaultObj.data[key].name}<span class="empty"></span></div>
        <div class="item item_detail">${defaultObj.data[key].detail}<span class="empty"></span></div>
        <div class="empty"></div>
      `
      screenContent.appendChild(screenItem)
    }
    // 显示屏状态
    if (defaultObj.networkStatus !== 0) {
      compositeScreenDom.classList.add('comtopMiddleError')
      compositeScreenDom.classList.remove('comtopMiddle')
    }
    return compositeScreenDom
  }
}
// export default class ScreenComposite {
//   // eslint-disable-next-line no-useless-constructor
//   constructor (screen) {
//     let defaultObj = {
//       "container": null,
//       "data": {visibility: {name: "能见度", detail: ""}, roadCond: {name: "路面状况", detail: ""}, weatherCond: {name: "天气状况", detail: ""}}, // 传入的复合屏的实时数据,
//       "verDirection": "topMiddle",
//       "id": "id",
//       "state": "normal",
//       "directionStyle": ["comleftTop", "comrightTop", "comleftBottom", "comrightBottom", "comleftMiddle", "comtopMiddle", "comrightMiddle", "combottomMiddle"]
//     }
//     // 属性合并
//     defaultObj = Object.assign(defaultObj, screen)
//     for (let key in defaultObj) {
//       this[key] = defaultObj[key]
//       if (key === "data") {
//         for (let item in defaultObj.data) {
//           if (composite.screenComposite[item][screen[matchKey[item]]]) {
//             defaultObj.data[item].detail = composite.screenComposite[item][screen[matchKey[item]]].name
//           } else {
//             defaultObj.data[item].detail = "良好"
//           }
//         }
//         this[key] = defaultObj[key]
//       }
//     }
//     this.Dom = this.createdUI()
//   }
//   // 创建容器div标签
//   createdUI () {
//     // 容器className
//     let compositeScreenDom = document.createElement("div")
//     // compositeScreenDom.id = this.id
//     compositeScreenDom.style.cssText = `
//       -webkit-user-select: none;
//       -moz-user-select: none;
//       -ms-user-select: none;
//       user-select: none;
//     `
//     // 挂载元素位置
//     if (this.container) {
//       this.container.appendChild(compositeScreenDom)
//     }
//     // 显示屏状态
//     if (this.state !== "normal") {
//       compositeScreenDom.style.cssText = `
//         border: 3px solid #fb5a5a;
//       `
//     } else {
//       compositeScreenDom.style.cssText = `
//         border: 3px solid #1ca728;
//       `
//     }
//     // 提示框的位置
//     switch (this.verDirection) {
//       case "leftTop" : compositeScreenDom.className = "comleftTop"
//         break
//       case "rightTop" : compositeScreenDom.className = "comrightTop"
//         break
//       case "leftBottom" : compositeScreenDom.className = "comleftBottom"
//         break
//       case "rightBottom" : compositeScreenDom.className = "comrightBottom"
//         break
//       case "leftMiddle" : compositeScreenDom.className = "comleftMiddle"
//         break
//       case "rightMiddle" : compositeScreenDom.className = "comrightMiddle"
//         break
//       case "topMiddle" : compositeScreenDom.className = "comtopMiddle"
//         break
//       case "bottomMiddle" : compositeScreenDom.className = "combottomMiddle"
//         break
//       default : compositeScreenDom.className = "comtopMiddle"
//     }
//     // 创建复合屏头部标题
//     let screenTitle = document.createElement("div")
//     screenTitle.classList.add("list_tit", "list_item")
//     screenTitle.innerHTML = `
//       可变限速路段
//       <span class="empty"></span>
//     `
//     compositeScreenDom.appendChild(screenTitle)

//     // 创建复合屏内容容器
//     let screenContent = document.createElement("ul")
//     screenContent.className = "screen_list"
//     compositeScreenDom.appendChild(screenContent)

//     // 创建复合屏内容列表
//     for (let key in this.data) {
//       let screenItem = document.createElement("li")
//       screenItem.className = "list_item"
//       screenItem.innerHTML = `
//     <div class="item item_name">${this.data[key].name}<span class="empty"></span></div>
//         <div class="item item_detail">${this.data[key].detail}<span class="empty"></span></div>
//         <div class="empty"></div>
//       `
//       screenContent.appendChild(screenItem)
//     }
//     return compositeScreenDom
//   }
// }
