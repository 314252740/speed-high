<template>
  <el-dialog :title="isAdd ? '新增模板' : '修改排班信息'" :visible.sync="visible" width="800px" label-width="80px">
    <div class="container">

      <div class="mapCont" ref=dialogForm>
        <el-form ref="form" :model="dataForm" :rules="rules" size="small" label-position="right" label-width="70px" >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="ip" prop="ip">
                <el-input v-model="dataForm.ip" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出勤时间" prop="dutyTime">
                <el-input v-model="dataForm.dutyTime" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="大队领导" prop="dutyLeader" label-width="80px">
                <el-input v-model="dataForm.dutyLeader" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="大队值班领导" prop="orgId" label-width="96px">
                <el-input v-model="dataForm.orgId" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="主班中队id" prop="mainSquadronId" label-width="82px">
                <el-input v-model="dataForm.mainSquadronId" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="副班中队id" prop="viceSquadronId" label-width="82px">
                <el-input v-model="dataForm.viceSquadronId" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="事故中队" prop="accidentSquadronId">
                <el-input v-model="dataForm.accidentSquadronId" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="机动中队" prop="motorSquadronId">
                <el-input v-model="dataForm.note" required="true" minlength="6" maxlength="2000"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="大队长" prop="battalionChief" label-width="70px">
                <el-input v-model="dataForm.battalionChief" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="路段岗位id" prop="roadPostId" label-width="82px">
                <el-input v-model="dataForm.roadPostId" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
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
import {doAdd, doUpdate} from "@/api/schedule"
// import request from "@/utils/request"
import tileMap from "@/components/map/tileMap"// 初始化瓦片地图
export default {
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
      status: "显示",
      type: "success",
      icon: "el-icon-view",
      // 道路信息 选择
      // options: [],
      loading: false,
      visible: false,
      isAdd: false,
      dataForm: {id: "",
        dutyTime: "",
        dutyLeader: "",
        orgId: "",
        mainSquadronId: "",
        mainSquadronId: "",
        viceSquadronId: "",
        accidentSquadronId: "",
        accidentSquadronId: "",
        motorSquadronId: "",
        battalionChief: "",
        roadPostId: "",
        isDelete: ""},
      rules: {
        dutyLeader: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { pattern: /^.{3,20}$/, message: "只能输入字符", trigger: "blur" }
        ],
        battalionChief: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { pattern: /^.{3,20}$/, message: "只能输入字符", trigger: "blur" }
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
        dutyTime: "",
        dutyLeader: "",
        orgId: "",
        mainSquadronId: "",
        mainSquadronId: "",
        viceSquadronId: "",
        accidentSquadronId: "",
        accidentSquadronId: "",
        motorSquadronId: "",
        battalionChief: "",
        roadPostId: "",
        isDelete: ""}
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
    }
    // 自适应高度
    // changeHeight() {
    //   this.$nextTick(()=>{
    //     this.$refs.dialogMap.style.height = this.$refs.dialogForm.offsetHeight+"px"
    //     // 重新加载地图
    //     this.$refs.map.resetMap();
    //     this.$refs.map.addLayer("stakeNum");
    //     this.type = "success"
    //     this.status = "桩号显示中"
    //   })
    // },
    // hide() {
    //   this.$refs.map.cleanLayer("stakeNum");
    // }
  }
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
