<template>
  <el-dialog :title="isAdd ? '新增传感器信息' : '修改传感器信息'" :closeOnClickModal="false" :visible.sync="visible" width="1200px" label-width="80px" @open="changeHeight" @close="hide">
    <div class="container">
      <div class="mapCont" ref="dialogMap">
        <tile-map  ref="map"></tile-map>
        <el-button :type="type" :icon="icon" circle class="button" @click.stop="trigger" :title="status"></el-button>
        <el-button :type="type2" :icon="icon" circle class="button2" @click.stop="trigger2" :title="status2"></el-button>
      </div>
      <div class="mapCont mapConts" ref=dialogForm>
        <el-form ref="form" :model="dataForm" :rules="rules" size="small" label-position="right" label-width="70px" >
          <el-row>
            <el-col :span="12">
              <el-form-item label="ip" prop="ip">
                <el-input clearable v-model="dataForm.ip" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="名称" prop="name">
                <el-input clearable v-model="dataForm.name" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="经度" prop="longitude">
                <el-input clearable v-model="dataForm.longitude" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="纬度" prop="latitude">
                <el-input clearable v-model="dataForm.latitude" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="型号" prop="model">
                <el-input clearable v-model="dataForm.model" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="厂家" prop="manufacturer">
                <el-input clearable v-model="dataForm.manufacturer" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- <el-row>
            <el-col :span="12">
              <el-form-item label="温度" prop="temperature">
                <el-input v-model="dataForm.temperature" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="能见度">
                <el-select v-model="dataForm.visibility" placeholder="请选择能见度" required="true" autocomplete="off">
                  <el-option
                    v-for="item in visibility"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row> -->

          <el-row>
            <el-form-item label="道路" prop="roadId">
            <el-select style="width:50%" clearable v-model="dataForm.roadId" placeholder="请选择道路" required="true" autocomplete="off" ><!--@change="rcod()"-->
              <el-option
                v-for="item in options"
                :key="item.index"
                :label="item.name"
                :value="item.key">
              </el-option>
            </el-select>
            </el-form-item>
            <el-col :span="12" style="display:none">
              <el-form-item label="道路编号" prop="roadCode" label-width="97px">
                <el-input clearable v-model="dataForm.roadCode" required="true" minlength="6" maxlength="20"  autocomplete="off" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <!--<el-col :span="12" style="display:none">
              <el-form-item label="道路名称" prop="roadId">
                <el-input v-model="dataForm.roadId" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>-->
          </el-row>

          <el-row>
            <el-col>
              <el-form-item label="工作方式" prop="workWay" label-width="97px">
                <el-radio v-model="dataForm.workWay" :label="0">自动</el-radio>
                <el-radio v-model="dataForm.workWay" :label="1">手动</el-radio>
              </el-form-item>
            </el-col>
            <!-- <el-col>
              <el-form-item label="网络状态" prop="networkStatus" label-width="97px">
                <el-radio v-model="dataForm.networkStatus" :label="0" >正常</el-radio>
                <el-radio v-model="dataForm.networkStatus" :label="1">不正常</el-radio>
              </el-form-item>
            </el-col> -->
          </el-row>

          <!-- <el-row>
            <el-col :span="12">
              <el-form-item label="路面状况" style="margin-left:0px;">
                <el-select v-model="dataForm.roadCond" placeholder="请选择路面状况" required="true" autocomplete="off">
                  <el-option
                    v-for="item in roadCond"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="天气状况">
                <el-select v-model="dataForm.weatherCond" placeholder="请选择天气现象" required="true" autocomplete="off" >
                  <el-option
                    v-for="item in weatherCond"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row> -->

          <!-- <el-form-item label="视程状态" prop="visualState" label-width="97px">
            <el-input v-model="dataForm.visualState" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
          </el-form-item> -->

          <el-form-item label="关联摄像机" prop="cameraIps" label-width="97px">
            <el-input v-model="dataForm.cameraIps" type="textarea" :disabled="true" autocomplete="off" ></el-input>
          </el-form-item>

          <!--不可删除-->
          <el-form-item label="关联摄像机标记" style="display:none" prop="sign">
              <el-input v-model="dataForm.sign" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
          </el-form-item>

        </el-form>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="doSubmit">确 定</el-button>
      <el-button @click="cancel()">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
/* eslint-disable */
import { mapGetters } from "vuex"
import {doAdd, doUpdate} from "@/api/sensor"
// import request from "@/utils/request"
import tileMap from "@/components/map/tileMap"// 初始化瓦片地图
export default {
  components: {
    tileMap
  },
  computed: {
    ...mapGetters(["areaList"]),
    options () {
      return this.areaList
    }
  },
  data () {
    return {
      // 能见度
      // visibility: [
      //   {value: "0", label: "全黑"},
      //   {value: "1", label: "良好"},
      //   {value: "2", label: "一般"},
      //   {value: "3", label: "较差"},
      //   {value: "4", label: "极差"}
      // ],
      // roadCond: [
      //   {value: "0", label: "全黑"},
      //   {value: "1", label: "良好"},
      //   {value: "2", label: "湿滑"},
      //   {value: "3", label: "积水"},
      //   {value: "4", label: "结冰"}
      // ],
      // 天气现象
      // weatherCond: [
      //   {value: "0", label: "全黑"},
      //   {value: "1", label: "良好"},
      //   {value: "2", label: "降雨"},
      //   {value: "3", label: "暴雨"},
      //   {value: "4", label: "降雪"},
      //   {value: "5", label: "雾霾"}
      // ],
      status: "显示",
      type: "success",
      status2: "显示",
      type2: "danger",
      icon: "el-icon-view",
      // 道路信息 选择
      // options: [],
      loading: false,
      visible: false,
      isAdd: false,
      dataForm: {id: "",
        ip: "",
        name: "",
        roadName: "",
        roadCode: "",
        longitude: "",
        latitude: "",
        workWay: 0,
        // networkStatus: "",
        model: "",
        manufacturer: "",
        // temperature: "",
        // roadCond: "",
        // visibility: "",
        // weatherCond: "",
        // visualState: "",
        roadId: "",
        cameraIds: ""},
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个文字", trigger: "blur" }
        ],
        ip: [
          { required: true, message: "请输入编码", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" },
          { pattern: /^.{3,20}$/, message: "只能输入字符", trigger: "blur" }
        ],
        longitude: [
          {validator: (rule, value, callback) => {
            if (value != "") {
              if ((/^(\+|-)?(([1-9]?[0-9]|1[0-7][0-9])(\.[0-9]+)?|180)$/).test(value) == false) {
                callback(new Error("-180 < 经度 <180"))
              } else {
                callback()
              }
            } else {
              callback()
            }
          },
          trigger: "blur"
          }
        ],
        latitude: [
          {validator: (rule, value, callback) => {
            if (value != "") {
              if ((/^-?((0|[1-8]?[0-9]?)(([.][0-9]{1,9})?)|90(([.][0]{1,9})?))$/).test(value) == false) {
                callback(new Error("-90 < 纬度 <90"))
              } else {
                callback()
              }
            } else {
              callback()
            }
          },
          trigger: "blur"
          }
        ]
      }

    }
  },
  methods: {
    trigger () {
      if (this.type === "danger") {
        this.type = "success"
        this.status = "桩号显示中"
        this.$refs.map.showLayer("stakeNum", true)
      } else {
        this.type = "danger"
        this.status = "桩号隐藏中"
        this.$refs.map.showLayer("stakeNum", false)
      }
      // 启用绘制点
      this.startDraw()
    },
    trigger2 () {
      if (this.type2 === "danger") {
        this.type2 = "success"
        this.status2 = "摄像机显示中"
        this.$refs.map.showLayer("camera", true)
      } else {
        this.type2 = "danger"
        this.status2 = "摄像机隐藏中"
        this.$refs.map.showLayer("camera", false)
      }
      // 绘制选择摄像机
      let that = this
      this.$refs.map.startDrawWithSelCamera(function (cameras) {
        // 框选的摄像机信息列表
        let cameraIds = [], cameraIps = []
        cameras.forEach(item => {
          cameraIds.push(item.id)
          cameraIps.push(item.ip)
        })
        that.dataForm.sign = "关联摄像机标记"
        that.dataForm.cameraIds = cameraIds.join(",")
        that.dataForm.cameraIps = cameraIps.join(" ")
      })
    },
    addStakeNumLayer () {
      this.$nextTick(() => {
        this.$refs.map.addLayer("stakeNum")
      })
    },
    /*rcod () {
      // 定义bar为roadCode值
      let bar = this.dataForm.roadCode
      // 定义baf为roadId值
      let baf = this.dataForm.roadId
      // 定义数组
      var obj = {}
      var obp = {}
      // 查找想对应的name值
      obj = this.options.find(function (item) {
        return item.code === bar
      })
      // 查找想对应的id值
      obp = this.options.find(function (item) {
        return item.id === bar
      })
      this.dataForm.roadName = obj.name
      this.dataForm.roadId = obj.id
    },*/
    startDraw () {
      // let that = this
      // request({
      //   url: "module/roadinfos",
      //   method: "get",
      //   params: {
      //   }
      // }).then(res => {
      //   that.options = res.data.result
      // })
      this.$nextTick(() => {
        this.$refs.map.startDrawPoint("sensor", this.setLnglat, [this.dataForm.longitude, this.dataForm.latitude])
      })
    },
    setLnglat (point) {
      this.dataForm.longitude = point[0]
      this.dataForm.latitude = point[1]
    },
    cancel: function () {
      this.resetForm()
    },
    resetForm () {
      this.visible = false
      this.$refs["form"].resetFields()
      this.dataForm = {id: "",
        ip: "",
        name: "",
        roadName: "",
        roadCode: "",
        longitude: "",
        latitude: "",
        workWay: 0,
        // networkStatus: "",
        model: "",
        manufacturer: "",
        // temperature: "",
        // roadCond: "",
        // visibility: "",
        // weatherCond: "",
        // visualState: "",
        roadId: "",
        cameraIds: "",
        sign: ""}
    },
    doSubmit () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            doAdd(this.dataForm).then(res => {
              if (res.result === "ok") {
                this.resetForm()
                this.$message({
                  message: "添加成功",
                  type: "success"
                })
              } else {
                this.$message({
                  message: "添加失败",
                  type: "error"
                })
              }
              this.loading = false
              this.$parent.page = 0
              this.$parent.dialogFormVisible = false
              this.$parent.init()
            }).catch(err => {
              console.log("error:" + err)
              console.log(err)
            })
          } else {
            this.doEdit()
          }
        }
      })
    },
    doEdit () {
      if (!this.isAdd) {
        doUpdate(this.dataForm).then(res => {
          this.resetForm()
          this.$message({
            message: "修改成功",
            type: "success"
          })
          this.loading = false
          this.$parent.dialogFormVisible = false
          this.$parent.init()
        }).catch(err => {
          console.log("error:" + err)
          console.log(err)
        })
      }
    },
    // 自适应高度
    changeHeight () {
      this.$nextTick(() => {
        this.$refs.dialogMap.style.height = this.$refs.dialogForm.offsetHeight + "px"
        // 重新加载地图
        this.$refs.map.resetMap()
        this.$refs.map.addLayer("stakeNum")
        this.$refs.map.addLayer("camera")
        this.type = "success"
        this.status = "桩号显示中"
        this.type2 = "danger"
        this.status2 = "摄像机隐藏中"
      })
    },
    hide () {
      this.$refs.map.cleanLayer("stakeNum")
      this.$refs.map.cleanLayer("camera")
    }
  }
}
</script>
<style scoped>
.container{
  height: 500px;
  width: 100%;
  overflow: hidden;
}
.mapCont{
  height: inherit;
  width: 60%;
  float: left;
  position: relative;
}
.mapConts{
  width: 40%;
}
.button{
  position: absolute;
  right: 6px;
  bottom: 6px;
}
.button2{
  position: absolute;
  right: 6px;
  bottom: 40px;
}
</style>
