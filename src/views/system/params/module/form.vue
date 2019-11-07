<template>
  <el-dialog :title="isAdd ? '新增预案事件类型' : '修改预案事件类型'" :closeOnClickModal="false" :visible.sync="visible" width="500px" label-width="80px">
    <el-form ref="form" :model="dataForm" size="small" label-position="right" label-width="70px" >
      <el-input type="hidden" v-model="dataForm.id"></el-input>
      <el-form-item label="参数类型" prop="types">
        <el-input v-model="dataForm.types" clearable required="true" autocomplete="off" style="width:330px;"></el-input>
      </el-form-item>
      <el-form-item label="参数名称" prop="name">
        <el-input v-model="dataForm.name" clearable required="true" autocomplete="off" style="width:330px;"></el-input>
      </el-form-item>
      <el-form-item label="参数值" prop="value">
        <el-input v-model="dataForm.value" clearable required="true" autocomplete="off" style="width:330px;"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="memo">
        <el-input v-model="dataForm.memo" clearable required="true" autocomplete="off" style="width:330px;"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="doSubmit">确 定</el-button>
      <el-button type="info" @click="continueAdd()" v-show="isAdd">继续添加</el-button>
      <el-button @click="cancel()">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { doAdd, doUpdate } from '@/api/params'
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
        types: '',
        name: '',
        value: '',
        memo: ''
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
      this.dataForm = { id: '', types: '', name: '', value: '', memo: '' }
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
          this.dataForm = { id: '', types: '', name: '', value: '', memo: '' }
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
