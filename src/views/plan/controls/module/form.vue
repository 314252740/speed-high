<template>
  <el-dialog :title="isAdd ? '新增管控措施' : '修改管控措施'" :closeOnClickModal="false" :visible.sync="visible" width="500px" label-width="80px">
    <el-form ref="form" :model="dataForm" size="small" label-position="right" label-width="70px" >
      <el-input type="hidden" v-model="dataForm.id"></el-input>
      <el-form-item label="管控措施类型" prop="plannedEventTypeIds" label-width="110px">
        <el-select v-model="dataForm.plannedEventTypeIds" placeholder="管控措施类型" style="width:330px;" required="true">
          <el-option v-for="(item,index) in options" :label="item.name" :value="item.key" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="信息屏内容" prop="informationScreenContent" label-width="110px">
        <el-input clearable v-model="dataForm.informationScreenContent" required="true" autocomplete="off" style="width:330px;"></el-input>
      </el-form-item>
      <el-form-item label="高音号角内容" prop="highPitchedHornContent" label-width="110px">
        <el-input clearable v-model="dataForm.highPitchedHornContent" required="true" autocomplete="off" style="width:330px;"></el-input>
      </el-form-item>
      <el-form-item label="能见度" prop="visibility" label-width="110px">
        <!-- <el-input v-model="dataForm.visibility" required="true" autocomplete="off" style="width:330px;"></el-input> -->
        <el-select v-model="dataForm.visibility" clearable required="true" autocomplete="off" style="width:330px;">
          <el-option
            v-for="item in selectList.visibility"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="路面状态" prop="roadStatus" label-width="110px">
        <!-- <el-input v-model="dataForm.roadStatus" required="true" autocomplete="off" style="width:330px;"></el-input> -->
        <el-select v-model="dataForm.roadStatus" clearable required="true" autocomplete="off" style="width:330px;">
           <el-option
            v-for="item in selectList.roadCond"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="天气状况" prop="weatherState" label-width="110px">
        <!-- <el-input v-model="dataForm.weatherState" required="true" autocomplete="off" style="width:330px;"></el-input> -->
        <el-select v-model="dataForm.weatherState" clearable required="true" autocomplete="off" style="width:330px;">
          <el-option
            v-for="item in selectList.weatherCond"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="引导屏信息" prop="bootScreenInformation" label-width="110px">
        <el-input clearable v-model="dataForm.bootScreenInformation" required="true" autocomplete="off" style="width:330px;"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort" label-width="110px">
        <el-input clearable v-model="dataForm.sort" required="true" autocomplete="off" style="width:330px;"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="doSubmit">确 定</el-button>
      <el-button @click="cancel()">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { doAdd, doUpdate } from '@/api/controls'
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    selectList: {
      type: Object,
      default: () => {},
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
        informationScreenContent: '',
        highPitchedHornContent: '',
        visibility: '',
        roadStatus: '',
        weatherState: '',
        bootScreenInformation: '',
        sort: ''
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
      this.dataForm = { id: '',
        informationScreenContent: '',
        highPitchedHornContent: '',
        visibility: '',
        roadStatus: '',
        weatherState: '',
        bootScreenInformation: '',
        sort: '' }
    },
    continueAdd () {
      if (this.isAdd) {
        doAdd(this.dataForm).then(res => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.dataForm = { id: '',
            informationScreenContent: '',
            highPitchedHornContent: '',
            visibility: '',
            roadStatus: '',
            weatherState: '',
            bootScreenInformation: '',
            sort: '' }
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
          // this.$parent.dialogFormVisible = false
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
          // this.$parent.dialogFormVisible = false
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
