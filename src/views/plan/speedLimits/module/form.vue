<template>
  <el-dialog :title="isAdd ? '新增限速措施' : '修改限速措施'" :closeOnClickModal="false" :visible.sync="visible" width="500px" label-width="80px">
    <el-form ref="form" :model="dataForm" size="small" label-position="right" label-width="70px" >
      <el-input type="hidden" v-model="dataForm.id"></el-input>
      <el-form-item label="降速措施类型" label-width="110px">
        <el-select v-model="dataForm.plannedEventTypeIds" clearable placeholder="降速措施类型" style="width:330px;" required="true">
          <el-option v-for="(item,index) in options" :label="item.name" :value="item.key" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="限速措施名称" prop="speedLimitsName" label-width="110px">
        <el-input clearable v-model="dataForm.speedLimitsName" required="true" autocomplete="off" style="width:330px;"></el-input>
      </el-form-item>
      <el-form-item label="限速措施描述" prop="speedLimitsDes" label-width="110px">
        <el-input clearable v-model="dataForm.speedLimitsDes" required="true" autocomplete="off" style="width:330px;"></el-input>
      </el-form-item>
      <el-form-item label="限速措施值" prop="speedLimitsValue" label-width="110px">
        <el-input clearable v-model="dataForm.speedLimitsValue" required="true" autocomplete="off" style="width:330px;"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="doSubmit">确 定</el-button>
      <el-button @click="cancel()">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { doAdd, doUpdate } from '@/api/speedLimits'
export default {
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      visible: false,
      isAdd: false,
      dataForm: {
        id: '',
        informationScreenContent: '',
        highPitchedHornContent: '',
        visibility: '',
        roadStatus: '',
        weatherState: '',
        bootScreenInformation: '',
        sort: ''
      }
    }
  },
  methods: {
    selectOne: function (event) {
      this.$parent.query.search_type = event
    },
    cancel: function () {
      this.resetForm()
    },
    resetForm () {
      this.visible = false
      this.$refs['form'].resetFields()
      this.dataForm = { id: '',
        informationScreenContent: '',
        highPitchedHornContent: '',
        visibility: '',
        roadStatus: '',
        weatherState: '',
        bootScreenInformation: '',
        sort: '' }
    },
    continueAdd () {
      // eslint-disable-next-line no-unused-vars
      var t = this.dataForm.type
      if (this.isAdd) {
        doAdd(this.dataForm).then(res => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.dataForm = { id: '',
            informationScreenContent: '',
            highPitchedHornContent: '',
            visibility: '',
            roadStatus: '',
            weatherState: '',
            bootScreenInformation: '',
            sort: '' }
          this.$parent.page = 0
          this.isAdd = true
          this.$parent.init()
        }).catch(err => {
          console.log('error:' + err)
          console.log(err)
        })
      }
    },
    doSubmit () {
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
    }
  }
}

</script>
