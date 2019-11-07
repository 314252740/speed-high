<template>
  <div class="tableBox">
     <el-dialog
        title="号牌号码统计车辆"
        :visible.sync="dialogVisible"
        width="610px"
        custom-class="myDialog"
        :modal="true"
        :modal-append-to-body="true"
        center
        @open="openDialog"
        @close="closeDialog">
        <span>
          <el-form ref="form" :model="dataForm" :rules="rules" size="small" label-position="right" label-width="70px" >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="车牌号" prop="carPlateNumber" label-width="80px">
                  <el-input v-model="dataForm.carPlateNumber" placeholder="请输入车牌号" style="width:153px">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="时间" prop="time" label-width="75px">
                  <el-date-picker
                    v-model="dataForm.time"
                    type="month"
                    :picker-options="pickerOptions"
                    value-format="yyyyMM"
                    style="width:153px"
                    placeholder="请选择时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel" type="danger" size="small">取 消</el-button>
          <el-button @click="updataMaster" type="success" size="small">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
import { Notification } from 'element-ui'

export default {
  data () {
    return {
      pickerOptions: {
        disabledDate (value) {
          if (Date.now() <= value) {
            return true
          }
          return false
        }
      },
      dialogVisible: false,
      dataForm: {
        carPlateNumber: null,
        time: null
      },
      rules: {
        carPlateNumber: [{ required: true, message: '请输入车牌号', trigger: 'blur' }],
        time: [{ required: true, message: '请选择时间', trigger: 'blur' }]
      },
      status: false
    }
  },
  methods: {
    cancel () {
      this.dialogVisible = false
      this.$parent.idx = -1
    },
    show () {
      this.dialogVisible = true
    },
    reset () {
      this.$refs.form.resetFields()
    },
    updataMaster () {
      this.status = false
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          let obj = { carPlateNumber: this.dataForm.carPlateNumber, time: this.dataForm.time, bay_id: this.$parent.id }
          await this.$parent.getInfoOfType(obj, this.$parent.url)
          this.status = true
          this.dialogVisible = false
        }
      })
    },
    openDialog () {

    },
    closeDialog () {
      this.reset()
      if (!this.status) {
        this.cancel()
      }
    },
    tip (type, msg) {
      let str = '成功'
      if (type === 'success') {
        Notification.success({
          title: `修改${str}`,
          message: msg + '修改' + str,
          duration: 3000,
          offset: 50
        })
      } else {
        str = '失败'
        Notification.error({
          title: `修改${str}`,
          message: msg + '修改' + str,
          duration: 3000,
          offset: 50
        })
      }
    }
  },
  created () {

  },
  mounted () {
  }
}
</script>
<style scoped>
.tableBox{
  width: 100%;
  padding:10px;
  box-sizing: border-box;
}
</style>
