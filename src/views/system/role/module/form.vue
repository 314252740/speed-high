<template>
  <el-dialog :title="isAdd ? '新增角色' : '修改角色'" :closeOnClickModal="false" :visible.sync="visible" width="600px" label-width="80px">
    <el-form ref="form" :model="dataForm" :rules="rules" size="small" label-position="right" label-width="70px" >
      <el-form-item label="名称" prop="name">
        <el-input v-model="dataForm.name" clearable required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="编码" prop="code">
        <el-input v-model="dataForm.code" clearable required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" :rows="4" clearable v-model="dataForm.memo" maxlength="300" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="doSubmit">确 定</el-button>
      <el-button @click="cancel()">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { doAdd, doUpdate } from '@/api/role'
export default {
  data () {
    return {
      loading: false,
      visible: false,
      isAdd: false,
      dataForm: { id: '', code: '', name: '', memo: '' },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        code: [
          { required: false, message: '请输入编码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },
          { pattern: /^[A-Za-z]+$/, message: '只能输入英文字符', trigger: 'blur' }
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
      this.dataForm = { id: '', code: '', name: '', memo: '' }
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
