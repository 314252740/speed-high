<template>
  <div class="inputEventBox">
    <div @click="closeEventBox('evenTraffic')" class="clear_both" style="cursor: pointer;">
      <i style="float:right" class="el-icon-close"></i>
    </div>
    <h3 class="eventTit">交通事故录入</h3>
    <el-form
      :rules="rules"
      :inline-message="true"
      ref="evenTraffic"
      :model="formValue"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="24" style="padding-bottom:10px">
          <!--<el-form-item class="boxInput inlineBoxnth" label="事故位置:" prop="subordinateHighSpeed" :inline-message="false">
            <el-select v-model="formValue.subordinateHighSpeed" clearable placeholder="请选择道路名称" style="width:133px">
              <el-option
                v-for="item in roadOptions"
                :key="item.name"
                :label="item.label"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>-->

          <el-form-item class="boxInput inlineBoxnth" label="事故位置:" prop="subordinateHighSpeed" :inline-message="false">
            <el-select v-model="formValue.subordinateHighSpeed" clearable placeholder="请选择道路名称" style="width:133px" @change="selectRoadStart(formValue.subordinateHighSpeed)">
              <el-option
                v-for="item in lists"
                :key="item.index"
                :label="item.name"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="boxInput inlineBox" prop="pile" :inline-message="false">
            <el-input clearable placeholder="请输入桩号公里数" v-model="formValue.pile" style="width:133px"></el-input>
          </el-form-item>
          <el-form-item class="boxInput inlineBox" prop="distance" :inline-message="false">
            <el-input
              clearable
              placeholder="请输入具体米数"
              v-model.number="formValue.distance"
              style="width:133px"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <p class="tip">(事故位置可直接点击地图上的桩号图标自动输入)</p>
        <el-row>
          <el-col :span="12">
            <el-form-item class="boxInput" label="事故类型:" prop="accidentType">
              <el-select
                clearable
                v-model="formValue.accidentType"
                placeholder="请选择事故类型"
                style="width:161px"
              >
                <el-option
                  v-for="item in typeOptions"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        <el-col :span="12">
          <el-form-item prop="orgId" label="所属辖区:" class="boxInput">
          <el-select
            v-model="formValue.orgId"
            clearable
            placeholder="请选择所属辖区"
            style="width:160px;"
          >
          <el-option
            v-for="item in JurisdictionOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
          <!-- <el-form-item label="所属辖区:" prop="orgId">
            <el-input v-model="formValue.orgId" required="true" autocomplete="off" placeholder="所属大队"></el-input>
          </el-form-item> -->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="道路起点:" prop="roadStart" class="boxInput" label-width="82px">
              <el-select clearable v-model="formValue.roadStart" placeholder="请选择道路起点" style="width:160px" @change="changeRoadStart(formValue.roadStart)">
                <el-option
                  v-for="item in options1"
                  :key="item.index"
                  :label="item.name"
                  :value="item.key">
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="财产损失:" label-width="81px" prop="propertyDamage">
            <el-input v-model.number="formValue.propertyDamage" oninput = "value=value.replace(/[^\d.]/g,'')" autocomplete="off" placeholder="财产损失情况(万元)" style="width:161px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item class="boxInput" label="死亡人数:" label-width="81px" prop="casualties">
            <el-input clearable placeholder="请输入死亡人数" v-model.number="formValue.casualties" style="width:161px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="boxInput" label="受伤人数:" label-width="81px" prop="injuredNumber">
            <el-input clearable placeholder="请输入受伤人数" v-model.number="formValue.injuredNumber" style="width:161px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="开始时间:" class="container boxInput" prop="accidentTime">
        <el-date-picker
          clearable
          v-model="accidentTime"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
          style="width:200px"
        ></el-date-picker>
        <el-time-picker
          clearable
          v-model="hours"
          style="width:200px"
          :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
          placeholder="任意时间点"
        ></el-time-picker>
      </el-form-item>
      <el-form-item class="textDox boxInput" label="事故描述:" label-width="81px">
        <el-input
          clearable
          type="textarea"
          :show-word-limit="true"
          maxlength="150"
          @change='changeDes'
          :autosize="{ minRows: 1, maxRows: 2}"
          placeholder="请输入内容(150字范围内)"
          v-model="note"
          style="width:200px;"
        ></el-input>
        <el-select v-model="accidentNote" @change="changeDes" style="width:200px;" placeholder="请选择交通事故形态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
       <el-form-item class="textDox boxInput" label="协助情况:" prop="assistance" label-width="81px">
        <el-input
          clearable
          type="textarea"
          :show-word-limit="true"
          maxlength="150"
          :autosize="{ minRows: 1, maxRows: 2}"
          placeholder="请输入内容(150字范围内)"
          v-model="formValue.assistance"
          style="width:405px;"
        ></el-input>
      </el-form-item>
      <el-row style="margin-bottom:7px;" class="lotLat">
        <el-col :span="12" style="padding-left:14px;">
          <el-form-item label="经纬度:">
            <el-input v-model="formValue.longitude" type="hidden" clearable oninput = "value=value.replace(/[^\d.]/g,'')" @focus="inputLotLat" @blur="removePoint" required="true" minlength="6" maxlength="20" autocomplete="off" placeholder="请输入经度"></el-input>
            <el-button type="primary" @click="inputLotLat" round>经纬度选取</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="latitude">
            <el-input v-model="formValue.latitude" type="hidden" clearable oninput = "value=value.replace(/[^\d.]/g,'')" @focus="inputLotLat"  @blur="removePoint" required="true" minlength="6" maxlength="20" autocomplete="off" placeholder="请输入纬度"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="boxInput">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;"
          @click.native.prevent="commitInput"
        >
          <span v-if="!loading">确定录入</span>
          <span v-else>录入中...</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
/* eslint-disable */
import {
  getTrafficType,
  getTrafficPosition,
  addTrafficInfo,
  getAllOrg
} from "@/api/eventInput.js"
import MapManager from "@/components/map/MapManager.js"
import { Notification } from "element-ui"
import { formatTime } from "@/utils/format"
import {selectRoadStart} from "@/api/road"
import { mapGetters } from "vuex"
export default {
  props: {
    eventTraShow: {
      type: Boolean,
      default: false
    },
    stakeNumInfo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(["roadList"]),
    lists () {
      return this.roadList
    }
  },
  watch: {
    stakeNumInfo (newvalue, oldvalue) {
      if (newvalue === undefined) return
      // this.$refs.dowmdirection.resetField()
      // this.$refs.updirection.resetField()
      this.formValue.subordinateHighSpeed = newvalue.code
      this.formValue.pile = newvalue.name
      this.formValue.longitude = parseFloat(newvalue.longitude).toFixed(6)
      this.formValue.latitude = parseFloat(newvalue.latitude).toFixed(6)
    },
    eventTraShow (newvalue, oldvalue) {
      if (newvalue) {
        this.$refs.evenTraffic.resetFields()
        this.accidentTime = new Date()
        this.formValue.accidentTime = new Date()
        this.hours = new Date()
        this.formValue.hours = new Date()
      } else {
        this.removePoint()
         this.$refs.evenTraffic.resetFields()
      }
    }
  },
  data () {
    let longitudeCode = (rule, value, callback) => {
      let reg = /^(\+|-)?(([1-9]?[0-9]|1[0-7][0-9])(\.[0-9]+)?|180)$/
      if (!reg.test(value)) {
        callback(new Error("-180 < 经度 <180"))
      } else {
        callback()
      }
    }
    let latitudeCode = (rule, value, callback) => {
      let reg = /^-?((0|[1-8]?[0-9]?)(([.][0-9]{1,9})?)|90(([.][0]{1,9})?))$/
      if (!reg.test(value)) {
        callback(new Error("-90 < 纬度 <90"))
      } else {
        callback()
      }
    }
    return {
      note: null,
      accidentNote: [],
      options1: [],
      // 故障，刮擦，追尾，自然，侧翻，撞护栏
      options: [{
          value: '故障',
          label: '故障'
        }, {
          value: '刮擦',
          label: '刮擦'
        }, {
          value: '追尾',
          label: '追尾'
        },{
          value: '自然',
          label: '自然'
        },{
          value: '侧翻',
          label: '侧翻'
        },{
          value: '撞护栏',
          label: '撞护栏'
        }, ],
      pickerOptions: {
        disabledDate (value) {
          if (Date.now() <= value) {
            return true
          }
          return false
        }
      },
      accidentTime: "", // 开始日期
      hours: "", // 开始时间
      formValue: {
        dowmdirection: null,
        updirection: null,
        subordinateHighSpeed: "", // 道路名称
        pile: "", // 桩号
        distance: null, // 米
        accidentType: "轻微事故", // 事件类型
        accidentNote: "", // 事件描述
        casualties: 0, // 死亡人数
        injuredNumber: 0, // 受伤人数
        accidentTime: "", // 开始日期
        hours: "", // 开始时间
        longitude: "", // 经度
        latitude: "", // 纬度
        direction: "", // 方向
        propertyDamage: null, // 财产损失
        assistance: "", // 协助情况
        orgId: "", // 所属辖区
      },
      rules: {
        subordinateHighSpeed: [
          { required: true, message: "请输入事故位置", trigger: "change" }
        ],
        pile: [
          { required: true, message: "请输入事故位置", trigger: "blur" }
        ],
        distance: [
          { required: false, type: "number", message: "请输入米数(m)", trigger: "blur" }
        ],
        accidentType: [
          { required: true, message: "请选择事故类型", trigger: "change" }
        ],
        casualties: [
          { required: false, type: "number", message: "请输入伤亡人数", trigger: "blur" }
        ],
        injuredNumber: [
          { required: false,  type: "number", message: "请输入伤亡人数", trigger: "blur" }
        ],
        // accidentNote: [
        //   { required: true, message: "请描述事故内容", trigger: "blur" }
        // ],
        accidentLevel: [
          { required: true, message: "请选择事故等级", trigger: "change" }
        ],
        // subordInate: [
        //   { required: true, message: "请输入所属高速", trigger: "blur" }
        // ],
        dowmdirection: [
          { required: true, message: "请输入方向", trigger: "change" }
        ],
        updirection: [
          { required: true, message: "请输入方向", trigger: "change" }
        ],
        propertyDamage: [
          { type: "number", required: false, message: "请输入财产损失情况", trigger: "blur" }
        ],
        orgId: [
          { required: true, message: "请输入所属大队", trigger: "blur" }
        ],
        accidentTime: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        longitude: [
          { required: true, message: "请输入经纬度", trigger: "blur" },
          { validator: longitudeCode, trigger: "blur"}
        ],
        latitude: [
          { required: true, message: "请输入经纬度", trigger: "blur" },
          { validator: latitudeCode, trigger: "blur"}
        ]
      },
      loading: false,
      roadOptions: [],
      typeOptions: [],
      JurisdictionOptions: [],
      point: {},
      direction: {
        "G3W":[
          {name: 0, label: "德州"},
          {name: 1, label: "上海"}
        ],
        "S32": [
          {name: 2, label: "菏泽"},
          {name: 3, label: "东明"}
        ],
        "G35":[
          {name: 4, label: "济南"},
          {name: 5, label: "广东"}
        ],
        "G1511":[
          {name: 6, label: "日照"},
          {name: 7, label: "兰考"}
        ]
      }
    }
  },
  methods: {
    selectDirection (type) {
      let arr = this.direction[this.formValue.subordinateHighSpeed]
      let value, index
      if (type === "up") {
        value = this.formValue.updirection
      } else {
        value = this.formValue.dowmdirection
      }
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].label === value) {
          index = i
          break
        }
      }
      if (type === "up") {
        if (index === 0) {
          this.formValue.dowmdirection = arr[1].label
        } else {
          this.formValue.dowmdirection = arr[0].label
        }
       } else {
         if (index === 0) {
          this.formValue.updirection = arr[1].label
        } else {
          this.formValue.updirection = arr[0].label
        }
      }
      this.formValue.direction = this.formValue.updirection + "," + this.formValue.dowmdirection
    },
    changeDes () {
      this.formValue.accidentNote = this.note + "," + this.accidentNote
    },
    close () {
      this.note = null
      this.accidentNote = null
    },
    removePoint () {
      MapManager.removeDraw("trafficAccident")
    },
    inputLotLat () {
      this.startDrawPoint("trafficAccident", this.setLnglat, [this.formValue.longitude, this.formValue.latitude])
    },
    setLnglat (point) {
      this.formValue.longitude = point[0]
      this.formValue.latitude = point[1]
    },
    startDrawPoint (devType, callback, point) {
      this.$nextTick(() => {
        MapManager.DrawPoint(devType, callback, point)
      })
    },
    //   点击关闭
    reset () {
      this.close()
      this.$refs.evenTraffic.resetFields()
    },
    closeEventBox () {
      this.close()
      this.$emit("closeEventBox")
      this.$refs.evenTraffic.resetFields()
      this.removePoint()
    },
    selectRoadStart(roadId){
      selectRoadStart(roadId)
          .then(res => {
            this.options1 = res
          })
          .catch(err => console.log(err))
    },
    changeRoadStart(roadStart){
      if(null != this.formValue.subordinateHighSpeed){
          selectRoadStart(this.formValue.subordinateHighSpeed)
              .then(res => {
                this.options1 = res
                if(null != this.formValue.direction && res.length == 2){
                  this.formValue.roadStart = roadStart
                }
              })
              .catch(err => console.log(err))
        }
    },
    commitInput () {
      this.$refs.evenTraffic.validate(async (valid) => {
        if (valid) {
          this.formValue.accidentTime = formatTime("yyyy-MM-dd hh:mm:ss", "yyyy-MM-dd", this.accidentTime)
          if (this.hours) {
            this.formValue.hours = formatTime("yyyy-MM-dd hh:mm:ss", "hh:mm:ss", this.hours)
          }
          this.formValue.distance = this.formValue.distance + "m"
          this.formValue.locationInformation = this.formValue.pile + "+"+ this.formValue.distance
          this.loading = true
          await addTrafficInfo(this.formValue)
            .then(res => {
              if (res.result === "ok" && res.status === "200") {
                // 提交成功
                Notification.success({
                  title: "操作成功",
                  message: "交通事故录入成功",
                  duration: 2000,
                  offset: 100
                })
                this.loading = false
                this.$emit("closeEventBox")
              } else {
                Notification.error({
                  title: "操作失败",
                  message: "交通事故录入失败",
                  duration: 2000,
                  offset: 100
                })
                this.loading = false
                this.$emit("closeEventBox")
              }
            })
            .catch(err => {
              console.log(err)
              this.loading = false
              this.$emit("closeEventBox")
            })
          this.removePoint()
          MapManager.addData2Layer("roadSelLayer", [this.stakeNumInfo])
        } else {
          this.loading = false
          console.log("error submit!!")
          return false
        }
      })
    }
  },
  created () {
    // console.log(this.roadList)
    // 获取辖区
    getAllOrg()
    .then(res => {
      this.JurisdictionOptions = res
    })
    .catch(err => console.log(err))
    // 事故类型
    getTrafficType()
      .then(res => {
        this.typeOptions = res
      })
      .catch(err => {
        console.log(err)
      })
    // 事故位置
    getTrafficPosition()
      .then(res => {
        this.roadOptions = res
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style scoped>
.labelitem{
  display: inline-block;
  width:81px;
  text-align: right;
}
.inputEventBox {
  /* height: 340px; */
  width: 490px;
  padding: 10px;
  background: #fff;
  border: 1px solid #017fed;
  border-radius: 5px;
  position: relative;
}
.inputEventBox:before {
  content: "";
  width: 0;
  height: 0;
  border-width: 8px 8px 8px 8px;
  border-style: dashed;
  position: absolute;
  border-color: transparent #017fed transparent transparent;
  bottom: 55px;
  left: -16px;
}

.inputEventBox:after {
  content: "";
  width: 0;
  height: 0;
  border-width: 8px 8px 8px 8px;
  border-style: dashed;
  position: absolute;
  border-color: transparent #fff transparent transparent;
  bottom: 55px;
  left: -15px;
}
.tip {
  text-align: center;
  font-size: 12px;
  color: #017fed;
}
.eventTit {
  font-size: 14px;
  color: #017fed;
  height: 25px;
  text-align: center;
}

.el-input--mini {
  font-size: 12px;
  width: 130px;
}
.el-input__inner {
  padding-left: 5px;
}
.el-input el-input--mini el-input--suffix {
  width: 133px !important;
}
.textDox {
  width: 100%;
}
.boxInput {
  padding: 5px 0px;
}

.el-form-item--mini.el-form-item {
  margin-bottom: 0px;
}
.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 0px;
}

.el-form-item {
  margin-bottom: 0px;
}
.el-form-item {
  margin-bottom: 0px;
}
.el-form-item--mini .el-form-item__content {
  line-height: 0px;
}
.inlineBox{
  display: inline-block;
}
.inlineBoxnth{
  display: inline-block;
  width: 215px;
}
</style>
<style>
.lotLat .el-input--mini{
  width: 0!important
}
</style>
