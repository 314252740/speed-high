<template>
  <div class="centerBar">
    <ul class="list">
      <!-- 检测仪信息 -->
      <el-popover
        v-model="sensorsVisibel"
        popper-class="bar_popover"
        placement="bottom-start"
        :offset="-5"
        @show="getSensorsInfos"
        @hide="clearList"
        width="370"
        trigger="click">
        <p class="title">检测仪信息
          <i class="el-icon-close float_right" @click="hide"></i>
        </p>
        <div class="content" style="padding-bottom:5px;">
          <el-carousel height="157px" class="swiper">
            <el-carousel-item v-for="(item,index) in sensorsInfoList" :key="index" class="swiperBox">
              <h3 class="small">
                <span class="itemName">更新时间:</span>
                <span>{{item.modifyTime}}</span>
              </h3>
              <h3 class="small">
                <span class="itemName">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置:</span>
                <!-- <el-tooltip class="item" effect="dark" :content="item.roadCode" placement="top"> -->
                <span class="hidden_one">{{ item.name }}</span>
                <!-- </el-tooltip> -->
              </h3>
              <h3 class="small">
                <span class="itemName">能&nbsp;&nbsp;见&nbsp;&nbsp;度:</span>
                <span>{{ item.visibility }}&nbsp;米</span>
              </h3>
              <h3 class="small">
                <span class="itemName">路面状况:</span>
                <span>{{ item.roadCondition }}</span>
              </h3>
              <h3 class="small">
                <span class="itemName">限&nbsp;&nbsp;速&nbsp;&nbsp;值:</span>
                <span>{{ item.speed }}公里/小时</span>
              </h3>
            </el-carousel-item>
          </el-carousel>
        </div>
        <li class="item" slot="reference">
          <img class="itemImg" src="../../../../assets/img/mapImg/info-bar/jianceyixinxi.png" alt="检测仪信息" title="检测仪信息">
        </li>
      </el-popover>
      <!-- 排班信息 -->
      <el-popover
        popper-class="bar_popover"
        placement="bottom-start"
        v-model="SchedulingVisibel"
        width="1200"
        @show="getSchedulingList"
        @hide="clearList"
        :offset="-47"
        trigger="click">
        <p class="title">排班信息<i class="el-icon-close float_right" @click="hide"></i></p>
        <div class="content" style="padding:0;">
          <scheduling ref="scheduling"></scheduling>
        </div>
        <li class="item" slot="reference">
          <img class="itemImg" src="../../../../assets/img/mapImg/info-bar/paiban.png" alt="排班信息" title="排班信息">
        </li>
      </el-popover>
      <!-- 报警信息 -->
      <el-popover
        popper-class="bar_popover"
        placement="bottom-start"
        v-model="alarmMessage"
        width="670"
        @hide="clearList"
        :offset="-90"
        trigger="click">
        <p class="title">设备故障信息<i class="el-icon-close float_right" @click="hide"></i></p>
        <div class="contented" style="padding:0;">
          <ul>
            <li :key="key" v-for="(item, key) in allMsg" class="msgIndex">
              <span class="msgName">主控编号：<span class="empty"></span></span><span class="conLittle">{{ item.list.mainControlLeadId.info}}</span>
              <span class="msgName">灯&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：<span class="empty"></span></span><span class="conMsg">{{ item.list.code.info}}</span>

              <span class="msgName">电池电压：<span class="empty"></span></span><span v-if="parseFloat(item.list.batteryVoltage.info) < 6.8" style="color:red;" class="conMsg">{{ item.list.batteryVoltage.info}}(异常)</span>
              <span v-else class="conMsg">{{ item.list.batteryVoltage.info}}</span>

              <span class="msgName">更新时间：<span class="empty"></span></span><span class="conMsg">{{ item.list.createTime.info}}</span>
              <!-- <span class="msgName">电池电压</span><span v-if="alarmLed(key, item.list.batteryVoltage.info)" class="conMsg">{{ item.list.batteryVoltage.info}}</span>
              <span class="msgName">电池电压</span><span v-else class="conMsg">{{ item.list.batteryVoltage.info}}</span> -->

              <!-- <span class="msgName" v-if="alarmLed(key, item.list.batteryVoltage.info)" style="color:red;">{{item.list.code.info}}(异常)</span>
              <span class="itemstyle itemInfos" v-else>{{item.list.batteryVoltage.info}}</span>
               <span :key="key" v-for="(itemList, key) in item.list" class="msgBox">
                <span class="msgName">{{itemList.name}}</span>
                <span class="itemstyle itemInfos" v-if="alarmLed(key, itemList.info)" style="color:red;">{{itemList.info}}(异常)</span>
                <span class="itemstyle itemInfos" v-else>{{itemList.info}}</span> -->
            </li><br>
          </ul>
          <ul>
            <li :key="index" v-for="(item, index) in visibility" class="msgIndex">
              <span class="msgName">主控编号：</span><span class="conLittle">{{ item.mainControlLeadId}}</span>
              <span class="msgName">设备编号：</span><span class="conMsg">{{ item.address}}</span>
              <span class="msgName">能&nbsp;&nbsp;见&nbsp;&nbsp;度：</span><span style="color:red;" class="conMsg">{{ item.minuteVis}}米</span>
              <span class="msgName">更新时间：<span class="empty"></span></span><span class="conMsg">{{ item.createTime}}</span>
              <!-- <span class="msgName">电池电压：</span><span class="conMsg">{{ item.batteryVoltage }}</span>
              <span class="msgName">CPU温度：</span><span class="conMsg">{{ item.cpuTemperature }}</span>
              <span class="msgName">主控电压：</span><span class="conMsg">{{ item.powerVoltage }}</span>
              <span class="msgName">创建时间：</span><span class="conMsg">{{ item.createTime }}</span> -->
            </li>
          </ul>
        </div>
        <div class="clear-both checkClose">
          <el-checkbox class="checkbox" v-model="checked">勾选后关闭提示音，弹框不再弹出</el-checkbox>
        </div>
        <el-badge :value="msgNum" class="badge" slot="reference">
          <li class="item">
            <img class="itemImg" src="../../../../assets/img/mapImg/info-bar//baojing.png" alt="设备故障信息" title="设备故障信息">
          </li>
        </el-badge>
      </el-popover>
    </ul>
    <audio muted id="audio" style="display:none" :src="audioSrc"/>
    <!-- <iframe allow="autoplay" id="audio" style="display:none" src="/static/audio/8858.wav"></iframe> -->
  </div>
</template>

<script>
// 库
import { Message } from 'element-ui'
// API
import { getSensorsInfos } from '@/api/sensor.js'
import { isJSON, timestampToTime } from '@/utils/format'
import scheduling from './components/Scheduling' //  排班表弹框
import { formatLed, LampLists } from '../../config/search'
// 报警内容websocket
import WebSocketWrapper from '@/components/map/mapWebsocket'
import SID from '@/components/map/WebSocketSID'
export default {
  components: {
    scheduling
  },
  data () {
    return {
      audio: null,
      audioSrc: require('../../../../assets/audio/8858.wav'),
      checked: false,
      activeName: '1',
      allMsg: [],
      batteryList: [],
      visibility: [],
      msgNum: '',
      msgNumbat: '',
      msgNumvis: '',
      interLists: {},
      internetVisibel: false,
      sensorsVisibel: false,
      SchedulingVisibel: false,
      alarmMessage: false,
      BayonetsVisibel: false,
      JurisdictionVisibel: false,
      InterCarVisibel: false,
      sensorsInfoList: [],
      list: {
        Sensor: { // 检测仪
          img: require('../../../../assets/img/mapImg/info-bar/jianceyixinxi.png'),
          title: '检测仪信息',
          type: 'Sensor'
        },
        Scheduling: { // 排班
          img: require('../../../../assets/img/mapImg/info-bar/paiban.png'),
          title: '排班信息',
          type: 'Scheduling'
        },
        Bayonet: { // 卡口
          img: require('../../../../assets/img/mapImg/info-bar/kakou.png'),
          title: '卡口路段拥堵展示',
          type: 'Bayonet'
        },
        Jurisdiction: { // 辖区
          img: require('../../../../assets/img/mapImg/info-bar/xiaqucheliang.png'),
          title: '辖区车辆统计',
          type: 'Jurisdiction'
        },
        InterCar: { // 互联网拥堵
          img: require('../../../../assets/img/mapImg/info-bar/hulianwangcheliang.png'),
          title: '互联网拥堵展示',
          type: 'InterCar'
        }
      }
    }
  },
  watch: {
    alarmMessage (newValue, oldValue) {
      if (newValue) {
        this.SchedulingVisibel = false
        this.sensorsVisibel = false
      }
    }
  },
  methods: {
    // 语音播放
    // aplayAudio (type) {
    //   if (!this.audio) {
    //     return
    //   }
    //   if (type) {
    //     this.audio.play()
    //   } else {
    //     this.audio.pause()
    //   }
    // },
    playAudio () {
      // this.audio.play()
      this.audio.play()
    },
    pauseAudio () {
      // this.audio.pause()
      this.audio.pause()
    },
    hide () {
      this.internetVisibel = false
      this.sensorsVisibel = false
      this.SchedulingVisibel = false
      this.alarmMessage = false
    },
    getSensorsInfos () {
      getSensorsInfos()
        .then(res => {
          if (res.result === 'ok' && res.data) {
            this.sensorsInfoList = res.data.filter(item => item !== null)
          } else {
            this.tip('获取检测仪信息失败，请联系管理员', 'error', 2000)
            setTimeout(() => { this.hideSensorsInfo() }, 500)
          }
        })
        .catch(err => {
          console.log(err)
          this.tip('获取检测仪信息出错啦！', 'error', 2000)
          setTimeout(() => { this.hideSensorsInfo() }, 500)
        })
    },
    hideSensorsInfo () {
      this.sensorsVisibel = false
    },
    clearList () {
      this.sensorsInfoList = []
    },
    getSchedulingList () {
      this.$refs.scheduling.getScheduling()
    },
    tip (msg, type, duration) {
      if (type === 'success') {
        Message.success({
          message: msg,
          center: true,
          showClose: true,
          duration: duration
        })
      } else {
        Message.error({
          message: msg,
          center: true,
          showClose: true,
          duration: duration
        })
      }
    },
    // 异常参数处理
    alarmLed (key, value) {
      switch (key) {
        case 'code': return false
        case 'brightness': return false
        case 'frequency': return false
        case 'batteryVoltage': if (parseFloat(value) < 6.8) { return true } else { return false }
        case 'sunVoltage': return false
        case 'voice': return false
        case 'nightMod': return false
        case 'wake': return false
        case 'cpuTemperature': return false
        case 'createTime': return false
      }
    },
    msgNumber () {
      if (!this.msgNumbat && !this.msgNumvis) {
        this.msgNum = null
      } else {
        this.msgNum = this.msgNumbat + this.msgNumvis
      }
    },
    // websocket成功(引導燈電壓故障)
    websocketonmessage (agentData) {
      if (!isJSON(agentData.data)) {
        this.alarmMessage = false
        return
      }
      // if (!this.checked) {
      //   this.alarmMessage = true
      //   this.aplayAudio(true)
      // } else {
      //   this.aplayAudio(false)
      // }
      if (this.checked) {
        this.pauseAudio()
      } else {
        this.alarmMessage = true
        this.playAudio()
      }
      this.batteryList = JSON.parse(agentData.data).update
      if (this.batteryList.length > 0) {
        this.msgNumbat = this.batteryList.length
        this.batteryList.forEach((element, index) => {
          let obj = {}
          for (let key in LampLists.list) {
            if (element[key] === undefined) {
              LampLists.list[key].info = null
            } else {
              LampLists.list[key].info = formatLed(key, element[key])
            }
          }
          obj = JSON.parse(JSON.stringify(LampLists))
          this.allMsg[index] = obj
        })
      } else {
        this.msgNumbat = 0
        this.allMsg = null
      }
      this.msgNumber()
    },
    // websocket成功(能见度报警)
    websocketvisibility (agentData) {
      if (!isJSON(agentData.data)) {
        this.alarmMessage = false
        return
      }
      // if (!this.checked) {
      //   this.alarmMessage = true
      //   this.aplayAudio(true)
      // } else {
      //   this.aplayAudio(false)
      // }
      if (this.checked) {
        this.pauseAudio()
      } else {
        this.alarmMessage = true
        this.playAudio()
      }
      this.visibility = JSON.parse(agentData.data).update
      if (this.visibility.length > 0) {
        this.msgNumvis = this.visibility.length
        this.visibility.forEach((element, index) => {
          // 数据处理
          element.createTime = timestampToTime(element.createTime)
        })
      } else {
        this.msgNumvis = 0
      }
      this.msgNumber()
    },
    // websocket错误
    websocketonerror (err) {
      console.log(err)
    },
    // websocket关闭
    websocketonclose () {

    }
  },
  created () {

  },
  mounted () {
    this.audio = document.getElementById('audio')
    // 报警数据(LED电池电压)
    // eslint-disable-next-line no-new
    new WebSocketWrapper({ sid: SID.LED_BATTERY, onmessage: this.websocketonmessage, onerror: this.websocketonerror, onclose: this.websocketonclose })
    // 报警数据(能见度)
    // eslint-disable-next-line no-new
    new WebSocketWrapper({ sid: SID.SENSOR_VISIBILITY, onmessage: this.websocketvisibility, onerror: this.websocketonerror, onclose: this.websocketonclose })
  }
}
</script>
<style scoped>
.contented::-webkit-scrollbar {
  height: 10px;
}
.centerBar{
  height: 42px;
  /* width: 100px; */
  border-radius: 21px;
  box-shadow: 0 2px 3px #7C7A7B;
  position: absolute;
  top: 10px;
  left: 477px;
  /* right: 0px; */
  /* margin:0 auto; */
  background: #fff;
  /* overflow: hidden; */
}
.list{
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.item{
  height: 32px;
  width: 32px;
  border-radius: 50%;
  cursor: pointer;
  padding: 0 5px;
}
.itemImg{
  height: 100%;
  width: 100%;
}
.title{
  background: #3496ed;
  height: 32px;
  text-align: center;
  line-height: 32px;
  font-size: 16px;
  color: #fff;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
.content{
  min-height: 100px;
  max-height: 866px;
  overflow-x: auto;
  overflow-y: auto;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background: url("../../../../assets/img/mapImg/loding.gif") #fff center no-repeat;
  background-size: 20px 20px;
}
.contented {
  min-height: 100px;
  max-height: 866px;
  overflow-x: auto;
  overflow-y: auto;
  background: #fff;
  background-size: 20px 20px;
  padding: 6px!important;
  box-sizing: border-box;
}
.swiper{
  overflow: hidden;
  background: url("../../../../assets/img/mapImg/loding.gif") #fff center no-repeat;
  background-size: 20px 20px;
}
.swiperBox{
  background: #fff;
}
/* 检测仪 */
.el-carousel__indicators{
  display: none;
}
.small{
  font-size: 14px;
  line-height: 32px;
  color: #000;
  font-weight: 100;
  overflow: hidden;
  transition: all .5s;
  text-indent: 10px;
  /* border-bottom: 1px dashed #ccc; */
}
.small span{
  line-height: 32px;
  font-size: 14px;
}
.small:hover{
  background: #dcdcdc;
  transition: all .5s;
}
.bgColorG {
  background: #dcdcdc
}
.bgColorL{
  background: #e5f1fd;
}
.itemName{
  float: left;
  font-size: 14px;
  line-height: 32px;
  height: 32px;
  color: #198bee;
  font-weight: 100;
}
.float_right{
  float: right;
  position: absolute;
  top:0px;
  right: 0px;
  padding-right: 11px;
  line-height: 32px;
  font-size: 18px;
  color:#fff;
  transition: all .3s;
  cursor: pointer;
}
.float_right:hover{
  color:tomato;
  transition: all .3s;
}
.msgIndex{
  width: 100%;
  height: 20px;
  margin-bottom: 4px;
  white-space: nowrap;
}
.conMsg {
  text-align: left;
  width: 56px;
  display: inline-block;
  margin-right: 30px;
}
.conLittle {
  text-align: left;
  width: 30px;
  display: inline-block;
  margin-right: 22px;
}
.msgName {
  color: #198bee;
  width: 70px;
  text-align: justify;
  display: inline-block;
}
.checkClose {
  background:#fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding-bottom: 10px;
  box-sizing: border-box;
}
.checkbox{
  float: right;
  margin-right: 10px;
}
</style>
<style>
.bar_popover{
  padding:0!important;
  border-radius: 15px!important;
  background: transparent!important;
  border:0!important;
  margin-top: 24px!important;
  box-shadow: 0 2px 3px #7C7A7B!important;
}
.bar_popover[x-placement^="bottom"] .popper__arrow::after{
  border-bottom-color: #3496ed!important;
  border-bottom-width: 25px!important;
  border-left-width: 10px!important;
  border-right-width: 10px!important;
  top: -19px!important;
  margin-left: -9px!important;
}
.centerBar .list .el-badge__content.is-fixed{
  right: 16px;
}
</style>
