/* eslint-disable */
import api from "./MapManager";

/**
 * websocket地址: process.env.WS_API
 */
let WebSocketWrapper = (function (){
  let api = {
    init: init,
    getSid: getSid,
    send: send
  }
  let websock, sid_, onopen_, onerror_, onmessage_, onclose_, send_, layerObjMap={}

  function init (_options){
    // 构造方法
    if (!_options || !_options.sid) return null
    sid_ = _options.sid
    onopen_ = _options.onopen ? _options.onopen : websocketonopen
    onerror_ = _options.onerror ? _options.onerror : websocketonerror
    onmessage_ = _options.onmessage
    onclose_ = _options.onclose ? _options.onclose : websocketclose
    send_ = _options.send ? _options.send : send
    layerObjMap[process.env.WS_API + sid_] = _options.layerObj

    websock = new WebSocket(process.env.WS_API + sid_)
    websock.onopen = onopen_
    websock.onerror = onerror_
    websock.onmessage = websocketonmessage
    websock.onclose = onclose_
  }

  // 获取websocket连接的sid
  function getSid () {
    return sid_
  }

  // 数据发送
  function send (agentData) {
    websock.send(agentData)
  }

  function websocketonmessage (agentData){
    // if (!agentData.target.url.includes('gpsCar')) {
    //   console.log(agentData)
    // }
    let layerObj_ = layerObjMap[this.url]
    if (onmessage_) {
      onmessage_(agentData, layerObj_)
    }
  }

  function websocketonopen () {
    console.log("websocket连接成功")
  }

  function websocketonerror (e) {
    console.log("websocket连接发生错误")
  }

  function websocketclose (e) {
    console.log("websocket连接关闭")
  }

  return api
})();

export default WebSocketWrapper;
