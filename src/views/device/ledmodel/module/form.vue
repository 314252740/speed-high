<template>
  <el-dialog :title="isAdd ? '新增引导灯模式配置信息' : '修改引导灯模式配置信息'" :closeOnClickModal="false" :visible.sync="visible" width="700px" label-width="80px">
    <el-form ref="form" :model="dataForm" :rules="rules" size="small" label-position="right" label-width="100px" >

      <el-form-item label="最小能见度有" prop="mixVisibility">
        <el-input clearable v-model="dataForm.mixVisibility" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="灯亮度" prop="ledBright">
        <el-input clearable v-model="dataForm.ledBright" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="灯频率" prop="ledHz">
        <el-input clearable v-model="dataForm.ledHz
        " required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="尾迹长度" prop="wakeLen">
        <el-input clearable v-model="dataForm.wakeLen
        " required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="尾迹延时" prop="wakeDelay">
        <el-input clearable v-model="dataForm.wakeDelay
        " required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
      </el-form-item>
       <el-form-item label="道钉" prop="spike">
        <el-input clearable v-model="dataForm.spike
        " required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="车检器" prop="detector">
        <el-input clearable v-model="dataForm.detector
        " required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="模式类型" prop="modelType">
        <el-input clearable v-model="dataForm.modelType
        " required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
      </el-form-item>

      <el-form-item label="流水组号" prop="flowGroup">
        <el-input clearable v-model="dataForm.flowGroup
        " required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="流水速度" prop="flowSpeed">
        <el-input clearable v-model="dataForm.flowSpeed
        " required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="波峰" prop="peak">
        <el-input clearable v-model="dataForm.peak
        " required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="波谷" prop="trough">
        <el-input clearable v-model="dataForm.trough
        " required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="波浪速度" prop="waveVeloc">
        <el-input clearable v-model="dataForm.waveVeloc
        " required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="doSubmit">确 定</el-button>
      <el-button @click="cancel()">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { doAdd, doUpdate } from '@/api/ledmodel'
export default {
  data () {
    return {
      loading: false,
      visible: false,
      isAdd: false,

      dataForm: { id: '',
        mixVisibility: '',
        ledBright: '',
        ledHz: '',
        wakeLen: '',
        wakeDelay: '',
        spike: '',
        detector: '',
        modelType: '',
        flowGroup: '',
        flowSpeed: '',
        peak: '',
        trough: '',
        waveVeloc: '' },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个文字', trigger: 'blur' }
        ],
        ip: [
          { required: true, message: '请输入编码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },
          { pattern: /^.{3,20}$/, message: '只能输入字符', trigger: 'blur' }
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
      this.dataForm = { id: '',
        mixVisibility: '',
        ledBright: '',
        ledHz: '',
        wakeLen: '',
        wakeDelay: '',
        spike: '',
        detector: '',
        modelType: '',
        flowGroup: '',
        flowSpeed: '',
        peak: '',
        trough: '',
        waveVeloc: '' }
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
