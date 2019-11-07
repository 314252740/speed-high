<template>
  <el-dialog :title="isAdd ? '新增复合屏信息' : '修改复合屏信息'" :closeOnClickModal="false" :visible.sync="visible" width="1200px" label-width="90px" @open="changeHeight" @close="hide">
    <div class="container">
      <div class="mapCont" ref="dialogMap">
        <tile-map  ref="map"></tile-map>
        <el-button :type="type" :icon="icon" circle class="button" @click.stop="trigger" :title="status"></el-button>
        <el-button :type="type2" :icon="icon" circle class="button2" @click.stop="trigger2" :title="status2"></el-button>
      </div>
      <div class="mapCont mapConts" ref=dialogForm>
        <el-form ref="form" :model="dataForm" :rules="rules" size="small" label-position="right" label-width="82px" >

          <el-row>
            <el-col :span="12">
              <el-form-item label="能见度IP" prop="visibleIp">
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
              <el-form-item label="路面状况IP" prop="roadIp" label-width="96px">
                <el-input clearable v-model="dataForm.roadIp" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="天气现象IP" prop="weatherIp" label-width="100px">
                <el-input clearable v-model="dataForm.weatherIp" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
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
              <el-form-item label="厂家" prop="manufacturer">
                <!-- <el-input v-model="dataForm.manufacturer" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input> -->
                <el-select clearable v-model="dataForm.manufacturer" placeholder="请选择厂家" style="width:100%">
                  <el-option
                    v-for="item in statusManufacturer"
                    :key="item.index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="尺寸" prop="size">
                <el-input clearable v-model="dataForm.size" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="传感器" prop="sensorId">
                <el-select clearable v-model="dataForm.sensorId" placeholder="请选择传感器" required="true" autocomplete="off">
                  <el-option
                    v-for="item in options"
                    :key="item.key"
                    :label="item.name"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-form-item>
           </el-col>
            <el-col :span="12">
              <!-- <el-form-item label="能见度">
                <el-select v-model="dataForm.visibility" placeholder="请选择能见度" required="true" autocomplete="off">
                  <el-option
                    v-for="item in visibility"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item> -->

              <el-form-item label="道路" prop="roadId">
                <el-select clearable v-model="dataForm.roadId" placeholder="请选择道路" required="true" autocomplete="off" style="width:100%" @change="selectRoadStart(dataForm.roadId)"><!--@change="rcod()"-->
                  <el-option
                    v-for="item in lists"
                    :key="item.index"
                    :label="item.name"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-form-item label="道路起点" prop="roadStart">
            <el-select clearable v-model="dataForm.roadStart" placeholder="请选择道路起点" required="true" autocomplete="off">
              <el-option
                v-for="item in options1"
                :key="item.index"
                :label="item.name"
                :value="item.key">
              </el-option>
            </el-select>
            </el-form-item>
          </el-row>

          <el-row>
            <el-col>
              <el-form-item label="备注" prop="note">
                <el-input clearable v-model="dataForm.note" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="关联摄像机" prop="cameraIds" label-width="97px">
            <el-input clearable v-model="dataForm.cameraIps" type="textarea" :disabled="true" autocomplete="off" ></el-input>
          </el-form-item>

          <!--不可删除-->
          <el-form-item label="关联摄像机标记" style="display:none" prop="sign">
              <el-input v-model="dataForm.sign" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
          </el-form-item>

          <el-row>
            <el-col :span="12">
              <el-form-item label="工作方式" prop="workWay">
                <el-radio v-model="dataForm.workWay" :label="0">自动</el-radio>
                <el-radio v-model="dataForm.workWay" :label="1">手动</el-radio>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="网络状态" prop="networkStatus">
                <el-radio v-model="dataForm.networkStatus" :label="0" >正常</el-radio>
                <el-radio v-model="dataForm.networkStatus" :label="1">不正常</el-radio>
              </el-form-item>
            </el-col> -->
          </el-row>
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
import {doAdd, doUpdate} from "@/api/composite"
import request from "@/utils/request"
import { mapGetters } from "vuex"
import getters from "../../../../store/getters"
import tileMap from "@/components/map/tileMap";// 初始化瓦片地图
import {selectRoadStart} from "@/api/road"
export default {
  components: {
    tileMap
  },
  computed: {
    ...mapGetters(["areaList"]),
    lists () {
      return this.areaList
    }
  },
  data () {
    return {
      // 厂家
      options1: [],
      statusManufacturer:[{
        value:'0',
        label: '励研'
      },{
        value:'1',
        label: '视展'
      }],
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
      //传感器信息 选择
      options: [],
      // lists: [],
      loading: false,
      visible: false,
      isAdd: false,
      dataForm: {id: "", visibleIp: "", weatherIp: "", roadIp: "", name: "", roadName: "", roadCode: "", longitude: "", latitude: "", workWay: 0, sensorId: "", manufacturer: "", 
      note: "", groupNumber: "",size: "",roadId: "",cameraIps:""},
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个文字", trigger: "blur" }
        ],
        ip: [
          { required: true, message: "请输入编码", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" },
          { pattern:  /^.{3,20}$/, message: "只能输入字符", trigger: "blur" }
        ],
        longitude:[
          {validator:(rule,value,callback)=>{
            if(value != ""){
              if((/^(\+|-)?(([1-9]?[0-9]|1[0-7][0-9])(\.[0-9]+)?|180)$/).test(value) == false){
                callback(new Error("-180 < 经度 <180"));
              }else{
                callback();
              }
            }else{
              callback();
            }
          },
            trigger:'blur'
          }
        ],
        latitude:[
          {validator:(rule,value,callback)=>{
            if(value != ""){
              if((/^-?((0|[1-8]?[0-9]?)(([.][0-9]{1,9})?)|90(([.][0]{1,9})?))$/).test(value) == false){
                callback(new Error("-90 < 纬度 <90"));
              }else{
                callback();
              }
            }else{
              callback();
            }
          },
            trigger:'blur'
          }
        ],
      }
      
    }
   
  },
  methods: {
    trigger() {
      if (this.type === "danger") {
        this.type = "success"
        this.status = "桩号显示中"
        this.$refs.map.showLayer("stakeNum",true)
        this.$refs.map.showLayer("camera",true)
      } else {
        this.type = "danger"
        this.status = "桩号隐藏中"
        this.$refs.map.showLayer("stakeNum",false)
        this.$refs.map.showLayer("camera",false)
      }
      // 启用绘制点
      this.startDraw()
    },
    trigger2() {
      if (this.type2 === "danger") {
        this.type2 = "success"
        this.status2 = "摄像机显示中"
        this.$refs.map.showLayer("camera",true)
      } else {
        this.type2 = "danger"
        this.status2 = "摄像机隐藏中"
        this.$refs.map.showLayer("camera",false)
      }
      // 绘制选择摄像机
      let that = this;
      this.$refs.map.startDrawWithSelCamera(function(cameras){
        // 框选的摄像机信息列表
        let cameraIds = [], cameraIps = [];
        cameras.forEach(item => {
          cameraIds.push(item.id);
          cameraIps.push(item.ip);
        });
        that.dataForm.sign = "关联摄像机标记";
        that.dataForm.cameraIds = cameraIds.join(",");
        that.dataForm.cameraIps = cameraIps.join(" ");
      });
    },
    addStakeNumLayer(){
      this.$nextTick(()=>{
        this.$refs.map.addLayer("stakeNum");
      })
    },
    selectRoadStart(roadId){
      selectRoadStart(roadId)
          .then(res => {
            this.options1 = res
          })
          .catch(err => console.log(err))
    },
    /*rcod() {
      //定义bar为roadCode值
      let bar = this.dataForm.roadCode
      //定义baf为roadId值
      let baf = this.dataForm.roadId
      //定义数组
      var obj = {};
      var obp = {};
      //查找想对应的name值
      obj = this.lists.find(function(item){ 
      return item.code === bar
    });
     //查找想对应的id值
     obp = this.lists.find(function(item){ 
      return item.id === bar
    });
      this.dataForm.roadName = obj.name
       this.dataForm.roadId = obj.id
    },*/
    startDraw() {
      let that = this
      request({
            // url: "module/sensorinfos",
            url: "module/getSensorInfoList",
            method: "get",
            params: {
            }
          }).then(res=>{
            that.options = res
          });
  
      // request({
      //       url: "module/roadinfos",
      //       method: "get",
      //       params: {
      //       }
      //     }).then(res=>{
      //       that.lists = res.data.result
      //     });
      this.$nextTick(()=>{
        this.$refs.map.startDrawPoint("screenComposite", this.setLnglat, [this.dataForm.longitude, this.dataForm.latitude]);
      })
    },
    setLnglat(point) {
      this.dataForm.longitude = point[0];
      this.dataForm.latitude = point[1];
    },
    cancel: function () {
      this.resetForm()
    },
    resetForm () {
      this.visible = false
      this.$refs["form"].resetFields()
      this.dataForm = {id: "", visibleIp: "", weatherIp: "", roadIp: "", name: "", roadName: "", roadCode: "", longitude: "", latitude: "", workWay: 0, 
      model: "", manufacturer: "", temperature: "", visualState: "",roadId: "",cameraIds:"",sign:"",directionStart: "", //开始方向
        directionEnd: ""}
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
    changeHeight() {
      this.$nextTick(()=>{
        this.$refs.dialogMap.style.height = this.$refs.dialogForm.offsetHeight+"px"
        // 重新加载地图
        this.$refs.map.resetMap();
        this.$refs.map.addLayer("stakeNum");
        this.$refs.map.addLayer("camera");
        this.type = "success"
        this.status = "桩号显示中"
        this.type2 = "danger"
        this.status2 = "摄像机隐藏中"

        if(null != this.dataForm.roadId && "" != this.dataForm.roadId){
          selectRoadStart(this.dataForm.roadId)
              .then(res => {
                this.options1 = res
                if(null != this.dataForm.direction && res.length == 2){
                  this.dataForm.roadStart = res[this.dataForm.direction].name
                }
              })
              .catch(err => console.log(err))
        }
      })
    },
    hide() {
      this.$refs.map.cleanLayer("stakeNum");
      this.$refs.map.cleanLayer("camera");
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
