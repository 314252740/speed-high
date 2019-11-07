<template>
  <el-dialog :title="isAdd ? '新增引导灯控制模式信息' : '修改引导灯控制模式信息'" :closeOnClickModal="false" :visible.sync="visible" width="700px" label-width="80px" top="30px">
    <el-form ref="form" :model="dataForm" :rules="rules" size="small" label-position="right" label-width="80px" >

      <el-form-item label="模式名称" prop="modelName">
        <el-input clearable v-model="dataForm.modelName" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="doSubmit">确 定</el-button>
      <el-button @click="cancel()">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { doAdd, doUpdate } from '@/api/ledcontroltype'
export default {
  data () {
    return {
      loading: false,
      visible: false,
      isAdd: false,
      dataForm: { modelName: '' },
      rules: {
        modelName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个文字', trigger: 'blur' }
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
      this.dataForm = { modelName: '' }
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
<style scoped>
  .el-input--small{
    width: 80%;
  }
</style>
