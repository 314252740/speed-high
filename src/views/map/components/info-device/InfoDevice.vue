// 检测仪设备详情
<template>
  <!-- 检测仪详情 -->
  <div class="detecorBox">
    <transition name="el-zoom-in-top">
      <div class="backLevel" v-show="isback" :title="backLevel" @click.stop="backUpper()">
        <i class="el-icon-arrow-left"></i>
        返回&nbsp;"<span class="backdetail hidden_one">{{backLevel}}</span>"&nbsp;详情页
      </div>
    </transition>
    <transition name="el-zoom-in-top">
      <div class="backLevel" v-show="isPlanBack" @click.stop="showEmerglPlan">
        <i class="el-icon-arrow-left"></i>
        返回应急预案
      </div>
    </transition>
    <transition name="el-zoom-in-top">
      <div class="detecor" ref="detecor">
        <div class="tit hidden_one" :title="detailInfo.name">
          <img class="iconDing" :src="detailInfo.icon" alt />
          {{detailInfo.name}}
          <i class="iconfont close" @click.stop="decClose()">&#xe60e;</i>
          <!-- 图标-->
        </div>
        <div class="testInformation">
          <div class="title">
            <i class="iconfont">&#xe650;</i>
            <span>详细信息</span>
          </div>
          <div class="shebei">
            <div class="shebeiPic" ref="shebeiPic">
              <img :src="detailInfo.img" alt />
            </div>
            <div class="shebeiInfo" ref="shebeiInfo">
              <ul class="clear-both infoList">
                <li class="clear-both" :key="key" v-for="(item, key) in detailInfo.info">
                  <div class="zuo hidden_one" :title="item.infoName">{{item.infoName}}</div>
                  <div class="you hidden_one" :title="item.infoDetail">{{item.infoDetail}}</div>
                </li>
                <li v-if="decDetail.layerid === 'camera'" class="clear-both">
                  <div class="zuo">视频播放</div>
                  <div class="you">
                    <div
                      :class="status==1?'active aroundBlock':'aroundBlock'"
                      @click="play(true)"
                    >播放</div>
                    <div
                      :class="status==0?'active aroundBlock':'aroundBlock'"
                      @click="play(false)"
                    >隐藏</div>
                  </div>
                </li>
                 <li v-if="decDetail.layerid === 'led'" class="clear-both">
                  <div class="zuo">能见度</div>
                  <div class="you">
                    <div
                      :class="btnstatus1==1?'active aroundBlock':'aroundBlock'"
                      @click="viewLedInfo('visibility', true)"
                    >查看</div>
                    <div
                      :class="btnstatus1==0?'active aroundBlock':'aroundBlock'"
                      @click="viewLedInfo('visibility',false)"
                    >隐藏</div>
                  </div>
                </li>
                <li v-if="decDetail.layerid === 'led'" class="clear-both">
                  <div class="zuo">引导灯状态</div>
                  <div class="you">
                    <div
                      :class="btnstatus2==1?'active aroundBlock':'aroundBlock'"
                      @click="viewLedInfo('status',true)"
                    >查看</div>
                    <div
                      :class="btnstatus2==0?'active aroundBlock':'aroundBlock'"
                      @click="viewLedInfo('status',false)"
                    >隐藏</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="around">
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
            <ul v-show="aroundDec" @mouseleave="cancelHigh">
              <!-- 周边设备 -->
              <li v-if="result" class="noDev">{{nothing}}</li>
              <li
                else
                :key="key"
                v-for="(item, index, key) in facList"
                @mouseover="highStyle(index)"
                @mouseout="normalStyle(index)"
                @click="chooseAround(index)"
                :class="isback ? 'DisableCursor' : 'cursor'"
              >
                <div class="zuo">
                  <img :src="item.icon" alt />
                  <strong class="num">{{index+1}}</strong>
                </div>
                <div class="zhong">
                  <span class="shebeiName hidden_one" :title="item.nameDes">{{item.nameDes}}</span>
                  <p class="xiangqing hidden_one" :title="item.name">{{item.name}}</p>
                </div>
                <div class="you">
                  <div class="waikuang">
                    <img :src="item.exterior" alt />
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="control" v-if="rolseShow">
            <div class="title">
              <div class="left">
                <i class="iconfont" style="color:#fff;">&#xe620;</i>
                <span class="aroundEquipment">设备控制</span>
              </div>
            </div>
            <ul class="decControl" v-if="decList">
              <li class="decItem">
                <div class="decControlBox">
                  <i class="iconfont" style="color:#0887FA;">&#xe607;</i>
                  <span class="decControlTit">设备开关</span>
                  <el-switch
                    v-model="value2"
                    active-color="#13ce66"
                    :width="50"
                    inactive-color="#ff4949"
                    @change="decSwitch()"
                  ></el-switch>
                </div>
              </li>
              <li class="decItem" v-if="resetControl">
                <div class="decControlBox">
                  <i class="iconfont" style="color:#0887FA;">&#xe605;</i>
                  <span class="decControlTit">设备重启</span>
                </div>
                <div
                  :class="acte==true?'restartactive restart':'restart'"
                  @click.stop="restart()"
                >重启</div>
              </li>
              <li class="decItem" v-if="modify">
                <div class="clearfix">
                  <i class="iconfont" style="color:#0887FA;">&#xe605;</i>
                  <span class="decControlTit">设备控制</span>
                </div>
                <div class="controlDec" v-if="notScreenComposite">
                  <span class="controlDecItem">{{decmodify.name}}</span>
                  <br v-if="Linefeed" />
                  <span
                    class="itemList"
                    :class="{listactive:index == listitem}"
                    @click="chooseItem(index)"
                    :key="key"
                    v-for="(item, index, key) in decmodify.info"
                  >{{item.name}}</span>
                </div>
                <div class="controlDec" v-if="!notScreenComposite">
                  <span class="controlDecItem" v-if="notScreenComposite">{{decmodify.name}}</span>
                  <el-select
                    clearable
                    v-model="visibilityValue"
                    @change="setdialogValue('visibility', visibilityValue)"
                    placeholder="能见度"
                    style="width:85px;"
                  >
                    <el-option
                      v-for="item in visibilityOptions"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <el-select clearable v-model="loadValue" @change="setdialogValue('roadStatus', loadValue)" placeholder="路面状况" style="width:95px;">
                    <el-option
                      v-for="item in loadOptions"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <el-select
                    clearable
                    @change="setdialogValue('weatherState',wethwerValue)"
                    v-model="wethwerValue"
                    placeholder="天气状况"
                    style="width:95px;"
                  >
                    <el-option
                      v-for="item in wetherOptions"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <el-button
                    type="primary"
                    size="mini"
                    round
                    style="margin-left: 5px;"
                    @click="chooseItemCom"
                  >确定</el-button>
                </div>
                <el-dialog
                  :title="detailInfo.name"
                  :visible.sync="centerDialogVisible"
                  width="30%"
                  center
                  @close="restore"
                  :modal-append-to-body="false"
                >
                  <span>
                    确定要将显示信息修改为:
                    <span v-show="!compositeDia" style="color:red;">{{showValue}}</span>
                    <span v-show="compositeDia" style="color:red;">
                      能 见 度：{{dialogValue.visibility}}；
                      路面状况：{{dialogValue.roadStatus}}；
                      天气状况：{{dialogValue.weatherState}}；
                    </span>
                  </span>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click.stop="cancelUpdata">取 消</el-button>
                    <el-button type="primary" @click.stop="confirmUpdata">确 定</el-button>
                  </span>
                </el-dialog>
              </li>
            </ul>
            <ul class="decControl" v-else-if="uav">
              <li class="decItem">
                <div class="decControlBox">
                  <i class="iconfont">&#xe633;</i>
                  <span class="decControlTit">启动</span>
                  <el-switch
                    v-model="value2"
                    active-color="#13ce66"
                    :width="50"
                    inactive-color="#ff4949"
                    @change="startUpUav"
                  ></el-switch>
                </div>
              </li>
              <li class="decItem">
                <div class="decControlBox">
                  <i class="iconfont">&#xe633;</i>
                  <span class="decControlTit">巡航</span>
                </div>
                <div
                  :class="uavCruiseStyle===true?'restartactive restart':'restart'"
                  @click="uavCruise()"
                >巡航</div>
              </li>
              <li class="decItem">
                <div class="decControlBox">
                  <i class="iconfont">&#xe633;</i>
                  <span class="decControlTit">返航</span>
                </div>
                <div
                  :class="uavBackStyle===true?'restartactive restart':'restart'"
                  @click="uavBack()"
                >返航</div>
              </li>
            </ul>
            <ul class="decControl" v-else-if="ledControl">
              <li class="decItem">
                <div class="controlele">
                  <span class="contolItem">
                  <i class="iconfont">&#xe602;</i>
                    夜间状态
                  </span>
                  <el-switch
                    v-model="dataForm.atNight"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value= '1'
                    inactive-value="0"
                    @change="updataMaster()">
                  </el-switch>
                </div>
                <div class="controlele">
                  <span class="contolItem">
                  <i class="iconfont">&#xe636;</i>
                    声音
                  </span>
                  <el-switch
                    v-model="dataForm.voice"
                    active-value="1"
                    inactive-value="0"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="updataMaster()">
                  </el-switch>
                </div>
              </li>
              <li class="decItem">
                <div class="controlele">
                  <span class="contolItem">
                  <i class="iconfont">&#xe6a6;</i>
                    控制模式
                  </span>
                  <el-tooltip :content="controlMode === '0' ? '自动' : '手动'" placement="top">
                    <el-switch
                      v-model="controlMode"
                      style="vertical-align: middle;"
                      active-color="#13ce66"
                      inactive-color="#0ea6cc"
                      active-value="0"
                      inactive-value="1"
                      @change="setLedModel">
                    </el-switch>
                  </el-tooltip>
                </div>
                <div class="controlele">
                  <span class="contolItem">
                  <i class="iconfont">&#xe67a;</i>
                    尾迹
                  </span>
                  <el-switch
                    v-model="dataForm.wake"
                    style="vertical-align: middle;"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="1"
                    inactive-value="0"
                    @change="updataMaster()">
                  </el-switch>
                </div>
              </li>
              <li class="decItem">
                <div class="sliderName">
                  <span class="contolItem">
                  <i class="iconfont">&#xe7af;</i>
                    亮度
                  </span>
                </div>
                <div class="mySlider">
                  <el-slider
                    v-model="dataForm.brightness"
                    :step="10"
                    show-stops
                    :format-tooltip='formatbrightness'
                    :show-tooltip="false"
                    @change="updataMaster()">
                  </el-slider>
                </div>
                <div class="showNumber">
                  <span>{{dataForm.brightness}}%</span>
                </div>
              </li>
              <li class="decItem">
                <div class="sliderName">
                  <span class="contolItem">
                  <i class="iconfont">&#xe600;</i>
                    频率
                  </span>
                </div>
                <div class="mySlider">
                  <el-slider
                    v-model="dataForm.frequency"
                    :step="8.3333"
                    :show-tooltip="false"
                    show-stops
                    :format-tooltip="formatfrequency"
                    @change="updataMaster()">
                  </el-slider>
                </div>
                <div class="showNumber">
                  <span>{{parseInt(dataForm.frequency/8) * 10}}Hz</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
    <transition  name="el-zoom-in-top">
       <div class="videoBox" v-show="video" v-html="src" ref="videobox">
        <!-- <video-player ref="player" :src="src"></video-player> -->
      </div>
    </transition>
    <!-- videojs -->
    <!-- <div class="videoPlayer" v-show="decVideoShow" ref="videoPlayer">
      <video-player
        ref="myPlayer"
        v-for="(item, index) in videoList"
        :key="index"
        :src="item"
        :decVideoShow="decVideoShow"
        >
      </video-player>
    </div> -->
    <!-- iframe -->
    <transition  name="el-zoom-in-top">
      <div class="videoPlayer" v-if="decVideoShow" ref="videoPlayer" >
        <div class="videoTitle">设备关联视频
          <div class="closeVideo cancelVideo" @click="closeVideo" title="最小化">
            <i class="el-icon-minus"></i>
          </div>
          <div class="closeVideo" @click="cancelVideo" title="关闭视频">
            <i class="el-icon-close"></i>
          </div>
        </div>
        <!-- <div class="empty1"></div> -->
        <!-- <el-button type="danger" icon="el-icon-minus" size="mini" circle class="closeVideo" @click="closeVideo" title="最小化"></el-button> -->
        <div class="videoItems" ref="videoItems">
          <div class="videoItem" v-for="(item, index) in videoList" v-html="item.note" :key="index" ></div>
        </div>
      </div>
    </transition>
    <div class="openVideo" v-show="openStatuse" @click="openVideo" title="展开视频">
      <i class="el-icon-plus openVideoBtn"></i>
      展开视频
    </div>
    <transition  name="el-zoom-in-top">
       <div class="ledInfo" v-show="showLedInfo" ref="ledInfo">
         <ledEcharts v-show="btnstatus1 === 1" ref="ledoptions" :options="ledoptions"></ledEcharts>
         <div class="ledList" v-show="btnstatus2 === 1">
           <p v-show="loadingLed" class="loading"></p>
           <p v-show="Offline" class="offline">
             获取数据出错啦！
           </p>
           <!-- led控制缩放 -->
           <div class="controlZoom">
             <i class="zoom el-icon-remove-outline" @click="zoom('in')" title="缩小"></i>
             <i class="zoom el-icon-circle-plus-outline" @click="zoom('out')" title="放大"></i>
           </div>
            <!-- led状态信息 -->
            <transition  name="el-zoom-in-top">
              <div class="infoLED" v-show="lampShow">
                <p class="lamptitle">引导灯状态信息<i class="el-icon-close icon" @click="closeLamp"></i></p>
                <ul class="ledStatusList">
                  <li class="statusItem" :class="item.line === true ?'line':'unline'" :key="key" v-for="(item, key) in itemledList.list">
                    <span class="ledtitle hidden_one" :title="item.name">{{item.name}}</span>
                    <span class="ledStatusInfo hidden_one" v-if="alarmLed(key, item.info)" style="color:red" :title="item.info">{{item.info}}</span>
                    <span class="ledStatusInfo hidden_one" v-else :title="item.info">{{item.info}}</span>
                  </li>
                </ul>
              </div>
            </transition>
            <!-- led列表 -->
           <ul :style="{height: ledListSpace + 'px'}" v-show="!loadingLed && !Offline" class="ledlists">
             <li class="leditem" :style="{height: ledspacing + 'px'}" :key="index" v-for="(item, index) in ledList">
                <!-- 外护栏 -->
                  <img class="ledstatus posUp" :class="idx === index && idx2 === 0?'checkedactive':null" @click="getLedStatus(item[0], index, 0)" :src="findImg('down', item[0])" alt="">
                <!-- 内护栏 -->
                  <img class="ledstatus posDown" :class="idx === index && idx2 === 1?'checkedactive':null" @click="getLedStatus(item[1], index, 1)" :src="findImg('up', item[1])" alt="">
                <!-- 外护栏 -->
                  <img class="ledstatus posUp2" :class="idx === index && idx2 === 2?'checkedactive':null" @click="getLedStatus(item[2], index, 2)" :src="findImg('up', item[2])" alt="">
                <!-- 内护栏 -->
                  <img class="ledstatus posDown2" :class="idx === index && idx2 === 3?'checkedactive':null" @click="getLedStatus(item[3], index, 3)" :src="findImg('down', item[3])" alt="">
             </li>
           </ul>
         </div>
      </div>
    </transition>
  </div>
</template>
<script>
import ledEcharts from '@/components/echarts/echarts'
import {
  decDetailObj,
  shebeiControl,
  around,
  decUpdataInfo,
  devList,
  shebeiList,
  resetControl,
  changeControl,
  LampLists,
  formatLed
} from '../../config/search'
import { Notification, Message } from 'element-ui'
import { decControl, getCameraList, getAroundList, getLedVisibility, getLeadstatus, updataLampStatus, getMasterStatus, manualAuto } from '@/api/detector.js'
import { updataDecValue } from '@/api/roadCondition.js'
import { chartsConfig } from '@/config/echartsType.js'
import { timestampToTime } from '@/utils/format'
import tranfromData from '../../config/infoDevice'
import changeValue from '@/mapConfig/changeValue'
import { mapGetters } from 'vuex'
import MapManager from '@/components/map/MapManager.js'
// 视频组件
// import videoPlayer from "./videoPlayer"
export default {
  components: {
    ledEcharts
    // videoPlayer
  },
  props: {
    decDetail: {
      type: Object,
      default: () => {}
    },
    clientHeight: {
      type: Number,
      default: 0
    },
    searchShow: {
      type: Boolean,
      default: false
    },
    decShow: {
      type: Boolean,
      default: false
    },
    searchbackLevel: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapGetters(['roles', 'user']),
    Linefeed () {
      if (this.decType === 'screenSpeed') {
        return false
      } else {
        return true
      }
    },
    notScreenComposite () {
      if (this.decType === 'screenComposite') {
        return false
      } else {
        return true
      }
    },
    planBack () {
      if (this.searchShow === true) {
        return true
      } else {
        return false
      }
    }
  },
  data () {
    return {
      controlMode: '0',
      masterInfo: null,
      submitForm: {
        id: null,
        brightness: null,
        frequency: null,
        atNight: null,
        wake: null,
        voice: null
      },
      dataForm: {
        id: null,
        brightness: null,
        frequency: null,
        atNight: 0,
        wake: 0,
        voice: 0
      },
      brightnessF: { '0': 0, '1': 10, '2': 9, '3': 8, '4': 7, '5': 6, '6': 5, '7': 4, '8': 3, '9': 2, '10': 1 },
      idx2: -1,
      idx: -1,
      lampShow: false,
      itemledList: {},
      ledListSpace: 700,
      ledspacing: 120,
      loadingLed: false,
      Offline: false,
      ledList: [],
      ledstatus: {
        alarm: {
          up: require('../../../../assets/img/mapImg/info-device/guzhang2.png'),
          down: require('../../../../assets/img/mapImg/info-device/guzhang.png')
        },
        close: {
          up: require('../../../../assets/img/mapImg/info-device/guanbi2.png'),
          down: require('../../../../assets/img/mapImg/info-device/guanbi.png')
        },
        wake: {
          up: require('../../../../assets/img/mapImg/info-device/weiji2.gif'),
          down: require('../../../../assets/img/mapImg/info-device/weiji.gif')
        },
        guide: {
          up: require('../../../../assets/img/mapImg/info-device/yindao2.gif'),
          down: require('../../../../assets/img/mapImg/info-device/yindao.gif')
        }
      },
      ledoptions: chartsConfig.ledLine,
      btnstatus1: 0,
      btnstatus2: 0,
      showLedInfo: false,
      hidearound: true,
      resetControl: false,
      showValue: null,
      InitialIndex: -1,
      defaultStause: false,
      openStatuse: false,
      originList: [],
      videoStatuse: false,
      decVideoShow: false,
      dectecorType: null,
      accidentCenter: [],
      isPlanBack: false,
      src: null,
      backStaus: false,
      compositeDia: false,
      devList: [], // 设备、地标编辑园列表
      feature: null,
      status: 0,
      video: false,
      backLevel: '', // 返回上一级的详情页
      isback: false, // 初始隐藏返回上一层按钮
      visibilityOptions: [ // 0:全黑 1：良好 2：一般 3：较差 4：极差
        { name: '全黑', value: 0 },
        { name: '良好', value: 1 },
        { name: '一般', value: 2 },
        { name: '较差', value: 3 },
        { name: '极差', value: 4 }
      ], // 能见度
      visibilityValue: '',
      loadOptions: [ // 0:全黑 1：良好 2：湿滑 3：结冰 4：积雪
        { name: '全黑', value: '0' },
        { name: '良好', value: '1' },
        { name: '湿滑', value: '2' },
        { name: '结冰', value: '3' },
        { name: '积雪', value: '4' }
      ], // 路面状况
      loadValue: '',
      wetherOptions: [ // 0:全黑 1：良好 2：降雨 3：暴雨 4：降雪 5：雾霾
        { name: '全黑', value: '0' },
        { name: '良好', value: '1' },
        { name: '降雨', value: '2' },
        { name: '暴雨', value: '3' },
        { name: '降雪', value: '4' },
        { name: '雾霾', value: '5' }
      ], // 天气状况
      wethwerValue: '',
      centerDialogVisible: false, // 弹出层显示
      ids: '', // 设备id
      decType: '', // 设备类型
      decmodify: {}, // 设备控制内容
      uav: false,
      decList: true,
      modify: true,
      ledControl: false,
      act: 1, // 周边设备显示/隐藏
      acte: false, // 重启设备状态
      value2: true,
      detailInfo: {}, // 设备详情列表
      decId: null, // 设备id
      aroundList: {}, // 周边列表
      aroundDec: false, // 周边设备显示
      rolseShow: false,
      listitem: -1, // 选择设备控制样式
      imgSrc: require('../../../../assets/img/mapImg/control-layer/numb3.png'),
      imgNorSrc: require('../../../../assets/img/mapImg/control-layer/numb1.png'),
      facList: [], // 周边设备列表
      uavCruiseStyle: false,
      uavBackStyle: false,
      confirmItem: {}, // 选中修改值
      effectivetime: 0,
      comValue: {
        visibility: '',
        weatherState: '',
        roadStatus: ''
      },
      nothing: '该设备周边五公里范围内未检测到其他设备',
      result: false,
      videoPlayer: {},
      videoList: [],
      msg: null,
      dialogValue: {
        visibility: '', // 弹出层使用
        weatherState: '', // 弹出层使用
        roadStatus: '' // 弹出层使用
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.shebeiPic.style.height = this.$refs.shebeiInfo.offsetHeight + 'px'
      this.$refs.detecor.style.cssText = `
          max-height:${this.clientHeight - 425}px;
          display:none;
        `
      this.$refs.ledInfo.style.cssText = `
          max-height:${this.clientHeight - 425}px;
        `
    })
  },
  updated () {
    this.$nextTick(() => {
      this.$refs.shebeiPic.style.height = this.$refs.shebeiInfo.offsetHeight + 'px'
    })
  },
  methods: {
    async setLedModel (model) {
      await manualAuto({ id: this.decDetail.id, model: model })
        .then(res => {
          this.tip('success', '设备状态修改')
        })
        .catch(err => {
          console.log(err)
        })
      this.getMasterStatus({ id: this.decDetail.id })
    },
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
    closeLamp () {
      this.lampShow = false
      this.idx = -1
      this.idx2 = -1
    },
    getLedStatus (item, index, index2) {
      if (!item) return
      this.lampShow = true
      this.idx = index
      this.idx2 = index2
      this.itemledList = {}
      for (let key in LampLists.list) {
        if (item[key] === undefined) {
          LampLists.list[key].info = null
        } else {
          LampLists.list[key].info = formatLed(key, item[key])
        }
      }
      this.itemledList = JSON.parse(JSON.stringify(LampLists))
    },
    findImg (type, data) {
      if (!data) return null
      if (data.batteryVoltage < 6.8) {
        return this.ledstatus.alarm[type]
      } else if (data.nightMod === 0) {
        return this.ledstatus.close[type]
      } else if (data.nightMod === 1) {
        if (data.wake === 1) {
          return this.ledstatus.wake[type]
        } else {
          return this.ledstatus.guide[type]
        }
      }
    },
    convert2Darr (arr) {
      let len = arr.length
      let n = 4
      let lineNum = len % 4 === 0 ? len / 4 : Math.floor((len / 4) + 1)
      let arr2 = []
      for (let i = 0; i < lineNum; i++) {
        let temp = arr.slice(i * n, i * n + n)
        arr2.push(temp)
      }
      return arr2
    },
    zoom (type) {
      if (type === 'in') {
        if (this.ledspacing < 90) return
        this.ledspacing -= 10
        this.ledListSpace = this.ledList.length * this.ledspacing
      } else {
        if (this.ledspacing > 530) return
        this.ledspacing += 10
        this.ledListSpace = this.ledList.length * this.ledspacing
      }
    },
    viewLedInfo (type, status) {
      if (status) {
        this.showLedInfo = true
        if (type === 'visibility') {
          this.btnstatus1 = 1
          this.btnstatus2 = 0
          this.lampShow = false
          this.idx = -1
          this.idx2 = -1
          this.getMasterVisibility(this.decDetail.id)
        } else {
          this.btnstatus1 = 0
          this.btnstatus2 = 1
          this.lampShow = false
          this.idx = -1
          this.idx2 = -1
          this.getLeadstatus(this.decDetail.id)
        }
      } else {
        this.btnstatus1 = 0
        this.btnstatus2 = 0
        this.showLedInfo = false
      }
    },
    setdialogValue (type, item) {
      if (type === 'visibility') {
        this.dialogValue[type] = this.visibilityOptions[item].name
      } else if (type === 'weatherState') {
        this.dialogValue[type] = this.wetherOptions[item].name
      } else if (type === 'roadStatus') {
        this.dialogValue[type] = this.loadOptions[item].name
      }
    },
    getMsg (type) {
      this.msg = null
      switch (type) {
        case 'screenSpeed': this.msg = this.decDetail.limitValue
          break
        case 'screenMessage': this.msg = this.decDetail.note // ???
          break
        case 'screenInduction': this.msg = this.decDetail.note // ???
          break
        case 'highHorn' : this.msg = this.decDetail.note // ???
          break
        case 'screenComposite': this.loadValue = this.decDetail.roadCond; this.wethwerValue = this.decDetail.weatherCond; this.visibilityValue = this.decDetail.visibility
          break
        default: this.msg = null
      }
    },
    initState (type) {
      this.getMsg(type)
      this.value2 = !this.decDetail.networkStatus // 设备开关（开）
      if (decUpdataInfo[type]) {
        this.decmodify = decUpdataInfo[type]
        for (let i = 0; i < decUpdataInfo[type].info.length; i++) {
          if (this.msg === decUpdataInfo[type].info[i].value) {
            this.InitialIndex = i
            this.listitem = this.InitialIndex
            break
          }
        }
      }
    },
    reset () {
      this.aroundDec = false
      this.masterInfo = null
      this.idx = -1
      this.idx2 = -1
      this.lampShow = false
      this.ledListSpace = 700
      this.ledspacing = 120
      this.loadingLed = false
      this.Offline = false
      this.ledList = []
      this.btnstatus1 = 0
      this.btnstatus2 = 0
      this.showLedInfo = false
      this.resetControl = false
      this.showValue = null
      this.devList = []
      this.facList = []
      this.openStatuse = false
      this.originList = []
      this.videoStatuse = false
      this.videoList = []
      this.decVideoShow = false
      this.visibilityValue = ''
      this.loadValue = ''
      this.wethwerValue = ''
      this.result = false
      this.act = 1
      this.feature = null
      this.status = 0
      this.video = false
      this.defaultStause = false
      this.listitem = -1
      this.acte = false// 重启设备状态
      this.uavCruiseStyle = false // 无人机巡航
      this.uavBackStyle = false // 无人机返航
      this.aroundDec = false
      this.dataForm.id = -1
      this.dataForm.brightness = 0
      this.dataForm.frequency = 0
      this.dataForm.atNight = 0
      this.dataForm.wake = 0
      this.dataForm.voice = 0
    },
    play (paly) {
      if (paly) {
        this.status = 1
        this.video = true
        this.src = this.decDetail.note
        // videojs
        // this.$refs.player.changeWidth()
        // this.$refs.player.play()
      } else {
        // videojs
        // this.$refs.player.pause()
        // this.$refs.player.load(this.src,false)
        this.src = null
        this.status = 0
        this.video = false
      }
    },
    closeVideo () {
      // this.$refs.player.pause()
      // this.$refs.player.load(this.src,false)
      this.decVideoShow = false
      this.videoList = []
      this.videoStatuse = true
      this.openStatuse = true
    },
    cancelVideo () {
      this.decVideoShow = false
      this.videoList = []
      this.videoStatuse = false
      this.openStatuse = false
    },
    openVideo () {
      if (this.videoStatuse) {
        // this.$refs.player.pause()
        // this.$refs.player.load(this.src,false)
        if (this.$parent.$parent.sensorInfoStyle) {
          this.$parent.$parent.hideSensorsInfo()
        }
        this.decVideoShow = true
        this.openStatuse = false
        this.videoList = this.originList
      }
    },
    uavCruise () {
      // 无人机巡航
      if (this.uavCruiseStyle === true) {
        this.uavCruiseStyle = false
      } else {
        this.uavCruiseStyle = true
        decControl(this.decDetail.layerid, {
          // 请求参数
          layerid: this.decDetail.layerid,
          devid: this.decDetail.id,
          power: 0
        })
          .then(res => {
            if (res.result === 'ok' && res.status === '200') {
              // 返航操作成功
              this.tip('success', '无人机巡航操作')
            } else {
              this.tip('error', '无人机巡航操作')
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    uavBack () {
      // 无人机返航
      if (this.uavBackStyle === true) {
        this.uavBackStyle = false
      } else {
        this.uavBackStyle = true
        decControl(this.decDetail.layerid, {
          // 无人机返航参数
          layerid: this.decDetail.layerid,
          devid: this.decDetail.id,
          power: 2
        })
          .then(res => {
            if (res.result === 'ok' && res.status === '200') {
              // 返航操作成功
              this.tip('success', '无人机返航操作')
            } else {
              this.error('success', '无人机返航操作')
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    startUpUav () {
      // 无人机启动
      let power = null
      if (this.value2 === true) {
        power = 1
      } else {
        power = 0
      }
      decControl(this.decDetail.layerid, {
        // 无人机启动参数
        layerid: this.decDetail.layerid,
        devid: this.decDetail.id,
        power: power
      })
        .then(res => {
          if (res.result === 'ok' && res.status === '200') {
            // 返航操作成功
            this.tip('success', '无人机启动操作')
          } else {
            this.tip('error', '无人机启动操作')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    decClose () {
      // 手动关闭设备详情
      this.src = null
      this.decVideoShow = false
      this.videoList = []
      this.status = 0
      this.video = false
      // this.$refs.player.pause()
      // this.$refs.player.load(this.src,false)
      this.$emit('decClose')
    },
    restart () {
      // 设备重启按钮
      let that = this
      if (this.acte === true) {
        this.acte = false
      } else {
        this.acte = true
        decControl(that.decDetail.layerid, {
          // 设备重启参数
          layerid: that.decDetail.layerid,
          devid: that.decDetail.id,
          power: 2
        })
          .then(res => {
            if (res.result === 'ok' && res.status === '200') {
              // 返航操作成功
              this.tip('success', `${this.dectecorType}重启操作`)
              setTimeout(() => { this.acte = false }, 500)
            } else {
              this.tip('error', `${this.dectecorType}重启操作`)
            }
          })
          .catch(err => {
            console.log(err)
            this.acte = false
          })
      }
    },
    decSwitch () {
      // 设备开关按钮
      let state = this.value2 // state为true和false
      let str = ''
      let that = this
      if (state === true) {
        str = '开启'
      } else {
        str = '关闭'
      }
      // 0为关闭，1为开启
      let powerState = 0
      if (state === true) {
        powerState = 1
      } else if (state === false) {
        powerState = 0
      }
      decControl(that.decDetail.layerid, {
        // 设备开关按钮参数
        layerid: that.decDetail.layerid,
        devid: that.decDetail.id,
        power: powerState
      })
        .then(res => {
          if (res.result === 'ok' && res.status === '200') {
            // 返航操作成功
            this.tip('success', `${this.dectecorType + str}`)
          } else {
            this.tip('error', `${this.dectecorType + str}`)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    aroundBlock () {
      // 周边设备显示
      this.aroundDec = true
      this.act = 0
      // 控制地图图层显示
      MapManager.showLayer('aroundLayer', true)
      MapManager.showLayer('drawLayer', true)
    },
    aroundNone () {
      // 周边设备隐藏
      this.aroundDec = false
      this.act = 1
      // 控制地图图层隐藏
      MapManager.showLayer('aroundLayer', false)
      MapManager.showLayer('drawLayer', false)
    },
    chooseItemCom () {
      // 复合屏显示信息修改
      let that = this
      if (
        that.visibilityValue === '' ||
        that.wethwerValue === '' ||
        that.loadValue === ''
      ) {
        Message.info({
          message: '必须全部选择才能设置',
          center: true
        })
      } else {
        that.compositeDia = true
        that.centerDialogVisible = true
        that.comValue.visibility = that.visibilityValue
        that.comValue.weatherState = that.wethwerValue
        that.comValue.roadStatus = that.loadValue
        that.confirmItem = that.comValue
      }
    },
    restore () {
      if (this.defaultStause) {
      } else {
        this.listitem = this.InitialIndex
      }
    },
    confirmUpdata () {
      // 确定修改设备控制
      this.InitialIndex = this.listitem
      let that = this
      that.compositeDia = false
      that.defaultStause = true
      that.centerDialogVisible = false
      // 设备修改数据请求
      that.$emit('decUpdataList', that.confirmItem, null)
      if (!this.isPlanBack) {
        let element = MapManager.changeValue(this.decDetail.layerid, this.decDetail)
        // overlayer显示状态，修改html，不存在修改layermanager的参数
        if (element) {
          changeValue[this.decDetail.layerid](element, this.decDetail)
        }
        updataDecValue(this.decDetail.layerid, {
          // 请求参数
          layerid: this.decDetail.layerid,
          devid: this.decDetail.id,
          msg: this.confirmItem,
          opType: 1
        })
          .then(res => {
            if (res.result === 'ok') {
              this.$set(this.decDetail, 'status', true)
              that.$emit('decUpdataList', that.confirmItem, true)
              // that.$parent.$parent.inputValue = res.data
              let element = MapManager.changeValue(this.decDetail.layerid, this.decDetail)
              // overlayer显示状态，修改html，不存在修改layermanager的参数
              if (element) {
                changeValue[this.decDetail.layerid](element, this.decDetail)
              }
            } else {
              this.$set(this.decDetail, 'status', false)
              that.$emit('decUpdataList', that.confirmItem, false)
            }
          })
          .catch(err => { console.log(err) })
        this.$set(this.decDetail, 'status', false)
        that.$emit('decUpdataList', that.confirmItem, false)
      }
    },
    cancelUpdata () {
      // 取消修改设备控制
      this.centerDialogVisible = false
      this.listitem = this.InitialIndex
    },
    chooseItem (index) {
      // 设备修改值获取
      if (this.listitem === index) {
        this.confirmItem = ''
      } else {
        this.listitem = index
        this.compositeDia = false
        this.centerDialogVisible = true
        this.confirmItem = this.decmodify.info[index].value
        this.showValue = this.decmodify.info[index].name
      }
    },
    highStyle (index) {
      // 周边设备划过高亮，地图高亮
      // let _d = new Date().getTime()
      // if (this.effectivetime === 0 || _d - this.effectivetime > 200) {
      this.facList[index].icon = this.imgSrc
      if (this.feature) {
        MapManager.cleanCircleLayer(this.feature)
        this.feature = null
      }
      MapManager.resetDrawLayerStyle()
      this.feature = MapManager.addPoint('drawLayer', [
        parseFloat(this.facList[index].longitude),
        parseFloat(this.facList[index].latitude)
      ])
      // this.effectivetime = _d
      // }
    },
    normalStyle (index) {
      // 周边设备划出正常显示
      this.facList[index].icon = this.imgNorSrc
      // 设置地图normal？？？？？？？？？？？？？
    },
    cancelHigh () {
      if (this.feature) {
        MapManager.cleanCircleLayer(this.feature)
        this.feature = null
      }
    },
    chooseAround (index) {
      // 点击出现设备详情
      if (!this.isback) {
        this.feature = null
        this.backLevel = this.detailInfo.name // this.facList[index].nameDes
        this.backStaus = false
        this.$emit('listenContent', this.backLevel, this.facList[index], this.backStaus)
        this.isback = true // 显示返回上一层按钮
        this.$nextTick(() => {
          this.$refs.detecor.style.cssText = `
            max-height:${this.clientHeight - 460}px;
          `
        })
      }
    },
    backUpper () {
      // 返回上一级详情页
      this.backStaus = true
      this.$emit('listenContent', this.oldDetail.name, this.oldDetail, this.backStaus)
      this.isback = false // 隐藏返回上一层按钮
      this.$nextTick(() => {
        this.$refs.detecor.style.cssText = `
          max-height:${this.clientHeight - 425}px;
        `
      })
    },
    showEmerglPlan () {
      // 返回应急预案操作业
      this.$emit('showEmerglPlan')
    },
    getList (center, radius) {
      if (!!center[0] && !!center[1]) {
        return getAroundList(center, radius)
          .then(res => {
            if (res !== '') {
              this.facList = res
            }
            if (this.facList.length > 0) {
            // 周边设备列表
              this.facList_()
              // 周边图层
              MapManager.addData2Layer('aroundLayer', this.facList)
            } else {
              this.result = true
              this.nothing = '该设备周边五公里范围内未检测到其他设备'
            }
          })
          .catch(err => {
            this.result = true
            this.nothing = '获取周边设备出错啦！'
            console.log(err)
          })
      } else {
        this.result = true
        this.nothing = '该设备无经纬度信息，无法查询周边设备'
      }
    },
    getCameraList (layerid, id) {
      return getCameraList(layerid, id)
        .then(res => {
          if (res.result === 'ok') {
            if (res.data.length <= 0) {
              this.decVideoShow = false
              this.videoStatuse = false
              this.videoList = []
            } else {
              this.originList = res.data
              let regex = /aspect=640x360" width="640" height="360"/gi
              this.originList.forEach(element => {
                let noteSize = element.note
                noteSize = noteSize.replace(regex, 'aspect=320x180" width="320" height="180"')
                element.note = noteSize
              })
              this.videoList = this.originList
              this.decVideoShow = true
              this.videoStatuse = true
            }
          } else {
            this.tip('error', '获取关联视频失败')
          }
        })
        .catch(err => console.log(err))
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
              if (item.layerid === 'crossdev') {
                this.$set(item, 'nameDes', around[type].layerid + '(' + item.kkmc + ')')
              } else {
                this.$set(item, 'nameDes', around[type].layerid + (item.name ? '(' + item.name + ')' : ''))
              }
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
    getMasterVisibility (id) {
      // this.option.series = []
      this.ledoptions.option.series = []
      this.ledoptions.option.xAxis.data = []
      return getLedVisibility(id)
        .then(res => {
          // if (res.result === "ok") {
          if (res.length <= 0) return
          for (let i = 0; i < res.length; i++) {
            if (!res[i].time) res[i].time = []
            if (!res[i].vis) res[i].vis = []
            if (res[i].vis.length <= 0 || res[i].time.length <= 0) {
              setTimeout(() => { this.tip('info', `未获取到${res[i].name}数据`) }, 500)
            }
            if (res[i].time <= 0) continue
            for (let l = 0; l < res[i].time.length; l++) {
              res[i].time[l] = timestampToTime(res[i].time[l], 'hh:mm')
            }
            this.ledoptions.option.xAxis.data = res[i].time
            let obj = {
              name: res[i].name,
              type: 'line',
              smooth: true,
              // itemStyle: {normal: {label: {show: true}}},
              data: res[i].vis,
              markPoint: {
                data: [
                  { type: 'max', name: '最大值' },
                  { type: 'min', name: '最小值' }
                ]
              },
              markLine: {
                data: [
                  { type: 'average', name: '平均值' }
                ]
              }
            }
            this.ledoptions.option.legend.data.push(obj.name)
            this.ledoptions.option.series.push(obj)
          }
          this.$refs['ledoptions'].updated()
          // }
        })
        .catch(err => {
          console.error(err)
        })
    },
    getLeadstatus (id) {
      this.loadingLed = true
      this.Offline = false
      let that = this
      getLeadstatus(id)
        .then(res => {
          if (res.result === 'ok') {
            that.loadingLed = false
            that.Offline = false
            that.ledList = that.convert2Darr(res.data)
            that.ledListSpace = that.ledList.length * that.ledspacing
          } else {
            that.loadingLed = false
            that.Offline = true
          }
        })
        .catch(err => {
          that.loadingLed = false
          that.Offline = true
          console.error(err)
        })
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
      } else if (type === 'error') {
        str = '失败'
        Notification.error({
          title: `操作${str}`,
          message: msg + str,
          duration: 2000,
          offset: 100
        })
      } else {
        Notification.info({
          title: `提示`,
          message: msg,
          duration: 2000,
          offset: 100
        })
      }
    },
    formatfrequency (val) {
      return parseInt(val / 8) * 12
    },
    formatbrightness (val) {
      return parseInt(val / 11) * 9
    },
    updataFormat () {
      for (let key in this.dataForm) {
        if (key === 'brightness') {
          let brightness = this.dataForm[key]
          this.submitForm[key] = this.brightnessF[brightness / 10]
        } else if (key === 'frequency') {
          let frequency = this.dataForm[key]
          this.submitForm[key] = parseInt(frequency / 8)
        } else {
          this.submitForm[key] = this.dataForm[key]
        }
      }
    },
    showFormat () {
      if (!this.masterInfo) return
      this.dataForm.id = this.masterInfo.mianControlLeadId
      this.dataForm.wake = this.masterInfo.wake.toString()
      this.dataForm.voice = this.masterInfo.voice.toString()
      this.dataForm.atNight = this.masterInfo.nightMode.toString()
      this.dataForm.brightness = this.masterInfo.brightness * 10
      this.dataForm.frequency = this.masterInfo.frequency * 8
      this.controlMode = this.masterInfo.controlMode.toString()
    },
    getMasterStatus (id) {
      return getMasterStatus(id)
        .then(res => {
          this.masterInfo = res.result
          this.showFormat()
        })
        .catch(err => console.error(err))
    },
    async updataMaster (type) {
      this.updataFormat()
      await updataLampStatus(this.submitForm)
        .then(res => {
          this.tip('success', '设备状态修改')
        })
        .catch(err => {
          console.log(err)
        })
      this.getMasterStatus({ id: this.decDetail.id })
    }
  },
  watch: {
    async decDetail (newvalue, oldvalue) {
      // 清除选中样式
      if (Object.keys(newvalue).length <= 0) return
      if (this.backStaus) {
        this.isback = false
      }
      this.reset()
      let type = this.decDetail.layerid
      this.decType = type
      this.decDetail = newvalue
      this.oldDetail = oldvalue
      // this.decmodify = decUpdataInfo[type]
      this.initState(type)// 初始化显示信息
      // this.value2 = !newvalue.networkStatus // 设备开关（开）
      this.dectecorType = around[this.decDetail.layerid].layerid
      MapManager.clearCircleAndLayer()
      // 设备控制内容
      if (type === 'screenSpeed') {
        // 限速屏处理
        this.$set(
          decDetailObj[type],
          'img',
          require(`../../../../assets/img/mapImg/info-device/${this.decDetail.limitValue}.png`)
        )
      }
      let startIndex = decDetailObj[type].name.indexOf('(')
      if (startIndex < 0) {
        startIndex = decDetailObj[type].name.length
      }
      decDetailObj[type].name = decDetailObj[type].name.slice(0, startIndex)
      decDetailObj[type].name = decDetailObj[type].name + `(${this.decDetail.name})`
      for (let key in decDetailObj[type].info) {
        if (tranfromData[type][key] && Object.getOwnPropertyDescriptor(tranfromData[type][key], this.decDetail[key])) {
          decDetailObj[type].info[key].infoDetail = tranfromData[type][key][this.decDetail[key]].name
          continue
        }
        if (key === 'temperature') {
          decDetailObj[type].info[key].infoDetail = this.decDetail[key] + '℃'
          continue
        }
        if (key === 'limitValue') {
          decDetailObj[type].info[key].infoDetail = this.decDetail[key] + 'km/h'
          continue
        }
        if (key === 'createTime' || key === 'updateTime') {
          decDetailObj[type].info[key].infoDetail = timestampToTime(this.decDetail[key])
          continue
        }
        if (key === 'position') {
          decDetailObj[type].info[key].infoDetail = this.decDetail.enName + this.decDetail.pileInfo
          continue
        }
        decDetailObj[type].info[key].infoDetail = this.decDetail[key]
      }
      this.detailInfo = decDetailObj[type]
      // 设备修改操作权限
      let decUpdata = shebeiControl.includes(type)
      let mapUser = this.roles[0].authority
      // 无人机和其他设备
      if (mapUser === 'ADMINISTRATOR' && decUpdata) {
        this.rolseShow = true
        if (type === 'uav') {
          this.uav = true
          this.decList = false
        } else if (type === 'led') {
          this.ledControl = true
          this.uav = false
          this.decList = false
        } else {
          this.uav = false
          this.decList = true
          this.modify = true
        }
      } else {
        this.rolseShow = false
      }
      // 修改值权限
      if (changeControl.includes(type)) {
        this.modify = false
      }
      // 重启权限
      if (resetControl.includes(type)) {
        this.resetControl = true
      }
      // 设备详情和图屏片等高
      this.$refs.shebeiPic.style.height =
      this.$refs.shebeiInfo.offsetHeight + 'px'
      // 设备周边列表监听查询
      this.decId = this.decDetail.id
      if (this.decType === 'led') {
        this.dataForm.id = this.decDetail.id
        await this.getMasterStatus({ id: this.decDetail.id })
      }
      await this.getCameraList(this.decType, { devId: this.decId })
      let radius = 5000 // 查询半径为5公里
      let center
      let that = this
      that.facList = []
      if (this.isPlanBack === true) {
        center = this.accidentCenter
        radius = 10000
      } else {
        center = [newvalue.longitude, newvalue.latitude]
        radius = 5000
      }
      let zoomCenter = [parseFloat(newvalue.longitude), parseFloat(newvalue.latitude)]
      MapManager.zoomCenter(zoomCenter)
      let feature = MapManager.addCircle(center, radius + 1500, true, function (fea) {
        that.devList = []
        that.facList = []
        MapManager.cleanLayer('aroundLayer')
        // 圆拖动后的对象 需要调用查询接口，重新查询周边设备信息 TODO
        devList.forEach(element => {
          let devTagsList = MapManager.getIncludeFeaturesOnLayer(
            element,
            fea.getGeometry()
          )
          devTagsList.forEach(item => {
            that.devList.push(item.getProperties())
          })
        })
        // console.log(that.devList)
        MapManager.addData2Layer('aroundLayer', that.devList)
        that.facList = that.devList
        that.facList_()
      }) //  经纬度和半径
      if (!this.isPlanBack) {
        await that.getList(center, radius)
      } else {
        devList.forEach(element => {
          let devTagsList = MapManager.getIncludeFeaturesOnLayer(
            element,
            feature.getGeometry()
          )
          devTagsList.forEach(item => {
            that.devList.push(item.getProperties())
          })
        })
        this.facList = that.devList
        // console.log(this.facList)
        this.facList_()
        MapManager.addData2Layer('aroundLayer', that.devList)
      }
      if (this.isPlanBack || this.decDetail.backShowlayer) {
        MapManager.showLayer('aroundLayer', true)
        MapManager.showLayer('drawLayer', true)
        this.act = 0
        this.aroundDec = true
      } else {
        MapManager.showLayer('aroundLayer', false)
        MapManager.showLayer('drawLayer', false)
      }
    },
    clientHeight (newvalue, oldvalue) {
      this.clientHeight = newvalue
      this.$nextTick(() => {
        this.$refs.detecor.style.cssText = `
          max-height:${this.clientHeight - 425}px;
        `
        this.$refs.ledInfo.style.cssText = `
          max-height:${this.clientHeight - 425}px;
        `
        if (this.decVideoShow) {
          this.$refs.videoPlayer.style.cssText = `
            max-height:${this.clientHeight - 260}px;
          `
          this.$refs.videoItems.style.cssText = `
            max-height:${this.clientHeight - 260}px;
          `
        }
      })
    },
    decShow (newvalue, oldvalue) {
      if (!newvalue) {
        this.src = null
        this.decVideoShow = false
        this.videoList = []
        this.status = 0
        this.video = false
      }
    },
    decVideoShow (newvalue, oldvalue) {
      if (newvalue !== undefined && newvalue === true) {
        this.$nextTick(() => {
          this.$refs.videoPlayer.style.cssText = `
            max-height:${this.clientHeight - 260}px;
          `
          this.$refs.videoItems.style.cssText = `
            max-height:${this.clientHeight - 260}px;
          `
          this.$refs.ledInfo.style.cssText = `
            max-height:${this.clientHeight - 260}px;
          `
        })
      }
    },
    searchbackLevel (newvalue, oldvalue) {
      if (newvalue) {
        this.isback = true
        this.backLevel = newvalue
        this.$nextTick(() => {
          this.$refs.detecor.style.cssText = `
            max-height:${this.clientHeight - 460}px;
          `
        })
      }
    }
  }
}
</script>

<style scoped>
/* 检测仪详情 */
.detecorBox {
  position: absolute;
  left: 0px;
  top: 0px;
  /* max-height: 800px;
  _height:800px; */
  width: 400px;
}
.backLevel {
  width: 400px;
  height: 32px;
  background: #e5f1fd;
  line-height: 32px;
  color: #3497ea;
  font-size: 14px;
  padding-left: 10px;
  box-sizing: border-box;
  margin-bottom: 5px;
  box-shadow: 0px 1px 3px #666666;
  cursor: pointer;
}
.detecor {
  padding: 5px 13px 16px 13px !important;
  background: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-sizing: border-box;
  max-height: 800px;
  _height: 800px;
  overflow-x: hidden;
  overflow-y: auto;
  width: 400px;
}
.tit {
  height: 33px;
  line-height: 33px;
  color: #3397c9;
  font-size: 16px;
  padding-bottom: 5px;
}
.iconDing {
  vertical-align: middle;
  padding-right: 5px;
}
/* 周边设备列表 */
.around {
  width: 100%;
}
.around .title {
  height: 33px;
  width: 100%;
  background: #3596ed;
  border-radius: 13px 0 0 0;
  padding: 4px 0 0 13px;
  box-sizing: border-box;
}
.around .title img {
  vertical-align: middle;
  margin-bottom: 4px;
}
.around .title .aroundEquipment {
  color: #fff;
  font-size: 16px;
}
.around .title .left {
  float: left;
  padding-top: 4px;
  margin-right: 14px;
}
.around .title .aroundSwitch {
  float: left;
}
.around .title .aroundSwitch .aroundBlock {
  width: 55px;
  height: 25px;
  border: 1px solid #fff;
  border-radius: 5px;
  box-sizing: border-box;
  text-align: center;
  line-height: 24px;
  margin-right: 3px;
  cursor: pointer;
  float: left;
}
.around .title .aroundSwitch .active {
  background: #fff;
  color: #005aab;
}
.around ul li {
  height: 52px;
  width: 100%;
  background: #e5f2fd;
  border-bottom: 1px solid #fff;
  cursor: pointer;
  display: flex;
}
.around ul li:hover {
  background: #b3d7f8;
}
.around .zuo {
  padding: 6px;
  width: 10%;
  height: 100%;
  box-sizing: border-box;
  justify-content: start;
  position: relative;
}
.around .zuo img {
  width: 24px;
  height: 38px;
}
.around .zuo .num {
  position: absolute;
  display: inline-block;
  left: 10px;
  top: 12px;
  width: 17px;
  font-size: 10px;
  color: #fff;
  text-align: center;
}
.around .zhong {
  width: 70%;
  height: 100%;
  align-items: center;
  padding-top: 10px;
  padding-left: 10px;
  box-sizing: border-box;
}
.around .zhong .shebeiName {
  color: #0459b3;
  width: 246px;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.around .zhong .xiangqing {
  color: #999;
}
.around .you {
  width: 19%;
  height: 100%;
  padding: 6px 13px 6px 0;
  box-sizing: border-box;
}
.around .you .waikuang {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  border: 1px solid #d2d2d2;
  overflow: hidden;
}
.around .you .waikuang img {
  width: 100%;
  height: 100%;
}

.testInformation .title {
  height: 33px;
  width: 100%;
  background: #3596ed;
  border-radius: 13px 0 0 0;
  padding: 8px 0 0 13px;
  box-sizing: border-box;
}
.testInformation .title .iconfont {
  color: #fff;
  margin-right: 5px;
}
.testInformation .title span {
  color: #fff;
  font-size: 16px;
}
.testInformation .shebei {
  width: 100%;
  border-top: 1px solid #fff;
  box-sizing: border-box;
  overflow: hidden;
  margin-bottom: 12px;
  border-bottom-right-radius: 13px;
  /* background: #e5f1fd;  */
}

.testInformation .shebei .shebeiPic {
  width: 35%;
  height: 100%;
  float: left;
  border-left: 1px solid #e5f1fd;
  border-bottom: 1px solid #e5f1fd;
  box-sizing: border-box;
  position: relative;
}
.testInformation .shebei .shebeiPic img {
  display: inline-block;
  /* height: 100%; */
  width: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  margin: auto;
}
.testInformation .shebei .shebeiInfo {
  width: 65%;
  height: 100%;
  float: left;
  box-sizing: border-box;
  border-left: 1px solid #fff;
  background: #e5f1fd;
}
.testInformation .shebeiInfo ul {
  height: 100%;
}
.testInformation .shebeiInfo ul li {
  height: 12.5%;
  border-bottom: 1px solid #fff;
  box-sizing: border-box;
}
.testInformation .shebeiInfo ul li .zuo {
  width: 30%;
  height: 100%;
  border-right: 1px solid #fff;
  /* border-left: 1px solid #fff; */
  box-sizing: border-box;
  text-align: center;
  line-height: 28px;
  font-size: 12px;
  float: left;
}
/*  .testInformation .shebeiInfo ul li .zuo:last-child{
  border-bottom: none;
} */
.testInformation .shebeiInfo ul li .you {
  width: 70%;
  height: 100%;
  border-right: 1px solid #fff;
  box-sizing: border-box;
  padding-left: 12px;
  color: #005bac;
  line-height: 28px;
  font-size: 12px;
  float: left;
}
/*  .testInformation .shebeiInfo ul li:last-child{
  border-bottom: none;
} */
.testInformation .around {
  width: 100%;
}
.testInformation .around .title {
  height: 33px;
  width: 100%;
  background: #3596ed;
  border-radius: 13px 0 0 0;
  padding: 4px 0 0 13px;
  box-sizing: border-box;
}

.testInformation .around .title img {
  vertical-align: middle;
  margin-bottom: 4px;
}
.testInformation .around .title .aroundEquipment {
  color: #fff;
  font-size: 16px;
}
.testInformation .around .title .left {
  float: left;
  padding-top: 4px;
  margin-right: 14px;
}
.testInformation .around .title .aroundSwitch {
  float: left;
}
.testInformation .around .title .aroundSwitch .aroundBlock {
  width: 55px;
  height: 25px;
  border: 1px solid #fff;
  border-radius: 5px;
  box-sizing: border-box;
  text-align: center;
  line-height: 24px;
  margin-right: 3px;
  cursor: pointer;
  float: left;
}
/* 设备控制 */
.testInformation .control {
  margin-top: 12px;
}
.testInformation .control .title {
  height: 33px;
  width: 100%;
  background: #3596ed;
  border-radius: 13px 0 0 0;
  padding: 4px 0 0 13px;
  box-sizing: border-box;
}
.testInformation .control .title .left {
  float: left;
  padding-top: 4px;
  margin-right: 14px;
}
.testInformation .control .title img {
  vertical-align: middle;
  margin-bottom: 4px;
}
.testInformation .control .title span {
  color: #fff;
  font-size: 16px;
}
.testInformation .control .title .el-switch {
  height: 26px;
  float: left;
  margin-right: 5px;
}
.testInformation .control .restart {
  width: 55px;
  height: 25px;
  border: 1px solid #fff;
  border-radius: 8px;
  box-sizing: border-box;
  text-align: center;
  line-height: 25px;
  margin-right: 3px;
  cursor: pointer;
  float: left;
  font-size: 14px;
}
.testInformation .control .restartactive {
  float: left;
  color: #fff;
  background: #0688fc;
}
/* 设置滚动条样式 (不支持火狐)*/
::-webkit-scrollbar {
  width: 8px;
}
/*外层轨道。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果*/
::-webkit-scrollbar-track {
  width: 6px;
  background-color: #e4e2e3;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
  display: none;
}
/*滚动条的设置*/
::-webkit-scrollbar-thumb {
  background-color: #e4e2e3;
  background-clip: padding-box;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
/* 鼠标移入滚动条 */
::-webkit-scrollbar-thumb:hover {
  background: #999;
}
/* 设备周边设备 */
.decControl {
  background: #e5f2fd;
  width: 100%;
  font-size: 14px;
}
.decItem {
  min-height: 35px;
  _height: 35px;
  width: 100%;
  padding-top: 5px;
  padding-left: 12px;
  box-sizing: border-box;
  border-bottom: 1px solid #ffffff;
}
.decControlTit {
  padding-right: 5px;
  color: #005bac;
  padding-right: 10px;
}
.decControlBox {
  float: left;
  padding-top: 3px;
}
.controlDecItem {
  color: #000;
  font-size: 12px;
  margin-bottom: 5px;
  display: inline-block;
}
.itemList {
  border: 1px solid #098afc;
  border-radius: 3px;
  padding: 0px 10px;
  font-size: 14px;
  cursor: pointer;
  margin-left: 5px;
  display: inline-block;
  margin-bottom: 5px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: all 0.5s;
}
.clearfix {
  clear: both !important;
}
.controlDec {
  padding: 12px 0px;
}
.listactive {
  background: #fc4809;
  color: #fff;
  border: 1px solid #fc4809;
  transition: all 0.5s;
}
.close {
  float: right;
  cursor: pointer;
}
.videoBox {
  position: absolute;
  top: 0px;
  left: 408px;
  width: 640px;
  height: 360px;
  background: url("/static/img/loding.gif") center no-repeat;
  background-color: rgba(255,255,255,1);
  background-size: 50px 50px;
}
.aroundBlock {
  width: 55px;
  height: 25px;
  border: 1px solid #fff;
  border-radius: 5px;
  box-sizing: border-box;
  text-align: center;
  line-height: 24px;
  margin-right: 3px;
  cursor: pointer;
  float: left;
  margin-top: 2px;
}
.noDev {
  justify-content: center;
  line-height: 53px;
  color: red;
  text-align: center;
  background: #e5f2fd;
}
.videoPlayer {
  position: fixed;
  background: rgba(255,255,255,1);
  width: 320px;
  top: 62px;
  right: 11px;
  overflow-y: hidden;
  overflow-x: hidden;
  border-radius: 8px;
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
.closeVideo{
  cursor: pointer;
  position: absolute;
  right: 5px;
  top: 5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 12px;
  text-align:center;
  line-height: 20px;
  color:#fff;
}
.closeVideo:hover{
  color: #fb8686;
}
.cancelVideo{
  right: 28px;
  /* background: #71c5ef; */
}
.cancelVideo:hover{
  color: #9bd9f9;
}
.openVideo{
  position: fixed;
  right: -63px;
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
  transform: translateX(-63px);
  transition: all .5s;
}
.openVideoBtn{
  color: #fff;
}
.videoTitle{
  height: 30px;
  width: 320px;
  text-align: center;
  background: #3496ed;
  color: #fff;
  font-size: 15px;
  font-weight: 100;
  line-height: 30px;
  border-radius:8px 8px 0 0;
  position: absolute;
  right: 0;
  top: 0;
}
.empty1{
  width: 100%;
  height: 30px;
}
.backdetail{
  display: inline-block;
  max-width: 260px;
}
.DisableCursor{
  cursor: no-drop!important;
}
.cursor{
  cursor: pointer!important;
}
.ledInfo{
  position: absolute;
  top: 0px;
  left: 408px;
  /* width: 700px; */
  /* height: 378px; */
  background: rgba(0,0,0,.1);
  overflow-x: auto;
  overflow-y: auto;
  background: #fff;
}
.led{
  width: 100%;
  height: 100%;
}
.ledlists{
  height:360px;
  overflow-x:auto;
  overflow-y:hidden;
  background:url("../../../../assets/img/mapImg/info-device/gaosulu.png") repeat-y;
  background-size: 420px 543px;
}
.ledList{
  position: relative;
  width: 420px;
  height: 543px;
}
.greenbelt{
  height: 60px;
  width: 100%;
  /* background:url("/static/img/led/gelidai.png");
  background-size: cover; */
}
.leditem{
  height:200px;
  width:100%;
  transition: all .3s;
  position: relative;
  overflow: hidden;
}
.ledroad{
  height: 150px;
  width:100%;
  position: relative;
}
.posUp{
  padding: 3px;
  /* overflow: hidden; */
  position: absolute;
  top: 10px;
  left: 384px;
}
.posDown{
  /* border-radius: 50%; */
  padding: 3px;
  /* overflow: hidden; */
  position: absolute;
  top: 10px;
  left: 229px;
}
.posUp2 {
  /* border-radius: 50%; */
  padding: 3px;
  position: absolute;
  top: 10px;
  left: -2px;
}
.posDown2{
  /* border-radius: 50%; */
  padding: 3px;
  /* overflow: hidden; */
  position: absolute;
  top: 10px;
  left: 151px;
}

.ledstatus{
  height: 45px;
  width: 32px;
  cursor: pointer;
  transition: all .3s;
}
.loading{
  background:url("../../../../assets/img/mapImg/loding.gif") no-repeat center;
  background-size: cover;
  height: 100%;
  background-size: 50px 50px;
}
.offline{
  text-align: center;
  font-size: 16px;
  line-height: 20px;
  color:red;
}
.controlZoom{
  width: 29px;
  height: 60px;
  background: rgba(255,255,255,.6);
  position: fixed;
  top: 602px;
  left: 806px;
  border-radius: 10px;
  z-index: 2;
}
.zoom{
  display: block;
  font-size: 24px;
  text-align: center;
  padding: 3px 0;
  cursor: pointer;
  transition: all .3s;
}
.zoom:hover{
  color:rgb(117, 117, 117);
  transition: all .3s;
}
.infoLED{
  position: fixed;
  top: 126px;
  left: 848px;
  width: 305px;
  /* height: 300px; */
  background: #fff;
  }
.ledStatusList{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.statusItem{
  -webkit-box-flex: 0;
  -ms-flex-positive: 0;
  flex-grow: 0;
  -ms-flex-negative: 1;
  flex-shrink: 1;
  height: 30px;
  line-height: 30px;
  width: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background: #e5f1fd;
  border-bottom: 1px solid #fff;
  font-size: 13px;
  padding-left: 7px;
}
.line{
  width: 100%;
}
.unline{
  width: 50%;
}
.ledStatusInfo{
  width: 70%;
  text-align: left;
  color:#005bac;
  padding-left: 3px;
}
.ledtitle{
  width: 30%;
  text-align: right;
}
.lamptitle{
  text-align: center;
  line-height: 32px;
  position: relative;
  background: #3596ed;
  color: #fff;
}
.icon{
  font-size: 20px;
  line-height: 32px;
  transition: all .3s;
  position: absolute;
  right: 4px;
}
.icon:hover{
  color:red;
  transition: all .3s;
}
.checkedactive{
  border-radius: 5px;
  background: #3596db;
  transition: all .3s;
}
.sliderName{
  width: 60px;
  height: 100%;
  float: left;
}
.mySlider{
  width: 235px;
  float: left;
}
.showNumber{
  height: 100%;
  width: 40px;
  float: left;
  line-height: 25px;
  margin-left: 19px;
}
.contolItem{
  line-height: 25px;
  color: #005bac;
}
.controlele{
  float: left;
  width: 50%;
}
</style>
<style>
 .mySlider .el-slider__runway{
    margin: 10px 0;
 }

</style>
