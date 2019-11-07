<template>
  <div class="inputEventBox">
    <div class="clear_both" @click="closeEventBox()" style="cursor: pointer;">
      <i style="float:right" class="el-icon-close"></i>
    </div>
    <h3 class="eventTit">施工养护录入</h3>
    <el-form
      :rules="rules"
      ref="eventCon"
      :model="formValue"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="24" style="padding-bottom:10px;">
          <el-form-item class="boxInput inlineBoxnth" label="事故位置:" prop="roadName" :inline-message="false">
            <el-select v-model="formValue.roadName" clearable placeholder="请选择道路名称" style="width:133px">
              <el-option
                v-for="item in roadOptions"
                :key="item.name"
                :label="item.label"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="boxInput inlineBox" prop="pile" :inline-message="false">
            <el-input clearable placeholder="请输入桩号公里数" v-model="formValue.pile" style="width:133px"></el-input>
          </el-form-item>
          <el-form-item class="boxInput inlineBox" prop="distance">
            <el-input
            :inline-message="false"
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
          <el-form-item prop="constructionType" label="养护类型:" class="boxInput" :inline-message="true">
            <el-select
              v-model="formValue.constructionType"
              clearable
              placeholder="请选择施工养护类型"
              style="width:160px"
            >
              <el-option
                v-for="item in typeOptions"
                :key="item.name"
                :label="item.label"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
         <el-form-item prop="orgId" label="组织机构:" class="boxInput" :inline-message="true">
            <el-select
              v-model="formValue.orgId"
              clearable
              placeholder="请选择组织机构"
              style="width:160px"
            >
              <el-option
                v-for="item in organizationOptions"
                :key="item.name"
                :label="item.label"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item prop="startTime" label="开始时间:" class="boxInput" :inline-message="true">
        <el-date-picker
          clearable
          editable
          v-model="startTime"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
          style="width:200px"
        ></el-date-picker>
        <el-time-picker
         :inline-message="true"
          clearable
          editable
          v-model="hours"
          style="width:200px"
          :default-value="new Date()"
          :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
          placeholder="任意时间点"
        ></el-time-picker>
        <!-- </div>
        </div>-->
      </el-form-item>
      <el-form-item label="详细描述:" class="boxInput" :inline-message="true" label-width="81px">
        <el-input
          type="textarea"
          :show-word-limit="true"
          maxlength="150"
          :autosize="{ minRows: 1, maxRows: 2}"
          placeholder="请输入内容（150字范围内）"
          v-model="note"
          @change='changeDes'
          style="width:200px;"
        ></el-input>
        <el-select v-model="constNote" @change="changeDes" style="width:200px;" placeholder="请选择施工养护标签">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-row>
        <el-col :span="12">
          <el-form-item label="经度:" prop="longitude" label-width='81px' :inline-message="true">
            <el-input v-model="formValue.longitude" style="width:160px" clearable oninput = "value=value.replace(/[^\d.]/g,'')" @focus="inputLotLat" @blur="removePoint" required="true" minlength="6" maxlength="20" autocomplete="off" placeholder="请输入经度"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="纬度:" prop="latitude" label-width='81px' :inline-message="true">
            <el-input v-model="formValue.latitude" style="width:160px" clearable oninput = "value=value.replace(/[^\d.]/g,'')" @focus="inputLotLat" @blur="removePoint" required="true" minlength="6" maxlength="20"  autocomplete="off" placeholder="请输入纬度"></el-input>
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-row style="margin-bottom:7px;" class="lotLat">
        <el-col :span="12" style="padding-left:14px;">
          <el-form-item label="经纬度:" :inline-message="true">
            <el-input v-model="formValue.longitude" type="hidden" clearable oninput = "value=value.replace(/[^\d.]/g,'')" @focus="inputLotLat" @blur="removePoint" required="true" minlength="6" maxlength="20" autocomplete="off" placeholder="请输入经度"></el-input>
            <el-button type="primary" @click="inputLotLat" round>经纬度选取</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="latitude" :inline-message="true">
            <el-input v-model="formValue.latitude" type="hidden" clearable oninput = "value=value.replace(/[^\d.]/g,'')" @focus="inputLotLat" @blur="removePoint" required="true" minlength="6" maxlength="20" autocomplete="off" placeholder="请输入纬度"></el-input>
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
import MapManager from "@/components/map/MapManager.js"
import { Notification } from "element-ui"
import { formatTime } from "@/utils/format"
import {
  getConstructionType,
  addConstructionInfo,
  getOrganization,
  getTrafficPosition
} from "@/api/eventInput.js"
export default {
  props: {
    eventConShow: {
      type: Boolean,
      default: false
    },
    stakeNumInfo: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    stakeNumInfo (newvalue, oldvalue) {
      if (newvalue === undefined) return
      this.formValue.roadName = newvalue.code
      this.formValue.pile = newvalue.name
      this.formValue.longitude = parseFloat(newvalue.longitude).toFixed(6)
      this.formValue.latitude = parseFloat(newvalue.latitude).toFixed(6)
    },
    eventConShow (newvalue, oldvalue) {
      if (newvalue) {
        this.$refs.eventCon.resetFields()
        this.startTime = new Date()
        this.hours = new Date()
        this.formValue.startTime = new Date()
        this.formValue.hours = new Date()
      } else {
        this.$refs.eventCon.resetFields()
        this.removePoint()
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
      // 小修保养、中修、大修和改善
      options: [{
          value: '小修工程',
          label: '小修工程'
        }, {
          value: '中修工程',
          label: '中修工程'
        }, {
          value: '大修工程',
          label: '大修工程'
        }, {
          value: '改善工程',
          label: '改善工程'
        } ],
      constNote: [],
      note: null,
      pickerOptions: {
        disabledDate (value) {
          if (Date.now() <= value) {
            return true
          }
          return false
        }
      },
      rules: {
        roadName: [
          { required: true, message: "请输入事故位置", trigger: "change" }
        ],
        pile: [
          { required: true, message: "请输入事故位置", trigger: "blur" }
        ],
        distance: [
          { type: "number", message: "请输入事故位置", trigger: "blur" }
        ],
        constructionType: [
          { required: true, trigger: "change", message: "请选择类型" }
        ],
        constructionDes: [
          { required: true, trigger: "blur", message: "请输入详情描述" }
        ],
        startTime: [
          { required: true, trigger: "change", message: "请选择录入日期" }
        ],
        hours: [
          { required: true, trigger: "change", message: "请选择录入时间" }
        ],
        orgId: [
          { required: true, trigger: "change", message: "请选择组织机构" }
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
      startTime: "", // 养护事件日期
      hours: "", // 养护开始时间
      formValue: {
        roadName: "",// 道路名称
        pile: "", // 桩号
        distance: null, // 距离米数
        constructionDes: "", // 养护描述
        startTime: "", // 养护事件日期
        hours: "", // 养护开始时间
        constructionType: "", // 养护事件类型
        orgId: "", // 组织机构
        longitude: "", // 经度
        latitude: "" // 纬度
      },
      typeOptions: [],
      organizationOptions: [{name: "一大队"}],
      loading: false,
      roadOptions: []
    }
  },
  methods: {
    changeDes () {
      this.formValue.constructionDes = this.note + "," + this.constNote
    },
    removePoint () {
      MapManager.removeDraw("maintenance")
    },
    inputLotLat () {
      this.startDrawPoint("maintenance", this.setLnglat, [this.formValue.longitude, this.formValue.latitude])
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
    reset () {
      this.$refs.eventCon.resetFields()
    },
    // 点击关闭
    closeEventBox () {
      this.$emit("closeEventBox")
      this.$refs.eventCon.resetFields()
      this.removePoint()
    },
    commitInput () {
      // console.log(this.formValue.longitude,this.formValue.latitude)
      this.$refs.eventCon.validate(async valid => {
        if (valid) {
          this.loading = true
          this.formValue.startTime = formatTime("yyyy-MM-dd hh:mm:ss", "yyyy-MM-dd", this.startTime)
          if (this.hours) {
            this.formValue.hours = formatTime("yyyy-MM-dd hh:mm:ss", "hh:mm:ss", this.hours)
          }
          this.formValue.distance = this.formValue.distance + "m"
          await addConstructionInfo(this.formValue)
            .then(res => {
              if (res.result === "ok" && res.status === "200") {
                // 提交成功
                Notification.success({
                  title: "操作成功",
                  message: "施工养护录入成功",
                  duration: 2000,
                  offset: 100
                })
                this.loading = false
                this.$emit("closeEventBox")
              } else {
                Notification.error({
                  title: "操作失败",
                  message: "施工养护录入失败",
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
        } else {
          this.loading = false
          console.log("error submit!!")
          return false
        }
      })
    }
  },
  created () {
    // 施工养护类型数据请求
    getConstructionType()
      .then(res => {
        this.typeOptions = res
      })
      .catch(err => {
        console.log(err)
      })
    // 组织机构
    getOrganization()
      .then(res => {
        this.organizationOptions = res
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
.inputEventBox {
  /* height: 170px; */
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
  bottom: 19px;
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
  bottom: 19px;
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
