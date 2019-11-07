<template>
  <div id="map" ref="rootmap" class="map">
    <!-- 搜索框 -->
    <search
      :inputValue="inputValue"
      :clientHeight="clientHeight"
      :searchShow="searchShow"
      @listenContent="listenContent"
      @showDistributed="showDistributed"
      @hidePlan="hidePlan"
      @decUpdataList="decUpdataList"
      @asyncValue="asyncValue"
      @showEmerglPlan="showEmerglPlan"
      @hideSensorsInfo="hideSensorsInfo"
      ref="search"
    ></search>
    <!-- 地图 -->
    <tile-map :params="params" @mapInfo="mapInfo" ref="tileMap"></tile-map>
    <!-- 自定义预案 -->
    <transition name="el-zoom-in-top">
      <div class="detail">
        <map-plan
          v-show="planShow"
          :planDetail="planDetail"
          :systemShow="systemShow"
          :totalList="UpdataList"
          :userHistoryList="userHistoryList"
          :systemPlan="systemPlan"
          @mapPlanList="mapPlanList"
          @backuser="backuser"
          @clearProgress="clearProgress"
          ref="mapPlan"
        ></map-plan>
        <detailed v-show="detShow" :detDetail="planDetail" :systemPlan="systemPlan" ref="detailed"></detailed>
      </div>
    </transition>
    <!-- 道路， 大队分布图层控制 -->
    <hezeRoad></hezeRoad>
    <!-- 预案说明 -->
    <transition name="el-zoom-in-top">
      <explanation v-show="explanationshow" @hideAccPlan="hideAccPlan"></explanation>
    </transition>
    <!-- 图层控制 -->
    <equipment
      :rootList="rootList"
      @controlPlan="controlPlan"
      :stakeNumInfo="stakeNumInfo"
      ref="equipment"
    ></equipment>
    <!-- 中间导航条 -->
    <centerBar></centerBar>
    <!-- 系统设备自动操作流程 -->
    <div class="automatic" ref="automatic">
      <process
        :UpdataList="UpdataList"
        :clientHeight="clientHeight"
        :updataType="updataType"
        @clearProcess="clearProcess"
        ref="process"
      ></process>
    </div>
    <div class="Passingdata">
      <ul class="dataBox">
        <li class="dataBoxitem" :key="index" v-for="(item, index) in allCarList">{{item.name}}：{{item.value}}</li>
      </ul>
    </div>
    <!-- 图层缩放，图例 -->
    <mapoperation></mapoperation>
    <!-- 视频巡检 -->
    <transition name="el-zoom-in-top">
      <div class="videoIns" v-show="videoShow" v-if="videoshowExit">
        <div class="videoInsTitle">视频巡检</div>
        <i class="closeVideo el-icon-close" @click="closeVideo" title="关闭视频"></i>
        <!-- <el-button type="danger" icon="el-icon-close" circle class="closeVideo" ></el-button> -->
        <!-- videojs -->
        <!-- <div class="inlinevideo" v-for="(item, index) in videoList" :key="index" >
          <video-player
            ref="myPlayer"
            :src="item"
            :videoShow="videoShow"
            >
          </video-player>
        </div> -->
        <!-- iframe -->
        <div class="inlinevideo" v-for="(item, index) in videoList" :key="index" v-html="item.note" ></div>
      </div>
    </transition>
    <el-dialog
    title="视频巡检"
    :visible.sync="centerDialogVisible"
    width="360px"
    center>
    <span>请选择上下行</span>
    <span slot="footer" class="dialog-footer">
      <el-button type="success" @click="upOrDownRoad(0)">上行</el-button>
      <el-button type="success" @click="upOrDownRoad(1)">下行</el-button>
      <el-button type="danger" @click="cancelVideo">取消视频巡检</el-button>
    </span>
    </el-dialog>
  </div>
</template>
<script>
// 组件
import tileMap from '../../components/map/tileMap' // 初始化瓦片地图
import search from './components/search/Search' // 搜索框
import centerBar from './components/info-bar/InfoBar' //  应急预案详情
import mapPlan from './components/info-plan/InfoPlan' //  应急预案弹框
import hezeRoad from './components/control-road/ControlRoad' // 道路信息
import equipment from './components/control-layer/ControlLayer' // 设备勾选框
import process from './components/info-plan/components/Process' //  系统设备自动操作流程
import detailed from './components/info-plan/components/PlanDetails' //  应急预案详情
import mapoperation from './components/control-legend/ControlLegend'
import explanation from './components/control-layer/components/Explanation' // 预案说明
// import videoPlayer from "../comment/detector/videoPlayer"
// MapManager接口封装
import MapManager from '@/components/map/MapManager.js'
// API
import { parameter } from '@/api/detector.js' // 设备获取最新值
import { getSensorsInfos } from '@/api/sensor.js'
import { getVideoInspection } from '@/api/camera.js'
import { getFogInfo, getSystemPlan } from '@/api/accidentMap.js'
// 组件配置文件，方法
import { seekList, getList, shebeiList, tagsList, policeList, roadList } from './config/controlLayer'
import { Message } from 'element-ui'
import { isJSON } from '@/utils/format'
import Fog from '@/mapConfig/Fog.js'
// 过车数据websocket
import WebSocketWrapper from '../../components/map/mapWebsocket'
import SID from '@/components/map/WebSocketSID'
// 全局样式
import '../../assets/css/position.css'
import '../../assets/css/compositeScreen.css'
import '../../assets/css/fog.css'
import '../../assets/css/infoScreen.css'
import '../../assets/css/videoScreen.css'
import '../../assets/css/speedLimitScreen.css'
export default {
  name: 'basemap',
  components: {
    search,
    hezeRoad,
    equipment,
    mapoperation,
    tileMap,
    process,
    explanation,
    mapPlan,
    detailed,
    // videoPlayer,
    centerBar
  },
  data () {
    return {
      carList: [
        { name: '辖区内车辆总数', value: '--', type: 'total' },
        { name: '货车数量统计', value: '--', type: 'truck' },
        { name: '低速行驶车辆数', value: '--', type: 'Lowspeed' },
        { name: '超速行驶车辆数', value: '--', type: 'hypervelocity' },
        { name: '出辖区车辆数', value: '--', type: 'out' },
        { name: '进入辖区车辆数', value: '--', type: 'in' }
      ],
      allCarList: [],
      sensorsShow: false,
      sensorInfoStyle: false,
      sensorsInfoList: [],
      isscheaulingOpen: false,
      stakeNumInfo: {},
      videoTime: null,
      roadFeature: null,
      upAndDown: null,
      centerDialogVisible: false,
      systemPlan: {},
      videoShow: false,
      videoList: [],
      videoIns: [],
      userHistoryList: [],
      planShow: false, // 自定义预案显示
      searchShow: true, // search控制显示
      systemShow: true, // 显示系统推荐
      planDetail: {}, // 自定义预案数据
      detShow: false, // 预案执行显示
      detDetail: {}, // 预案执数据
      explanationshow: false,
      UpdataList: [], // 设备控制存放列表
      map: null,
      // mock 模拟地图信息数据
      params: {
        // Map
        projection: 'EPSG:4326',
        controls: [],
        // View
        center: [113.89, 29.72],
        resolution: 2.9743262572878496e-4,
        maxResolution: 0.0011897305029151398, // 最大分辨率
        minResolution: 3.8071376093284474e-5,
        // layers
        url: 'http://192.168.2.180:8080/geowebcache/service/wmts',
        matrixSet: 'EPSG:4326_chibi4326',
        format: 'image/png', // 格式
        layer: 'chibi4326',
        // tileGrid
        fullExtent: [113.49610335, 29.4449077, 114.26239965, 30.0153083],
        matrixIds: [
          'EPSG:4326_chibi4326:0',
          'EPSG:4326_chibi4326:1',
          'EPSG:4326_chibi4326:2',
          'EPSG:4326_chibi4326:3',
          'EPSG:4326_chibi4326:4',
          'EPSG:4326_chibi4326:5'
        ],
        resolutions: [
          0.0011897305029151398,
          5.948652514575699e-4,
          2.9743262572878496e-4,
          1.522855043731379e-4,
          7.614275218656895e-5,
          3.8071376093284474e-5
        ],
        tileOrigin: [-400.0, 400.0],
        tileSize: [256, 256],
        wrapX: true
      },
      list: [],
      rootList: {
        tags: [], // 基础地标
        shebei: [], // 设备列表
        roadConList: [], // 道路状况列表
        eventInput: [], // 时间录入列表
        roadRadio: [], // 道路状况列表（单选）
        police: [] // 警员警车
      },
      allLayers: [], // 图层列表
      checklist: [], // 选中的设备列表
      layerArray: [], // 设备图层
      intervalIndex: 0, // 间隔创建图层的layerArray下标，初始值为0
      // 搜索框的值
      inputValue: {},
      processValue: {},
      clientHeight: 0, // 自适应高度
      updataType: 'cancel', // 预案启动类型
      planStatus: false, // 预案编辑状态（做返回按钮用）
      equipmentList: {}, // 设备展示列表,
      detectorList: [], // 自定义预案周边设备列表
      center: [], // 经纬度坐标
      myTimer: null,
      loadingTime: 0
    }
  },
  computed: {
    // 权限
    // ...mapGetters(['roles',"user","loadMenus"])
    videoshowExit () {
      return this.videoIns.length
    }
  },
  watch: {
    clientHeight (newvalue, oldvalue) {
      this.$nextTick(() => {
        this.$refs.automatic.style.cssText = `
          max-height:${this.clientHeight - 150}px;
        `
      })
    },
    planShow (newvalue, oldvalue) {
      if (!newvalue) {
        this.$refs.mapPlan.reset()
      }
    }
  },
  methods: {
    websocketonmessage (agentData) {
      if (!isJSON(agentData.data)) {
        this.allCarList = this.carList
        return
      }
      this.allCarList = JSON.parse(agentData.data).cars
    },
    websocketonerror () {
      this.allCarList = this.carList
    },
    websocketonclose () {
      this.allCarList = this.carList
    },
    clearProgress () {
      this.UpdataList = []
      this.$refs.process.reset()
    },
    hideSensorsInfo () {
      this.sensorInfoStyle = false
      this.sensorsShow = false
      this.sensorsInfoList = []
    },
    closeSensor () {
      this.sensorInfoStyle = false
      this.hideSensorsInfo()
    },
    RefreshSensor () {
      this.sensorsInfoList = []
      this.getSensorsInfos()
    },
    getSensorsInfo () {
      this.sensorInfoStyle = !this.sensorInfoStyle
      if (this.sensorInfoStyle) {
        this.$refs.search.sensorControl()
        this.sensorsShow = true
        this.getSensorsInfos()
      } else {
        this.hideSensorsInfo()
      }
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
    scheaulingOpen () {
      this.isscheaulingOpen = !this.isscheaulingOpen
    },
    cancelVideo () {
      this.centerDialogVisible = false
      this.upAndDown = null
      this.videoList = []
    },
    async upOrDownRoad (status) { // video up or down
      if (status) { // down
        this.upAndDown = status
      } else {
        this.upAndDown = status
      }
      this.centerDialogVisible = false
      this.searchShow = false
      // 获取最近的桩号???????????????????????????
      // MapManager.getIncludeFeaturesOnLayer("stakeNum",fea.getGeometry())
      await this.getVideoInspection({
        roadId: this.roadFeature.id, // this.roadFeature.id,
        pile: '',
        direction: this.upAndDown
      })
      // 视频巡检请求
      this.videoInspection()
    },
    showEmerglPlan () {
      this.planShow = true
      this.detShow = false
      this.systemShow = false
      this.searchShow = false
    },
    backuser (status) {
      // 显示自定义预案
      if (status) {
        this.$refs.search.showBackPlan(true, [
          this.planDetail.longitude,
          this.planDetail.latitude
        ])
      } else {
        this.$refs.search.showBackPlan(false)
      }
    },
    closeVideo () {
      this.videoShow = true
      this.videoInspection()
    },
    videoInspection () { // 视频巡检
      // 请求视频数据
      let that = this
      let arr = []
      let number = 4
      if (this.videoIns.length <= 0) {
        // this.tip("巡检视频资源未找到","error",0)
        return
      };
      if (this.videoShow) {
        this.videoShow = false
        arr = []
        number = 4
        // 清除定时器
        window.clearInterval(this.myTimer)
        this.videoList = []
      } else {
        this.videoShow = true
        this.videoList = []
        arr = this.videoIns.slice(0, number)
        if (arr.length > 0) {
          this.videoList = arr
          // 间隔一分钟跟换播放源
          this.myTimer = setInterval(function () {
            arr = that.videoIns.slice(number, number + 4)
            number = number + 4
            if (arr.length <= 0) {
              window.clearInterval(that.myTimer)
            } else {
              that.videoList = arr
            }
          }, 1000 * 10)// this.videoTime
        }
      }
    },
    hideAccPlan () {
      // 预案说明
      this.explanationshow = false
      let index = this.$refs.equipment.checkList.indexOf('planDec')
      this.$refs.equipment.checkList.splice(index, 1)
    },
    accidentInfo (type) {
      return this.$refs.detailed.dealData(type)
    },
    listenContent (obj) {
      this.inputValue = obj
      this.$set(this.inputValue, 'backShowlayer', true)
    },
    asyncValue (obj) {
      this.inputValue = obj
    },
    showDistributed () {
      this.planShow = true
    },
    hidePlan () {
      // 隐藏预案
      this.planShow = false
      this.detShow = false
      this.searchShow = true
    },
    controlPlan (status) {
      this.explanationshow = status
    },
    mapPlanList (list, status) {
      // 系统推荐预案修改列表
      if (status === 'userDefined') {
        setTimeout(() => {
          this.UpdataList = list
        }, 500)
      } else if (status === 'cancel') {
        this.UpdataList = []
      } else {
        setTimeout(() => {
          this.UpdataList = list
        }, 500)
      }
    },
    mapInfo (data) {
      this.map = data
      // console.log(this.map.getLayers())
    },
    checkedList (data) {
      this.checklist = data
    },
    decUpdataList (choose, status) {
      // 自定义预案修改列表
      let result = true
      this.userHistoryList = []
      this.processValue = Object.assign(this.processValue, this.inputValue)
      // 保存历史记录
      this.UpdataList.forEach(item => {
        this.userHistoryList.push(Object.assign({}, item))
        if (item.id === this.processValue.id) {
          this.UpdataList.splice(this.UpdataList.indexOf(item), 1)
          this.$set(item, 'updataValue', choose)
          this.$set(item, 'status', status)
          this.UpdataList.push(item)
          result = false
          this.processValue = {}
        }
      })
      if (result) {
        this.$set(this.processValue, 'updataValue', choose)
        this.$set(this.processValue, 'status', status)
        this.UpdataList.push(this.processValue)
        this.processValue = {}
      }
    },
    clearProcess () {
      this.UpdataList = []
    },
    getFogInfo (val) {
      getFogInfo(val.id)
        .then(res => {
          if (res.result === 'ok' && res.status === '200') {
            this.planDetail = res.data
          } else {
            console.log(res)
          }
        })
        .catch(err => console.log(err))
      getSystemPlan(val.id)
        .then(res => {
          if (res.result === 'ok' && res.status === '200') {
            this.systemPlan = res.data
          } else {
            console.log(res)
          }
        })
        .catch(err => console.log(err))
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
    // 视频巡检
    getVideoInspection (obj) {
      return getVideoInspection(obj)
        .then(res => {
          if (res.result === 'ok') {
            if (res.data.length <= 0) {
              let msg = '该路段巡检视频资源为空'
              this.videoIns = []
              this.tip(msg, 'success', 2000)
            } else {
              this.videoIns = res.data.filter((item) => {
                return item.note.includes('iframe')
              })
              this.videoTime = res.data[0].playingTime
            }
          } else {
            let msg = '获取巡检视频资源失败，请联系管理员'
            this.tip(msg, 'error', 2000)
          }
        })
        .catch(err => {
          console.log(err)
          let msg = '获取巡检视频资源出错了！'
          this.tip(msg, 'error', 2000)
        })
    },
    intervalLoadMapLayer (time) {
      let that = this
      // 判断是否已经循环完layerArray对象
      if (that.intervalIndex === that.layerArray.length) return
      let layerOjb = that.layerArray[that.intervalIndex]
      setTimeout(function () {
        if (layerOjb && layerOjb.id) {
          MapManager.addLayer(layerOjb.id, () => {
            that.cancelDisabel(layerOjb.id)
          })
        }
        that.intervalIndex++
        that.intervalLoadMapLayer(time)
      }, time)
    },
    cancelDisabel (layerId) {
      if (shebeiList.includes(layerId)) {
        this.findIndex('shebei', layerId)
      } else if (tagsList.includes(layerId)) {
        this.findIndex('tags', layerId)
      } else if (policeList.includes(layerId)) {
        this.findIndex('police', layerId)
      } else if (roadList.includes(layerId)) {
        this.findIndex('roadRadio', layerId)
      }
    },
    findIndex (type, layerId) {
      let index = this.rootList[type].findIndex(function (elem) {
        return elem.id === layerId
      })
      if (this.rootList[type][index].checkTType) {
        this.rootList[type][index].checkTType = false
      } else {
        // console.log(type,this.rootList[type][index].id)
      }
    },
    callBack (val, type) {
      let that = this
      console.log(val)
      if (type === 'system') {
        MapManager.clearCircleAndLayer()
        that.planShow = true
        that.detShow = false
        that.systemShow = true
        that.planDetail = val
        // that.getFogInfo(val)
        that.searchShow = false
      } else {
        that.$nextTick(() => {
          let center = [parseFloat(val.longitude), parseFloat(val.latitude)]
          MapManager.zoomCenter(center)
          that.planShow = true
          that.detShow = false
          that.systemShow = false
          that.planDetail = val
          // that.getFogInfo(val)
          that.$refs.search.showBackPlan(true, [
            that.planDetail.longitude,
            that.planDetail.latitude
          ])
          that.searchShow = false
          // 自定义显示10公里范围内的设备
          that.$refs.mapPlan.change1()
        })
      }
    },
    getControlBtnList (type) {
      // 根据权限加载操作地图列表
      this.equipmentList = seekList(global.antRouter, {}, {})
      this.rootList.shebei = getList(this.equipmentList['layers_dev'], 'shebei')
      this.rootList.tags = getList(this.equipmentList['layers_base'], 'tags')
      this.rootList.roadConList = getList(this.equipmentList['layers_status'], 'road')
      this.rootList.roadRadio = getList(this.equipmentList['layers_status'], 'roadRadio')
      this.rootList.eventInput = getList(this.equipmentList['event_input'], 'eventinput')
      this.rootList.police = getList(this.equipmentList['layers_police'], 'police')
      this.layerArray = [...this.rootList.tags, ...this.rootList.police, ...this.rootList.shebei, ...this.rootList.roadRadio] // ...this.rootList.police
    }
  },
  created () {
    this.getControlBtnList()
    this.$store.dispatch('GetRoadInfos')
  },
  mounted () {
    this.$nextTick(() => {
      let that = this
      if (document.getElementById('map')) {
        this.clientHeight = document.getElementById('map').clientHeight
        window.onresize = function () {
          that.clientHeight = document.getElementById('map').clientHeight
          that.$refs.automatic.style.cssText = `
            max-height:${that.clientHeight - 150}px;
          `
        }
      }
      // 创建设备、地标图层
      // this.layerArray.forEach(element => {
      //   MapManager.addLayer(element.id);
      // });
      // 创建设备、地标图层，一秒创建一个
      this.loadingTime = 0
      // 添加地标，警车，设备图层添加
      this.intervalLoadMapLayer(1000)
      // 添加卡口路况图层
      MapManager.addLayer('roadcross')
      // 添加限速图层
      MapManager.addLayer('speed')
      // 添加互联网路况图层
      MapManager.addLayer('roadinternet')
      // 添加大队辖区图层
      MapManager.addLayer('area')
      // 添加团雾图层
      MapManager.addLayer('fog', () => {
        this.findIndex('roadConList', 'fog')
      })
      // 添加交通事故图层
      MapManager.addLayer('trafficAccident', () => {
        this.findIndex('roadConList', 'trafficAccident')
      })
      // 添加交通事故图层
      MapManager.addLayer('maintenance', () => {
        this.findIndex('roadConList', 'maintenance')
      })
      // -------------------------------------------------------------------------------------------------------------------
      // 互联网实况图层点击事件
      MapManager.addEvent('roadinternet', (attr) => {
        console.log(attr)
        that.inputValue = attr
        that.planShow = false
        that.detShow = false
        that.searchShow = true
        that.$refs.search.hideBack()
      })
      // 道路图层点击事件
      MapManager.addEvent('road', (feature) => {
        that.centerDialogVisible = true
        that.roadFeature = feature
      })
      // 交通事故图层点击事件
      MapManager.addEvent('trafficAccident', (attr) => {
        console.log(attr)
        that.inputValue = attr
        that.inputValue.name = that.inputValue.accidentType
        that.planShow = false
        that.detShow = false
        that.searchShow = true
        that.$refs.search.hideBack()
      })
      // 施工养护图层点击事件
      MapManager.addEvent('maintenance', (attr) => {
        console.log(attr)
        that.inputValue = attr
        that.inputValue.name = that.inputValue.constructionType
        that.planShow = false
        that.detShow = false
        that.searchShow = true
        that.$refs.search.hideBack()
        // that.stakeNumInfo = attr
        // console.log(attr)
        // delete that.stakeNumInfo.geometry
        // let center = [parseFloat(attr.longitude), parseFloat(attr.latitude)];
        // MapManager.zoomCenter(center);
      })
      // 团雾，交通事故，施工养护 Overlayer操作
      Fog.setCallback(function (val, type) {
        that.callBack(val, type)
      })
      MapManager.addEvent('fog', function (feature) {
        console.log(feature)
        that.planShow = false
        that.detShow = true
        that.searchShow = false
        that.planDetail = feature
        // that.getFogInfo(feature)
      })
      // 图层地标，设备，警车点击事件
      let arr = [...this.rootList.tags, ...this.rootList.police, ...this.rootList.shebei]
      arr.forEach(element => {
        MapManager.addEvent(element.id, async function (attr) {
          // 数据更新
          if (attr.layerid === 'crossdev' || attr.layerid === 'led') {
            that.inputValue = attr
            if (attr.layerid === 'led') {
              that.$set(that.inputValue, 'name', that.inputValue.location)
            }
          } else {
            await parameter(attr.layerid, attr.id)
              .then(res => {
                if (res.result === 'ok' && res.status === '200') {
                  if (attr.layerid === 'policeCar') {
                    let obj = Object.assign(attr, res.data)
                    obj.layerid = 'policeCar'
                    that.inputValue = obj
                  } else {
                    that.inputValue = Object.assign(attr, res.data)
                  }
                } else {
                  console.log(res) // 出错啦
                }
              })
              .catch(err => console.log(err))
          }
          if (that.inputValue.layerid === 'stakeNum') {
            that.stakeNumInfo = that.inputValue
            delete that.stakeNumInfo.geometry
          }
          console.log(attr)
          // let center = [parseFloat(attr.longitude), parseFloat(attr.latitude)];
          // MapManager.zoomCenter(center);
          that.planShow = false
          that.detShow = false
          that.searchShow = true
          that.$refs.search.hideBack()
        })
      })
      // 过车数据websocket
      // eslint-disable-next-line no-new
      new WebSocketWrapper({ sid: SID.ALL_CAR, onmessage: this.websocketonmessage, onerror: this.websocketonerror, onclose: this.websocketonclose })
    })
  }
}
</script>

<style scoped>
.automatic {
  position: absolute;
  right: 60px;
  bottom: 8px;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 10px;
  background: #fff;
  z-index: 2;
}
#map {
  height: 100%;
  width: 100%;
  position: relative;
}
.detail {
  position: absolute;
  top: 130px;
  left: 10px;
  width: 400px;
  height: auto;
  z-index: 2;
}
/* 设置滚动条样式 (不支持火狐)*/
.automatic::-webkit-scrollbar {
  width: 8px;
}
/*外层轨道。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果*/
.automatic::-webkit-scrollbar-track {
  width: 6px;
  background-color: #e4e2e3;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
  display: none;
}
/*滚动条的设置*/
.automatic::-webkit-scrollbar-thumb {
  background-color: #e4e2e3;
  background-clip: padding-box;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
/* 鼠标移入滚动条 */
.automatic::-webkit-scrollbar-thumb:hover {
  background: #999;
}
.videoIns {
  /* max-width: 1295px;
  max-height: 577px;
  overflow: auto; */
  /* width: 80%; */
  width: 1287px;
  background-color: rgba(255, 255, 255, 1);
  /* height: 67%; */
  position: fixed;
  z-index: 2;
  top: 10vh;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 8px;
}
.inlinevideo {
  /* width: 49.5%; */
  margin-right: 2.5px;
  /* margin-bottom: 2.5px; */
  box-sizing: border-box;
  display: inline-block;
  border:1px solid #ccc;
  background: url("../../assets/img/mapImg/loding.gif") center no-repeat;
  background-size: 50px 50px;
}
.videoIns .inlinevideo:nth-child(2n){
  margin-right: 0;
}
.closeVideo{
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 23px;
  color: #fff;
  line-height: 27px;
  cursor: pointer;
}
.closeVideo:hover{
  color:#e67a7a;
}
.videoInsTitle{
  height: 45px;
  width: 100%;
  text-align: center;
  background: #198bee;
  color: #fff;
  font-size: 18px;
  font-weight: 100;
  line-height: 45px;
  border-radius: 8px 8px 0 0;
}
.schedulingBox{
  width: 60%;
  position: fixed;
  left: 20%;
  top: 22%;
  z-index: 999;
}
.closeSensor{
  float: right;
  margin-right: 5px;
  background: #198bee;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  line-height: 20px;
  margin-top: 5px;
  color:#fff;
  cursor:pointer;
}
.closeSensor:hover{
  color: #e67a7a;
}
.RefreshSensor{
  float: right;
  margin-right: 4px;
  background: #198bee;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  line-height: 20px;
  margin-top: 5px;
  color:#fff;
  cursor:pointer;
}
.titleForSensor{
  padding-left: 50px;
}
.RefreshSensor:hover{
  color: #4DD883;
}
/* 过车数据 */
.Passingdata{
  width: 420px;
  height: 54px;
  border-radius: 10px;
  background: rgba(93,149,231,.75);
  position: fixed;
  box-shadow: 0 2px 3px #7C7A7B;
  top: 10px;
  right:390px;
  overflow:hidden;
}
.dataBox{
  height: 100%;
  width: 100%;
}
.dataBoxitem{
  float: left;
  height: 26px;
  font-size: 12px;
  width: 33.33%;
  box-sizing: border-box;
  line-height: 26px;
  color:#fff;
  text-align: center;
}
</style>
<style>
.el-carousel__indicators{
  display: none;
}
</style>
