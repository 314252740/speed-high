<template>
  <el-dialog :title="isAdd ? '新增施工养护' : '修改施工养护'" :closeOnClickModal="false" :visible.sync="visible" width="1200px" label-width="80px" @open="changeHeight" @close="hide">
    <div class="container">
      <div class="mapCont" ref="dialogMap">
        <tile-map  ref="map"></tile-map>
        <el-button :type="type" :icon="icon" circle class="button" @click.stop="trigger" :title="status"></el-button>
      </div>
      <div class="mapCont mapContRight" ref=dialogForm>
       <el-form
      :rules="rules"
      :inline-message="true"
      ref="form"
      :model="dataForm"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="24">
           <el-form-item class="boxInput inlineBoxnth" label="事故位置:" prop="roadName" :inline-message="false">
            <el-select v-model="dataForm.roadName" clearable placeholder="请选择道路名称" style="width:152px">
              <el-option
                v-for="item in roadOptions"
                :key="item.name"
                :label="item.label"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="boxInput inlineBox" prop="pile" :inline-message="false">
            <el-input clearable placeholder="请输入桩号公里数" v-model="dataForm.pile" style="width:154px"></el-input>
          </el-form-item>
          <el-form-item class="boxInput inlineBox" prop="distance" :inline-message="false">
            <el-input
            clearable
            placeholder="请输入具体米数"
            v-model.number="dataForm.distance"
            style="width:154px"
          ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="constructionType" label="养护类型:" class="boxInput">
            <el-select
              v-model="dataForm.constructionType"
              clearable
              placeholder="请选择施工养护类型"
              style="width:188px"
            >
              <el-option
                v-for="item in typeOptions"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
           <el-form-item prop="orgId" label="组织机构:" class="boxInput">
            <el-select
              v-model="dataForm.orgId"
              clearable
              placeholder="请选择组织机构"
              style="width:188px"
            >
              <el-option
                v-for="item in organizationOptions"
                :key="item.name"
                :label="item.label"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="经度:" prop="longitude" label-width="82px">
            <el-input clearable v-model.number="dataForm.longitude" style="width:188px" required="true" minlength="6" maxlength="20" autocomplete="off" placeholder="请输入经度"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="纬度:" prop="latitude" label-width="82px">
            <el-input clearable v-model.number="dataForm.latitude" style="width:188px" required="true" minlength="6" maxlength="20"  autocomplete="off" placeholder="请输入纬度"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-form-item prop="constructionDes" label="详细描述:" class="boxInput">
        <el-input
          type="textarea"
          show-word-limit="true"
          maxlength="150"
          :rows="2"
          placeholder="请输入内容（150字范围内）"
          v-model="dataForm.constructionDes"
          style="width:463px;"
        ></el-input>
      </el-form-item> -->
      <el-form-item prop="constructionDes" label="详细描述:" class="boxInput" :inline-message="true">
        <el-input
          type="textarea"
          :show-word-limit="true"
          maxlength="150"
          :autosize="{ minRows: 1, maxRows: 2}"
          placeholder="请输入内容（150字范围内）"
          v-model="note"
          @change='changeDes'
          style="width:232px;"
        ></el-input>
        <!-- <el-select v-model="constNote" :multiple-limit="2" @change="changeDes" style="width:232px;" multiple placeholder="请选择施工养护标签">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select> -->
        <el-select v-model="constNote" clearable @change="changeDes" placeholder="请选择施工养护标签">
          <el-option
            v-for="item in options"
            :key="item.index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="startTime" label="开始时间:" class="boxInput">
        <el-date-picker
          clearable
          v-model="startTime"
          type="date"
          placeholder="选择日期"
          style="width:232px"
          :picker-options="pickerOptions"
        ></el-date-picker>
        <el-time-picker
          clearable
          v-model="hours"
          style="width:232px"
          :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
          placeholder="任意时间点"
        ></el-time-picker>
        <!-- </div>
        </div>-->
      </el-form-item>
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
import tileMap from '@/components/map/tileMap'// 初始化瓦片地图
import { formatTime } from '@/utils/format'
import { doAdd, doUpdate } from '@/api/construction'
export default {
  components: {
    tileMap
  },
  props: {
    typeOptions: {
      type: Array,
      required: true,
      default: () => []
    },
    organizationOptions: {
      type: Array,
      required: true,
      default: () => []
    },
    roadOptions: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data () {
    let longitudeCode = (rule, value, callback) => {
      let reg = /^(\+|-)?(([1-9]?[0-9]|1[0-7][0-9])(\.[0-9]+)?|180)$/
      if (!reg.test(value)) {
        callback(new Error('-180 < 经度 <180'))
      } else {
        callback()
      }
    }
    let latitudeCode = (rule, value, callback) => {
      let reg = /^-?((0|[1-8]?[0-9]?)(([.][0-9]{1,9})?)|90(([.][0]{1,9})?))$/
      if (!reg.test(value)) {
        callback(new Error('-90 < 纬度 <90'))
      } else {
        callback()
      }
    }
    return {
      options: [{
        value: '小修工程',
        label: '小修工程'
      }, {
        value: '中修工程',
        label: '中修工程'
      }, {
        value: '大修工程',
        label: '大修工程'
      }, {
        value: '改善工程',
        label: '改善工程'
      } ],
      constNote: [],
      note: null,
      pickerOptions: {
        disabledDate (value) {
          if (Date.now() <= value) {
            return true
          }
          return false
        }
      },
      startTime: '',
      hours: '',
      status: '显示',
      type: 'success',
      icon: 'el-icon-view',
      loading: false,
      visible: false,
      isAdd: false,
      rules: {
        roadName: [
          { required: true, message: '请输入事故位置', trigger: 'change' }
        ],
        pile: [
          { required: true, message: '请输入事故位置', trigger: 'blur' }
        ],
        distance: [
          { type: 'number', message: '请输入米数(m)', trigger: 'blur' }
        ],
        constructionType: [
          { required: true, trigger: 'change', message: '请选择类型' }
        ],
        constructionDes: [
          { required: true, trigger: 'blur', message: '请输入详情描述' }
        ],
        startTime: [
          { required: true, trigger: 'change', message: '请选择录入日期' }
        ],
        hours: [
          { required: true, trigger: 'change', message: '请选择录入时间' }
        ],
        orgId: [
          { required: true, trigger: 'change', message: '请选择组织机构' }
        ],
        longitude: [
          { required: true, message: '请输入经度', trigger: 'blur' },
          // eslint-disable-next-line standard/object-curly-even-spacing
          { validator: longitudeCode, trigger: 'blur' }
        ],
        latitude: [
          { required: true, message: '请输入纬度', trigger: 'blur' },
          // eslint-disable-next-line standard/object-curly-even-spacing
          { validator: latitudeCode, trigger: 'blur' }
        ]
      },
      dataForm: {
        roadName: '',
        pile: '',
        distance: null,
        constructionDes: '', // 养护描述
        startTime: new Date(), // 养护事件日期
        hours: new Date(), // 养护开始时间
        constructionType: '', // 养护事件类型
        orgId: '', // 组织机构
        longitude: '', // 经度
        latitude: '' // 纬度
      }
    }
  },
  methods: {
    changeDes () {
      this.dataForm.constructionDes = this.constNote
    },
    selectOne: function (event) {
      this.$parent.query.search_type = event
    },
    cancel: function () {
      this.resetForm()
    },
    resetForm () {
      this.visible = false
      this.$refs['form'].resetFields()
      this.dataForm = {
        roadName: '',
        pile: '',
        distance: null,
        constructionDes: '', // 养护描述
        startTime: new Date(), // 养护事件日期
        hours: new Date(), // 养护开始时间
        constructionType: '', // 养护事件类型
        orgId: '', // 组织机构
        longitude: '', // 经度
        latitude: '' // 纬度
      }
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
          this.dataForm = {
            roadName: '',
            pile: '',
            distance: null,
            constructionDes: '', // 养护描述
            startTime: new Date(), // 养护事件日期
            hours: new Date(), // 养护开始时间
            constructionType: '', // 养护事件类型
            orgId: '', // 组织机构
            longitude: '', // 经度
            latitude: '' // 纬度
          }
          this.$parent.page = 0
          this.isAdd = true
          this.$parent.initData()
        }).catch(err => {
          console.log('error:' + err)
          console.log(err)
        })
      }
    },
    doSubmit () {
      // console.log(this.dataForm.hours)
      // this.dataForm.hours = formatTime("yyyy-MM-dd hh:mm:ss","hh:mm:ss",this.dataForm.hours),
      // console.log(this.dataForm.hours)
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            this.dataForm.distance = this.dataForm.distance + 'm'
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
              this.$parent.initData()
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
        this.dataForm.distance = this.dataForm.distance + 'm'
        this.dataForm.startTime = formatTime('yyyy-MM-dd hh:mm:ss', 'yyyy-MM-dd', this.startTime)
        if (this.hours) {
          this.dataForm.hours = formatTime('yyyy-MM-dd hh:mm:ss', 'hh:mm:ss', this.hours)
        }
        doUpdate(this.dataForm).then(res => {
          this.resetForm()
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.loading = false
          this.$parent.dialogFormVisible = false
          this.$parent.initData()
        }).catch(err => {
          console.log('error:' + err)
          console.log(err)
        })
      }
    },
    startDraw () {
      this.$nextTick(() => {
        this.$refs.map.startDrawPoint('maintenance', this.setLnglat, [this.dataForm.longitude, this.dataForm.latitude])
      })
    },
    setLnglat (point) {
      this.dataForm.longitude = point[0]
      this.dataForm.latitude = point[1]
    },
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
    hide () {
      this.$refs.map.cleanLayer('stakeNum')
      this.$refs['form'].resetFields()
    },
    // 自适应高度
    changeHeight () {
      this.$nextTick(() => {
        this.$refs.dialogMap.style.height = this.$refs.dialogForm.offsetHeight + 'px'
        // 重新加载地图
        this.$refs.map.resetMap()
        this.$refs.map.addLayer('stakeNum')
        this.status = '桩号显示中'
        this.type = 'success'
      })
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
  box-sizing: border-box;
  position: relative;
}
.button{
  position: absolute;
  right: 6px;
  bottom: 6px;
}
.mapContRight{
  padding-left: 20px;
}
.inlineBoxnth{
  display: inline-block;
  width:234px;
}
.inlineBox{
  display: inline-block;
}
</style>
