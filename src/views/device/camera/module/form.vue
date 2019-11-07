<template>
  <el-dialog
    :title="isAdd ? '新增摄像机信息' : '修改摄像机信息'"
    :visible.sync="visible"
    :closeOnClickModal="false"
    width="1200px"
    label-width="80px"
    @open="changeHeight"
    @close="hide"
  >
    <div class="container">
      <div class="mapCont" ref="dialogMap">
        <tile-map ref="map"></tile-map>
        <el-button :type="type" :icon="icon" circle class="button" @click.stop="trigger" :title="status"></el-button>
      </div>
      <div class="mapCont" ref="dialogForm">
        <el-form
          ref="form"
          :model="dataForm"
          :rules="rules"
          size="small"
          label-position="right"
          label-width="70px"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="ip" prop="ip">
                <el-input
                  clearable
                  v-model="dataForm.ip"
                  required="true"
                  minlength="6"
                  maxlength="20"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="名称" prop="name">
                <el-input
                  clearable
                  v-model="dataForm.name"
                  required="true"
                  minlength="6"
                  maxlength="20"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="经度" prop="longitude">
                <el-input
                  clearable
                  v-model="dataForm.longitude"
                  required="true"
                  minlength="6"
                  maxlength="20"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="纬度" prop="latitude">
                <el-input
                  clearable
                  v-model="dataForm.latitude"
                  required="true"
                  minlength="6"
                  maxlength="20"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="厂家" prop="manufacturer">
                <el-input
                  clearable
                  v-model="dataForm.manufacturer"
                  required="true"
                  minlength="6"
                  maxlength="20"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="型号" prop="model">
                <el-input
                  clearable
                  v-model="dataForm.model"
                  required="true"
                  minlength="6"
                  maxlength="20"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="端口" prop="port">
                <el-input
                  clearable
                  v-model="dataForm.port"
                  required="true"
                  minlength="6"
                  maxlength="20"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="分辨率" prop="resolution">
                <el-input
                  clearable
                  v-model="dataForm.resolution"
                  required="true"
                  minlength="6"
                  maxlength="20"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="用户名" prop="userName" label-width="78px">
                <el-input
                  clearable
                  v-model="dataForm.userName"
                  required="true"
                  minlength="6"
                  maxlength="20"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="密码" prop="password">
                <el-input
                  clearable
                  v-model="dataForm.password"
                  required="true"
                  minlength="6"
                  maxlength="20"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="道路编号" prop="roadCode" label-width="90px">
                <el-input
                  clearable
                  v-model="dataForm.roadCode"
                  required="true"
                  minlength="6"
                  maxlength="20"
                  autocomplete="off"
                  disabled="disabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-select
            style="width:50%"
              clearable
              v-model="dataForm.roadCode"
              placeholder="请选择道路"
              required="true"
              autocomplete="off"
              @change="rcod()"
            >
              <el-option
                v-for="item in options"
                :key="item.index"
                :label="item.name"
                :value="item.key"
              ></el-option>
            </el-select>

            <el-col :span="12" style="display:none">
              <el-form-item label="道路名称" prop="roadId">
                <el-input
                  clearable
                  v-model="dataForm.roadId"
                  required="true"
                  minlength="6"
                  maxlength="20"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="流媒体ID" prop="mediaIp" label-width="90px">
                <el-input
                  clearable
                  v-model="dataForm.mediaIp"
                  required="true"
                  minlength="6"
                  maxlength="20"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注" prop="note">
                <el-input
                  clearable
                  v-model="dataForm.note"
                  required="true"
                  minlength="6"
                  maxlength="256"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <el-form-item label="视频流播放地址" prop="rtmp" label-width="130px">
                <el-input
                  clearable
                  v-model="dataForm.rtmp"
                  required="true"
                  minlength="6"
                  maxlength="128"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

           <el-row>
            <el-col :span="12">
              <el-form-item label="工作方式" prop="workWay" label-width="90px">
                <el-radio v-model="dataForm.workWay" :label="0">自动</el-radio>
                <el-radio v-model="dataForm.workWay" :label="1">手动</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="网络状态" prop="networkStatus">
                <el-radio v-model="dataForm.networkStatus" :label="0">正常</el-radio>
                <el-radio v-model="dataForm.networkStatus" :label="1">不正常</el-radio>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="桩号信息" prop="pileInfo" label-width="90px">
                <el-input v-model="dataForm.pileInfo" required="true" minlength="6" maxlength="20" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="道路方向" prop="direction">
                <el-radio v-model="dataForm.direction" :label="0">上行</el-radio>
                <el-radio v-model="dataForm.direction" :label="1">下行</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="摄像机编码" prop="cloud" label-width="90px">
                <el-input
                  clearable
                  v-model="dataForm.cloud"
                  required="true"
                  minlength="6"
                  maxlength="20"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="摄像机类型" label-width="85px" prop="type">
                <el-input
                  clearable
                  v-model="dataForm.type"
                  required="true"
                  minlength="6"
                  maxlength="256"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
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
import { mapGetters } from "vuex"
import { doAdd, doUpdate } from "@/api/camera";
// import request from "@/utils/request";
import tileMap from "@/components/map/tileMap"; // 初始化瓦片地图
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
  data() {
    return {
      //道路信息 选择
      status: "显示",
      type: "success",
      icon: "el-icon-view",
      // options: [],
      loading: false,
      visible: false,
      isAdd: false,
      dataForm: {
        id: "",
        ip: "",
        name: "",
        roadName: "",
        roadCode: "",
        longitude: "",
        latitude: "",
        workWay: "",
        networkStatus: "",
        model: "",
        manufacturer: "",
        userName: "",
        visibility: "",
        password: "",
        mediaIp: "",
        note: "",
        resolution: "",
        port: "",
        rtmp: "",
        roadId: "",
        direction:"",
        cloud: "",
        type: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个文字", trigger: "blur" }
        ],
        ip: [
          { required: true, message: "请输入编码", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur"
          },
          { pattern: /^.{3,20}$/, message: "只能输入字符", trigger: "blur" }
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
    };
  },
  methods: {
    trigger() {
      if (this.type === "danger") {
        this.type = "success"
        this.status = "桩号显示中"
        this.$refs.map.showLayer("stakeNum",true)
      } else {
        this.type = "danger"
        this.status = "桩号隐藏中"
        this.$refs.map.showLayer("stakeNum",false)
      }
    },
    rcod() {
      //定义bar为roadCode值
      let bar = this.dataForm.roadCode
      //定义baf为roadId值
      let baf = this.dataForm.roadId
      //定义数组
      // var obj = {};
      var obp = {};
      //查找想对应的name值
      //   obj = this.options.find(function(item){ 
      //   return item.code === bar
      // });
      //查找想对应的id值
      obp = this.options.find(function(item){ 
        return item.key === bar
      });
      this.dataForm.roadName = obp.name
      this.dataForm.roadId = obp.key
    },
    startDraw() {
      // let that = this;
      // request({
      //   url: "module/roadinfos",
      //   method: "get",
      //   params: {}
      // }).then(res => {
      //   that.options = res.data.result;
      // });
      this.$nextTick(() => {
        this.$refs.map.startDrawPoint("camera", this.setLnglat, [
          this.dataForm.longitude,
          this.dataForm.latitude
        ]);
      });
    },
    addStakeNumLayer(){
      this.$nextTick(()=>{
        this.$refs.map.addLayer("stakeNum");
      })
    },
    setLnglat(point) {
      this.dataForm.longitude = point[0];
      this.dataForm.latitude = point[1];
    },
    cancel: function() {
      this.resetForm();
    },
    resetForm() {
      this.visible = false;
      this.$refs["form"].resetFields();
      this.dataForm = {
        id: "",
        ip: "",
        name: "",
        roadName: "",
        roadCode: "",
        longitude: "",
        latitude: "",
        workWay: "",
        networkStatus: "",
        model: "",
        manufacturer: "",
        userName: "",
        password: "",
        mediaIp: "",
        note: "",
        resolution: "",
        port: "",
        rtmp: "",
        roadId: "",
        direction:"",
        cloud: "",
        type: ""
      };
    },
    doSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.isAdd) {
            doAdd(this.dataForm)
              .then(res => {
                if (res.result === "ok") {
                  this.resetForm();
                  this.$message({
                    message: "添加成功",
                    type: "success"
                  });
                } else {
                  this.$message({
                    message: "添加失败",
                    type: "error"
                  });
                }
                this.loading = false;
                this.$parent.page = 0;
                this.$parent.dialogFormVisible = false;
                this.$parent.init();
              })
              .catch(err => {
                console.log("error:" + err);
                console.log(err);
              });
          } else {
            this.doEdit();
          }
        }
      });
    },
    doEdit() {
      if (!this.isAdd) {
        doUpdate(this.dataForm)
          .then(res => {
            this.resetForm();
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.loading = false;
            this.$parent.dialogFormVisible = false;
            this.$parent.init();
          })
          .catch(err => {
            console.log("error:" + err);
            console.log(err);
          });
      }
    },
    // 自适应高度
    changeHeight() {
      this.$nextTick(() => {
        this.$refs.dialogMap.style.height =
          this.$refs.dialogForm.offsetHeight + "px";
        // 重新加载地图
        this.$refs.map.resetMap();
        this.$refs.map.addLayer("stakeNum");
        this.type = "success"
        this.status = "桩号显示中"
      });
    },
    hide() {
      this.$refs.map.cleanLayer("stakeNum");
    }
  }
};
</script>
<style scoped>
.container {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.mapCont {
  height: inherit;
  width: 50%;
  float: left;
  position: relative;
}
.button{
  position: absolute;
  right: 6px;
  bottom: 6px;
}
</style>

