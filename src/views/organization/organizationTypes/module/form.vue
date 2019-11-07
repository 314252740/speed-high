<template>
  <el-dialog :title="isAdd ? '新增机构分组' : '修改机构分组'"  :visible.sync="visible" width="500px" label-width="80px">
    <el-form ref="form" :model="dataForm" size="small" label-position="right" label-width="70px" >
      <el-input type="hidden" v-model="dataForm.id"></el-input>
      <el-form-item label="组名" prop="typeName">
        <el-input v-model="dataForm.typeName" required="true" autocomplete="off" style="width:330px;"></el-input>
      </el-form-item>
      <el-form-item label="组长" prop="groupLeader">
        <el-input v-model="dataForm.groupLeader" required="true" autocomplete="off" style="width:330px;"></el-input>
      </el-form-item>
      <el-form-item label="副组长" prop="deputyGroupLeader">
        <el-input v-model="dataForm.deputyGroupLeader" required="true" autocomplete="off" style="width:330px;"></el-input>
      </el-form-item>
      <el-form-item label="工作职责" prop="workTask">
        <el-input v-model="dataForm.workTask" required="true" autocomplete="off" style="width:330px;"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="doSubmit">确 定</el-button>
      <el-button @click="cancel()">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { doAdd, doUpdate } from '@/api/organizationTypes'
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
        typeName: '',
        groupLeader: '',
        deputyGroupLeader: '',
        workTask: ''
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
      this.dataForm = { id: '', typeName: '', groupLeader: '', deputyGroupLeader: '', workTask: '' }
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
          this.dataForm = { id: '', typeName: '', groupLeader: '', deputyGroupLeader: '', workTask: '' }
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
