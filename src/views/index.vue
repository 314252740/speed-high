<template>
<!-- <div>我是主页面</div> -->
  <div class="mainBox">
    <div class="flexBox">
      <div class="item">
        <p class="title">设备状况统计</p>
        <div class="box">
          <myEcharts ref="WorkingState" :options="WorkingState"></myEcharts>
        </div>
      </div>
      <div class="item">
        <p class="title">设备分布统计</p>
        <div class="box">
          <myEcharts ref="EquipmentDistribution" :options="EquipmentDistribution"></myEcharts>
        </div>
      </div>
      <div class="item">
        <p class="title">能见度等级统计(年)</p>
        <div class="box">
          <mytable
            :options="options"
            :columns="columns"
            :operates="operates"
            :list="list"
           >
          </mytable>
        </div>
      </div>
    </div>
    <div class="item" style="width:100%">
      <p class="title">综合统计</p>
      <div class="searchstyle">
        <search ref="search" :options="searchOptions2" @toQuery="getQuery2"></search>
      </div>
      <myEcharts ref="visibility" :options="visibility"></myEcharts>
    </div>
    <div class="item" style="width:100%">
      <p class="title">能见度，天气现象，路面温度综合统计</p>
      <search ref="search" :options="searchOptions" @toQuery="getQuery"></search>
      <myEcharts ref="getColligate" :options="getColligate"></myEcharts>
    </div>
  </div>
</template>

<script>
import myEcharts from '../components/echarts/echarts'
import mytable from '../components/table/table'
import search from '../components/table/search'
import { chartsConfig } from '../config/echartsType'
import { searchOptions, searchOptions2 } from '../config/searchConfig'
import {
  getWorkingState,
  getEquipmentDistribution,
  getVisibility,
  getVisibilityLevel,
  getColligate
  // getvisibilityForDistance,
  // getBadWeather,
  // getConditionStatistics,
  // getLedModifyHz,
  // getLedModifyWay
} from '@/api/statisticalAnalysis.js'
import { mapGetters } from 'vuex'
export default {
  name: 'index',
  components: {
    myEcharts, mytable, search
  },
  computed: {
    ...mapGetters(['areaList', 'sensorList'])
  },
  watch: {
    areaList (newValue, oldValue) {
      this.setOption(this.devDistributed)
    },
    sensorList (newValue, oldValue) {
      this.setSearchOption('传感器', newValue)
    }
  },
  data () {
    return {
      list: [
        { value: '≤200', value2: '<200', lastYear: '0', thisYear: '0' },
        { value: '≤500', value2: '<500', lastYear: '0', thisYear: '0' },
        { value: '≤1000', value2: '<1000', lastYear: '0', thisYear: '0' },
        { value: '>1000', value2: '>1000', lastYear: '0', thisYear: '0' }
      ],
      options: {// table 的参数
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: false, // 是否支持列表项选中功能
        height: '20px'
      },
      columns: [
        { prop: 'value', label: '能见度值(米)', align: 'center' },
        { prop: 'lastYear', label: '上一年周期(天)', align: 'center' },
        { prop: 'thisYear', label: '当月(天)', align: 'center' }
      ],
      operates: { list: [] },
      searchOptions2: searchOptions2, // 散点图
      searchOptions: searchOptions, // 折线图
      WorkingState: chartsConfig.WorkingState, // 设备状态
      EquipmentDistribution: chartsConfig.EquipmentDistribution, // 设备分布
      visibility: chartsConfig.visibility, // 能见度最低时段统计
      getColligate: chartsConfig.getColligate, // 能见度，天气现象，路面温度综合统计
      Distance: {}, // 能见度低于500专题统计
      BadWeather: {}, // 恶劣天气现象统计
      conditionStatistics: {}, // 恶劣道路状况统计
      LedModifyHz: {}, // 统计-led屏修改频率统计
      LedModifyWay: {}, // 统计-led屏修改方式对比
      devStatus: { // 设备状态
        requset: getWorkingState,
        option: chartsConfig.WorkingState.option,
        name: 'WorkingState',
        callBack: this.WorkingStateCallback,
        el: 'WorkingState'
      },
      devDistributed: { // 设备分布
        requset: getEquipmentDistribution,
        option: chartsConfig.EquipmentDistribution.option,
        name: 'EquipmentDistribution',
        callBack: this.devDistributedCallback,
        el: 'EquipmentDistribution'
      },
      devgetColligate: {
        requset: getColligate,
        option: chartsConfig.getColligate.option,
        name: 'getColligate',
        callBack: this.devgetColligateCallback,
        el: 'getColligate'
      },
      devvisibility: {
        requset: getVisibility,
        option: chartsConfig.visibility.option,
        name: 'visibility',
        callBack: this.getvisibilityCallback,
        el: 'visibility'
      },
      PoitConfig: {
        larain: 1,
        lsday: 3,
        lsfog: 2,
        lssnow: 0
      },
      maxDuration: 0
    }
  },
  methods: {
    getQuery2 (query) {
      this.setOption(this.devvisibility, query)
    },
    getQuery (query) {
      this.setOption(this.devgetColligate, query)
    },
    setSearchOption (name, obj) {
      if (!obj) return
      let that = this
      searchOptions.type.forEach((item, index, arr) => {
        if (item.name === name) {
          searchOptions.type[index].options = obj
        }
      })
      that.searchOptions = searchOptions
      this.$refs.search.setDefaultQuery()
    },
    // 获取设备状态
    getInfoList (callBack, params) { // 获取数据函数
      return callBack(params).then(res => {
        if (res.result === 'ok') {
          return res
        }
      }).catch(err => { console.error(err) })
    },
    WorkingStateCallback (obj, res) { // 设备状态数据处理
      obj.series[0].data = []
      obj.series[0].data.push(
        res.data.sensorYes ? res.data.sensorYes : 0,
        res.data.visibleYes ? res.data.visibleYes : 0,
        res.data.roadYes ? res.data.roadYes : 0,
        res.data.weatherYes ? res.data.weatherYes : 0
      )
      obj.series[1].data = []
      obj.series[1].data.push(
        res.data.sensorNo ? res.data.sensorNo : 0,
        res.data.visibleNo ? res.data.visibleNo : 0,
        res.data.roadNo ? res.data.roadNo : 0,
        res.data.weatherNo ? res.data.weatherNo : 0)
    },
    devDistributedCallback (obj, res) { // 设备状态数据处理
      obj.xAxis.data = []
      obj.series[0].data = []
      obj.series[1].data = []
      if (res.data.length === 0) return
      this.areaList.forEach((item) => {
        obj.xAxis.data.push(item.name)
        obj.series[0].data.push(res.data.sensor[item.key] ? res.data.sensor[item.key] : 0)
        obj.series[1].data.push(res.data.composite[item.key] ? res.data.composite[item.key] : 0)
      })
    },
    findIndex (params) {
      let index = this.sensorList.findIndex((item, index, arr) => {
        return item.key === params.senid
      })
      return index
    },
    devgetColligateCallback (obj, res, params) { // 能见度综合统计
      obj.xAxis[0].data = [0]
      obj.xAxis[1].data = ['/']
      obj.xAxis[2].data = ['/']
      obj.series.data = [0]
      obj.series.name = null
      obj.legend.data = []
      let index = this.findIndex(params)
      obj.legend.data.push(this.sensorList[index].name)
      obj.series.name = this.sensorList[index].name
      if (res.data.length === 0) return
      obj.xAxis[0].data = []
      obj.xAxis[1].data = []
      obj.xAxis[2].data = []
      obj.series.data = []
      obj.dataZoom[0].startValue = null
      obj.dataZoom[0].startValue = res.data[0].timeInsert ? res.data[0].timeInsert : null
      res.data.forEach((item, index, arr) => {
        obj.xAxis[0].data.push(item.timeInsert)
        obj.xAxis[1].data.push(item.statusRoad) // 道路状况
        obj.xAxis[2].data.push(item.statusVision) // 天气状况
        obj.series.data.push(item.visibility)
      })
    },
    getHoursOrDate (time, type) {
      if (type === 'date') {
        return time.split(' ')[0]
      } else if (type === 'time') {
        return time.split(' ')[1]
      } else {
        let date = new Date(time)
        let hours = date.getHours()
        let min = date.getMinutes()
        min = min / 60
        let time2 = parseFloat(hours) + parseFloat(min)
        time2 = parseFloat(time2.toFixed(2))
        return time2
      }
    },
    getDuration (time) {
      let time2 = parseFloat((time / 60).toFixed(2))
      return time2
    },
    // 数据格式 [[日，持续时间，时间点，能见度，天气状况，道路状况]]
    getvisibilityCallback (obj, res) { // 能见度最低 散点图0
      let that = this
      obj.series[0].data = []
      obj.series[1].data = []
      obj.series[2].data = []
      obj.series[3].data = []
      obj.series[4].data = []
      res.data.messlist.forEach((item, index) => {
        let arr = []
        // [1, 20时间点上限1, 10.8时间点下限2, 0, 0, 9.2持续时间5, 200能见度6, "雨夹雪"天气状况7,"积水"道路状况8, "2018-10-13" 时间9], 9
        arr.push(
          index + 1,
          that.getDuration(item.name) + that.getHoursOrDate(item.time),
          that.getHoursOrDate(item.time),
          0, 0,
          that.getDuration(item.name),
          item.visibility,
          item.statusRain,
          item.statusRoad,
          that.getHoursOrDate(item.time, 'date'),
          that.getHoursOrDate(item.time, 'time'))
        obj.series[4].data.push(arr)
      })
      for (let key in res.data) {
        if (key !== 'messlist') {
          let ele = obj.series[4].data
          for (let i = 0; i < ele.length; i++) {
            for (let m = 0; m < res.data[key].length; m++) {
              let arr = []
              if (res.data[key].length > 0 && ele[i].includes(that.getHoursOrDate(res.data[key][m].time, 'date'))) {
                arr.push(
                  ele[i][0],
                  that.getDuration(res.data[key][m].name) + that.getHoursOrDate(res.data[key][m].time),
                  that.getHoursOrDate(res.data[key][m].time),
                  0, 0,
                  that.getDuration(res.data[key][m].name),
                  res.data[key][m].visibility,
                  res.data[key][m].statusRain,
                  res.data[key][m].statusRoad,
                  that.getHoursOrDate(res.data[key][m].time, 'date'),
                  that.getHoursOrDate(res.data[key][m].time, 'time'))
                obj.series[that.PoitConfig[key]].data.push(arr)
                if (that.getDuration(res.data[key][m].name) > that.maxDuration) {
                  that.maxDuration = that.getDuration(res.data[key][m].name)
                }
              }
            }
            if (obj.series[that.PoitConfig[key]].data.length < i + 1) {
              let arr = []
              arr.push(ele[i][0], 0, 0, 0, 0, 0, 2000, '良好', '良好', ele[i][9], ele[i][10])
              obj.series[that.PoitConfig[key]].data.push(arr)
            }
          }
        }
      }
      // console.log(obj.series[0].data, obj.series[1].data, obj.series[2].data, obj.series[3].data, obj.series[4].data)
      obj.visualMap[1].max = that.maxDuration + 1
      // console.log(that.maxDuration)
    },
    /*
      @params objs:{
        requset:"requset", 请求函数
        option:"option", echarts的options配置参数
        options: "options" 定义echarts组件定义参数
        callBack: "callBack" 各自处理函数
        el: "el" vue的ref元素
      }
    */
    async setOption (objs, params) {
      let res = await this.getInfoList(objs.requset, params)
      let obj = objs.option
      if (!res) return
      objs.callBack(obj, res, params)
      chartsConfig[objs.name].option = obj
      this[objs.name] = chartsConfig[objs.name]
      this.$refs[objs.el].updated()
    },
    getVisibilityLevel () {
      getVisibilityLevel()
        .then(res => {
          if (res.result === 'ok') {
            this.list.forEach((item, index, arr) => {
              this.list[index].thisYear = res.data.Now[item.value2] ? res.data.Now[item.value2] : 0
              this.list[index].lastYear = res.data.QYear[item.value2] ? res.data.QYear[item.value2] : 0
            })
          }
        }).catch(err => { console.error(err) })
    }
  },
  created () {
    // 获取设备状态
    this.setOption(this.devStatus)
    // 获取设备分布
    this.setOption(this.devDistributed)
    // 能见度等级统计
    this.getVisibilityLevel()
    // 能见度最低时段统计 散点图
    this.setOption(this.devvisibility)
    // 能见度，天气现象，路面温度综合统计
    // 能见度低于500专题统计
    // 恶劣天气现象统计
    // 恶劣道路状况统计
    // 统计-led屏修改频率统计
    // 统计-led屏修改方式对比
  },
  mounted () {
    let that = this
    window.onresize = function () {
      that.$refs.WorkingState.resize()
      that.$refs.visibility.resize()
      that.$refs.EquipmentDistribution.resize()
      that.$refs.getColligate.resize()
    }
  }
}
</script>

<style scoped>
.mainBox{
  width: 100%;
}
.flexBox{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flexBox .item:last-child {
  margin-right: 0;
}
.item{
  float: left;
  border: 1px solid #d9d9d9;
  background: #fff;
  margin-right: 15px;
  margin-bottom: 15px;
  box-sizing: border-box;
  width: 33.33%;
  overflow-x: hidden;
  overflow-y: auto;
}
.box{
  width: 100%;
  min-height: 300px;
  _height: 300px;
  overflow-x: auto;
  overflow-y: hidden;
}
.title{
  line-height: 30px;
  font-size: 14px;
  color: rgb(64, 158, 255);
  padding-left: 10px;
  border-bottom: 1px solid #d9d9d9;
  background: #f6f6f6;
}
.searchstyle{
  background:#404a59
}
</style>
<style>
.whitelabeltext .el-form-item__label{
  color: #fff;
}
</style>
