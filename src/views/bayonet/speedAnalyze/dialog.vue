<template>
  <div class="tableBox">
     <el-dialog
        title="路段平均速度"
        :visible.sync="dialogVisible"
        width="610px"
        custom-class="myDialog"
        :modal="true"
        :modal-append-to-body="true"
        center
        @open="openDialog"
        @close="closeDialog">
        <span>
          <el-form ref="form" :model="dataForm" :rules="rules" size="small" label-position="right" label-width="82px" >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="方向" prop="direction" label-width="80px">
                  <el-select v-model="dataForm.direction" required="true" autocomplete="off" placeholder="请选择方向" style="width:188px;">
                    <el-option
                      v-for="item in listdirection"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="时间" prop="time" label-width="80px">
                  <el-select v-model="dataForm.time" required="true" autocomplete="off" placeholder="请选择时间" style="width:188px;">
                    <el-option
                      v-for="item in listTime"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="起始卡口" prop="bay_id" label-width="80px">
                  <el-select v-model="dataForm.bay_id" :disabled="disabled" required="true" autocomplete="off" placeholder="请选择起始卡口" style="width:188px;" @change="changeBayonet">
                    <el-option
                      v-for="item in list"
                      :key="item.cloud"
                      :label="item.name"
                      :value="item.cloud"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="终点卡口" prop="bay_id1" label-width="82px">
                  <el-select v-model="dataForm.bay_id1" :disabled="true" required="true" autocomplete="off" placeholder="请选择终点卡口" style="width:188px;">
                    <el-option
                       v-for="item in list"
                      :key="item.cloud"
                      :label="item.name"
                      :value="item.cloud"
                    ></el-option>
                  </el-select>
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
import { getNextBayonet } from '@/api/bayonet'
export default {
  props: {
    list: {
      type: Array,
      default: () => {}
    }
  },
  data () {
    return {
      disabled: false,
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
        bay_id: null,
        bay_id1: null,
        time: null,
        direction: null
      },
      rules: {
        bay_id: [{ required: true, message: '请选择起始卡口', trigger: 'change' }],
        bay_id1: [{ required: true, message: '请选择终点卡口', trigger: 'change' }],
        time: [{ required: true, message: '请选择时间', trigger: 'change' }],
        direction: [{ required: true, message: '请选择方向', trigger: 'change' }]
      },
      status: false,
      listTime: [
        { name: '2分钟', value: 2 },
        { name: '4分钟', value: 4 },
        { name: '6分钟', value: 6 },
        { name: '8分钟', value: 8 },
        { name: '10分钟', value: 10 }
      ],
      listdirection: [
        { name: '上行', value: 0 },
        { name: '下行', value: 1 }
      ]
    }
  },
  watch: {
    'dataForm.direction': {
      handler: (newVal, oldVal) => {
        console.log(newVal)
        if (newVal === null || newVal === '') {
          this.disabled = true
        } else {
          this.disabled = false
        }
      }
    }
  },
  methods: {
    changeBayonet () {
      getNextBayonet({ next: this.dataForm.bay_id })
        .then(res => {
          if (res.result === 'ok') {
            this.dataForm.bay_id1 = res.data
          } else {
            this.tip('error', '卡口')
          }
        })
        .catch(err => console.log(err))
    },
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
          let obj = { bay_id: '1026', bay_id1: '1027', time: this.dataForm.time }
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
          title: `查询${str}`,
          message: msg + '查询' + str,
          duration: 3000,
          offset: 50
        })
      } else {
        str = '失败'
        Notification.error({
          title: `查询${str}`,
          message: msg + '查询' + str,
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
