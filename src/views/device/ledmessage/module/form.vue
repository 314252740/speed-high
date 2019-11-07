<template>
  <el-dialog :title="isAdd ? '新增引导灯信息' : '修改引导灯信息'" :closeOnClickModal="false" :visible.sync="visible" width="700px" label-width="80px">
        <el-form ref="form" :model="dataForm" :rules="rules" size="small" label-position="right" label-width="100px" >
          <el-form-item label="灯号" prop="ledNum">
            <el-input v-model="dataForm.ledNum" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="电池电压" prop="battery">
            <el-input v-model="dataForm.battery" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="太阳能电压" prop="sunBattery">
            <el-input v-model="dataForm.sunBattery" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="主板温度" prop="motherboard">
            <el-input v-model="dataForm.motherboard" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
          </el-form-item>

          <el-form-item label="工作功率" prop="workingPower">
            <el-input v-model="dataForm.workingPower" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="节点设置状态" prop="settingState">
            <el-input v-model="dataForm.settingState" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
          </el-form-item>

          <el-form-item label="路由次数" prop="routingNumber">
            <el-input v-model="dataForm.routingNumber" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="信号强度" prop="signalStrength">
            <el-input v-model="dataForm.signalStrength" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="数据时间" prop="dataTime">
            <el-input v-model="dataForm.dataTime" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="引导灯ID" prop="ledId">
            <el-input v-model="dataForm.ledId" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
          </el-form-item>

        </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="doSubmit">确 定</el-button>
      <el-button @click="cancel()">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { doAdd, doUpdate } from '@/api/ledmessage'
export default {
  data () {
    return {
      loading: false,
      visible: false,
      isAdd: false,
      dataForm: { id: '', ledNum: '', battery: '', sunBattery: '', motherboard: '', workingPower: '', settingState: '', routingNumber: '', signalStrength: '', dataTime: '', ledId: '' },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个文字', trigger: 'blur' }
        ],
        ip: [
          { required: true, message: '请输入编码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },
          { pattern: /^.{3,20}$/ + /^ +| +$/g, message: '只能输入字符', trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    cancel: function () {
      this.resetForm()
    },
    resetForm () {
      this.visible = false
      this.$refs['form'].resetFields()
      this.dataForm = { id: '', ledNum: '', battery: '', sunBattery: '', motherboard: '', workingPower: '', settingState: '', routingNumber: '', signalStrength: '', dataTime: '', ledId: '' }
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
    }
  }
}

</script>
