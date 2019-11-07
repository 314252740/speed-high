<template>
  <el-dialog :title="isAdd ? '新增交通事故' : '修改交通事故'" :closeOnClickModal="false" :visible.sync="visible" width="1200px" label-width="80px" @open="changeHeight" @close="hide">
    <div class="container">
      <div class="mapCont" ref="dialogMap">
        <tile-map ref="map"></tile-map>
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
            <!--<el-form-item class="boxInput inlineBoxnth" label="事故位置:" prop="subordinateHighSpeed" :inline-message="false">
              <el-select v-model="dataForm.subordinateHighSpeed" clearable placeholder="请选择道路名称" style="width:153px">
                <el-option
                  v-for="item in roadOptions"
                  :key="item.name"
                  :label="item.label"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>-->

            <el-form-item class="boxInput inlineBoxnth" label="事故位置:" prop="subordinateHighSpeed" :inline-message="false">
            <el-select v-model="dataForm.subordinateHighSpeed" placeholder="请选择道路" style="width:133px" required="true" autocomplete="off" @change="selectRoadStart(dataForm.subordinateHighSpeed)">
              <el-option
                v-for="item in lists"
                :key="item.index"
                :label="item.name"
                :value="item.key">
              </el-option>
            </el-select>
            </el-form-item>
            <el-form-item class="boxInput inlineBox" prop="pile" :inline-message="false">
              <el-input clearable placeholder="请输入桩号公里数" v-model="dataForm.pile" style="width:153px"></el-input>
            </el-form-item>
            <el-form-item class="boxInput inlineBox" prop="distance" :inline-message="false">
              <el-input
                clearable
                placeholder="请输入具体米数"
                v-model.number="dataForm.distance"
                style="width:153px"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item class="boxInput" label="事故类型:" prop="accidentType">
              <el-select
                clearable
                v-model="dataForm.accidentType"
                placeholder="请选择事故类型"
                style="width:188px;"
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
          <el-form-item prop="orgId" label="所属辖区:" class="boxInput">
            <el-select
                v-model="dataForm.orgId"
                clearable
                placeholder="请选择所属辖区"
                style="width:188px;"
              >
              <el-option
                v-for="item in JurisdictionOptions"
                :key="item.name"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" style="margin-bottom:7px;">
          <!--<el-form-item label="方向:" prop="direction" label-width="78px">
            <el-select v-model="dataForm.direction" required="true" autocomplete="off" placeholder="方向" style="width:188px;">
              <el-option
                v-for="item in direction"
                :key="item.label"
                :label="item.label"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item label="道路起点" label-width="82px" prop="roadStart">
            <el-select v-model="dataForm.roadStart" placeholder="请选择道路起点" required="true" autocomplete="off" style="width:188px;" @change="changeRoadStart(dataForm.roadStart)">
              <el-option
                v-for="item in options1"
                :key="item.index"
                :label="item.name"
                :value="item.key">
              </el-option>
            </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="财产损失:" label-width="81px" prop="propertyDamage">
            <el-input v-model.number="dataForm.propertyDamage" oninput = "value=value.replace(/[^\d.]/g,'')" autocomplete="off" placeholder="财产损失情况" style="width:188px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin-bottom:7px;">
        <el-col :span="12">
          <el-form-item label="经度:" prop="longitude" label-width="81px">
            <el-input clearable v-model="dataForm.longitude" oninput = "value=value.replace(/[^\d.]/g,'')" style="width:188px;" required="true" minlength="6" maxlength="20" autocomplete="off" placeholder="请输入经度"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="纬度:" prop="latitude" label-width="81px">
            <el-input clearable v-model="dataForm.latitude" oninput = "value=value.replace(/[^\d.]/g,'')" style="width:188px;" required="true" minlength="6" maxlength="20"  autocomplete="off" placeholder="请输入纬度"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item class="boxInput" label="死亡人数:" label-width="81px" prop="casualties">
            <el-input clearable placeholder="请输入死亡人数" v-model.number="dataForm.casualties" style="width:188px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="boxInput" label="受伤人数:" label-width="81px" prop="injureNumber">
            <el-input clearable placeholder="请输入受伤人数" v-model.number="dataForm.injureNumber" style="width:188px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="开始时间:" class="container boxInput" prop="accidentTime">
        <el-date-picker
          clearable
          v-model="accidentTime"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
          style="width:231px"
        ></el-date-picker>
        <el-time-picker
          clearable
          v-model="hours"
          style="width:231px"
          :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
          placeholder="任意时间点"
        ></el-time-picker>
      </el-form-item>
      <!-- <el-form-item class="textDox boxInput" label="事故描述:" prop="accidentNote">
        <el-input
          clearable
          type="textarea"
          show-word-limit="true"
          maxlength="150"
          :rows="2"
          placeholder="请输入内容(150字范围内)"
          v-model="dataForm.accidentNote"
          style="width:463px;"
        ></el-input>
      </el-form-item> -->
      <el-form-item class="textDox boxInput" label="事故描述:" prop="accidentNote">
        <el-input
          clearable
          type="textarea"
          :show-word-limit="true"
          maxlength="150"
          @change='changeDes'
          :autosize="{ minRows: 1, maxRows: 2}"
          placeholder="请输入内容(150字范围内)"
          v-model="note"
          style="width:231px;"
        ></el-input>
        <el-select v-model="accidentNote" :multiple-limit="1" @change="changeDes" style="width:231px;" multiple placeholder="请选择交通事故形态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
       <el-form-item class="textDox boxInput" label="协助情况:" prop="assistance" label-width="81px">
        <el-input
          clearable
          type="textarea"
          show-word-limit="true"
          maxlength="150"
          :autosize="{ minRows: 1, maxRows: 2}"
          placeholder="请输入内容(150字范围内)"
          v-model="dataForm.assistance"
          style="width:466px;"
        ></el-input>
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
import { doAdd, doUpdate } from '@/api/accident'
import { selectRoadStart } from '@/api/road'
import { mapGetters } from 'vuex'
export default {
  props: {
    roadOptions: {
      type: Array,
      default: () => []
    },
    typeOptions: {
      type: Array,
      default: () => []
    },
    JurisdictionOptions: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters(['roadList']),
    lists () {
      return this.roadList
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
      note: null,
      options2: [],
      options1: [],
      accidentNote: [],
      // 故障，刮擦，追尾，自然，侧翻，撞护栏
      options: [{
        value: '故障',
        label: '故障'
      }, {
        value: '刮擦',
        label: '刮擦'
      }, {
        value: '追尾',
        label: '追尾'
      }, {
        value: '自然',
        label: '自然'
      }, {
        value: '侧翻',
        label: '侧翻'
      }, {
        value: '撞护栏',
        label: '撞护栏'
      } ],
      status: '显示',
      type: 'success',
      icon: 'el-icon-view',
      loading: false,
      visible: false,
      isAdd: false,
      pickerOptions: {
        disabledDate (value) {
          if (Date.now() <= value) {
            return true
          }
          return false
        }
      },
      accidentTime: '',
      hours: '',
      dataForm: {
        id: '',
        subordinateHighSpeed: '', // 道路名称
        pile: '', // 桩号
        distance: null, // 米
        accidentType: '轻微事故', // 事件类型
        accidentNote: '', // 事件描述
        casualties: 0, // 死亡人数
        injureNumber: 0, // 受伤人数
        accidentTime: new Date(), // 开始日期
        hours: new Date(), // 开始时间
        longitude: '', // 经度
        latitude: '', // 纬度
        subordInate: '', // 所属高速
        direction: '', // 方向
        propertyDamage: null, // 财产所属
        assistance: '', // 协助情况
        orgId: '' // 所属辖区
      },
      rules: {
        subordinateHighSpeed: [
          { required: true, message: '请输入事故位置', trigger: 'change' }
        ],
        pile: [
          { required: true, message: '请输入事故位置', trigger: 'blur' }
        ],
        distance: [
          { required: false, type: 'number', message: '请输入米数(m)', trigger: 'blur' }
        ],
        accidentType: [
          { required: true, message: '请选择事故类型', trigger: 'change' }
        ],
        casualties: [
          { required: false, type: 'number', message: '请输入伤亡人数', trigger: 'blur' }
        ],
        injureNumber: [
          { required: false, type: 'number', message: '请输入伤亡人数', trigger: 'blur' }
        ],
        accidentNote: [
          { required: true, message: '请描述事故内容', trigger: 'blur' }
        ],
        accidentLevel: [
          { required: true, message: '请选择事故等级', trigger: 'change' }
        ],
        // subordInate: [
        //   { required: true, message: "请输入所属高速", trigger: "blur" }
        // ],
        direction: [
          { required: true, message: '请输入方向', trigger: 'change' }
        ],
        propertyDamage: [
          { type: 'number', required: false, message: '请输入财产损失情况', trigger: 'blur' }
        ],
        orgId: [
          { required: true, message: '请输入所属大队', trigger: 'blur' }
        ],
        accidentTime: [
          {
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
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
      point: {},
      direction: [
        { name: '1', label: '上行' },
        { name: '0', label: '下行' }
      ]
    }
  },
  components: {
    tileMap
  },
  methods: {
    changeDes () {
      this.dataForm.accidentNote = this.note + ',' + this.accidentNote.join()
    },
    /* selectOne: function (event) {
      this.$parent.query.search_type = event
    }, */
    cancel: function () {
      this.resetForm()
    },
    resetForm () {
      this.visible = false
      this.$refs['form'].resetFields()
      this.dataForm = {
        id: '',
        subordinateHighSpeed: '', // 道路名称
        locationInformation: '', // 桩号加米
        pile: '', // 桩号
        distance: 0, // 米
        accidentType: '轻微事故', // 事件类型
        accidentNote: '', // 事件描述
        casualties: 0, // 死亡人数
        injureNumber: 0, // 受伤人数
        accidentTime: null, // 开始日期
        hours: null, // 开始时间
        longitude: '', // 经度
        latitude: '', // 纬度
        // subordInate: "", //
        direction: '', // 方向
        propertyDamage: '', // 财产损失
        assistance: '', // 协助情况
        orgId: '' // 所属辖区
        // orgId: "",
        // policeArrivedTime: "",
        // accidentLevel: "轻微事故", // 事故等级
        // processingMethod: "", // 事件处理方法
        // continuousTime: null,
        // organization: "", // 组织机构
      }
    },
    selectRoadStart (roadId) {
      selectRoadStart(roadId)
        .then(res => {
          this.options1 = res
        })
        .catch(err => console.log(err))
    },
    continueAdd () {
      // var t = this.dataForm.type
      if (this.isAdd) {
        doAdd(this.dataForm).then(res => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.dataForm = {
            id: '',
            subordinateHighSpeed: '', // 道路名称
            locationInformation: '', // 桩号加米
            pile: '', // 桩号
            distance: 0, // 米
            accidentType: '轻微事故', // 事件类型
            accidentNote: '', // 事件描述
            casualties: 0, // 死亡人数
            injureNumber: 0, // 受伤人数
            accidentTime: null, // 开始日期
            hours: null, // 开始时间
            longitude: '', // 经度
            latitude: '', // 纬度
            // subordInate: "", //
            direction: '', // 方向
            propertyDamage: '', // 财产损失
            assistance: '', // 协助情况
            orgId: '' // 所属辖区
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
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            this.dataForm.distance = this.dataForm.distance + 'm'
            this.dataForm.locationInformation = this.dataForm.pile + '+' + this.dataForm.distance
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
        this.dataForm.accidentTime = formatTime('yyyy-MM-dd hh:mm:ss', 'yyyy-MM-dd', this.accidentTime)
        if (this.hours) {
          this.dataForm.hours = formatTime('yyyy-MM-dd hh:mm:ss', 'hh:mm:ss', this.hours)
        }
        this.dataForm.distance = this.dataForm.distance + 'm'
        this.dataForm.locationInformation = this.dataForm.pile + '+' + this.dataForm.distance
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
        this.$refs.map.startDrawPoint('trafficAccident', this.setLnglat, [this.dataForm.longitude, this.dataForm.latitude])
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
    changeRoadStart (roadStart) {
      if (this.dataForm.subordinateHighSpeed !== null) {
        selectRoadStart(this.dataForm.subordinateHighSpeed)
          .then(res => {
            this.options1 = res
            if (this.dataForm.direction != null && res.length === 2) {
              this.dataForm.roadStart = roadStart
            }
          })
          .catch(err => console.log(err))
      }
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

        if (this.dataForm.subordinateHighSpeed != null) {
          selectRoadStart(this.dataForm.subordinateHighSpeed)
            .then(res => {
              this.options1 = res
              if (this.dataForm.direction !== null && res.length === 2) {
                this.dataForm.roadStart = res[this.dataForm.direction].name
              }
            })
            .catch(err => console.log(err))
        }
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
  box-sizing: border-box;
  float: left;
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
  width: 235px;
  display: inline-block;
}
.inlineBox{
  display: inline-block;
}
</style>
