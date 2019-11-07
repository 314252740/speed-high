<template>
  <el-dialog :title="isAdd ? '修改道路信息' : '新增道路信息'" :closeOnClickModal="false" :visible.sync="visible" width="1200px" label-width="80px" top="30px" @open="changeHeight">
    <div class="container">
      <div class="mapCont" ref="dialogMap">
        <tile-map  ref="map"></tile-map>

      </div>
      <div class="mapCont mapConts" ref=dialogForm>
        <el-form ref="form" :model="dataForm" :rules="rules" size="small" label-position="right" label-width="100px" >
          <el-row>
            <el-col :span="24">
              <el-form-item label="道路名称" prop="name" :inline="true">
                  <el-input v-model="dataForm.name" required="true" width="210px" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="道路英文名称" prop="enName" :inline="true">
                  <el-input v-model="dataForm.enName" required="true" width="210px" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="道路编号" prop="code">
                <el-input v-model="dataForm.code" required="true" width="210px" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="ip" prop="ip">
                <el-input v-model="dataForm.ip" required="true" width="210px" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="限速值" prop="limitSpeed">
                <el-input v-model="dataForm.limitSpeed" required="true" width="210px" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="违法上传编码" prop="uploadcode">
                <el-input v-model="dataForm.uploadcode" required="true" width="210px" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
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
import { doAdd, doUpdate } from '@/api/depart'
import tileMap from '@/components/map/tileMap'// 初始化瓦片地图
export default {
  components: {
    tileMap
  },
  data () {
    return {
      loading: false,
      visible: false,
      isAdd: false,
      dataForm: { id: '',
        name: '',
        code: '',
        ip: '',
        statusUseble: '',
        recSpeed: '',
        recBigCarSpeed: '',
        stdSpeed: '',
        stdBigCarSpeed: '',
        limitSpeed: '',
        limitBigCarSpeed: '',
        memo: '',
        uploadcode: '',
        geom: '',
        enName: '' },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个文字', trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    startDraw () {
      this.$nextTick(() => {
        this.$refs.map.drawRoad(this.setPoints, this.dataForm.geom)
      })
    },
    setPoints (wktstr) {
      this.dataForm.geom = wktstr
    },
    cancel: function () {
      this.resetForm()
    },
    resetForm () {
      this.visible = false
      this.$refs['form'].resetFields()
      this.dataForm = { id: '',
        name: '',
        code: '',
        ip: '',
        statusUseble: '',
        recSpeed: '',
        recBigCarSpeed: '',
        stdSpeed: '',
        stdBigCarSpeed: '',
        limitSpeed: '',
        limitBigCarSpeed: '',
        memo: '',
        uploadcode: '',
        geom: '',
        enName: '' }
    },
    doSubmit () {
      console.log(this.dataForm)
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
  height: 500px;
  width: 100%;
  overflow: hidden;
}
.mapCont{
  height: inherit;
  width: 70%;
  float: left;
}
.mapConts{
  width: 30%;
}
</style>
