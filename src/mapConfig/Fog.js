// 团雾
let callback_ = function () {}
const layerObj = {
  'fog': {
    name: '团雾事件',
    des: '团雾浓度达到上限'
  },
  'trafficAccident': {
    name: '交通事故',
    des: '道路出现交通事故'
  },
  'maintenance': {
    name: '施工养护',
    des: '道路存在施工养护'
  }

}
let defaultObj = {
  'container': null, // 团雾容器
  'img': require('../assets/img/mapImg/control-layer/fog.gif'),
  'verDirection': 'rightBottom',
  'id': 'id',
  'opacity': 'rgba(255,255,255,.5)',
  'directionStyle': ['fogleftTop', 'fogrightTop', 'fogleftBottom', 'fogrightBottom']
}
export default {
  constructor (fog) {
    // 属性合并
    for (let key in defaultObj) {
      if (fog[key] !== undefined) {
        defaultObj[key] = fog[key]
      }
    }
    return this.createdUI_(fog)
  },
  setCallback (callback) {
    if (callback)callback_ = callback
  },
  // 创建容器div标签
  createdUI_ (fog) {
    // 容器className
    let fogDom = document.createElement('div')
    fogDom.className = 'fogCon'
    fogDom.id = defaultObj.id
    fogDom.style.cssText = `
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    `
    // 挂载元素位置
    if (defaultObj.container !== null) {
      defaultObj.container.appendChild(fogDom)
    }
    // 创建团雾圆圈
    // let forgCirleDom = document.createElement("div")
    // forgCirleDom.className = "criFog"
    // fogDom.appendChild(forgCirleDom)

    // 创建提示tip容器
    let tipDom = document.createElement('div')
    // 提示框的位置
    switch (defaultObj.verDirection) {
      case 'leftTop' : tipDom.className = 'fogleftTop'
        break
      case 'rightTop' : tipDom.className = 'fogrightTop'
        break
      case 'leftBottom' : tipDom.className = 'fogleftBottom'
        break
      case 'rightBottom' : tipDom.className = 'fogrightBottom'
        break
      default : tipDom.className = 'fogrightBottom'
    }
    fogDom.appendChild(tipDom)
    // 创建提示默认显示
    let defaulTiptDom = document.createElement('div')
    defaulTiptDom.className = 'tooltip'
    defaulTiptDom.style.display = 'block'
    defaulTiptDom.style.cursor = 'pointer'
    defaulTiptDom.innerHTML = `
      <img class="tipImg" src=${defaultObj.img} title=${layerObj[fog.layerid].name}"预警" style="vertical-align: middle">
      ${layerObj[fog.layerid].name}
    `
    tipDom.appendChild(defaulTiptDom)
    // 创建划过提示显示框
    let projectDom = document.createElement('div')
    fogDom.onclick = function (event) {
      let eve = event || window.event
      let target = eve.target || eve.srcElement
      if (target.className === 'btn systemRec') {
        target.classList.add('active')
        target.nextElementSibling.classList.remove('active')
        callback_(fog, 'system')
      }
      if (target.className === 'btn customize') {
        target.classList.add('active')
        target.previousElementSibling.classList.remove('active')
        callback_(fog, 'customize')
      }
    }
    fogDom.onmouseover = function (event) {
      let eve = event || window.event
      let target = eve.target || eve.srcElement
      if (target.className.toLowerCase() === 'tooltip') {
        target.classList.add('hideOrShowToolTip')
        target.nextElementSibling.classList.remove('hideOrShowToolTip')
        // target.style.display = "none"
        // target.nextElementSibling.style.display = "block"
        fogDom.style.zIndex = 3
      }
    }
    fogDom.onmouseleave = function (event) {
      let eve = event || window.event
      let target = eve.target || eve.srcElement
      if (target.className === 'fogCon') {
        target.lastElementChild.lastElementChild.classList.add('hideOrShowToolTip')
        target.lastElementChild.lastElementChild.previousElementSibling.classList.remove('hideOrShowToolTip')
        // target.lastElementChild.lastElementChild.style.display = "none"
        // target.lastElementChild.lastElementChild.previousElementSibling.style.display = "block"
        fogDom.style.zIndex = 2
        target.lastElementChild.lastElementChild.lastElementChild.classList.remove('active')
        target.lastElementChild.lastElementChild.lastElementChild.previousElementSibling.classList.remove('active')
      }
    }
    projectDom.className = 'upProject'
    projectDom.classList.add('hideOrShowToolTip')
    // projectDom.style.display = "none"
    projectDom.innerHTML = `
      <h4 class="proTit">${layerObj[fog.layerid].name}应急预案</h4>
      <p class="propage">
      ${layerObj[fog.layerid].des}，请选择并启动应急预案！
      </p>
      <button class="btn systemRec">系统推荐预案</button>
      <button class="btn customize">自定义预案</button>
    `
    tipDom.appendChild(projectDom)
    return fogDom
  }
}
