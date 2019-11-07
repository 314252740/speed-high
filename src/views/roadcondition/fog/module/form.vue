<template>
  <el-dialog :title="isAdd ? '新增信息' : '修改信息'"  :visible.sync="visible" width="1200px" label-width="80px" @open="changeHeight">
    <div class="container">
      <div class="mapCont" ref="dialogMap">
        <tile-map  ref="map"></tile-map>
      </div>

      <div class="mapCont" ref=dialogForm>
        <el-form ref="form" :model="dataForm" :rules="rules" size="small" label-position="right" label-width="70px" >
          <el-row>
            <el-col :span="12">
              <el-form-item label="浓度" prop="concentration">
                <el-input v-model="dataForm.concentration" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="能见度" prop="visibility">
                <el-input v-model="dataForm.visibility" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="开始时间" prop="timeStart">
                <el-input v-model="dataForm.timeStart" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
                <el-date-picker
                    clearable
                    v-model="dataForm.timeStart"
                    type="date"
                    placeholder="选择日期"
                    style="width:133px">
                </el-date-picker>
                <el-time-picker
                    clearable
                    v-model="formValue.hours"
                    style="width:133px"
                    :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
                    placeholder="任意时间点">
                </el-time-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="结束时间" prop="timeEnd">
                <el-input v-model="dataForm.timeEnd" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>

          </el-row>

          <el-row>
             <el-col :span="12">
            <el-select v-model="dataForm.sensorId" placeholder="请选择传感器" required="true" autocomplete="off">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
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
import { doAdd, doUpdate } from '@/api/fog'
import request from '@/utils/request'
import tileMap from '@/components/map/tileMap'// 初始化瓦片地图
export default {
  components: {
    tileMap
  },
  data () {
    return {
      // 传感器信息 选择
      options: [],
      loading: false,
      visible: false,
      isAdd: false,
      dataForm: { id: '', sensorId: '', concentration: '', visibility: '', timeStart: '', timeEnd: '', timeUpdate: '' },
      rules: {

      }

    }
  },
  methods: {

    startDraw () {
      let that = this
      request({
        url: 'module/sensorinfos',
        method: 'get',
        params: {
        }
      }).then(res => {
        that.options = res.data.result
      })
      this.$nextTick(() => {
        this.$refs.map.startDrawPoint('camera', this.setLnglat, [this.dataForm.longitude, this.dataForm.latitude])
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
      this.$refs['form'].resetFields()
      this.dataForm = { id: '',
        ip: '',
        name: '',
        roadName: '',
        roadCode: '',
        longitude: '',
        latitude: '',
        workWay: '',
        networkStatus: '',
        model: '',
        manufacturer: '',
        userName: '',
        password: '',
        mediaIp: '',
        note: '',
        resolution: '',
        port: '' }
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
    changeHeight () {
      this.$nextTick(() => {
        this.$refs.dialogMap.style.height = this.$refs.dialogForm.offsetHeight + 'px'
        // 重新加载地图
        this.$refs.map.resetMap()
      })
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
  width: 50%;
  float: left;
}
</style>
