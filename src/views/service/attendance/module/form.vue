<template>
  <el-dialog :title="isAdd ? '新增出勤信息' : '修改出勤信息'" :closeOnClickModal="false" :visible.sync="visible" width="800px" label-width="80px">
    <div class="container">

      <div class="mapCont" ref=dialogForm>
        <el-form ref="form" :model="dataForm" :rules="rules" size="small" label-position="right" label-width="90px" >
          <el-row :gutter="20">
            <!--<el-col :span="12">
              <el-form-item label="ip" prop="ip">
                <el-input v-model="dataForm.ip" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>-->
            <el-col :span="12">
              <el-form-item label="出勤类型" prop="attendanceType">
                <el-select clearable v-model="dataForm.attendanceType" placeholder="出勤类型" style="width:250px;" required="true">
                  <el-option v-for="(item,index) in options3" :label="item.name" :value="item.key" :key="index"></el-option>
                </el-select>
                <!--<el-input v-model="dataForm.attendanceType" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>-->
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="出勤时间" prop="attendanceTime">
                <el-date-picker
                  clearable
                  v-model="dataForm.attendanceTime"
                  type="datetime"
                  style="width:250px;"
                  placeholder="选择日期时间">
                </el-date-picker>
                <!--<el-input v-model="dataForm.attendanceTime" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>-->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="返回时间" prop="returnTime">
                <el-date-picker
                  clearable
                  v-model="dataForm.returnTime"
                  type="datetime"
                  style="width:250px;"
                  placeholder="选择日期时间">
                </el-date-picker>
                <!--<el-input v-model="dataForm.returnTime" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>-->
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="交通事故" prop="trafficAccidentId">
                <el-select clearable v-model="dataForm.trafficAccidentId" placeholder="交通事故" style="width:250px;" required="true">
                  <el-option v-for="(item,index) in options2" :label="item.name" :value="item.key" :key="index"></el-option>
                </el-select>
                <!--<el-input v-model="dataForm.trafficAccidentId" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>-->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出勤警车" prop="policeCarId">
                <el-select clearable v-model="dataForm.policeCarId" placeholder="出勤类型" style="width:250px;" required="true">
                  <el-option v-for="(item,index) in options1" :label="item.name" :value="item.key" :key="index"></el-option>
                </el-select>
                <!--<el-input v-model="dataForm.policeCarId" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>-->
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="警员1" prop="attendancePolice1">
                <el-select clearable v-model="dataForm.attendancePolice1" filterable placeholder="搜索选择警员" style="width:250px;" required="true">
                  <el-option v-for="(item,index) in options4" :label="item.name" :value="item.key" :key="index"></el-option>
                </el-select>
                <!--<el-input v-model="dataForm.attendancePolice1" required="true" style="width:250px;" minlength="6" maxlength="20"  autocomplete="off" ></el-input>-->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="警员2" prop="attendancePolice2">
                <el-select clearable v-model="dataForm.attendancePolice2" filterable placeholder="搜索选择警员" style="width:250px;" required="true">
                  <el-option v-for="(item,index) in options5" :label="item.name" :value="item.key" :key="index"></el-option>
                </el-select>
                <!--<el-input v-model="dataForm.attendancePolice2" required="true" style="width:250px;" minlength="6" maxlength="2000"  autocomplete="off" ></el-input>-->
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
           <el-col :span="12">
             <el-form-item label="警员3" prop="attendancePolice3">
                <el-select clearable v-model="dataForm.attendancePolice3" filterable placeholder="搜索选择警员" style="width:250px;" required="true">
                  <el-option v-for="(item,index) in options6" :label="item.name" :value="item.key" :key="index"></el-option>
                </el-select>
                <!--<el-input v-model="dataForm.attendancePolice3" required="true" style="width:250px;" minlength="6" maxlength="20"  autocomplete="off" ></el-input>-->
              </el-form-item>
          </el-col>
            <el-col :span="12">
              <el-form-item label="警员4" prop="attendancePolice4">
                <el-select clearable v-model="dataForm.attendancePolice4" filterable placeholder="搜索选择警员" style="width:250px;" required="true">
                  <el-option v-for="(item,index) in options7" :label="item.name" :value="item.key" :key="index"></el-option>
                </el-select>
                <!--<el-input v-model="dataForm.attendancePolice4" required="true" style="width:250px;" minlength="6" maxlength="2000"  autocomplete="off" ></el-input>-->
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="警员5" prop="attendancePolice5">
                <el-select clearable v-model="dataForm.attendancePolice5" filterable placeholder="搜索选择警员" style="width:250px;" required="true">
                  <el-option v-for="(item,index) in options8" :label="item.name" :value="item.key" :key="index"></el-option>
                </el-select>
                <!--<el-input v-model="dataForm.attendancePolice5" required="true" style="width:250px;" minlength="6" maxlength="20"  autocomplete="off" ></el-input>-->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注" prop="noteInfo">
                <el-input clearable v-model="dataForm.noteInfo" required="true" style="width:250px;" minlength="6" maxlength="2000"  autocomplete="off" ></el-input>
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
import {doAdd, doUpdate} from "@/api/attendance"
// import request from "@/utils/request"
import tileMap from "@/components/map/tileMap"// 初始化瓦片地图
export default {
  props: {
    // query: {
    //   type: Object,
    //   required: true
    // },
    options3: {
      type: Array
    },
    options1: {
      type: Array
    },
    options2: {
      type: Array
    },
    options4: {
      type: Array
    },
    options5: {
      type: Array
    },
    options6: {
      type: Array
    },
    options7: {
      type: Array
    },
    options8: {
      type: Array
    }
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
      // status: "显示",
      // type: "success",
      // icon: "el-icon-view",
      // 道路信息 选择
      // options: [],
      loading: false,
      visible: false,
      isAdd: false,
      dataForm: {id: "",
        attendanceType: "",
        attendanceTime: "",
        returnTime: "",
        trafficAccidentId: "",
        policeCarId: "",
        attendancePolice1: "",
        attendancePolice2: "",
        attendancePolice3: "",
        attendancePolice4: "",
        attendancePolice5: "",
        noteInfo: ""},
      rules: {
        attendanceType: [
          { required: true, message: "请输入类型", trigger: "blur" }
        ]
      }

    }
  },
  methods: {
    // trigger () {
    //   if (this.type === "danger") {
    //     this.type = "success"
    //     this.status = "桩号显示中"
    //     this.$refs.map.showLayer("stakeNum", true)
    //   } else {
    //     this.type = "danger"
    //     this.status = "桩号隐藏中"
    //     this.$refs.map.showLayer("stakeNum", false)
    //   }
    // },
    // addStakeNumLayer () {
    //   this.$nextTick(() => {
    //     this.$refs.map.addLayer("stakeNum")
    //   })
    // },
    rcod () {
      // 定义bar为roadCode值
      let bar = this.dataForm.roadCode
      // 定义数组
      var obj = {}
      //查找想对应的name值
      obj = this.options.find(function (item) {
        return item.code === bar
      })
      this.dataForm.roadName = obj.name
    },
    // startDraw () {
    //   // let that = this
    //   // request({
    //   //       url: "module/roadinfos",
    //   //       method: "get",
    //   //       params: {
    //   //       }
    //   //     }).then(res=>{
    //   //       that.options = res.data.result
    //   //     });
    //   this.$nextTick(() => {
    //     this.$refs.map.startDrawPoint("sensor", this.setLnglat, [this.dataForm.longitude, this.dataForm.latitude])
    //   })
    // },
    // setLnglat (point) {
    //   this.dataForm.longitude = point[0]
    //   this.dataForm.latitude = point[1]
    // },
    cancel: function () {
      this.resetForm()
    },
    resetForm () {
      this.visible = false
      this.$refs["form"].resetFields()
      this.dataForm = {id: "",
      attendanceType: "",
      attendanceTime: "",
      returnTime: "",
      trafficAccidentId: "",
      policeCarId: "",
      attendancePolice1: "",
      attendancePolice2: "",
      attendancePolice3: "",
      attendancePolice4: "",
      attendancePolice5: "",
        noteInfo: ""}
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
    // changeHeight () {
    //   this.$nextTick(() => {
    //     this.$refs.dialogMap.style.height = this.$refs.dialogForm.offsetHeight + "px"
    //     // 重新加载地图
    //     this.$refs.map.resetMap()
    //     this.$refs.map.addLayer("stakeNum")
    //     this.type = "success"
    //     this.status = "桩号显示中"
    //   })
    // },
    // hide () {
    //   this.$refs.map.cleanLayer("stakeNum")
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
