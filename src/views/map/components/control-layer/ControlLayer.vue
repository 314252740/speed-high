<template>
    <div class="leftBottom" style="z-index:999">
        <!-- 地标设置 -->
          <el-popover
            popper-class="equipmentPop"
            placement="right"
            trigger="click"
            :offset="-40"
            v-if="tags.length > 0">
            <div class="landmark">
              <h3>基础地标</h3>
              <ul>
                <li v-for="(item,index) in tags" :key="index" :class="arr.filter(el=>(el==item.id)).length!=0?'activese':''">
                  <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
                    <el-checkbox :label="item.id" @change="controlLayer(index,tags)" :disabled="item.checkTType">
                      <img :src="item.picture">
                      <b>{{item.name}}</b>
                    </el-checkbox>
                  </el-checkbox-group>
                </li>
              </ul>
               <!--三角形-->
            <div class="border-up-empty-eq"
            >
              <span></span>
            </div>
            </div>
            <el-button slot="reference" class="rightButton" @click="basicLandmark()" title="基础地标">
              <img src="../../../../assets/img/mapImg/control-layer/landmark.png" alt="">
            </el-button>
          </el-popover>
          <!-- 警员警车 -->
          <el-popover
            popper-class="equipmentPop"
            placement="right"
            trigger="click"
            :offset="-40"
            v-if="police.length > 0">
            <div class="landmark">
              <h3>警员警车</h3>
              <ul>
                <li v-for="(item,index) in police" :key="index" :class="arr.filter(el=>(el==item.id)).length!=0?'activese':''">
                  <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
                    <el-checkbox :label="item.id"  @change="controlLayer(index,police)" :disabled="item.checkTType">
                      <img :src="item.picture">
                      <b>{{item.name}}</b>
                    </el-checkbox>
                  </el-checkbox-group>
                  <div class="screen" :class="{screenactive: item.show}" @click.stop="screenclickPolice(index)" v-if="item.screenshow">{{item.screenshow}}</div>
                </li>
              </ul>
               <!--三角形-->
            <div class="border-up-empty-eq"
            >
              <span></span>
            </div>
            </div>
            <el-button slot="reference" class="rightButton" @click="basicLandmark()" title="警员警车">
              <img src="../../../../assets/img/mapImg/control-layer/police.png" alt="">
            </el-button>
          </el-popover>
          <!-- 设备设置 -->
          <el-popover
            popper-class="equipmentPop"
            placement="right"
            trigger="click"
            :offset="-80"
            v-if="shebei.length > 0">
            <div class="landmark">
              <h3>设备状况</h3>
              <ul>
                <li v-for="(item,index) in shebei" :key="index" :class="arr.filter(el=>(el==item.id)).length!=0?'activese':''" >
                  <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange" :disabled="item.checkTType">
                    <el-checkbox :label="item.id" @change="controlLayer(index,shebei)">
                      <img :src="item.picture">
                      <b>{{item.name}}</b>
                    </el-checkbox>
                  </el-checkbox-group>
                  <div class="screen" :class="{screenactive: item.show}" @click.stop="screenclick(index)" v-if="item.screenshow">{{item.screenshow}}</div>
                </li>
              </ul>
            </div>
            <el-button slot="reference" class="rightButton" @click="equipmentCondition()" title="设备状况">
              <img src="../../../../assets/img/mapImg/control-layer/screen.png" alt="">
            </el-button>
          </el-popover>
          <!-- 天气状况设置 -->
          <el-popover
            popper-class="equipmentPop"
            placement="right"
            trigger="click"
            :offset="-80"
            v-if="roadConList.length > 0 || roadRadio.length > 0"
            >
            <div class="landmark">
              <h3>道路状况</h3>
              <ul>
                <li v-for="(item,index) in roadConList" :key="index" :class="arr.filter(el=>(el==item.id)).length!=0?'activese':''" >
                  <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
                    <el-checkbox :label="item.id" @change="controlRoadLayer(index,roadConList)" :disabled="item.checkTType">
                      <span class="iconfont" v-html="item.icon" style="color:#fff;margin-left:5px;"></span>
                      <b>{{item.name}}</b>
                    </el-checkbox>
                  </el-checkbox-group>
                </li>
                <!-- 单选框 -->
                <div class="singeLabel">
                  <li style="position:relative;color:#fff;cursor: pointer; z-index:1" ref="swtchR" v-for="(item, index, key) in roadRadio" :key="key" :class="{activese:radio1===item.label}">
                    <div class="dialog" :class="item.checkTType === true ? 'cursorDisabled' : 'cursorPointer'" @click.self="switchRadio(item.checkTType,index)">
                      <a class="downLoad el-icon-download" style="color:#fff" @click.self="saveImage(item.id,item.label)" :title="'导出'+item.name+'图片'">
                        <a :id="item.id" download="map.png"></a>
                      </a>
                    </div>
                    <el-radio style="border:none;padding-left:0;margin-right:0 width:100%" @change="controlRadioLayer(index,roadRadio)" v-model="radio1" :label="item.label">
                      <i class="iconfont" style="color:#fff;position:absolute;left: 22px;top:-2px;" v-html="item.icon"></i>
                      {{item.name}}
                    </el-radio>
                  </li>
                </div>
              </ul>
            </div>
            <el-button slot="reference" class="rightButton" @click="roadCondition()" title="道路状况">
              <img src="../../../../assets/img/mapImg/control-layer/weather.png" alt="">
            </el-button>
          </el-popover>
          <!-- 应急预案编辑-->
          <el-popover
            popper-class="equipmentPop"
            placement="right"
            trigger="manual"
            :offset="-40"
            v-model=" visible"
            @hide="hideEvent"
            @show="showEvent"
            v-if="eventInput.length > 0"
            >
            <div class="landmark">
              <h3>事件录入</h3>
              <ul class="event">
                <li style="position:relative;outline:none;cursor:pointer;" v-for="(item, index, key) in eventInput" :key="key" :class="{activese:radio2===item.label}">
                  <!-- <el-checkbox-group v-model="checkList"  @change="handleCheckedCitiesChange"> -->
                    <div class="dialog"  @click="switchRadio2($event,index)"></div>
                    <el-radio v-model="radio2" :label="item.label" @change="switchcheckBox(index,eventInput)" >
                      <i class="iconfont" style="color:#fff;margin-left:5px;" v-html="item.icon"></i>
                      <b>{{item.name}}</b>
                    </el-radio>
                  <!-- </el-checkbox-group> -->
                </li>
                <transition name="el-zoom-in-bottom">
                  <div class="dialogswitch">
                      <eventInputTraffic
                        v-show="eventTraShow"
                        ref="eventInputTraffic"
                        :stakeNumInfo="stakeNumInfo"
                        :eventTraShow="eventTraShow"
                        @closeEventBox="closeEventBox">
                      </eventInputTraffic>
                      <eventInputCon
                        v-show="eventConShow"
                        ref="eventInputCon"
                        :stakeNumInfo="stakeNumInfo"
                        :eventConShow="eventConShow"
                        @closeEventBox="closeEventBox">
                      </eventInputCon>
                  </div>
                </transition>
              </ul>
            </div>
            <el-button slot="reference" class="rightButton lastrightButton" @click="eventInputShow" title="事件录入">
              <img src="../../../../assets/img/mapImg/control-layer/edit.png" alt="">
            </el-button>
          </el-popover>
    </div>
</template>

<script>
/* eslint-disable */
import { Message } from 'element-ui'
import MapManager from "@/components/map/MapManager.js"
import LayerConfig from "@/mapConfig/LayerConfig.js"
import eventInputTraffic from "./components/EntryTraffic"
import eventInputCon from "./components/EntryConstruction"
export default {
  props: {
    rootList: {
      type: Object,
      default: () => {}
    },
    stakeNumInfo: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    eventInputTraffic, eventInputCon
  },
  watch: {
  },
  name: "equipment",
  data () {
    return {
      visible: false,
      radio1: "-1",
      radio2: "-1",
      roadRadio: [],
      checkList: [], // 设备，地标
      eventBox: [], // 事件录入
      eventTraShow: false, // 控制事故交通录入显示/隐藏
      eventConShow: false, // 控制施工养护录入显示/隐藏
      arr: [],
      isshow: true,
      map: {},
      shebei: [],
      tags: [],
      eventInput: [],
      roadConList: [],
      police: []
    }
  },
  methods: {
    saveImage (id, label) {
      console.log(id,label)
      if (this.radio1 !== label) {
        Message({
          message: '图层选中才能导出图片哦',
          center: true,
          type: "info"
        });
        return
      }
      MapManager.saveImage(id)
    },
    closeEventBox () {
      this.eventTraShow = false
      this.eventConShow = false
      this.radio2 = "-2"
    },
    basicLandmark () {
      this.visible = false
    },
    equipmentCondition () {
      this.visible = false
    },
    roadCondition () {
      this.visible = false
    },
    hideEvent () { // 录入事件隐藏弹出层
      this.eventTraShow = false
      this.eventConShow = false
    },
    eventInputShow () {
      this.visible = !this.visible
    },
    showEvent () { // 录入事件显示弹出层
      if (this.radio2 == 1) {
        this.eventTraShow = true
        this.eventConShow = false
      } else if (this.radio2 == 2) {
        this.eventConShow = true
        this.eventTraShow = false
      }
    },
    switchcheckBox (index, type) { // 事件录入控制popover的显示隐藏
      // this.checkList.includes("trafficAccidentInput")? this.eventTraShow = true: this.eventTraShow = false
      // this.checkList.includes("maintenanceInput")? this.eventConShow = true:this.eventConShow = false
    },
    handleCheckedCitiesChange (val) {
      var a = val.length
      this.arr = val
      var as = val.filter(el => (el == "桩号"))
      this.$emit("checkedList", this.checkList)
    },
    screenclick (index) { // 控制设备屏显显示隐藏
      // 判断是否为选中状态
      if (this.checkList.indexOf(this.shebei[index].id) >= 0) {
        this.shebei[index].show = !this.shebei[index].show
        if (this.shebei[index].show) {
          MapManager.showLabels(this.shebei[index].id, true)
        } else {
          MapManager.showLabels(this.shebei[index].id, false)
        }
      }
    },
    screenclickPolice (index) { // 控制警车屏显显示隐藏
      if (this.checkList.indexOf(this.police[index].id) >= 0) {
        this.police[index].show = !this.police[index].show
        if (this.police[index].show) {
          MapManager.showLabels(this.police[index].id, true)
        } else {
          MapManager.showLabels(this.police[index].id, false)
        }
      }
    },
    controlLayer (index, type) { // 复选按钮控制显示和隐藏(地标，设备)
      if (this.checkList.indexOf(type[index].id) >= 0) {
        MapManager.showLayer(type[index].id, true)
      } else {
        // 移除屏显高亮
        if (type[index].show) {
          type[index].show = false
        }
        MapManager.showLayer(type[index].id, false)
        MapManager.showLabels(type[index].id, false)
        MapManager.clearCircleAndLayer()
      }
    },
    controlRoadLayer (index, type) { // 应急预案道路状况图层显示/隐藏
      if (this.checkList.indexOf(type[index].id) < 0) {
        MapManager.showLayer(type[index].id, false)
        MapManager.showLabels(type[index].id, false)
        MapManager.clearCircleAndLayer()
        if (type[index].id === "planDec") {
          this.$emit("controlPlan", false)
        }
      } else {
        MapManager.showLabels(type[index].id, true)
        MapManager.showLayer(type[index].id, true)
        if (type[index].id === "planDec") {
          this.$emit("controlPlan", true)
        }
      }
    },
    controlRadioLayer (index, list) { // 道路状况显示/隐藏
      console.log(list)
    },
    // 道路状况单选框
    switchRadio (checkTType, index) {
      if (checkTType) {
        return
      }
      if (this.radio1 !== this.roadRadio[index].label) {
        this.radio1 = this.roadRadio[index].label
        this.radioControlLayer (this.roadRadio[index].id)
        // 显示图层
      } else {
        this.radio1 = "-1"
        this.radioControlLayer ()
      }
    },
    radioControlLayer (id) {
      for(let i = 0; i <this.roadRadio.length; i++) {
        if (id === this.roadRadio[i].id && id){
          MapManager.showLayer(this.roadRadio[i].id, true)
          continue
        }
        MapManager.showLayer(this.roadRadio[i].id, false)
      }
    },
     // 事件录入
    switchRadio2 (e, index) {
      if (this.radio2 !== this.eventInput[index].label) {
        // 显示图层
        this.radio2 = this.eventInput[index].label
        // 弹出录入框
        if (this.eventInput[index].id === "trafficAccidentInput") {
          this.eventTraShow = true
          this.eventConShow = false
        } else if (this.eventInput[index].id === "maintenanceInput") {
          this.eventConShow = true
          this.eventTraShow = false
        }
      } else {
        this.radio2 = "-1"
        this.eventTraShow = false
        this.eventConShow = false
      }
      this.$refs.eventInputTraffic.reset()
      this.$refs.eventInputCon.reset()
      this.$refs.eventInputTraffic.removePoint()
      this.$refs.eventInputCon.removePoint()
    }
    // startDrawPoint (devType, callback, point) {
    //   this.$nextTick(() => {
    //     this.$parent.startDrawPoint(devType, callback, point)
    //   })
    // }
  },
  created () {
    this.shebei = this.rootList.shebei
    this.tags = this.rootList.tags
    this.eventInput = this.rootList.eventInput
    this.roadConList = this.rootList.roadConList
    this.roadRadio = this.rootList.roadRadio
    this.police = this.rootList.police
  },
  mounted () {
    // 初始化路面状况显示勾选状态
    for (let key in this.rootList) {
      this.rootList[key].forEach(element => {
        if (LayerConfig[element.id] !== undefined && LayerConfig[element.id].visibleLayer === true) { // bug
          this.checkList.push(element.id)
        }
      })
    }
    this.arr = this.checkList
    for(let i = 0; i <this.roadRadio.length; i++) {
      if (LayerConfig[this.roadRadio[i].id] !== undefined && LayerConfig[this.roadRadio[i].id].visibleLayer === true) { // bug
        this.radio1 = this.roadRadio[index].label
        this.radioControlLayer (this.roadRadio[index].id)
        break
      }
    }
  }
}
</script>

<style scoped>
  .lastrightButton{
    margin-bottom: 0!important;
  }
  .cursorDisabled{
    cursor: no-drop;
  }
  .cursorPointer{
    cursor: pointer;
  }
  .singeLabel li{
    width:140px!important
  }
  .downLoad{
    float: right;
    line-height: 30px;
    position: relative;
    right: 3px;
    font-size: 20px;
  }
  /* 左下角功能开始 */
.leftBottom {
  position: fixed;
  left: 10px;
  bottom: 30px;
  width: 45px;
  /* height: 210px; */
}

.leftBottom .rightButton {
  width: 45px;
  height: 45px;
  background: #005BAC;
  opacity: 0.7;
  border-radius: 12px;
  margin-bottom: 10px;
  padding: 8px;
  box-sizing: border-box;
  cursor: pointer;
}
/* 左下角弹出内容 */


.el-popover .landmark {
  padding: 8px 10px 10px 10px;
  box-sizing: border-box;
  border-radius: 5px;
}

.el-popover .landmark h3 {
  color: #186AB3;
  text-align: center;
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 10px;
}

.el-popover .landmark ul li {
  height: 30px;
  background: #469FF9;
  padding: 6px 10px 6px 10px;
  box-sizing: border-box;
  border-radius: 10px;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
}
.el-popover .landmark ul .el-checkbox{
  margin-right: 0;
  width: 100%;
  display: inline-block;
}
.el-popover .landmark ul li img{
  width: 18px;
  height: 18px;
  margin-left: 3px;
  vertical-align:middle;
}
.el-popover .landmark ul li b{
  color: #fff;
}
.el-popover .landmark li .screen{
  width: 42px;
  height: 20px;
  border: 1px solid #fff;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 11px;
  color: #fff;
  padding: 1px 3px;
  cursor: pointer;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.el-popover .landmark ul .activese{
  background: #F98D1C;
}
.el-popover .landmark li .screenactive{
  background: #fff;
  color: #F98D1C;
}
</style>

<style>
  .equipmentPop{
    padding:0!important;
    border: 1px solid #679DCC!important;
    border-radius: 10px!important;
  }
  .el-checkbox__label{
    padding-left: 0;
  }
  .el-radio--mini.is-bordered .el-radio__label{
    color: #fff;
    font-size: 14px;
  }
  /* 单选框样式 */
  .el-radio__label{
    color: #fff;
    font-size: 14px;
  }
  .el-radio__input{
    margin-right: 20px;
  }
  /* 事件录入单独处理样式 */
  .landmark .event .el-radio__input{
    margin-right: 0;
  }
  .landmark .event .el-radio__label{
    padding-left: 0;
  }
  .dialogswitch{
    position: absolute;
    bottom: -16px;
    left: 165px;
  }
  .el-checkbox-group{
    width: 100%;
  }
  .event{
    position: relative;
  }
  .dialog{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 10;
  }
</style>
