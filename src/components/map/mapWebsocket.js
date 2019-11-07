/**
 * websocket地址: process.env.WS_API
 */
export default class WebSocketWrapper {
  constructor (_options) {
  // 构造方法
    if (!_options || !_options.sid) return null
    this.sid_ = _options.sid
    this.onopen_ = _options.onopen ? _options.onopen : this.websocketonopen
    this.onerror_ = _options.onerror ? _options.onerror : this.websocketonerror
    this.onmessage_ = _options.onmessage
    this.onclose_ = _options.onclose ? _options.onclose : this.websocketclose
    this.send_ = _options.send ? _options.send : this.send
    this.layerObjMap = _options.layerObj
    let that = this
    this.init(that)
  }
  init (that) {
    let websock = new WebSocket(window.VUE_URLS.VUE_APP_WS_API + this.sid_)
    websock.onopen = this.onopen_.bind(that)
    websock.onerror = this.onerror_.bind(that)
    websock.onmessage = this.websocketonmessage.bind(that)
    websock.onclose = this.onclose_.bind(that)
  }
  getSid () {
    return this.sid_
  }
  websocketonmessage (agentData) {
    if (this.onmessage_) {
      this.onmessage_(agentData, this.layerObjMap)
    }
  }
  websocketonopen () {
    console.log('websocket连接成功')
  }

  websocketonerror (e) {
    console.log('websocket连接发生错误')
  }

  websocketclose (e) {
    console.log('websocket连接关闭')
  }
}
