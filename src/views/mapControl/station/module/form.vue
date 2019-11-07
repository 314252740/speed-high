<template>
  <el-dialog :title="isAdd ? '新增收费站信息' : '修改收费站信息'" :closeOnClickModal="false" :visible.sync="visible" width="1200px" label-width="80px" top="30px"  @close="hide" @open="changeHeight">
    <div class="container">
      <div class="mapCont" ref="dialogMap">
        <tile-map  ref="map"></tile-map>
        <el-button :type="type" :icon="icon" circle class="button" @click.stop="trigger" :title="status"></el-button>
      </div>
      <div class="mapCont mapConts" ref=dialogForm>
        <el-form ref="form" :model="dataForm" :rules="rules" size="small" label-position="right" label-width="100px" >
          <el-row>
            <el-col>
              <el-form-item label="名称" prop="name" :inline="true">
                  <el-input clearable v-model="dataForm.name" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="桩号信息" prop="pileInfo" :inline="true">
                  <el-input clearable v-model="dataForm.pileInfo" placeholder="请填写填写具体的桩号和米数" autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
            <!--<el-col :span="12">
              <el-form-item label="桩号ID" prop="pileId">
                <el-input v-model="dataForm.pileId" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>-->

            <el-col>
            <el-form-item label="道路" prop="roadId">
            <el-select clearable v-model="dataForm.roadId" placeholder="请选择道路" required="true" autocomplete="off" style="width:100%"><!--@change="rcod()"-->
              <el-option
                v-for="item in options"
                :key="item.key"
                :label="item.name"
                :value="item.key">
              </el-option>
            </el-select>
            </el-form-item>
            </el-col>
            <!--<el-col style="display:none">
              <el-form-item label="道路id" prop="roadId">
                <el-input v-model="dataForm.roadId" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>-->
          </el-row>

          <el-row>
            <el-col>
              <el-form-item label="经度" prop="longitude">
                <el-input clearable v-model="dataForm.longitude" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="纬度" prop="latitude">
                <el-input clearable v-model="dataForm.latitude" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        <el-row>
            <!--<el-col :span="12">
              <el-form-item label="道路编号" prop="roadCode">
                <el-input v-model="dataForm.roadCode" required="true" minlength="6" maxlength="20"  autocomplete="off" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-select style="width:50%" v-model="dataForm.roadCode" placeholder="请选择道路" required="true" autocomplete="off" @change="rcod()">
              <el-option
                v-for="item in options"
                :key="item.index"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>

            <el-col :span="12" style="display:none">
              <el-form-item label="道路名称" prop="roadId">
                <el-input v-model="dataForm.roadId" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>-->
          </el-row>

          <el-form-item label="收费站状态" prop="status" label-width="100px">
            <!-- <el-input v-model="dataForm.status" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input> -->
            <el-select clearable v-model="dataForm.status" placeholder="请选择收费站状态" style="width:100%">
              <el-option
                v-for="item in statusOptions"
                :key="item.index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="分流能力" prop="canRound">
            <el-select clearable v-model="dataForm.canRound" placeholder="请选择分流能力" style="width:100%">
              <el-option
                v-for="item in canRoundOptions"
                :key="item.index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
import {doAdd, doUpdate} from "@/api/station"
// import request from "@/utils/request"
import tileMap from "@/components/map/tileMap";// 初始化瓦片地图
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
      // 收费站状态
      statusOptions:[{
        value:'0',
        label: '封闭'
      },{
        value:'1',
        label: '正常'
      }],
       //分流能力
      canRoundOptions:[
        {
          value:0,
          label:"无分流能力"
        },
        {
          value:1,
          label:"一级分流能力"
        },
        {
          value:2,
          label:"二级分流能力"
        },
        {
          value:3,
          label:"三级分流能力"
        }
      ],
      status: "显示",
      type: "success",
      icon: "el-icon-view",
      //道路信息 选择
      // options: [],
      loading: false,
      visible: false,
      isAdd: false,
      dataForm: {id: "", name: "",roadName: "",pileInfo:"", roadCode: "", longitude: "", latitude: "", status: "", pileId: "",canRound:"", roadId: ""},
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个文字", trigger: "blur" }
        ],
        pileId: [
          { required: true, message: "请输入编码", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        canRound:[
          { required: true, message: "请选择分流能力", trigger: "change" },
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
      } else {
        this.type = "danger"
        this.status = "桩号隐藏中"
        this.$refs.map.showLayer("stakeNum",false)
      }
    },
    hide() {
      this.$refs.map.cleanLayer("stakeNum");
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
      obj = this.options.find(function(item){ 
      return item.code === bar
    });
     //查找想对应的id值
     obp = this.options.find(function(item){ 
      return item.id === bar
    });
      this.dataForm.roadName = obj.name
       this.dataForm.roadId = obj.id
    },*/
    startDraw() {
      // let that = this
      // request({
      //       url: "module/roadinfos",
      //       method: "get",
      //       params: {
      //       }
      //     }).then(res=>{
      //       that.options = res.data.result
      //     });
      this.$nextTick(()=>{
        this.$refs.map.startDrawPoint("tollStation", this.setLnglat, [this.dataForm.longitude, this.dataForm.latitude]);
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
      this.dataForm = {id: "", name: "", roadName: "",pileInfo:"", roadCode: "", longitude: "", latitude: "", status: "", pileId: "",canRound:"", roadId: ""}
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
        this.status = "桩号显示中"
        this.type = "success"
      })
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
  width: 70%;
  float: left;
  position: relative;
}
.mapConts{
  width: 30%;
}
.button{
  position: absolute;
  right: 6px;
  bottom: 6px;
}
</style>