//设备详情弹框
<template>
    <!--不显示关闭按钮 不需要遮罩层 -->
    <div class="detecorBox">
      <transition name="el-zoom-in-top">
        <div class="backLevel hidden_one" v-show="isback" :title="backLevel" @click.stop="backUpper()">
          <i class="el-icon-arrow-left"></i>
          返回&nbsp;"<span class="backdetail hidden_one">{{backLevel}}</span>"&nbsp;详情页
        </div>
      </transition>
      <transition  name="el-zoom-in-top">
        <div class="facility" ref="facility">
          <div class="tit hidden_one" :title="detailInfo.name">
            <img class="iconDing" :src="detailInfo.icon" alt>
            {{detailInfo.name}}
            <i class="iconfont close" @click.stop="facClose()">&#xe60e;</i><!-- 图标-->
          </div>
          <div class="details">
            <div class="title">
              <i class="iconfont">&#xe650;</i>
              <span>详细信息</span>
            </div>
            <ul class="details_list">
              <li :key="key" v-for="(item, key) in detailInfo.info">
                <div class="zuo">{{item.infoName}}</div>
                <div class="you hidden_one" :title="item.infoDetail">{{item.infoDetail}}</div>
              </li>
              <li v-if="facDetail.layerid === 'policeCar'">
                <div class="zuo">历史轨迹</div>
                <div class="you hidden_one">
                   <div
                     class="btn_show"
                      :class="status==1?'active aroundBlock':'aroundBlock'"
                      @click="historyTrack(true)"
                    >显示警车历史轨迹</div>
                    <!-- <div
                      :class="status==0?'active aroundBlock':'aroundBlock'"
                      @click="historyTrack(false)"
                    >隐藏</div> -->
                </div>
              </li>
            </ul>
          </div>
          <div class="around" v-show="aroundShow">
            <div class="title">
              <div class="left">
                <i class="iconfont" style="color:#fff;">&#xe6ad;</i>
                <span class="aroundEquipment">周边设备</span>
              </div>
              <div class="aroundSwitch">
                <div :class="act==0?'active aroundBlock':'aroundBlock'" @click.stop="aroundBlock">显示</div>
                <div :class="act==1?'active aroundBlock':'aroundBlock'" @click.stop="aroundNone">隐藏</div>
              </div>
            </div>
              <div v-show="!aroundDec" class="noDev">点击【显示】查看周边设备情况</div>
              <ul  v-show="aroundDec" @mouseleave="cancelHigh">
                <!-- 周边设备 -->
                <li v-if="result" class="noDev">{{nothing}}</li>
                <li else :key="key" v-for="(item, index, key) in facList"
                  @mouseover="highStyle(index)"
                  @mouseout="normalStyle(index)"
                  @click="chooseAround(index)">
                  <div class="zuo">
                    <img :src="item.icon" alt>
                    <strong class="num">{{index+1}}</strong>
                  </div>
                  <div class="zhong">
                    <span class="shebeiName hidden_one" :title="item.nameDes">{{item.nameDes}}</span>
                    <p class="xiangqing hidden_one" :title="item.name">{{item.name}}</p>
                    <!-- <span class="shebeiName hidden_one">{{item.name}}</span>
                    <p class="xiangqing hidden_one">{{item.roadName}}</p> -->
                  </div>
                  <div class="you">
                    <div class="waikuang">
                      <img :src="item.exterior" alt>
                    </div>
                  </div>
                </li>
              </ul>
          </div>
        </div>
      </transition>
      <!-- <transition  name="el-zoom-in-top">
        <div class="videoPlayer" v-show="facVideoShow" ref="videoPlayer">
          <video-player
            ref="myPlayer"
            v-for="(item, index) in videoList"
            :key="index"
            :src="item"
            :facVideoShow="facVideoShow"
            >
          </video-player>
          <div v-for="(item, index) in videoList" v-html="item.note" :key="index" ></div>
        </div>
      </transition>
      <el-button type="success" icon="el-icon-plus" circle v-show="openStatuse" class="openVideo" @click="openVideo" title="展开视频"></el-button> -->
      <transition  name="el-zoom-in-top">
        <div class="videoPlayer" v-if="facVideoShow" ref="videoPlayer" >
          <div class="videoTitle">设备关联视频
            <div class="closeVideo cancelVideo" @click="closeVideo" title="最小化">
              <i class="el-icon-minus"></i>
            </div>
            <div class="closeVideo" @click="cancelVideo" title="关闭视频">
              <i class="el-icon-close"></i>
            </div>
          </div>
          <div class="videoItems" ref="videoItems">
            <div class="videoItem" v-for="(item, index) in videoList" v-html="item.note" :key="index" ></div>
          </div>
        </div>
      </transition>
      <div class="openVideo" v-show="openStatuse" @click="openVideo" title="展开视频">
        <i class="el-icon-plus openVideoBtn"></i>
        展开视频
      </div>
      <el-dialog
        @close="historyReset"
        :title='"警车历史轨迹:"+facDetail.name'
        :visible.sync="centerDialogVisible"
        width="60%"
        :modal-append-to-body="false"
        custom-class="customFacility"
        center>
        <div class="formHistory">
          <el-form
          :rules="rules"
          :inline-message="true"
          ref="historyTrack"
          :model="formValue"
          class="demo-ruleForm"
          >
            <el-form-item label="开始时间" prop="startTime">
              <el-date-picker
                v-model="formValue.startTime"
                type="datetime"
                placeholder="选择日期时间"
                format="yyyy-MM-dd hh:mm:ss"
                value-format="yyyy-MM-dd hh:mm:ss"
                :picker-options="pickerOptions"
                default-time="00:00:00"
                style="width:184px"
                >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="endTime" >
              <el-date-picker
                v-model="formValue.endTime"
                type="datetime"
                placeholder="选择日期时间"
                :picker-options="pickerOptions"
                format="yyyy-MM-dd hh:mm:ss"
                value-format="yyyy-MM-dd hh:mm:ss"
                style="width:184px"
                default-time="23:59:59">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <el-row>
            <el-col :span="24">
              <el-button type="success" size="mini" round @click="confirmHistory">开始回放</el-button>
              <el-button type="warning" size="mini" round @click="cancelHistory">结束回放</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="mapcontainer">
          <tile-map></tile-map>
        </div>
        <div slot="footer" class="dialog-footer">
          <div class="controlHistory">
            <el-button type="success" @click="confirmHistory">暂停</el-button>
            <el-button type="danger" @click="cancelHistory">取消</el-button>
            <span class="playSpeed">
              速度：慢<input type="range" class="volume" v-model="volume"/>快
            </span>
          </div>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import tileMap from '@/components/map/tileMap' // 初始化瓦片地图
// import videoPlayer from "../detector/videoPlayer"
import { getAroundList, getCameraList } from '@/api/detector.js'
import { around, shebeiList, facDetailObj, devList, policeList, accidentType, noAroundList } from '../../config/search'
import tranfromData from '../../config/infoDevice'
import MapManager from '@/components/map/MapManager.js'
// import GPShistory from "@/GPShistory/CrossHistory"
import { formatTime } from '@/utils/format'
import { historyTrack } from '@/api/policecar.js'
export default {
  name: 'faclity',
  props: {
    facDetail: {
      type: Object,
      default: () => {}
    },
    clientHeight: {
      type: Number,
      default: 0
    },
    facShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    async facDetail (newvalue, oldvalue) {
      let timeFormat = 'yyyy-MM-dd hh:mm:ss'
      if (Object.keys(newvalue).length <= 0) return
      let that = this
      this.oldDetail = oldvalue
      this.facDetail = newvalue
      this.reset()
      // 有无周边设备
      if (noAroundList.includes(this.facDetail.layerid)) {
        // 隐藏周边
        this.aroundShow = false
      }
      MapManager.clearCircleAndLayer()
      // 地标详情列表监听
      let type = this.facDetail.layerid
      let startIndex = facDetailObj[type].name.indexOf('(')
      if (startIndex < 0) {
        startIndex = facDetailObj[type].name.length
      }
      facDetailObj[type].name = facDetailObj[type].name.slice(0, startIndex)
      if (type === 'serviceArea') {
        facDetailObj[type].name = facDetailObj[type].name + `(${this.facDetail.serviceName})`
      } else if (type === 'policeCar') {
        facDetailObj[type].name = facDetailObj[type].name + `(${this.facDetail.plateNum})`
      } else if (type === 'roadinternet') {
        facDetailObj[type].name = facDetailObj[type].name + `(${this.facDetail.roadName})`
      } else {
        facDetailObj[type].name = facDetailObj[type].name + `(${this.facDetail.name})`
      }
      for (let key in facDetailObj[type].info) {
        if (key === 'roadNames') {
          facDetailObj[type].info[key].infoDetail = this.facDetail.enName + this.facDetail.cnName
          continue
        }
        if (key === 'initTime') { // 事件戳转化为
          facDetailObj[type].info[key].infoDetail = formatTime(timeFormat, timeFormat, this.facDetail.initTime)
          continue
        }
        if (key === 'speed') {
          facDetailObj[type].info[key].infoDetail = this.facDetail[key] + '公里/小时'
          continue
        }
        if (key === 'distance') {
          facDetailObj[type].info[key].infoDetail = this.facDetail[key] + '米'
          continue
        }
        if (tranfromData[type][key] && Object.getOwnPropertyDescriptor(tranfromData[type][key], this.facDetail[key])) {
          facDetailObj[type].info[key].infoDetail = tranfromData[type][key][this.facDetail[key]].name
          continue
        }
        if (key === 'longitude' || key === 'latitude') {
          facDetailObj[type].info[key].infoDetail = parseFloat(this.facDetail[key]).toFixed(6)
          continue
        }
        facDetailObj[type].info[key].infoDetail = this.facDetail[key] ? this.facDetail[key] : ''
      }
      this.detailInfo = facDetailObj[type]
      // 地标周边列表监听
      this.facType = this.facDetail.layerid
      if (accidentType.includes(this.facType)) {
        this.searchList = policeList
      } else {
        this.searchList = devList
      }
      this.facId = this.facDetail.id
      await this.getCameraList(this.facType, { devId: this.facId })
      if (this.aroundShow) {
        let radius = 5000 // 查询半径为5公里
        let center = [newvalue.longitude, newvalue.latitude]
        let zoomCenter = [parseFloat(newvalue.longitude), parseFloat(newvalue.latitude)]
        MapManager.zoomCenter(zoomCenter)
        MapManager.addCircle(center, radius + 1500, true, function (fea) {
          that.devList = []
          that.facList = []
          MapManager.cleanLayer('aroundLayer')
          // 圆拖动后的对象 需要调用查询接口，重新查询周边设备信息 TODO
          that.searchList.forEach(element => {
            let devTagsList = MapManager.getIncludeFeaturesOnLayer(
              element,
              fea.getGeometry()
            )
            devTagsList.forEach(item => {
              that.devList.push(item.getProperties())
            })
          })
          MapManager.addData2Layer('aroundLayer', that.devList)
          that.facList = that.devList
          that.facList_()
        }) //  经纬度和半径
        if (!!center[0] && !!center[1]) {
          await getAroundList(center, radius)
            .then(res => {
              if (accidentType.includes(this.facType)) {
                res.forEach(element => {
                  if (res.layerid === 'camera' || res.layerid === 'policeCar') {
                    this.facList.push(element)
                  }
                })
              } else {
                this.facList = res
              }
              if (that.facList.length > 0) {
              // 周边设备列表
                that.facList_()
                // 周边图层
                MapManager.addData2Layer('aroundLayer', that.facList)
              // that.videoList = []
              // that.facList.forEach(element => {
              //   if (element.layerid === "camera") {
              //     that.facVideoShow = true
              //     that.videoList.push(element)
              //   }
              // })
              } else {
                that.result = true
                this.nothing = '该设备周边五公里范围内未检测到其他设备'
              }
            }).catch(err => {
              that.result = true
              this.nothing = '获取周边设备出错啦！'
              console.log(err)
            })
        } else {
          this.result = true
          this.nothing = '该设备无经纬度信息，无法查询周边设备'
        }
        if (this.facDetail.backShowlayer) {
          MapManager.showLayer('aroundLayer', true)
          MapManager.showLayer('drawLayer', true)
          this.act = 0
          this.aroundDec = true
        } else {
          MapManager.showLayer('aroundLayer', false)
          MapManager.showLayer('drawLayer', false)
        }
      }
    },
    clientHeight (newvalue, oldvalue) {
      this.clientHeight = newvalue
      this.$nextTick(() => {
        this.$refs.facility.style.cssText = `
          max-height:${this.clientHeight - 420}px;
        `
        if (this.facVideoShow) {
          this.$refs.videoPlayer.style.cssText = `
          max-height:${this.clientHeight - 260}px;
        `
          this.$refs.videoItems.style.cssText = `
            max-height:${this.clientHeight - 260}px;
          `
        }
      })
      // display:none;
    },
    facShow (newvalue, oldvalue) {
      if (!newvalue) {
        this.videoList = []
        this.facVideoShow = false
      }
    },
    facVideoShow (newvalue, oldvalue) {
      if (newvalue !== undefined && newvalue === true) {
        this.$nextTick(() => {
          this.$refs.videoPlayer.style.cssText = `
            max-height:${this.clientHeight - 260}px;
          `
          this.$refs.videoItems.style.cssText = `
            max-height:${this.clientHeight - 260}px;
          `
        })
      }
    }
  },
  components: {
    tileMap
  },
  data () {
    return {
      aroundDec: false,
      aroundShow: true,
      volume: 0,
      valueSpeed: 0,
      pickerOptions: {
        disabledDate (value) {
          if (Date.now() <= value) {
            return true
          }
          return false
        }
      },
      histryShow: false,
      rules: {
        startTime: [
          {
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        endTime: [
          {
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ]
      },
      formValue: {
        startTime: null,
        endTime: new Date()
      },
      centerDialogVisible: false,
      searchList: [],
      status: 0,
      openStatuse: false,
      originList: [],
      videoStatuse: false,
      facType: null,
      facVideoShow: false,
      oldDetail: {},
      devList: [],
      nothing: '该设备周边五公里范围内未检测到其他设备',
      feature: null,
      backLevel: '', // 返回上一级的详情页
      isback: false,
      result: false,
      act: 0,
      facId: null,
      detailInfo: {}, // 地标详情列表
      aroundList: {}, // 周边设备列表
      imgSrc: require('../../../../assets/img/mapImg/control-layer/numb3.png'), // 周边设备图标
      imgNorSrc: require('../../../../assets/img/mapImg/control-layer/numb1.png'), // 周边设备图标
      facList: [ ], // mock 周边设备类列表
      videoList: [],
      videoOptions: {
        bigPlayButton: false,
        textTrackDisplay: false,
        posterImage: true,
        errorDisplay: false,
        controlBar: true,
        autoplay: true,
        muted: true,
        aspectRatio: '4:3',
        fluid: true
      }
    }
  },
  methods: {
    formatTooltip (val) {
      return val / 10
    },
    reset () {
      this.aroundDec = false
      this.aroundShow = true
      this.originList = []
      this.searchList = []
      this.videoStatuse = false
      this.openStatuse = false
      this.facVideoShow = false
      this.videoList = []
      this.facList = []
      this.act = 1
      this.status = 0
      this.feature = null
      this.result = false
    },
    historyReset () {
      if (this.histryShow) {
        this.status = 1
      } else {
        this.status = 0
      }
    },
    historyTrack (status) {
      if (!status) {
        this.status = 1
        this.centerDialogVisible = true
        let date = new Date()
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        this.formValue.startTime = date
      } else {
        this.status = 0
        this.centerDialogVisible = false
        // MapManager.cleanLayer("drawLayer")
      }
    },
    confirmHistory () {
      // this.centerDialogVisible = false
      this.histryShow = true
      historyTrack({
        policeId: this.facDetail.id,
        recvtime: this.formValue.endTime,
        gpstime: this.formValue.startTime
      })
        .then(res => {
          if (res.result === 'ok') {
            // 绘制道路
            // MapManager.addRoadToDrawLayer(res.data)
          } else {
            // error
            this.tip('error', '获取警车GPS轨迹资源失败')
          }
        })
        .catch(err => console.log(err))
    },
    cancelHistory () {
      // this.centerDialogVisible = false
      this.status = 0
    },
    openVideo () {
      if (this.videoStatuse) {
        if (this.$parent.$parent.sensorInfoStyle) {
          this.$parent.$parent.hideSensorsInfo()
        }
        // this.$refs.player.pause()
        // this.$refs.player.load(this.src,false)
        this.facVideoShow = true
        this.openStatuse = false
        this.videoList = this.originList
      }
    },
    closeVideo () {
      this.videoList = []
      this.facVideoShow = false
      this.videoStatuse = true
      this.openStatuse = true
    },
    cancelVideo () {
      this.decVideoShow = false
      this.videoList = []
      this.videoStatuse = false
      this.openStatuse = false
    },
    facList_ () {
      if (this.facList.length > 0) {
        let arr = []
        this.result = false
        this.facList.forEach(item => {
          let type = item.layerid
          if (shebeiList.includes(type)) {
            this.$set(item, 'icon', this.imgNorSrc)
            if (item.layerid === 'screenSpeed') {
              this.$set(
                item,
                'exterior',
                require(`../../../../assets/img/mapImg/info-device/small${item.limitValue}.png`)
              )
              this.$set(
                item,
                'nameDes',
                around[type].layerid + '(' + item.name + ')'
              )
            } else {
              this.$set(item, 'exterior', around[type].exterior)
              this.$set(item, 'nameDes', around[type].layerid + '(' + item.name + ')')
            }
            arr.push(item)
          }
        })
        this.facList = arr
        if (this.facList.length <= 0) {
          this.result = true
        }
      } else {
        this.result = true
      }
    },
    aroundBlock () { // 控制地图周边设备显示
      this.act = 0
      this.aroundDec = true
      MapManager.showLayer('aroundLayer', true)
      MapManager.showLayer('drawLayer', true)
    },
    aroundNone () { // 控制地图周边设备隐藏
      this.act = 1
      this.aroundDec = false
      MapManager.showLayer('aroundLayer', false)
      MapManager.showLayer('drawLayer', false)
    },
    highStyle (index) { // 周边设备划过高亮，地图高亮
      if (this.feature) {
        MapManager.cleanCircleLayer(this.feature)
        this.feature = null
      }
      MapManager.resetDrawLayerStyle()
      this.feature = MapManager.addPoint('drawLayer', [
        parseFloat(this.facList[index].longitude),
        parseFloat(this.facList[index].latitude)
      ])
      this.facList[index].icon = this.imgSrc
    },
    normalStyle (index) {
    // 周边设备划出正常显示
      this.facList[index].icon = this.imgNorSrc
    },
    cancelHigh () {
      this.$nextTick(() => {
        if (this.feature) {
          MapManager.cleanCircleLayer(this.feature)
          this.feature = null
        }
      })
    },
    // 点击出现设备详情
    chooseAround (index) {
      if (!this.isback) {
        this.feature = null
        this.backLevel = this.detailInfo.name // this.facList[index].nameDes
        this.$emit('listenContent', this.backLevel, this.facList[index], false)
        // this.isback = true; //显示返回上一层按钮
        this.$nextTick(() => {
          this.$refs.facility.style.cssText = `
            max-height:${this.clientHeight - 460}px;
          `
        })
      }
    },
    // 返回上一级详情页
    backUpper () {
      this.$emit('listenContent', this.oldDetail.name, this.oldDetail, true)
      this.isback = false // 隐藏返回上一层按钮
      this.$nextTick(() => {
        this.$refs.facility.style.cssText = `
          max-height:${this.clientHeight - 420}px;
        `
      })
    },
    facClose () { // 手动关闭基础地标详情
      this.$emit('facClose')
    },
    getCameraList (layerid, id) {
      return getCameraList(layerid, id)
        .then(res => {
          if (res.result === 'ok') {
            if (res.data.length <= 0) {
              this.facVideoShow = false
              this.videoStatuse = false
            } else {
              this.originList = res.data
              this.videoList = this.originList =
                true
              this.videoStatuse = true
            }
          } else {
            this.tip('error', '获取关联视频失败')
          }
        })
        .catch(err => console.log(err))
    },
    tip (type, msg) {
      let str = '成功'
      if (type === 'success') {
        str = '成功'
        Notification.success({
          title: `操作${str}`,
          message: msg + str,
          duration: 2000,
          offset: 100
        })
      } else {
        str = '失败'
        Notification.error({
          title: `操作${str}`,
          message: msg + str,
          duration: 2000,
          offset: 100
        })
      }
    }
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.facility.style.cssText = `
        max-height:${this.clientHeight - 420}px;
        display:none;
      `
    })
  }
}
</script>

<style scoped>
    /* 点击地图设备详情弹框 */
.detecorBox{
  position: absolute;
  left: 0px;
  top: 0px;
  max-height: 800px;
  _height:800px;
  width: 400px;
}
.backLevel{
  width: 400px;
  height: 32px;
  background: #E5F1FD;
  line-height: 32px;
  color: #3497EA;
  font-size: 14px;
  padding-left: 10px;
  box-sizing: border-box;
  margin-bottom: 5px;
  box-shadow:0px 1px 3px #666666;
  cursor: pointer;
}
.facility{
  padding: 5px 13px 16px 13px!important;
  box-sizing: border-box;
  max-height: 800px;
  _height:800px;
  overflow-x: hidden;
  overflow-y: auto;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background: #fff;
  /* position: absolute;
  top:0px;
  left: 0px; */
  width: 400px;
}
.tit{
  height: 33px;
  line-height: 33px;
  color: #6B34BF;
  font-size: 16px;
  padding-bottom: 5px;
}
.iconDing{
  vertical-align: middle;
  padding-right: 5px;
  width: 28px;
  height: 28px;
}
 .dibiao{
  margin: 5px 0;
}
 .dibiao img{
  width:22px;
  vertical-align:middle
}
 .dibiao span{
  color: #6B34BF;
}
 .details{
  margin-bottom: 13px;
  font-size: 12px;
}
 .details .title{
  height: 33px;
  width: 100%;
  background: #3596ED;
  border-radius:13px 0 0  0;
  padding: 8px 0 0 13px;
  box-sizing: border-box;
  margin-bottom: 0;
}
 .details .title .iconfont{
  color: #fff;
  margin-right: 5px;
}
 .details .title span{
  color: #fff;
  font-size: 16px;
}
 .details ul li{
  height: 30px;
  width: 100%;
  background: #E5F2FD;
  border-top: 1px solid #fff;
  box-sizing: border-box;
}
 .details ul li .zuo{
  width: 30%;
  height: 100%;
  border-right: 1px solid #fff;
  box-sizing: border-box;
  padding-left:12px;
  line-height: 30px;
  float: left;
}
 .details ul li .zuo span{
  line-height: 28px;
}
 .details ul li .you{
  width: 70%;
  height: 100%;
  border-right: 1px solid #fff;
  box-sizing: border-box;
  padding-left:12px;
  float: left;
  line-height: 30px;
}
 .details ul li .you span{
  line-height: 28px;
  color: #005BAC;
}
 .details ul li:last-child{
  border-radius: 0 0 13px 0 ;
}
/* 周围设备 */
 .around{
  width: 100%;
}
 .around .title{
  height: 33px;
  width: 100%;
  background: #3596ED;
  border-radius:13px 0 0  0;
  padding: 4px 0 0 13px;
  box-sizing: border-box;
}
 .around .title img{
  vertical-align:middle;
  margin-bottom: 4px;
}
 .around .title .aroundEquipment{
  color: #fff;
  font-size: 16px;
}
 .around .title .left{
  float: left;
  padding-top: 4px;
  margin-right: 14px;
}
 .around .title .aroundSwitch{
  float: left;
}
 .around .title .aroundSwitch .aroundBlock{
  width: 55px;
  height: 25px;
  border: 1px solid #fff;
  border-radius: 5px;
  box-sizing: border-box;
  text-align: center;
  line-height: 25px;
  margin-right: 3px;
  cursor: pointer;
  float: left;
}
 .around .title .aroundSwitch .active{
  background: #fff;
  color: #005AAB;
}
 .around ul li{
  height: 52px;
  width: 100%;
  background: #E5F2FD;
  border-bottom: 1px solid #fff;
  cursor: pointer;
  display: flex;
  transition: all .3s;
}
 .around ul li:hover{
  background: #B3D7F8;
  transition: all .3s;
}
 .around .zuo{
  padding: 6px;
  width: 10%;
  height: 100%;
  box-sizing: border-box;
  justify-content:start;
  position: relative;
}
 .around .zuo img{
  width: 24px;
  height: 38px;
}
 .around .zuo .num{
  position: absolute;
  display: inline-block;
  left: 10px;
  top: 12px;
  width: 17px;
  font-size: 10px;
  color: #fff;
  text-align: center;
  }
 .details ul li .aroundBlock {
  width: 55px;
  height: 25px;
  border: 1px solid #fff;
  border-radius: 5px;
  box-sizing: border-box;
  text-align: center;
  line-height: 24px;
  margin-right: 3px;
  margin-top: 2px;
  cursor: pointer;
  float: left;
}
 .details ul li .active {
  background: #FA5959;
  color: #fff;
}
 .around .zhong{
  width: 70%;
  height: 100%;
  align-items:center;
  padding-top: 10px;
  padding-left: 10px;
  box-sizing: border-box;
}
 .around .zhong .shebeiName{
  color: #0459b3;
  width: 246px;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
 .around .zhong .xiangqing{
  color: #999;
}
 .around .you{
  width: 19%;
  height: 100%;
  padding: 6px 13px 6px 0;
  box-sizing: border-box;
}
 .around .you .waikuang{
  width: 100%;
  height: 100%;
  border-radius: 6px;
  border:1px solid #D2D2D2;
  overflow: hidden;
}
 .around .you .waikuang img{
  width: 100%;
  height: 100%;
}
/* scroll 全局样式s*/
/* 设置滚动条样式 (不支持火狐)*/
  ::-webkit-scrollbar {
    width:8px;
  }
  /*外层轨道。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果*/
  ::-webkit-scrollbar-track {
      width: 6px;
      background-color:#E4E2E3;
      -webkit-border-radius: 2em;
      -moz-border-radius: 2em;
      border-radius:2em;
      display:none
  }
  /*滚动条的设置*/
  ::-webkit-scrollbar-thumb {
      background-color:#E4E2E3;
      background-clip:padding-box;
      -webkit-border-radius: 2em;
      -moz-border-radius: 2em;
      border-radius:2em;
  }
  /* 鼠标移入滚动条 */
  ::-webkit-scrollbar-thumb:hover{
    background: #999;
    cursor: pointer;
  }
  .close{
    float: right;
    cursor: pointer;
  }
  .noDev{
    justify-content: center;
    line-height: 53px;
    color:red;
    text-align: center;
    background: #E5F2FD;
  }
  .videoPlayer{
    width: 640px;
    background: rgba(0,0,0,.1);
    position:fixed;
    top: 62px;
    right: 11px;
    overflow-y:auto;
    overflow-x:hidden;
  }
  .videoItems{
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .videoItem{
    border: 1px solid #ccc;
    background: url("../../../../assets/img/mapImg/loding.gif") center no-repeat;
    background-size: 25px 25px;
  }
  .openVideo{
    position: fixed;
    right: -74px;
    top: 60px;
    width: 80px;
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    color: #fff;
    background: #74b7f2;
    padding-left: 3px;
    cursor: pointer;
    transition: all .5s;
    border-radius: 8px 0 0 8px;
  }
  .openVideo:hover{
    transform: translateX(-70px);
    transition: all .5s;
  }
  .openVideoBtn{
    color: #fff;
  }
  .closeVideo{
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 5px;
    width: 20px;
    height: 20px;
    background: #F56C6C;
    border-radius: 50%;
    font-size: 12px;
    text-align:center;
    line-height: 20px;
    color:#fff;
  }
  .closeVideo:hover{
    background: #fb8686;
  }
  .cancelVideo{
    right: 28px;
    background: #71c5ef;
  }
  .cancelVideo:hover{
    background: #9bd9f9;
  }
  .videoTitle{
  height: 30px;
  width: 320px;
  text-align: center;
  background: #198bee;
  color: #FBE109;
  font-size: 15px;
  font-weight: 100;
  line-height: 30px;
  border-radius:8px 8px 0 0;
  position: absolute;
  right: 0;
  top: 0;
}
.backdetail{
  display: inline-block;
  max-width: 260px;
}
.mapcontainer{
  height: 570px;
  float: left;
  width: calc(100% - 210px)

}
.el-dialog__wrapper .el-dialog .el-dialog__body {
  padding :0px!important;
}
.formHistory{
  width: 210px;
  height: 100%;
  float: left;
  box-sizing: border-box;
  padding: 10px;
}
    .controlHistory{
      width: 500px;
      height: 100%;
      margin:0 auto;}
  .playSpeed{
    padding:0 10px;
    font-size: 12px;
    display: inline-block;
    border-radius: 3px;
    background: #1a89e6;
    line-height: 30px;
    margin-left: 5px;
    color: #fff;
  }
  .volume{
    margin:0 10px;
    vertical-align: middle;
  }
  .btn_show{
    width: 120px!important;
  }
</style>
<style>
/* .detecorBox .el-dialog__wrapper .el-dialog .el-dialog__body {
  padding :0px!important;
} */
.detecorBox .el-dialog__body {
  overflow: hidden;
}
</style>
