<template>
  <div class="hzRoad">
    <div class="rightTop">
        <div class="logoFlower">
        <img src="../../../../assets/img/mapImg/control-road/icon_flower.png" alt="">
        <span>菏泽市</span>
      </div>
      <el-popover
        placement="bottom"
        v-model="visible"
        popper-class="hezeRoadPop"
        :visible-arrow="false"
        trigger="hover"
        :offset="26"
        >
        <div class="speed">
          <ul class="list">
            <li class="listItem" @click="changeRoadCondition(index, item.layerId, true)" :key="index" v-for="(item, index) in listBtn">
              <span class="listItemCon" :class="idx === index ? 'listItemActive' : ''">{{item.name}}</span>
            </li>
          </ul>
          <div class="bar">
            <ul class="speedLimit">
              <li :style="{background:item.color}" style="cursor:no-drop" @click="checkTemp(index)" :key="key" v-for="(item, index, key) in speedList">{{item.name}}</li>
            </ul>
            <div class="refresh">
              <!-- 刷新按钮 -->
              <i class="el-icon-refresh" @click="resresh()" title="更新"></i>
              <!-- 时间 -->
              <span>{{time}}</span>
              <!-- 关闭按钮 -->
              <i class="el-icon-close close" @click="changeStatusRoad(true)"></i>
            </div>
          </div>
        </div>
        <div slot="reference"
          class="road"
          :class="{btnactive:changeActive === 1}"
          @click="changeStatusRoad(false)">
          <i class="iconfont">&#xe813;</i>
          道路状况
        </div>
      </el-popover>
      <el-popover
        placement="bottom-end"
        popper-class="hezeRoadPop2"
        :visible-arrow="false"
        trigger="hover"
        :offset="22"
        v-model="visibled">
          <div class="speed">
            <ul class="speedLimit">
              <li :style="{background:item.color}" style="padding:0 9px;" class="area" @click="checkRoad(index)" :key="key" v-for="(item,index, key) in roadList">
                {{item.name}}
              </li>
            </ul>
            <div class="refresh" style="margin-left:0px;">
              <!-- 关闭按钮 -->
              <i class="el-icon-close" style="line-height:0;" @click="changeStatusJur(true)"></i>
            </div>
          </div>
          <div slot="reference"
            class="road"
            :class="{btnactive:changeActive === 2}"
            @click="changeStatusJur(false)">
            <i class="iconfont">&#xe601;</i>
            辖区大队
          </div>
      </el-popover>
    </div>
    <div class="iconLogout" @mouseover="showLogout" @mouseout="hideLogout">
      <div class="logout" ref="logout" title="退出">
        <i class="iconfont" @click="logoutshow = true">&#xe64f;</i>
        <el-dialog
          title="提示"
          :visible.sync="logoutshow"
          width="360px"
          center>
          <span>确定要退出吗？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="logoutshow = false">取 消</el-button>
            <el-button type="primary" @click="logout">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <i :class="icon" class="icon"></i>
    </div>
  </div>
</template>

<script>
import MapManager from '@/components/map/MapManager.js'
import { formatTime } from '@/utils/format'
export default {
  data () {
    return {
      icon: 'el-icon-d-arrow-left',
      logoutshow: false,
      features: [],
      changeActive: 2,
      date: new Date(),
      time: '', // 时间
      visible: false,
      visibled: false,
      listBtn: [
        { name: '道路限速状况', layerId: 'speed' },
        { name: '卡口拥堵显示', layerId: 'roadcross' },
        { name: '互联网拥堵显示', layerId: 'roadinternet' }
      ],
      roadList: [
        { name: '一大队', color: '#6CD4DD', code: '1' },
        { name: '二大队', color: '#42A555', code: '2' },
        { name: '三大队', color: '#814A9E', code: '3' },
        { name: '四大队', color: '#235BC8', code: '4' },
        { name: '五大队', color: '#DC4676', code: '5' }
      ],
      speedList: [
        { name: '40及以下', color: '#B60001' },
        { name: '40-80', color: '#E80E0D' },
        { name: '80-100', color: '#FFD046' },
        { name: '100-120', color: '#51D27F' }
      ],
      statusList: ['speed', 'roadinternet', 'roadcross'],
      idx: -1,
      historyIndex: 0,
      currentItem: 'speed'
    }
  },
  methods: {
    changeRoadCondition (index, layerId, type) {
      if (type) {
        this.changeActive = 1
        MapManager.showLayer('area', false)
      }
      this.currentItem = layerId
      this.idx = index
      this.historyIndex = index
      this.controlRadioLayer(this.currentItem)
    },
    controlRadioLayer (layerId) {
      if (!layerId) layerId = null
      if (this.idx === -1 && this.changeActive === 1) {
        this.idx = this.historyIndex
      }
      for (let i = 0; i < this.statusList.length; i++) {
        if (layerId === this.statusList[i]) {
          MapManager.showLayer(layerId, true)
          continue
        }
        MapManager.showLayer(this.statusList[i], false)
      }
    },
    showLogout () {
      this.icon = 'el-icon-d-arrow-right'
      this.$refs.logout.classList.add('showBtn')
    },
    hideLogout () {
      this.icon = 'el-icon-d-arrow-left'
      this.$refs.logout.classList.remove('showBtn')
    },
    async logout () {
      await this.$store.dispatch('Logout')
      this.logoutshow = false
      this.$router.push(`/?redirect=${this.$route.fullPath}`)
      location.reload()
    },
    checkRoad (index) { // 点击选择辖区
      this.changeActive = 2
      MapManager.showLayer('area', true)
      this.idx = -1
      this.controlRadioLayer()
      if (this.features.length === 0) {
        this.features = MapManager.getFeautres('area')
      }
      // 清空图层
      MapManager.cleanLayer('area')
      for (let i in this.features) {
        if (this.features[i].get('uploadcode') === this.roadList[index].code) {
          // 展示该条数据
          MapManager.addFeautre('area', this.features[i])
          // this.$emit("videoInspection", this.features[i].getProperties())
          break
        }
      }
    },
    checkTemp (index) { // 点击选择温度
      // console.log(this.speedList[index].name)
    },
    changeStatusRoad (type) { // 切换道路和辖区状态
      if (type) {
        this.visible = false
        this.visibled = false
        return
      }
      if (this.changeActive === 1) {
        this.changeActive = 0
        MapManager.showLayer('area', false)
        MapManager.showLayer('speed', false)
        this.idx = -1
      } else {
        this.changeActive = 1
        this.idx = this.historyIndex
        this.controlRadioLayer(this.currentItem)
        MapManager.showLayer('area', false)
      }
      this.time = formatTime('yyyy-MM-dd hh:mm:ss', 'hh:mm')
    },
    changeStatusJur (type) {
      if (type) {
        this.visibled = false
        this.visible = false
        return
      }
      if (this.features.length === 0) {
        this.features = MapManager.getFeautres('area')
      }
      if (this.changeActive === 2) {
        this.changeActive = 0
        MapManager.showLayer('area', false)
        MapManager.showLayer('speed', false)
        MapManager.cleanLayer('area')
      } else {
        this.changeActive = 2
        MapManager.addFeautres('area', this.features)
        MapManager.showLayer('speed', false)
        MapManager.showLayer('area', true)
      }
      this.idx = -1
      this.controlRadioLayer()
    },

    // 刷新当前时间
    async resresh () {
      this.time = formatTime('yyyy-MM-dd hh:mm:ss', 'hh:mm')
      MapManager.showLayer('area', false)
      this.changeActive = 1
      MapManager.cleanLayer(this.currentItem)
      try {
        await MapManager.addLayer(this.currentItem)
      } catch (error) {
        console.log(error)
      }
      this.controlRadioLayer(this.currentItem)
    }
  },
  created () {
    this.time = formatTime('yyyy-MM-dd hh:mm:ss', 'hh:mm')
  },
  mounted () {
  }
}
</script>

<style scoped>
/* 右上角功能栏开始 */
.hzRoad{
  position: absolute;
  right: 0px;
  top: 10px;
}
.hzRoad::after{content:"."; display:block; clear:both; height:0; overflow:hidden; visibility:hidden; }
.logout{
  width: 0px;
  height: 45px;
  border-radius: 50%;
  float: left;
  /* margin-left: 10px; */
  background: #fff;
  box-shadow: 0 2px 3px #7C7A7B;
  cursor: pointer;
  text-align: center;
  transition: all .5s;
  color: #005DAA;
  overflow: hidden;
  margin-right: 5px;
}
.showBtn{
  width: 45px;
  transition: all .5s;
  margin:0 5px;
}
.logout i{
  line-height: 45px;
  font-size: 30px;
}
.rightTop {
    width: 310px;
    height: 45px;
    border-radius: 10px;
    box-shadow: 0 2px 3px #7C7A7B;
    padding: 10px 0 10px 10px;
    box-sizing: border-box;
    z-index: 999;
    background: #fff;
    float: left;
    line-height: 25px;
  }

  .rightTop .logoFlower {
    display: -webkit-inline-box;
    float: left;
    /* margin-right: 12px; */
  }
  .rightTop .logoFlower img{
    vertical-align: sub;
  }
  .rightTop .logoFlower span {
    line-height: 100%;
    color: #005DAA;
    font-weight: 600;
  }

  .rightTop .road {
    padding: 0 15px;
    height: 26px;
    box-sizing: border-box;
    float: left;
    text-align: center;
    outline: none;
    color: #999999;
    font-weight: 500;
    line-height: 26px;
    font-size: 14px;
    cursor: pointer;
  }
  /* .rightTop .road:hover{
    color: #898989;
  } */
  .rightTop .btnactive {
    color: #2598fe;
  }
  .iconLogout{
    cursor: pointer;
    float: left;
    height: 45px;
    /* padding: 0 5px; */
    /* line-height: 45px; */
    font-size: 16px;
    color:#999999;
  }
.speed {
  width: 100%;
  height: 100%;
}
.refresh {
  float: left;
  box-sizing: border-box;
  margin-left: 12px;
  height: 17px;
}

.refresh .el-icon-refresh {
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
}

.refresh .el-icon-refresh:hover {
  color: #000;
}

.refresh .el-icon-close {
  float: right;
  line-height: 1.5;
  cursor: pointer;
}

.speedLimit {
  float: left;
  padding-left:7px;
  box-sizing: border-box;
}
.speedLimit{
  float: left;
}
.speedLimit li {
  height: 17px;
  font-size: 12px;
  line-height: 17px;
  /* margin-right: 2px; */
  color: #fff;
  padding:0 5px;
  box-sizing: border-box;
  cursor: pointer;
  float: left;
}
/* // 路况功能list */
.list{
  border-bottom: 1px solid #999999;
  overflow:hidden;
  height: 23px;
  padding-top: 7px;
}
.listItem{
  height: 15px;
  line-height: 15px;
  float: left;
  text-align: center;
  cursor: pointer;
  border-right: 1px solid #434343;
}
.list li:last-child{
  border-right: 0;
}
.listItemCon{
  margin:0 9px;
  display: inline-block;
  transition: all .3s;
  color:#434343;
  font-size: 13px;
  line-height: 13px;
  padding-bottom: 5px;
  transition: all .3s;
  border-bottom: 1px solid transparent;
}
.listItemCon:hover{
  color:#2598fe;
  transition: all .3s;
}
.listItemActive{
  color:#2598fe;
  border-bottom-color: #2598fe;
  transition: all .3s;
}
/* bar */
.bar{
  height: 23px;
  width: 100%;
  padding-top:7px;
}
.close{
  position: relative;
  top: -8px;
  left: 5px;
}
.area{
  text-align:center;
  margin-right:2px;
}
.icon{
  padding:15px 0 ;
  background: #fff;
  color:#999999;
}
</style>

<style>
.logout .el-dialog__body {
  text-align: center;
}
  /* 右上角弹出对话框 */
.hezeRoadPop {
  padding: 0px;
  border: 0;
  border-radius: 5px;
  width: 310px;
  height: 60px;
  margin-top:15px!important;
  box-shadow: 0 2px 3px #7C7A7B;
}
.hezeRoadPop2{
  padding: 0px;
  border: 0;
  border-radius: 5px;
  padding-top:7px;
  width: 310px;
  margin-top:15px!important;
  box-shadow: 0 2px 3px #7C7A7B;
  height: 23px;
}
/* 向下的三角形 */
.border-up-empty {
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 7px solid #FB9A33;
  position: absolute;
  left: 43px;
  top: -6px;
  z-index: 99999;
}

.border-up-empty span {
  display: block;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #fff;
  position: absolute;
  left: -6px;
  top: 1px;
}
/* 右上角功能栏开始 */
.hzRoad{
  position: absolute;
  right: 0px;
  top: 10px;
}
.hzRoad::after{content:"."; display:block; clear:both; height:0; overflow:hidden; visibility:hidden; }
.logout{
  width: 0px;
  height: 45px;
  border-radius: 50%;
  float: left;
  /* margin-left: 10px; */
  background: #fff;
  box-shadow: 0 2px 3px #7C7A7B;
  cursor: pointer;
  text-align: center;
  transition: all .5s;
  color: #005DAA;
  overflow: hidden;
  margin-right: 5px;
}
.showBtn{
  width: 45px;
  transition: all .5s;
  margin:0 5px;
}
.logout i{
  line-height: 45px;
  font-size: 30px;
}
.rightTop {
    width: 310px;
    height: 45px;
    border-radius: 10px;
    box-shadow: 0 2px 3px #7C7A7B;
    padding: 10px 0 10px 10px;
    box-sizing: border-box;
    z-index: 999;
    background: #fff;
    float: left;
    line-height: 25px;
  }

  .rightTop .logoFlower {
    display: -webkit-inline-box;
    float: left;
    /* margin-right: 12px; */
  }
  .rightTop .logoFlower img{
    vertical-align: sub;
  }
  .rightTop .logoFlower span {
    line-height: 100%;
    color: #005DAA;
    font-weight: 600;
  }

  .rightTop .road {
    padding: 0 15px;
    height: 26px;
    box-sizing: border-box;
    float: left;
    text-align: center;
    outline: none;
    color: #999999;
    font-weight: 500;
    line-height: 26px;
    font-size: 14px;
    cursor: pointer;
  }
  /* .rightTop .road:hover{
    color: #898989;
  } */
  .rightTop .btnactive {
    color: #2598fe;
  }
  .iconLogout{
    cursor: pointer;
    float: left;
    height: 45px;
    /* padding: 0 5px; */
    /* line-height: 45px; */
    font-size: 16px;
    color:#999999;
  }
</style>
