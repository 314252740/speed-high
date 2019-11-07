<template>
  <el-dialog :title="isAdd ? '新增卡口路段信息' : '修改卡口路段信息'" :closeOnClickModal="false" :visible.sync="visible" width="1200px" label-width="80px" top="30px" @close="hide" @open="changeHeight">
    <div class="container">
      <div class="mapCont" ref="dialogMap">
        <tile-map  ref="map"></tile-map>
        <el-button :type="type" :icon="icon" circle class="button" @click.stop="trigger" :title="status"></el-button>
      </div>
      <div class="mapCont mapConts" ref=dialogForm>
        <el-form ref="form" :model="dataForm" :rules="rules" size="small" label-position="right" label-width="100px" >
          <el-row>
            <el-col :span="24">
              <!-- <el-form-item label="起点卡口名称" prop="startCloudId" :inline="true">
                  <el-input clearable v-model="dataForm.startCloudId" required="true" width="210px" minlength="2" maxlength="20" autocomplete="off" ></el-input>
              </el-form-item> -->
              <el-form-item label="起点卡口名称" prop="startCloudId" :inline="true">
                <el-select @visible-change="positionCrossDev($event, 'start')" clearable v-model="dataForm.startCloudId" @change="chooseCrossDev('start')" placeholder="请选择卡口起点" required="true" style="width:100%" minlength="2" maxlength="20" autocomplete="off">
                  <el-option
                    v-for="item in crossDevList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="终点卡口名称" prop="endCloudId" :inline="true">
                <el-select @visible-change="positionCrossDev($event, 'end')" clearable v-model="dataForm.endCloudId" @change="chooseCrossDev('end')" placeholder="请选择卡口起点" required="true" style="width:100%" minlength="2" maxlength="20" autocomplete="off">
                  <el-option
                    v-for="item in crossDevList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="距离（公里）" prop="distance" :inline="true">
                  <el-input clearable v-model="dataForm.distance" required="true" width="210px" minlength="2" maxlength="20" autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="最小通行时间（分钟）" prop="minTravelTime" :inline="true">
                  <el-input clearable v-model="dataForm.minTravelTime" placeholder="单位为分钟" required="true" width="210px" minlength="2" maxlength="20" autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="最大通行时间（分钟）" prop="maxTravelTime" :inline="true">
                  <el-input clearable v-model="dataForm.maxTravelTime" placeholder="单位为分钟" required="true" width="210px" minlength="2" maxlength="20" autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="路段类型" prop="type">
                <el-select clearable v-model="dataForm.type" placeholder="请选择卡口类型" style="width:100%">
                  <el-option
                    v-for="item in typeOptions"
                    :key="item.index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
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
import { doAddtr, doUpdatetr } from '@/api/bayonet'
import MapManager from '@/components/map/MapManager.js'
import tileMap from '@/components/map/tileMap'// 初始化瓦片地图
export default {
  components: {
    tileMap
  },
  data () {
    return {
      crossDevList: [],
      featureStart: null,
      featureEnd: null,
      typeOptions: [{
        value: '0',
        label: '收费站'
      }, {
        value: '1',
        label: '收费站'
      }, {
        value: '2',
        label: '应急车道'
      }, {
        value: '3',
        label: '主线卡口'
      }],
      status: '显示',
      type: 'success',
      icon: 'el-icon-view',
      loading: false,
      visible: false,
      isAdd: false,
      dataForm: {
        startCloudId: '', // 起点卡口名称
        endCloudId: '', // 终点卡口名称
        distance: '', // 距离
        minTravelTime: '', // 最小通行时间
        maxTravelTime: '', // 最大通行时间
        type: '' // 路段类型
      },
      rules: {
        // name: [
        //   { required: true, message: "请输入名称", trigger: "blur" },
        //   { min: 3, max: 50, message: "长度在 3 到 50 个文字", trigger: "blur" }
        // ]
      }

    }
  },
  methods: {
    trigger () { // 桩号图层显示/隐藏开关
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
    hide () { // 弹出层隐藏回调函数
      this.$refs.map.cleanLayer('stakeNum')
      this.cleanPoint('startLayer', this.featureStart)
      this.cleanPoint('endlLayer', this.featureEnd)
    },
    startDraw () { // 初始化图层，绘制道路
      this.$nextTick(() => {
        this.$refs.map.drawRoad(this.setPoints, this.dataForm.geom, 'crossdev', (feautres) => {
          if (feautres) {
            this.getCrossdevList(feautres)
            this.setCenter()
          }
        })
      })
    },
    setPoints (wktstr) {
      this.dataForm.geom = wktstr
    },
    cancel: function () {
      this.resetForm()
    },
    resetForm () { // 重置表单
      this.visible = false
      this.$refs['form'].resetFields()
      this.dataForm = {
        startCloudId: '', // 起点卡口名称
        endCloudId: '', // 终点卡口名称
        distance: '', // 距离
        minTravelTime: '', // 最小通行时间
        maxTravelTime: '', // 最大通行时间
        type: '' // 路段类型
      }
    },
    doSubmit () { // 添加
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            doAddtr(this.dataForm).then(res => {
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
    doEdit () { // 编辑
      if (!this.isAdd) {
        doUpdatetr(this.dataForm).then(res => {
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
    cleanPoint (type, feautres) { // 清除点图层
      if (feautres) {
        MapManager.cleanCircleLayer2(type, feautres)
        feautres = null
        if (type === 'startLayer') {
          this.featureStart = null
        } else {
          this.featureEnd = null
        }
      }
    },
    markPosition (obj, type) { // 标记卡口位置图层
      if (!obj || !obj.longitude || !obj.latitude) return
      if (type === 'start') {
        this.cleanPoint('startLayer', this.featureStart)
        this.featureStart = MapManager.addPoint('startLayer', [
          parseFloat(obj.longitude),
          parseFloat(obj.latitude)
        ])
      } else if (type === 'end') {
        this.cleanPoint('endlLayer', this.featureEnd)
        this.featureEnd = MapManager.addPoint('endlLayer', [
          parseFloat(obj.longitude),
          parseFloat(obj.latitude)
        ])
      }
    },
    getCrossdevList (feautres) { // 获取下拉列表并显示卡口位置
      if (feautres.length === 0) return
      let arr = []
      for (let i = 0; i < feautres.length; i++) {
        feautres[i] = feautres[i].getProperties()
        feautres[i].longitude = feautres[i].x // 经度（大）
        feautres[i].latitude = feautres[i].y // 纬度（小）
        arr.push(feautres[i])
      }
      this.crossDevList = arr
      this.start = this.findIndex(arr, this.dataForm.startCloudId)
      this.markPosition(arr[this.start], 'start')
      this.end = this.findIndex(arr, this.dataForm.endCloudId)
      this.markPosition(arr[this.end], 'end')
    },
    findIndex (feautres, name) { // 查找下标
      let index = feautres.findIndex(function (elem) {
        return elem.name === name
      })
      return index
    },
    changeHeight () { // 弹出层显示回调函数(自适应高度)
      this.$nextTick(() => {
        this.$refs.dialogMap.style.height = this.$refs.dialogForm.offsetHeight + 'px'
        // 重新加载地图
        this.$refs.map.resetMap()
        this.$refs.map.addLayer('stakeNum')
        this.status = '桩号显示中'
        this.type = 'success'
      })
    },
    chooseCrossDev (type) { // 新卡口点位置图层添加
      if (type === 'start') {
        this.start = this.findIndex(this.crossDevList, this.dataForm.startCloudId)
        this.markPosition(this.crossDevList[this.start], 'start')
      } else {
        this.end = this.findIndex(this.crossDevList, this.dataForm.endCloudId)
        this.markPosition(this.crossDevList[this.end], 'end')
      }
    },
    positionCrossDev (callback, type) { // 列表显示，隐藏回调函数
      if (callback && type === 'start') {
        this.comfirmPosition(type)
      } else if (callback && type === 'end') {
        this.comfirmPosition(type)
      }
    },
    comfirmPosition (type) { // 划过下拉列表显示hover项目图层的位置
      let that = this
      document.getElementsByClassName('el-select-dropdown__list')[3].onmouseover = function (event) {
        let e = event || window.event
        let name = e.fromElement.innerHTML
        let target = e.fromElement.nodeName.toUpperCase()
        if (target === 'li' || target === 'span') {
          name = name.replace(/<.*?>/ig, '')
          let index = that.findIndex(that.crossDevList, name)
          that.markPosition(that.crossDevList[index], type)
        }
      }
      document.getElementsByClassName('el-select-dropdown__list')[3].onmouseout = function (event) {
        that.markPosition(that.crossDevList[that.start], 'start')
        that.markPosition(that.crossDevList[that.end], 'end')
      }
    },
    setCenter () {
      if (this.crossDevList[this.start]) {
        MapManager.zoomCenter([parseFloat(this.crossDevList[this.start].longitude), parseFloat(this.crossDevList[this.start].latitude)])
      } else if (this.crossDevList[this.end]) {
        MapManager.zoomCenter([parseFloat(this.crossDevList[this.end].longitude), parseFloat(this.crossDevList[this.end].latitude)])
      } else {
        MapManager.zoomHome()
      }
    }
  }
}

</script>
<style scoped>
.container{
  height: 500px;
  width: 100%;
  overflow: hidden;
}
.mapCont{
  height: inherit;
  width: 70%;
  float: left;
  position: relative;
}
.mapConts{
  width: 30%;
}
.button{
  position: absolute;
  right: 6px;
  bottom: 6px;
}
</style>
