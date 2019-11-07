<template>
  <el-dialog :title="isAdd ? '新增用户' : '修改用户'" :closeOnClickModal="false" :visible.sync="visible" width="600px" label-width="80px">
    <el-form status-icon ref="form" :model="dataForm" :rules="rules" size="small" label-position="right" label-width="70px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="dataForm.name" clearable required="true" minlength="6" maxlength="20" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="account">
        <el-input v-model="dataForm.account" clearable minlength="6" maxlength="20" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd" v-show="this.isAdd" :rules="{required: this.isAdd, message: '密码不能为空', trigger: 'blur'}">
        <el-input v-model="dataForm.pwd" clearable type="password" minlength="3" maxlength="20" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="repeatPasswd" v-show="this.isAdd">
        <el-input v-model="dataForm.repeatPasswd" clearable type="password" minlength="3" maxlength="20" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="dataForm.mobile" clearable autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="警员" prop="puserId">
        <el-select v-model="dataForm.puserId" filterable placeholder="可搜索选择警员">
          <el-option v-for="(item,index) in options" :label="item.name" :value="item.name" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" clearable :rows="3" v-model="dataForm.memo" maxlength="300" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="doSubmit">确 定</el-button>
      <el-button @click="cancel()">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { doAdd, doUpdate, policeName } from '@/api/user'
export default {
  // props: {
  //   options: {
  //     type: Array,
  //     required: true
  //   }
  // },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.dataForm.repeatPasswd !== '') {
          this.$refs.dataForm.validateField('repeatPasswd')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.dataForm.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      options: [],
      loading: false,
      visible: false,
      isAdd: false,
      dataForm: { name: '', account: '', pwd: '', repeatPasswd: '', mobile: '', memo: '', puserId: '' },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        repeatPasswd: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },
          { pattern: /^[A-Za-z]+$/, message: '只能输入英文字符', trigger: 'blur' }
        ]
        // mobile: [
        //   {required: true, message: "请输入联系方式", trigger: "blur"},
        //   {min: 3, max: 40, message: "长度在 3 到 40 个字符", trigger: "blur"},
        //   {
        //     pattern: /^1[34578]\d{9}$/,
        //     message: "请输入合法的手机号",
        //     trigger: "blur"
        //   }
        // ],
        // puserId:[
        //    {required: true, message: "请输入警员姓名", trigger: "change"}
        // ]
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
      this.dataForm = { name: '', account: '', pwd: '', repeatPasswd: '', mobile: '', memo: '', puserId: '' }
    },
    doSubmit () {
      if (this.dataForm.pwd !== this.dataForm.repeatPasswd) {
        this.$message.error('两次输入密码不一致')
        return
      }
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
  },
  created () {
    policeName().then(res => {
      if (res.result === 'ok') {
        let result = res.data.result
        this.options = result
      }
    })
  }
}
</script>
