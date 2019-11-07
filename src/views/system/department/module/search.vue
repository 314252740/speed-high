<template>
  <el-dialog :title="isAdd ? '添加子部门' : '修改子部门'"  :visible.sync="visible" width="600px" label-width="80px">
    <el-form ref="search" :model="dataForm" :rules="rules" size="small" label-position="right" label-width="70px" >
      <el-form-item label="名称" prop="name">
        <el-input v-model="dataForm.name" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="部门类型" prop="level" label-width="110px">
        <el-select v-model="dataForm.level" placeholder="部门类型" style="width:330px;" required="true">
          <el-option v-for="(item,index) in options" :label="item.name" :value="item.key" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="编码" prop="code">
        <el-input v-model="dataForm.code" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" :rows="4" v-model="dataForm.memo" maxlength="300" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="doSubmit">确 定</el-button>
      <el-button @click="cancel()">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { doAdd, doUpdate } from '@/api/depart'
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
      dataForm: { id: '', name: '', code: '', memo: '', level: '' },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        code: [
          { required: false, message: '请输入编码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        //   { pattern: /^[A-Za-z]+$/, message: "只能输入英文字符", trigger: "blur" }
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
      this.$refs['search'].resetFields()
      this.dataForm = { id: '', name: '', code: '', memo: '' }
    },
    doSubmit () {
      this.$refs['search'].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            doAdd(this.dataForm).then(res => {
              if (res.result === 'ok') {
                this.resetForm()
                this.$message({
                  message: '添加成功',
                  type: 'info'
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
            type: 'info'
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

</style>
