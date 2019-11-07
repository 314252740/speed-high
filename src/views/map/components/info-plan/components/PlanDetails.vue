<template>
  <transition name="el-zoom-in-top">
    <div class="fog">
      <div class="title">{{detlInfo.title}}</div>
      <ul class="main">
        <li v-for="(item,index) in detlInfo.list" :key="index">
          <span class="heading">{{item.name}}：</span>
          <span class="content">{{item.main}}</span>
        </li>
      </ul>
      <div class="description" v-show="systemShow">
        <div style="border-top: 1px solid #E0E0E0;">
          <p style="margin:12px 0;color:#017FED;">已选择系统推荐预案，详情如下：</p>
          <p style="margin:12px 0;color:#017FED;">
            1、已选择管控措施 - <strong>{{controlsId}}</strong>
          </p>
          <p style="margin:12px 0;color:#017FED;">
            2、已选择限速措施 - <strong>{{speedLimitsId}}</strong>
          </p>
          <p style="margin:12px 0;color:#017FED;">
            2、已选择辅助措施 - <strong>{{auxiliaryMeasuresIds}}</strong>
          </p>
          <!-- <p style="margin:12px 0;color:#017FED;">3、已启动设计好的预案；</p> -->
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { detailedList } from '../../../config/planDetails'
import { continueTime } from '@/utils/format.js'
export default {
  props: {
    detDetail: {
      type: Object,
      default: () => {}
    },
    systemPlan: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    detDetail (newvalue, oldvalue) {
      if (newvalue === undefined || Object.keys(newvalue).length <= 0) return
      let type = newvalue.layerid
      this.dealData(type)
    },
    systemPlan (newvalue, oldvalue) {
      if (newvalue === undefined || Object.keys(newvalue).length <= 0) return
      this.speedLimitsId = ''
      this.controlsId = ''
      this.auxiliaryMeasuresIds = []
      this.systemShow = true
      this.controlsId = newvalue.controls
      this.speedLimitsId = newvalue.speedLimits
      newvalue.auxiliaryMeasuresList.forEach(element => {
        this.auxiliaryMeasuresIds += element.plannedEventType + ','
        this.auxiliaryMeasuresIds.substring(-1)
      })
      this.controlsId = newvalue.controls
    }
  },
  name: 'detailed',
  data () {
    return {
      fogId: '',
      controlsId: '',
      speedLimitsId: '',
      auxiliaryMeasuresIds: [],
      systemShow: false,
      detlInfo: {},
      controlMeasures: '',
      controlSpeed: ''
    }
  },
  methods: {
    dealData (type) {
      // 数据处理
      for (let key in detailedList[type].list) {
        if (this.detDetail[key]) {
          detailedList[type].list[key].main = this.detDetail[key]
        } else {
          switch (key) {
            case 'position':
              detailedList[type].list[key].main = this.detDetail.roadName // this.detDetail.roadCode +
              break
            case 'continueTime':
              if (type === 'fog') {
                detailedList[type].list[key].main = continueTime(
                  this.detDetail.timeStart,
                  this.detDetail.timeUpdate
                )
              } else if (type === 'trafficAccident') {
                detailedList[type].list[key].main = this.detDetail.accidentTime ? this.detDetail.accidentTime.slice(0, -2) : this.detDetail.accidentTime
              } else if (type === 'maintenance') {
                detailedList[type].list[key].main = this.detDetail.continuousTime ? this.detDetail.continuousTime.slice(0, -2) : this.detDetail.continuousTime
              }
              break
            default : detailedList[type].list[key].main = null
          }
        }
      }
      this.detlInfo = detailedList[type]
      return detailedList[type]
    }
  }
}
</script>

<style scoped>
.fog {
  width: 400px;
  background: #fff;
  position: absolute;
  top: -60px;
  box-shadow: 0px 1px 4px #333;
  border-radius: 12px;
  overflow: hidden;
}
.fog .title {
  height: 45px;
  width: 100%;
  background: #017fed;
  color: #fbe109;
  text-align: center;
  line-height: 45px;
}
.fog .main {
  padding: 0 12px;
  box-sizing: border-box;
}
.fog .main li {
  height: 46px;
  border-bottom: 1px solid #e0e0e0;
  box-sizing: border-box;
  padding: 13px 0;
}
.fog .main li .content {
  color: #017fed;
}
.fog .main li:last-child {
  border-bottom: none;
}
.fog .description {
  padding: 0 12px;
  box-sizing: border-box;
}
</style>
