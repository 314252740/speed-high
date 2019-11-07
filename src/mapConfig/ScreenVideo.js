// 视频
// import videojs from 'video.js'
export default class ScreenVideo {
  // eslint-disable-next-line no-useless-constructor
  constructor (video) {
    let defaultObj = {
      'container': null, // 视频容器
      'data': [], // 传入的复合屏的实时数据
      'verDirection': 'TopMiddle',
      'id': 'id',
      'src': '',
      'state': 'normal',
      'note': '',
      'directionStyle': ['vidleftTop', 'vidrightTop', 'vidleftBottom', 'vidrightBottom', 'vidleftMiddle', 'vidrightMiddle', 'vidrightMiddle', 'vidbottomMiddle']
    }
    // 属性合并
    for (let key in defaultObj) {
      if (video[key] === undefined) {
        this[key] = defaultObj[key]
      } else {
        this[key] = video[key]
      }
    }
    this.Dom = this.createdUI()
  }
  // 创建容器div标签
  createdUI () {
    let that = this
    // 容器className
    let videoScreenDom = document.createElement('div')
    // videoScreenDom.id = this.id
    videoScreenDom.style.cssText = `
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    `
    // 挂载元素位置
    if (this.container !== null) {
      this.container.appendChild(videoScreenDom)
    }
    // 信息屏状态
    if (this.state !== 'normal') {
      videoScreenDom.style.cssText = `
        border: 3px solid #fb5a5a;
      `
    } else {
      videoScreenDom.style.cssText = `
        border: 3px solid #1ca728;
      `
    }
    // 图片
    let videoImgDom = document.createElement('img')
    videoImgDom.className = 'videoImg'
    videoImgDom.src = '/static/img/videoPlay.png'
    videoScreenDom.appendChild(videoImgDom)
    // video
    videoScreenDom.onclick = function () {
      if (document.getElementById('videoDiv')) {
        videoScreenDom.innerHTML = ''
      } else {
        videoScreenDom.innerHTML = '<div id="videoDiv" class="videoDiv" style="z-index:1000">' + that.note + '</div>'
        //  `<div id="videoDiv" class="videoDiv" style="z-index:1000">
        //     "<iframe class="iframe" name="iframe" src="http://demo.easynvr.com:10800/play.html?channel=1&iframe=yes&aspect=640x360" width="640" height="360" allowfullscreen allow="autoplay"></iframe>
        //  </div>`;
        let divChild = document.getElementById('videoDiv')
        divChild.style.position = 'absolute'
        divChild.style.top = '90px'
        divChild.style.left = '-240px'
      }
    }
    // videoScreenDom.onclick = function (event) {
    //   if (document.getElementById("video_js") && (event.target === videoScreenDom || event.target === videoImgDom)) {
    //     videoScreenDom.appendChild(videoImgDom)
    //     videojs("video_js", {
    //     }, function () {
    //       this.dispose()
    //     })
    //   } else if (event.target === videoScreenDom || event.target === videoImgDom) {
    //     videoScreenDom.innerHTML = `
    //     <video id="video_js" class="video-js vjs-default-skin" data-setup="{}" controls preload="auto" width="486" height="364"
    //       poster="http://vjs.zencdn.net/v/oceans.png">
    //       <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4">
    //       <source src='rtmp://live.hkstv.hk.lxdns.com/live/hks' type='rtmp/flv'>
    //     </video>`
    //     videojs("video_js", {
    //       bigPlayButton: false,
    //       textTrackDisplay: false,
    //       posterImage: true,
    //       errorDisplay: false,
    //       controlBar: true,
    //       autoplay: true,
    //       muted: true
    //     }, function () {
    //       this.play()
    //     })
    //   }
    // }
    // 提示框的位置
    switch (this.verDirection) {
      case 'leftTop' : videoScreenDom.className = 'vidleftTop'
        break
      case 'rightTop' : videoScreenDom.className = 'vidrightTop'
        break
      case 'leftBottom' : videoScreenDom.className = 'vidleftBottom'
        break
      case 'rightBottom' : videoScreenDom.className = 'vidrightBottom'
        break
      case 'leftMiddle' : videoScreenDom.className = 'vidleftMiddle'
        break
      case 'rightMiddle' : videoScreenDom.className = 'vidrightMiddle'
        break
      case 'topMiddle' : videoScreenDom.className = 'vidtopMiddle'
        break
      case 'bottomMiddle' : videoScreenDom.className = 'vidbottomMiddle'
        break
      default : videoScreenDom.className = 'vidtopMiddle'
    }
    return videoScreenDom
  }
}
