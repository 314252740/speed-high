// 视频
// import videojs from 'video.js'
export default class ScreenVideo {
  // eslint-disable-next-line no-useless-constructor
  constructor (video) {
    let defaultObj = {
      'container': null, // 视频容器
      'verDirection': 'TopMiddle',
      'directionStyle': ['vidleftTop', 'vidrightTop', 'vidleftBottom', 'vidrightBottom', 'vidleftMiddle', 'vidrightMiddle', 'vidrightMiddle', 'vidbottomMiddle']
    }
    // 属性合并
    video = Object.assign(video, defaultObj)
    this.Dom = this.createdUI(video)
  }
  // 创建容器div标签
  createdUI (video) {
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
    if (video.container !== null) {
      video.container.appendChild(videoScreenDom)
    }
    // 图片
    let videoImgDom = document.createElement('img')
    videoImgDom.className = 'videoImg'
    videoImgDom.src = require('../assets/img/mapImg/info-video/videoPlay.png')
    videoScreenDom.appendChild(videoImgDom)
    videoScreenDom.onclick = function () {
      if (document.getElementById('videoDiv')) {
        videoScreenDom.innerHTML = ''
        videoImgDom.src = require('../assets/img/mapImg/info-video/videoPlay.png')
        videoScreenDom.appendChild(videoImgDom)
      } else {
        videoScreenDom.innerHTML = `<div id="videoDiv" class="videoDiv" style="z-index:1000">
        <p class="videoTitleSc"><span class="videoNameSc">${video.name}</span><span class="el-icon-close videoCloseSc" title="关闭视频" οnclick=${closeVideo}></span></p>
        ${video.note}
        </div>`
        videoImgDom.src = require('../assets/img/mapImg/info-video/videoPlay2.png')
        videoScreenDom.appendChild(videoImgDom)
      }
    }
    function closeVideo () {
      videoScreenDom.innerHTML = ''
      videoScreenDom.appendChild(videoImgDom)
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
    switch (video.verDirection) {
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
    // 信息屏状态
    if (video.networkStatus !== 0) {
      videoScreenDom.classList.add('vidtopMiddleError')
      videoScreenDom.classList.remove('vidtopMiddle')
    }
    return videoScreenDom
  }
}
