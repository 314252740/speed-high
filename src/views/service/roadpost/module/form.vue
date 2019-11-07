<template>
  <el-dialog :title="isAdd ? '新增路段岗位信息' : '修改路段岗位信息'" :closeOnClickModal="false" :visible.sync="visible" width="800px" label-width="80px" @open="changeHeight" @close="hide">
    <div class="container">

      <div class="mapCont" ref=dialogForm>
        <el-form ref="form" :model="dataForm" :rules="rules" size="small" label-position="right" label-width="100px" >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="岗位名称" prop="jobsName">
                <el-input clearable v-model="dataForm.jobsName" required="true" style="width:250px;" minlength="6" maxlength="200"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属部门" prop="orgId">
                <el-select clearable @change="getLeaders(dataForm.orgId)" v-model="dataForm.orgId" placeholder="请选择所属部门" style="width:250px;">
                   <el-option v-for="item in selectList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>

                <!--<el-select v-model="dataForm.orgId" placeholder="部门" style="width:250px;" required="true">
                  <el-option v-for="(item,index) in options" :label="item.name" :value="item.key" :key="index"></el-option>
                </el-select>-->
                <!--<el-input v-model="dataForm.orgId" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>-->
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="分管领导" prop="leardships">
                <el-select clearable v-model="dataForm.leardships" placeholder="请选择分管领导" style="width:250px;">
                   <el-option v-for="item in leaderList" :key="item.key" :label="item.name" :value="item.key"></el-option>
                </el-select>
                <!--<el-input v-model="dataForm.leardships" required="true" style="width:250px;" minlength="6" maxlength="20"  autocomplete="off" ></el-input>-->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="路段位置描述" prop="locationDescription">
                <el-input clearable v-model="dataForm.locationDescription" required="true" style="width:250px;" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="地图信息" prop="sectionMapInfo">
                <el-input clearable v-model="dataForm.sectionMapInfo" required="true" style="width:250px;" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="岗位值班时长" prop="dutyHours">
                <el-input clearable v-model="dataForm.dutyHours" required="true" style="width:250px;" minlength="6" maxlength="2000"  autocomplete="off" ></el-input>
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
import {doAdd, doUpdate} from "@/api/roadpost"
// import request from "@/utils/request"
import tileMap from "@/components/map/tileMap"// 初始化瓦片地图
import {getOrgid} from "@/api/depart"
import {getLeaders} from "@/api/policeuser"
export default {
  props: {
    // query: {
    //   type: Object,
    //   required: true
    // },
     
      // leaderList: {
      //  type: Array
      // }
  },
  components: {
    tileMap
  },
  computed: {
    ...mapGetters(["roadList"]),
    options () {
      return this.roadList
    }
  },
  data () {
    return {
      leaderList: [],
      status: "显示",
      type: "success",
      icon: "el-icon-view",
      // 道路信息 选择
      // options: [],
      selectList: [],
      loading: false,
      visible: false,
      isAdd: false,
      dataForm: {id: "", jobsName: "", orgId: "", leardships: "", locationDescription: "", sectionMapInfo: "", dutyTime: "", dutyHours: ""},
      rules: {
        jobsName: [
          { required: true, message: "请输入岗位名称", trigger: "blur" }
        ]
        ,
        orgId: [
          { required: true, message: "请选择所属部门", trigger: "change" }
        ]
        //,
        /*leardships: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { pattern: /^.{3,20}$/, message: "只能输入字符", trigger: "blur" }
        ]*/
      }

    }
  },
  methods: {
    getLeaders(orgId){
        getLeaders(orgId)
            .then(res => {
              this.leaderList = res
            })
            .catch(err => console.log(err))
        
    },
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
    },
    addStakeNumLayer () {
      this.$nextTick(() => {
        this.$refs.map.addLayer("stakeNum")
      })
    },
    rcod () {
      // 定义bar为roadCode值
      let bar = this.dataForm.roadCode
      // 定义数组
      var obj = {}
      // 查找想对应的name值
      obj = this.options.find(function (item) {
        return item.code === bar
      })
      this.dataForm.roadName = obj.name
    },
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
      // this.$nextTick(()=>{
      //   this.$refs.map.startDrawPoint("sensor", this.setLnglat, [this.dataForm.longitude, this.dataForm.latitude]);
      // })
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
      this.dataForm = {id: "", jobsName: "", orgId: "", leardships: "", locationDescription: "", sectionMapInfo: "", dutyTime: "", dutyHours: ""}
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
        // this.$refs.dialogMap.style.height = this.$refs.dialogForm.offsetHeight+"px"
        // 重新加载地图
        // this.$refs.map.resetMap()
        // this.$refs.map.addLayer("stakeNum")
        this.type = "success"
        this.status = "桩号显示中"
      })
    },
    hide () {
      // this.$refs.map.cleanLayer("stakeNum");
    }
  },
  created () {
    getOrgid()
      .then(res => {
        this.selectList = res
      })
      .catch(err => {
        console.log(err)
      })
  },
  mounted () {}
}

</script>
<style scoped>
.container{
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.mapCont{
  height: inherit;
  /* width: 50%;
  float: left; */
  position: relative;
}
.button{
  position: absolute;
  right: 6px;
  bottom: 6px;
}
</style>
