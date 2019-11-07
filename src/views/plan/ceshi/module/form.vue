<template>
  <el-dialog :title="isAdd ? '新增字典' : '修改字典'" :closeOnClickModal="false" :visible.sync="visible" width="500px" label-width="80px">
    <el-form ref="form" :model="dataForm" size="small">
      <el-input type="hidden" v-model="dataForm.id"></el-input>
      <el-form-item label="名称">
        <el-input v-model="dataForm.name" required="true" autocomplete="off" style="width:330px;"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="dataForm.type" placeholder="请字典类型" style="width:330px;" required="true">
          <el-option v-for="(item,index) in options" :label="item.name" :value="item.key" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="编码">
        <el-input v-model="dataForm.code" required="true" autocomplete="off" style="width:330px;"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" style="width:330px;"
                  :rows="3" v-model="dataForm.remark" autocomplete="off"></el-input>
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
import { doAdd, doUpdate } from '@/api/dics'
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
        name: '',
        type: '',
        code: '',
        remark: ''
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
      this.dataForm = { id: '', name: '', code: '', remark: '' }
    },
    continueAdd () {
      var t = this.dataForm.type
      if (this.isAdd) {
        doAdd(this.dataForm).then(res => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.dataForm = { id: '', name: '', code: '', type: t, remark: '' }
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
          this.resetForm()
          this.$message({
            message: '添加成功',
            type: 'success'
          })
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
