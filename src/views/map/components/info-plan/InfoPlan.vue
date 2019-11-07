// 应急预案
<template>
  <transition name="el-zoom-in-top">
    <div class="plan">
      <div class="eager">
        <div class="left">
          <h4>应急预案</h4>
          <div class="tuanwu">
            <span>{{eventInfo.planTitle}}</span>&nbsp;&nbsp;
            <strong>
              <strong>{{eventInfo.list.position.name}}:{{eventInfo.list.position.main}}</strong>
            </strong>
          </div>
          <div class="time">
            <span>{{eventInfo.list.continueTime.name}}:</span>
            <strong>{{eventInfo.list.continueTime.main}}</strong><br/>
            <span>{{typeTip.name}}:</span>
            <strong>{{typeTip.main}}</strong>
          </div>
        </div>
        <div class="right">
          <div class="fangan" :class="{active:show0 == true}" @click="change0">系统推荐预案</div>
          <div class="fangan" :class="{active:show1 == true}" @click="change1">自定义预案</div>
        </div>
      </div>
      <!-- 主体 -->
      <!-- <transition name="el-zoom-in-top"> -->
      <div class="mid" v-show="sysStyle">
        <!-- 管控措施 -->
        <div class="measure">
          <img style="vertical-align:bottom;width:15px;" src="../../../../assets/img/mapImg/info-plan/guankongicon.png" alt />
          <span style="color:#038BFC;font-size:15px;">{{controlMeasuresList.type}}</span>
          <p style="color: #999;font-size: 14px;margin: 6px 0;">从以下三种管控措施中选择一种最合适的管控措施</p>
        </div>
        <ul class="guankong clear-both">
          <li
            class="kuang"
            :class="{active:roadIndex == index}"
            @click="rule(index)"
            v-for="(item, index, key) in controlMeasuresList.properties"
            :key="key"
          >{{item.plannedEventType}}</li>
        </ul>
        <!-- 限速措施 -->
        <div class="limtspeed">
          <img style="vertical-align:bottom;width:10px;" src="../../../../assets/img/mapImg/info-plan/xiansuicon.png" alt />
          <span style="color:#038BFC;font-size:15px;">{{speedlist.type}}</span>
          <p style="color: #999;font-size: 14px;margin: 6px 0;">从以下四种管控措施中选择一种最合适的限速措施</p>
        </div>
        <ul class="clear-both">
          <li
            v-for="(item,index) in speedlist.properties"
            :key="index"
            @click="speedAct(index)"
            :class="{checked:number == index}"
          >{{item.plannedEventType}}</li>
        </ul>
        <!-- 辅助措施 -->
        <div class="auxiliary">
          <img style="width:13px;" src="../../../../assets/img/mapImg/info-plan/fuzhuicon.png" alt />
          <span style="color:#038BFC;font-size:15px;">{{cities.type}}</span>
          <p style="color: #999;font-size: 14px;margin: 6px 0">根据实际情况可以选择以下辅助措施（可多选也可不选）</p>
        </div>
        <div class="fuzhu">
          <el-checkbox-group v-model="checkboxGroup1">
            <el-checkbox-button
              v-for="(city,index) in cities.properties"
              :label="city.id"
              :key="index"
              :class="{fuzhuactive:flynumber == index}"
              @change="auxiliary(index)"
            >{{city.plannedEventType}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
      <!-- </transition> -->
      <!-- <transition name="el-zoom-in-top"> -->
      <div class="mid" v-show="!sysStyle">
        <h3 class="defTit">自定义预案说明</h3>
        <p
          class="defPage"
        >点击自定义预案，地图为可编辑状态，系统默认绘出并显示应急事件周边五公里范围的设备，可根据实际需求自行放大或者缩小周边范围来的控制设备的显示与隐藏。点击具体设备，进入设备详情，根据实际需求来设置设备信息。根据自定义方案，所有需要修改信息的设备全部修改设置完成后，点击启动预案，自定义预案启动！</p>
      </div>
      <!-- </transition> -->
      <div v-show="btnShow">
        <div class="back" v-show="btnShowsys" @click="startUp">开启预案</div>
        <div class="back" v-show="!btnShowsys" @click="Revoke">撤销预案</div>
      </div>
      <div v-show="!btnShow">
        <div class="back" v-show="btnShowdef" @click="startUp">开启预案</div>
        <div class="back" v-show="!btnShowdef" @click="Revoke">撤销预案</div>
      </div>

      <el-dialog
        title="应急预案"
        :visible.sync="centerDialogVisible"
        width="20%"
        center
        :modal-append-to-body="false"
      >
        <span>确定要撤销应急预案吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </transition>
</template>
<script>
/* eslint-disable */
  import {
    planProgram,
    getControlsList,
    getSpeedLimitsList,
    getAuxiliaryMeasuresList,
    updataDecValue
  } from "@/api/roadCondition.js";
  import {
    detectorRangeList,
    diversionList,
    speedList
  } from "../../config/search";
  import {
    cancelPlan,
    saveHistoryList,
    getHistoryList
  } from "@/api/emergencyPlan.js";

  import { addSystemPlan } from "@/api/accidentMap.js";
  import MapManager from "@/components/map/MapManager.js";
  import { Message, Notification } from "element-ui";
  export default {
    props: {
      planDetail: {
        type: Object,
        default: () => {}
      },
      systemShow: {
        type: Boolean,
        default: true
      },
      totalList: {
        type: Array,
        default: () => []
      },
      userHistoryList: {
        type: Array,
        default: () => []
      },
      systemPlan: {
        type: Object,
        default: () => {}
      }
    },
    watch: {
      show0(newvalue, oldvalue) {
        if (newvalue === true) {
          this.btnShow = true;
        } else {
          this.btnShow = false;
        }
      },
      show1(newvalue, oldvalue) {
        if (newvalue === true) {
          this.btnShow = false;
        } else {
          this.btnShow = true;
        }
      },
      planDetail(newvalue, oldvalue) {
        this.reset()
        // 调取progress的清空功能
        this.$emit("clearProgress")
        this.planDetail = newvalue // ??????
        this.eventInfo = this.$parent.accidentInfo(this.planDetail.layerid)
        console.log(this.eventInfo)
        this.typeTip = this.eventInfo.type()
        this.center = [
          parseFloat(this.planDetail.longitude),
          parseFloat(this.planDetail.latitude)
        ];
      },
      systemShow(newvalue, oldvalue) {
        if (newvalue) {
          this.show0 = true;
          this.show1 = false;
          this.sysStyle = true;
          this.btnShow = true;
        } else {
          this.show0 = false;
          this.show1 = true;
          this.sysStyle = false;
          this.btnShow = false;
        }
      },
      systemPlan(newvalue, oldvalue) {
        console.log(newvalue)
      }
    },
    name: "mapPlan",
    data() {
      return {
        typeTip: {
          name: "",
          main: ""
        },
        diversionList: [],
        eventInfo: {
          title: "",
          list: {
            position: { name: "", main: "" },
            continueTime: { name: "", main: "" }
          },
          planInfo: {}
        },
        sysHistoryList: [],
        center: [], // 经纬度
        btnShow: true,
        sysStyle: true,
        centerDialogVisible: false,
        btnShowsys: true,
        btnShowdef: true,
        checkboxGroup1: [],
        cities: {}, // 辅助措施
        controlMeasuresList: {}, // 管控措施
        speedlist: {}, // 限速措施
        flynumber: 0,
        flag: true,
        show0: true, // 系统推荐预案
        show1: false, // 自定义预案
        number: -1,
        roadIndex: -1, // 管控列表显示高亮
        controlMeasures: "", // 管控措施
        controlMeasuresid: null,
        limitSpeedMeasures: "", // 限速措施
        limitSpeedMeasuresid: null,
        conditionList: {}, // 措施数据
        conDecList: [], // 管控措施范围列表
        speedDecList: [], // 限速措施列表
        Transferlist: [], // 中转列表
        detectorList: [], // 设备周边列表
        controlList: [],
        speedLimitsList: [],
        auxiliaryMeasuresList: [],
        modifyData: {
          screenComposite: {
            visibility: "",
            roadStatus: "",
            weatherState: ""
          },
          screenMessage: "",
          screenInduction: "",
          highHorn: "",
          screenSpeed: {},
          auxiliary: {
            snowmelt: "",
            uavParking: "",
            uav: ""
          }
        }
      };
    },
    methods: {
      reset () {
        this.speedDecList = []
        this.detectorList = []
        this.number = -1
        this.roadIndex = -1 // 管控列表显示高亮
        // 启动预案
        this.btnShow = true
        this.show0 = true
        this.show1 = false
        this.sysStyle = true
        this.btnShow = true
        this.btnShowsys = true
        this.btnShowdef = true
        this.controlMeasures = ""
        this.limitSpeedMeasures = ""
      },
      // 启动预案
      startUp() {
        let that = this;
        if (this.show0) {
          if (this.limitSpeedMeasures === "" && this.controlMeasures !== "") {
            Message.warning({
              message: "限速措施为必选项",
              center: true
            })
            return
          } else if (
            this.controlMeasures === "" &&
            this.limitSpeedMeasures !== ""
          ) {
            Message.warning({
              message: "管控措施为必选项",
              center: true
            })
            return
          } else if (
            this.limitSpeedMeasures === "" &&
            this.controlMeasures === ""
          ) {
            Message.warning({
              message: "管控措施和限速措施为必选项",
              center: true
            })
            return
          } else {
            this.$emit("backuser", false)
            // 提交系统预案
            addSystemPlan({
              fogId: this.planDetail.id,
              controlsId: this.controlMeasuresid,
              speedLimitsId: this.limitSpeedMeasuresid,
              auxiliaryMeasuresIds: this.checkboxGroup1.join()
            })
              .then(res => {
                if (res.result === "ok") {
                } else {
                  this.tip("error", "提交系统预案")
                }
              })
              .catch(err => {
                console.log(err)
              });
            // 数据处理
            this.modifyValue()
            this.sysHistoryList = []
            this.detectorList.forEach(element => {
              delete element.geometry;
              this.sysHistoryList.push(Object.assign({}, element))
              this.$set(
                element,
                "modifyMeter",
                parseInt(
                  MapManager.atlongDistance(this.center, [
                    element.longitude,
                    element.latitude
                  ])
                )
              );
              if (element.layerid === "screenSpeed") {
                for (let key in this.modifyData.screenSpeed) {
                  if (element.modifyMeter > key) {
                    this.$set(
                      element,
                      "updataValue",
                      this.modifyData[element.layerid][key]
                    )
                    this.$set(element, "status", null)
                  } else {
                    break
                  }
                }
              } else {
                this.$set(
                  element,
                  "updataValue",
                  this.modifyData[element.layerid]
                );
                this.$set(element, "status", null)
              }
            });
            this.$emit("mapPlanList", this.detectorList, null)
            // 保存历史
            // saveHistoryList(this.sysHistoryList) // ???????????
            //   .then(res => {
            //     console.log(res)
            //   })
            //   .catch(err => console.log(err))
            // 修改数据
            this.cycleRequest(this.detectorList, null)
            that.btnShowsys = false
          }
        } else if (this.show1) {
          // 自定义预案
          this.$emit("backuser", false)
          // 保存历史记录
          // saveHistoryList(this.userHistoryList) // ???????????
          //   .then(res => {
          //     console.log(res)
          //   })
          //   .catch(err => console.log(err))
          // 修改数据
          this.cycleRequest(this.totalList, "userDefined")
          that.btnShowdef = false
        }
      },
      // 撤销预案
      Revoke() {
        this.centerDialogVisible = true
      },
      // dialog确定
      async confirm() {
        // let result = await this.cancelRequest()
        // if (result === "error") {
        // } else {
          // await this.cycleRequest()
          Message.success({
            message: "预案撤销成功",
            center: true,
            showClose: true
          });
          // 回传状态
          this.centerDialogVisible = false
          if (this.show0) {
            this.btnShowsys = true
          } else if (this.show1) {
            this.btnShowdef = true
          }
          this.$emit("mapPlanList", [], "cancel")
          this.$emit("clearProgress")
        // }
      },
      // dialog取消
      cancel() {
        this.centerDialogVisible = false
        // this.btnShow = false
      },
      // 系统推荐预案
      change0() {
        MapManager.clearCircleAndLayer()
        this.show0 = true
        this.show1 = false
        this.sysStyle = true
        this.btnShow = true
        this.number = -1
        this.roadIndex = -1
        this.checkboxGroup1 = []
      },
      // 自定义预案
      change1() {
        // 显示返回自定义预案
        this.$emit("backuser", true)
        MapManager.clearCircleAndLayer()
        this.show0 = false
        this.show1 = true
        this.sysStyle = false
        this.btnShow = false
        // 自定义显示10公里范围内的设备
        this.showdet()
      },
      // 管控措施
      rule(index) {
        if (this.roadIndex === index) {
          this.roadIndex = -1
          this.controlMeasures = ""
          this.conDecList = []
          MapManager.clearCircleAndLayer()
          MapManager.cleanLayer("roadSelLayer")
          if (this.limitSpeedMeasures !== "") {
            this.circleSpeed()
          }
          this.diversionList = []
        } else {
          this.roadIndex = index;
          this.controlMeasures = this.controlMeasuresList.properties[
            index
          ].plannedEventType
          this.controlMeasuresid = this.controlMeasuresList.properties[index].id
          this.conDecList = []
          MapManager.clearCircleAndLayer()
          MapManager.cleanLayer("roadSelLayer")
          if (this.controlMeasures === "择路分流") {
            this.diversion()
            if (this.limitSpeedMeasures !== "") {
              MapManager.clearCircleAndLayer()
              this.circleSpeed()
            }
          } else {
            if (this.limitSpeedMeasures !== "") {
              MapManager.clearCircleAndLayer()
              this.circleSpeed()
            } else {
              MapManager.clearCircleAndLayer()
            }
          }
        }
      },
      // 显示10公里范围设备
      showdet() {
        this.$nextTick(() => {
          let that = this
          let radius = 11500
          let feature = MapManager.addCircle(that.center, radius, true, function(
            fea
          ) {
            that.detectorList = [];
            MapManager.cleanLayer("aroundLayer")
            detectorRangeList.forEach(element => {
              let detectorList = MapManager.getIncludeFeaturesOnLayer(
                element,
                feature.getGeometry()
              );
              detectorList.forEach(element => {
                that.detectorList.push(element.getProperties())
              });
              MapManager.addData2Layer("aroundLayer", that.detectorList)
              // 屏显显示?????????
            });
          });
          detectorRangeList.forEach(element => {
            let detectorList = MapManager.getIncludeFeaturesOnLayer(
              element,
              feature.getGeometry()
            );
            detectorList.forEach(element => {
              that.detectorList.push(element.getProperties())
            });
            // 屏显显示?????????
          });
          MapManager.addData2Layer("aroundLayer", that.detectorList)
        });
      },
      // 限速措施
      speedAct(index) {
        if (this.number === index) {
          this.number = -1
          this.limitSpeedMeasures = ""
          this.speedDecList = []
          this.Transferlist = []
          MapManager.clearCircleAndLayer() // 再次点击清除圆
          if (this.controlMeasures === "择路分流") {
            // ???????
            MapManager.zoomCenter(this.center)
            this.diversion();
          } else if (
            this.controlMeasures !== "择路分流" &&
            this.controlMeasures !== ""
          ) {
            // ???????
            MapManager.cleanLayer("roadSelLayer")
          }
        } else {
          MapManager.clearCircleAndLayer() // 再次点击清除圆
          this.number = index
          this.detectorList = []
          this.limitSpeedMeasures = this.speedlist.properties[
            index
          ].plannedEventType
          this.limitSpeedMeasuresid = this.speedlist.properties[index].id
          this.circleSpeed()
          // 撤销预案储存数据
        }
      },
      circleSpeed() {
        MapManager.zoomCenter(this.center)
        this.detectorList = []
        let radius = 0
        if (this.limitSpeedMeasures === "10公里开始限速") {
          radius = 10000 + 1500
        } else if (this.limitSpeedMeasures === "5公里开始限速") {
          radius = 5000 + 1500
        } else if (this.limitSpeedMeasures === "3公里开始限速") {
          radius = 3000 + 1500
        } else if (this.limitSpeedMeasures === "1公里开始限速") {
          radius = 1000 + 1500
        }
        // 查询所有修改设备图层
        let feature = MapManager.addCircle(this.center, radius)
        detectorRangeList.forEach(element => {
          let detectorList = MapManager.getIncludeFeaturesOnLayer(
            element,
            feature.getGeometry()
          )
          detectorList.forEach(element => {
            this.detectorList.push(element.getProperties())
          })
        })
        console.log(this.detectorList)
        if (this.controlMeasures === "择路分流") {
          MapManager.addData2Layer("aroundLayer", [
            ...this.detectorList,
            ...this.diversionList
          ])
          MapManager.addData2Layer("roadSelLayer", this.diversionList)
        } else {
          MapManager.addData2Layer("aroundLayer", this.detectorList)
        }
      },
      // 辅助措施
      auxiliary(index) {
        
      },
      modifyValue() {
        this.modifyData.screenComposite = {}
        this.modifyData.screenSpeed = {}
        this.controlList.forEach(element => {
          this.modifyData.screenComposite.visibility = element.visibility
          this.modifyData.screenComposite.roadStatus = element.roadStatus
          this.modifyData.screenComposite.weatherState = element.weatherState
          this.modifyData.screenMessage = element.informationScreenContent
          // this.$set(this.modifyData,screenInduction,)
          this.modifyData.highHorn = element.highPitchedHornContent
        })
        this.speedLimitsList.forEach(element => {
          if (element.plannedEventType === this.limitSpeedMeasures) {
            let value = element.speedLimitsValue
            value.split(",").forEach(item => {
              let index = item.indexOf("_")
              this.$set(
                this.modifyData.screenSpeed,
                item.substring(0, index),
                item.substring(index + 1)
              )
            })
          }
        })
        if (this.checkboxGroup1.length <= 0) return
        this.checkboxGroup1.forEach(item => {
          this.auxiliaryMeasuresList.forEach(element => {
            if (element.plannedEventTypeIds === item && element.plannedEventType === "无人机巡查"
            ) {
              this.modifyData.auxiliary.uavParking = element.auxiliaryMeasuresDes
              this.modifyData.auxiliary.uav = element.auxiliaryMeasuresDes
            } else if (element.plannedEventTypeIds === item &&element.plannedEventType === "融雪融冰"
            ) {
              this.modifyData.auxiliary.snowmelt = element.auxiliaryMeasuresDes;
            }
          })
        })
      },
      cycleRequest(obj, type) {// 启动预案修改显示信息// 启动预案修改信息
        let list = []
        let len = obj.length
        let count = 0
        obj.forEach(async element => {
          await updataDecValue(element.layerid, {
            // 请求参数
            layerid: element.layerid,
            devid: element.id,
            msg: element.updataValue
          })
            .then(res => {
              count++
              if (res.result === "ok") {
                this.$set(element, "status", true)
                // 修改显示屏？？？？？？？
              } else {
                this.$set(element, "status", false)
              }
              obj = Object.assign(obj, element)
              list.push(element)
            })
            .catch(err => {
              count++
              console.log(err)
              this.$set(element, "status", false)
              obj = Object.assign(obj, element)
              list.push(element)
            });
          if (count === len) {
            this.$emit("mapPlanList", list, type)
          }
        })
      },
      cancelRequest() {// 撤销预案获取历史列表
        return getHistoryList()
          .then(res => {
            if (res.result === "ok") {
              if (this.show0) {
                this.sysHistoryList = res.data
              } else {
                this.userHistoryList = res.data
              }
            } else {
              this.tip("预案撤销失败，请联系管理员", 2000)
              this.centerDialogVisible = false
              if (this.show0) {
                this.btnShowsys = false
              } else if (this.show1) {
                this.btnShowdef = false
              }
              return "error"
            }
          })
          .catch(err => {
            console.log(err)
            this.tip("预案撤销出错啦！", 2000)
            this.centerDialogVisible = false
            if (this.show0) {
              this.btnShowsys = false
            } else if (this.show1) {
              this.btnShowdef = false
            }
            return "error"
          });
      },
      originalRequset() {
        // 如何改回去??????????????????
        // updataDecValue()
      },
      diversion() {// 择路分流查询分流点
        let radius = 11500;
        MapManager.clearCircleAndLayer()
        MapManager.zoomCenter(this.center)
        let feature = MapManager.addCircle(this.center, radius, true, fea => {
          this.cirleDiversion(feature)
        });
        this.cirleDiversion(feature)
      },
      cirleDiversion(feature) {
        diversionList.forEach(element => {
          let detectorList = MapManager.getIncludeFeaturesOnLayer(
            element,
            feature.getGeometry()
          );
          detectorList.forEach(element => {
            this.diversionList.push(element.getProperties())
          })
        })
        MapManager.addData2Layer("aroundLayer", this.diversionList)
        MapManager.addData2Layer("roadSelLayer", this.diversionList)
      },
      tip(msg, duration) {
        Message.error({
          message: msg,
          center: true,
          showClose: true,
          duration: duration
        })
      }
    },
    created() {
      let that = this;
      let msgAux = "辅助措施数据获取失败，请联系管理员"
      let msgCon = "管控措施数据获取失败，请联系管理员"
      let msgspeed = "限速措施数据获取失败，请联系管理员"
      planProgram() // 推荐预案数据
        .then(res => {
          that.conditionList = res.features
          that.conditionList.forEach(element => {
            if (element.type === "管控措施") {
              // ？？？？？？？
              that.controlMeasuresList = element
            } else if (element.type === "限速措施") {
              // ?????
              that.speedlist = element
            } else if (element.type === "辅助措施") {
              // ?????
              that.cities = element
            }
          })
        })
        .catch(err => console.log(err))
      // 推荐预案管控措施
      getControlsList()
        .then(res => {
          if (res.result === "ok") {
            this.controlList = res.data
          } else {
            this.tip(msgCon, 0)
          }
        })
        .catch(err => {
          console.log(err)
          this.tip(msgCon, 0)
        });
      // 推荐预案限速措施
      getSpeedLimitsList()
        .then(res => {
          if (res.result === "ok") {
            this.speedLimitsList = res.data
          } else {
            this.tip(msgspeed, 0)
          }
        })
        .catch(err => {
          console.log(err)
          this.tip(msgspeed, 0)
        });
      // 推荐预案辅助措施
      getAuxiliaryMeasuresList()
        .then(res => {
          if (res.result === "ok") {
            this.auxiliaryMeasuresList = res.data
          } else {
            this.tip(msgAux, 0)
          }
        })
        .catch(err => {
          console.log(err)
          this.tip(msgAux, 0)
        })
    }
  }
</script>

<style scoped>
.plan {
  width: 400px;
  position: absolute;
  top: -60px;
  box-shadow: 0px 1px 3px #333;
  border-radius: 16px;
  /* display: none */
}
.plan .eager {
  height: 100px;
  width: 100%;
  background: #1a89e6;
  border-radius: 12px 12px 0 0;
  padding: 10px;
  box-sizing: border-box;
}
.plan .eager .left {
  width: 70%;
  height: 100%;
  float: left;
}
.plan .eager .left h4 {
  color: #fbe109;
  font-size: 15px;
  margin-bottom: 10px;
}
.plan .eager .left .tuanwu {
  color: #fff;
  font-size: 13px;
  margin-bottom: 5px;
}
.plan .eager .left .time {
  color: #fff;
  font-size: 13px;
  line-height: 18px;
}
.plan .eager .right {
  width: 26%;
  height: 100%;
  float: left;
  margin-left: 4%;
}
.plan .eager .right .fangan {
  width: 100%;
  height: 30px;
  border: 1px solid #fff;
  box-sizing: border-box;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
.plan .eager .right .active {
  background: #fff;
  color: #038bfc;
}
.plan .eager .right .fangan:last-child {
  margin-bottom: 0;
}
.plan .mid {
  width: 100%;
  padding: 10px 10px 10px 20px;
  box-sizing: border-box;
  background: #fff;
}
/* 管控措施 */
.plan .mid .guankong {
  border-bottom: 1px solid #e2e2e2;
  box-sizing: border-box;
  padding-bottom: 10px;
}
.plan .mid .guankong .kuang {
  width: 78px;
  height: 30px;
  border: 1px solid #37afff;
  color: #37afff;
  padding: 6px;
  box-sizing: border-box;
  border-radius: 5px;
  text-align: center;
  font-size: 14px;
  float: left;
  margin-right: 12px;
  cursor: pointer;
}
.plan .mid .guankong .kuang:hover{
  background: #37afff;
  color: #fff;
  transition: 0.2s;
}
/* 选中状态 */
.plan .mid .guankong .active {
  background: #37afff;
  color: #fff;
  transition: 0.2s;
}
/* 限速措施 */
.plan .mid .limtspeed {
  padding-top: 10px;
  box-sizing: border-box;
}
.plan .mid ul {
  border-bottom: 1px solid #e2e2e2;
  box-sizing: border-box;
  padding-bottom: 10px;
}
.plan .mid ul li {
  width: 125px;
  height: 28px;
  border: 1px solid #37afff;
  box-sizing: border-box;
  font-size: 14px;
  color: #37afff;
  border-radius: 5px;
  margin-bottom: 12px;
  padding: 5px;
  float: left;
  margin-right: 12px;
  text-align: center;
  cursor: pointer;
  transition: all .3s;
}
.plan .mid ul li:hover{
  background: #37afff;
  color: #fff;
  transition: all .3s;
}
/* 选中状态 */
.plan .mid ul .checked {
  background: #37afff;
  color: #fff;
  transition: 0.3s;
}
.plan .mid ul li:nth-child(3) {
  margin-bottom: 0;
}
.plan .mid ul li:nth-child(4) {
  margin-bottom: 0;
}
/* 辅助措施 */
.plan .mid .auxiliary {
  padding-top: 10px;
  box-sizing: border-box;
}
.plan .mid .fuzhu .el-checkbox-button__inner {
  height: 28px;
  border: 1px solid #37afff;
  box-sizing: border-box;
  font-size: 14px;
  color: #37afff;
  border-radius: 5px;
  padding: 5px 10px;
  margin-right: 12px;
  text-align: center;
  cursor: pointer;
}
.plan .back {
  height: 45px;
  background: #1a89e6;
  border-radius: 0 0 12px 12px;
  width: 100%;
  text-align: center;
  line-height: 45px;
  color: #fbe109;
  cursor: pointer;
}
</style>

<style>
.plan .mid .fuzhu .el-checkbox-button__inner {
  height: 28px;
  border: 1px solid #37afff;
  box-sizing: border-box;
  font-size: 14px;
  color: #37afff;
  border-radius: 5px;
  padding: 5px 10px;
  margin-right: 12px;
  text-align: center;
  cursor: pointer;
}
.plan .mid .fuzhu .el-checkbox-button__inner:hover {
  background: #37afff;
  color: #fff;
  transition: 0.2s;
}
/* 选中状态 */
.plan .mid .fuzhu .is-checked .el-checkbox-button__inner {
  background: #37afff;
  color: #fff;
  transition: 0.2s;
}
/* 自定义预案 */
.defTit {
  font-size: 13px;
  color: #1a89e5;
  line-height: 13px;
  text-align: center;
  margin-bottom: 10px;
}
.defPage {
  font-size: 12px;
  color: #666666;
  line-height: 22px;
}
</style>
