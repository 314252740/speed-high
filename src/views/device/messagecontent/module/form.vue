<template>
  <el-dialog :title="isAdd ? '新增信息屏内容信息' : '修改信息屏号内容信息'" :closeOnClickModal="false" :visible.sync="visible" width="900px" label-width="80px" @open="changeHeight" @close="hide">
    <div class="container">
      <div class="mapCont" ref="dialogMap">
        <tile-map  ref="map"></tile-map>
        <el-button :type="type" :icon="icon" circle class="button" @click.stop="trigger" :title="status"></el-button>
      </div>
      <div class="mapCont" ref=dialogForm>
        <el-form ref="form" :model="dataForm" :rules="rules" size="small" label-position="right" label-width="100px" >
          <el-row>
            <el-col :span="12">
              <el-form-item label="类型" prop="type">
                <el-input v-model="dataForm.type" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="录入人" prop="enters">
                <el-input v-model="dataForm.enters" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="审核人" prop="reviewer">
                <el-input v-model="dataForm.reviewer" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="审核状态" prop="revieStatus">
                <el-input v-model="dataForm.revieStatus" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-select v-model="dataForm.messageId" placeholder="请选择信息屏" required="true" autocomplete="off" @change="rcod()">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-col :span="12">
              <el-form-item label="id" prop="messageId">
                <el-input v-model="dataForm.messageId" required="true" minlength="6" maxlength="20"  autocomplete="off" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>

          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="内容" prop="content">
                <el-input v-model="dataForm.content" required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
       </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="doSubmit">确 定</el-button>
      <el-button @click="cancel()">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { doAdd, doUpdate } from '@/api/messagecontent'
import request from '@/utils/request'
import tileMap from '@/components/map/tileMap'// 初始化瓦片地图
export default {
  components: {
    tileMap
  },
  data () {
    return {
      status: '桩号显示中',
      type: 'success',
      icon: 'el-icon-view',
      // 道路信息 选择
      options: [],
      loading: false,
      visible: false,
      isAdd: false,
      dataForm: { id: '', type: '', reviewer: '', revieStatus: '', enters: '', messageId: '', content: '' },
      rules: {
        content: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个文字', trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    trigger () {
      if (this.type === 'danger') {
        this.type = 'success'
        this.status = '桩号显示中'
        this.$refs.map.showLayer('stakeNum', true)
      } else {
        this.type = 'danger'
        this.status = '桩号隐藏中'
        this.$refs.map.showLayer('stakeNum', false)
      }
    },
    addStakeNumLayer () {
      this.$nextTick(() => {
        this.$refs.map.addLayer('stakeNum')
      })
    },
    rcod () {
      // 定义bar为roadCode值
      let bar = this.dataForm.messageId
      console.log(this.dataForm.messageId)
      // 定义数组
      // eslint-disable-next-line no-unused-vars
      var obj = {}
      // 查找想对应的name值
      obj = this.options.find(function (item) {
        return item.code === bar
      })
    },
    startDraw () {
      let that = this
      request({
        url: 'module/messageinfos',
        method: 'get',
        params: {
        }
      }).then(res => {
        that.options = res.data.result
      })
      this.$nextTick(() => {
        this.$refs.map.startDrawPoint('sensor', this.setLnglat, [this.dataForm.longitude, this.dataForm.latitude])
      })
    },
    setLnglat (point) {
      this.dataForm.longitude = point[0]
      this.dataForm.latitude = point[1]
    },
    cancel: function () {
      this.resetForm()
    },
    resetForm () {
      this.visible = false
      this.$refs['form'].resetFields()
      this.dataForm = { id: '', type: '', reviewer: '', revieStatus: '', enters: '', messageId: '', content: '' }
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
    },
    // 自适应高度
    changeHeight () {
      this.$nextTick(() => {
        this.$refs.dialogMap.style.height = this.$refs.dialogForm.offsetHeight + 'px'
        // 重新加载地图
        this.$refs.map.resetMap()
        this.$refs.map.addLayer('stakeNum')
        this.type = 'success'
        this.status = '桩号显示中'
      })
    },
    hide () {
      this.$refs.map.cleanLayer('stakeNum')
    }
  }
}

</script>
<style scoped>
.container{
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.mapCont{
  height: inherit;
  width: 50%;
  float: left;
  position: relative;
}
.button{
  position: absolute;
  right: 6px;
  bottom: 6px;
}
</style>
