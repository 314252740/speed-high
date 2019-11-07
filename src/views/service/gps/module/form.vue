<template>
<el-dialog :title="isAdd ? '新增GPS数据信息' : '查看GPS数据信息'"  :visible.sync="visible" width="800px" label-width="80px">
    <div class="container">

      <div class="mapCont" ref=dialogForm>
        <el-form ref="form" :model="dataForm" :rules="rules" size="small" label-position="right" label-width="70px" >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="警员/警车" prop="iscar" label-width="150px">
                <el-input clearable :disabled="true" v-model="dataForm.iscar" @blur="formatisCar()" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="警员类型" prop="type" label-width="150px">
                <el-input clearable :disabled="true" v-model="dataForm.type" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="警车号牌/警员名称" prop="policeId" label-width="150px">
                <el-input clearable :disabled="true" v-model="dataForm.policeId" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="高度" prop="altitude" label-width="150px">
                <el-input clearable :disabled="true" v-model="dataForm.altitude" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :disabled="true" label="经度" prop="longitude" label-width="150px">
                <el-input clearable :disabled="true" v-model="dataForm.longitude" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="纬度" prop="latitude" label-width="150px">
                <el-input clearable :disabled="true" v-model="dataForm.latitude" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="速度" prop="velocity" label-width="150px">
                <el-input clearable :disabled="true" v-model="dataForm.velocity" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="角" prop="angle" label-width="150px">
                <el-input clearable :disabled="true" v-model="dataForm.angle" required="true" minlength="6" maxlength="2000"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <!--<el-form-item label="是否在线" prop="isOnLine" label-width="77px">
                <el-input :disabled="true" v-model="dataForm.isOnLine" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>-->

              <el-form-item label="是否在线" prop="isonline" label-width="150px">
                <el-radio :disabled="true" v-model="dataForm.isOnLine" :label="1" >是</el-radio>
                <el-radio :disabled="true" v-model="dataForm.isOnLine" :label="0" >否</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="GPS状态" prop="gpsstate" label-width="150px">
                <el-input :disabled="true" v-model="dataForm.gpsstate" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="GPS位置" prop="posinfo" label-width="150px">
                <el-input :disabled="true" v-model="dataForm.posinfo" required="true" minlength="6" maxlength="20" autocomplete="off" ></el-input>
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
import {doAdd, doUpdate} from "@/api/gpstime"
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
      dataForm: {
        id: "",
        iscar: "",
        type: "",
        policeId: "",
        gpstime: "",
        longitude: "",
        latitude: "",
        altitude: "",
        velocity: "",
        angle: "",
        isonline: "",
        isOnLine: null,
        gpsstate: "",
        posinfo: ""
      },
      rules: {
        policeId: [
          { required: true, message: "请输入警车id", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    formatisCar () {
      alert(528);
      //return this.iscar[row.iscar]
    },
    cancel: function () {
      this.resetForm()
    },
    resetForm () {
      this.visible = false
      this.$refs["form"].resetFields()
      this.dataForm = {
        id: "",
        iscar: "",
        type: "",
        policeId: "",
        gpstime: "",
        longitude: "",
        latitude: "",
        altitude: "",
        velocity: "",
        angle: "",
        isonline: "",
        isOnLine: null,
        gpsstate: "",
        posinfo: ""
      }
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
              this.$parent.initData()
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
          this.$parent.initData()
        }).catch(err => {
          console.log("error:" + err)
          console.log(err)
        })
      }
    }
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
