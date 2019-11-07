<template>
  <el-dialog :title="isAdd ? '新增警车信息' : '修改警车信息'" :closeOnClickModal="false" :visible.sync="visible" width="1000px" label-width="80px" @open="getSub()">
    <div class="container">
      <div class="mapCont" ref=dialogForm>
        <el-form ref="form" :model="dataForm" :rules="rules" size="small" label-position="right" label-width="145px" >
          <el-row :gutter="20">
            <!--<el-col :span="12">
              <el-form-item label="ip" prop="ip">
                <el-input v-model="dataForm.ip" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>-->
            <el-col :span="12">
              <el-form-item label="号牌号码" prop="plateNum">
                <el-input clearable v-model="dataForm.plateNum" required="true" style="width:250px;" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="号牌种类" prop="plateType">
                <el-select clearable v-model="dataForm.plateType" placeholder="号牌种类" style="width:250px;">
                  <el-option v-for="(item,index) in options6" :label="item.name" :value="item.name" :key="index"></el-option>
                </el-select>
              </el-form-item>
              <!--<el-form-item label="号牌种类" prop="plateType">
                <el-input v-model="dataForm.plateType" required="true" style="width:250px;" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>-->
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="车辆中文品牌" prop="carBrand">
                <el-input clearable v-model="dataForm.carBrand" style="width:250px;" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="车辆类型" prop="types">
                <el-select clearable v-model="dataForm.types" placeholder="车辆类型" style="width:250px;" required="true">
                  <el-option v-for="(item,index) in options3" :label="item.name" :value="item.name" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="机构名称" prop="orgId1">
                <el-select clearable v-model="dataForm.orgId1" placeholder="机构名称" style="width:250px;" required="true" @change="selecOrg(dataForm.orgId1)">
                  <el-option v-for="(item,index) in options1" :label="item.name" :value="item.key" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="子机构" prop="orgId">
                <el-select clearable v-model="dataForm.orgId" placeholder="子机构" style="width:250px;" required="true">
                  <el-option v-for="(item,index) in options2" :label="item.name" :value="item.key" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <!--<el-col :span="12">
              <el-form-item label="添加时间" prop="createTime">
                <el-input v-model="dataForm.createTime" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>-->
            <el-col :span="12">
              <!--<el-form-item label="购买时间" prop="buyTime">
                <el-date-picker
                  clearable
                  editable
                  v-model="dataForm.buyTime"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                  style="width:250px"
                </el-date-picker>
              </el-form-item>-->
              <el-form-item label="是否有报警器" prop="isAlarm">
                <el-select clearable v-model="dataForm.isAlarm" placeholder="是否有报警器" style="width:250px;" required="true">
                  <el-option v-for="(item,index) in options7" :label="item.name" :value="item.key" :key="index"></el-option>
                </el-select>
                <!--<el-input v-model="dataForm.isAlarm" required="true" style="width:250px;" minlength="6" maxlength="20"  autocomplete="off" ></el-input>-->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否有GPS定位设备" prop="hasGps">
                <el-select clearable v-model="dataForm.hasGps" placeholder="是否有GPS定位" style="width:250px;" required="true">
                  <el-option v-for="(item,index) in options4" :label="item.name" :value="item.key" :key="index"></el-option>
                </el-select>
                <!--<el-input v-model="dataForm.hasGps" required="true" style="width:250px;" minlength="6" maxlength="2000"  autocomplete="off" ></el-input>-->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="电台呼号" prop="callnumber">
                <el-input clearable v-model="dataForm.callnumber" style="width:250px;" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电台的频段信息" prop="frequency">
                <el-input clearable v-model="dataForm.frequency" style="width:250px;" minlength="6" maxlength="2000"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="航拍号" prop="skyShootCode">
                <el-input clearable v-model="dataForm.skyShootCode" style="width:250px;" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态" prop="status">
                <el-select clearable v-model="dataForm.status" placeholder="状态" style="width:250px;">
                  <el-option v-for="(item,index) in options8" :label="item.name" :value="item.key" :key="index"></el-option>
                </el-select>
                <!--<el-input v-model="dataForm.status" required="true" style="width:250px;" minlength="6" maxlength="20"  autocomplete="off" ></el-input>-->
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="是否正在定位跟踪" prop="isTrack">
                <el-select clearable v-model="dataForm.isTrack" placeholder="是否正在定位跟踪" style="width:250px;">
                  <el-option v-for="(item,index) in options5" :label="item.name" :value="item.key" :key="index"></el-option>
                </el-select>
                <!--<el-input v-model="dataForm.isTrack" required="true" style="width:250px;" minlength="6" maxlength="20"  autocomplete="off" ></el-input>-->
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="GPS通讯手机号" prop="gpsTelnumber">
            <el-input clearable v-model="dataForm.gpsTelnumber" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="GPS设备序列号" prop="gpsSerialId">
            <el-input clearable v-model="dataForm.gpsSerialId" minlength="6" maxlength="2000"  autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="note">
            <el-input clearable v-model="dataForm.note" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
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
import { doAdd, doUpdate } from '@/api/policecar'
// import request from "@/utils/request"
import { selecOrg } from '@/api/depart'
export default {
  props: {
    // query: {
    //   type: Object,
    //   required: true
    // },
    options8: {
      type: Array
    },
    options1: {
      type: Array
    },
    options3: {
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
    }
  },
  data () {
    return {
      // status: "显示",
      // type: "success",
      // icon: "el-icon-view",
      // 道路信息 选择
      // options: [],
      options2: [],
      loading: false,
      visible: false,
      isAdd: false,
      dataForm: {
        id: '',
        plateNum: '',
        plateType: '',
        carBrand: '',
        orgId: '',
        orgId1: '',
        isAlarm: '',
        createTime: '',
        buyTime: '',
        callnumber: '',
        frequency: '',
        skyShootCode: '',
        carUseType: '',
        types: '',
        hasGps: '',
        note: '',
        status: '',
        gpsTelnumber: '',
        gpsSerialId: '',
        isTrack: '',
        isDelete: '' },
      rules: {
        plateNum: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个文字', trigger: 'blur' }
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
    getSub () {
      var orgId = this.dataForm.orgId1
      if (!this.isAdd) {
        if (orgId != null) {
          selecOrg(orgId)
            .then(res => {
              this.options2 = res
            })
            .catch(err => console.log(err))
        } else {
          this.dataForm.orgId = ''
        }
      }
    },
    rcod () {
      // 定义bar为roadCode值
      let bar = this.dataForm.roadCode
      // 定义数组
      var obj = {}
      // 查找想对应的name值
      obj = this.options8.find(function (item) {
        return item.code === bar
      })
      this.dataForm.roadName = obj.name
    },
    // setLnglat (point) {
    //   this.dataForm.longitude = point[0]
    //   this.dataForm.latitude = point[1]
    // },
    cancel: function () {
      this.resetForm()
    },
    resetForm () {
      this.visible = false
      this.$refs['form'].resetFields()
      this.dataForm = { id: '',
        plateNum: '',
        plateType: '',
        carBrand: '',
        orgId: '',
        isAlarm: '',
        createTime: '',
        buyTime: '',
        callnumber: '',
        frequency: '',
        skyShootCode: '',
        carUseType: '',
        types: '',
        hasGps: '',
        note: '',
        status: '',
        gpsTelnumber: '',
        gpsSerialId: '',
        isTrack: '',
        isDelete: '' }
    },
    doSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            doAdd(this.dataForm).then(res => {
              if (res.result === 'ok') {
                this.resetForm()
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '添加失败',
                  type: 'error'
                })
              }
              this.loading = false
              this.$parent.page = 0
              this.$parent.dialogFormVisible = false
              this.$parent.init()
            }).catch(err => {
              console.log('error:' + err)
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
            message: '修改成功',
            type: 'success'
          })
          this.loading = false
          this.$parent.dialogFormVisible = false
          this.$parent.init()
        }).catch(err => {
          console.log('error:' + err)
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
    //   // this.$refs.map.cleanLayer("stakeNum");
    // },
    selecOrg (orgId) {
      selecOrg(orgId)
        .then(res => {
          this.options2 = res
        })
        .catch(err => console.log(err))
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
  width: 100%;
  float: left;
  position: relative;
}
.button{
  position: absolute;
  right: 6px;
  bottom: 6px;
}
</style>
