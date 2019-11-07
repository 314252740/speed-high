<template>
  <div class="searchLogo">
    <div style="height:54px;">
      <div class="searchText">
        <div class="logo">
          <img src="../../../../assets/img/mapImg/search/logo.png" alt />
        </div>
        <h2 class="tit">道路交通综合应急管控平台</h2>
      </div>
      <div @click.stop="search" class="searchButton">
        <i class="el-icon-search"></i>
      </div>
    </div>
    <!-- 点击搜索出现搜索框 -->
    <transition name="el-zoom-in-top">
      <div v-show="flag" :class="act==1?'activeing searchBox':'searchBox'">
        <div class="searchIcon">
          <img src="../../../../assets/img/mapImg/search/icon_search.png" alt />
        </div>
        <input
          type="text"
          class="searchInput"
          @focus.stop="inputGo()"
          @input.stop="change"
          placeholder="查找道路地标、设备、天气"
          v-model="content"
        />
        <i class="el-icon-close iconc" @click.stop="clearContent()" v-show="showclear"></i>
        <input type="button" style="color:#fff;" value="搜索" @click.stop="searchGo()" />
      </div>
    </transition>
    <!-- 开始输入出现历史记录框 -->
    <transition name="el-zoom-in-top">
      <div class="history" v-show="hisflag">
        <ul class="label clear-both" style="height:auto;">
          <li v-for="(tag, index, key) in histags" :key="key" @click.stop="historyVal(index)">
            <img src="../../../../assets/img/mapImg/search/icon_gps.png" alt />
            <span>{{tag.name}}</span>
          </li>
        </ul>
        <div class="hisTitle">
          <div>
            <img src="../../../../assets/img/mapImg/search/icon_history.png" alt />
            <h4>历史记录</h4>
          </div>
          <div class="hisScroll" style="height:192px;overflow:auto;">
            <ul>
              <li v-for="(item, index, key) in Arry" :key="key" @click.stop="historyList(index)">
                <p>{{item}}</p>
              </li>
              <li class="clearHistory" v-show="clearHistory" @click.stop="clearHis">清除历史记录</li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
    <!-- 搜索结果 -->
    <transition name="el-zoom-in-top">
      <div class="around" ref="around" v-show="isShow">
        <ul @mouseleave="clearFeature()">
          <!-- 周边设备 -->
          <li v-if="listlength" class="nothing" style="color:red;">{{resultList}}</li>
          <li
            v-else
            :key="key"
            v-for="(item, index, key) in list"
            @click.stop="syncList(index)"
            @mouseenter="highTip(index)"
            @mouseleave="normalTip(index)"
          >
            <div class="zuo">
              <img :src="item.img" alt />
              <strong class="num">{{index+1}}</strong>
            </div>
            <div class="zhong hidden_one">
              <span
                class="shebeiName"
                v-html="item.type+'('+item.highlight[Object.keys(item.highlight)[0]]+')'"
              ></span>
              <p class="xiangqing">{{item.source.roadName}}</p>
            </div>
            <div class="you">
              <div class="waikuang">
                <img :src="item.devImg" alt />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </transition>
    <div class="detail">
      <transition name="el-zoom-in-top">
        <detector
          ref="detectorDom"
          v-show="decShow"
          :clientHeight="clientHeight"
          :searchShow="searchShow"
          :decDetail="decDetail"
          :decShow="decShow"
          :searchbackLevel="searchbackLevel"
          @listenContent="listenContent"
          @showDistributed="showDistributed"
          @decClose="decClose"
          @decUpdataList="decUpdataList"
          @showEmerglPlan="showEmerglPlan"
        ></detector>
      </transition>
      <transition name="el-zoom-in-top">
        <facility
          ref="facilityDom"
          v-show="facShow"
          :facShow="facShow"
          @listenContent="listenContent"
          :facDetail="facDetail"
          @facClose="facClose"
          :clientHeight="clientHeight"
        ></facility>
      </transition>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { parameter } from "@/api/detector.js"
import searchList from "@/api/search.js"
import { shebeiList, tagsList, around } from "../../config/search"
// 组件
import detector from "../info-device/InfoDevice" // 检测仪详情
import facility from "../info-facility/InfoFacility" //  设备详情弹框
import MapManager from "@/components/map/MapManager.js"
export default {
  props: ["inputValue", "clientHeight", "searchShow", "planShow"],
  components: {
    detector,
    facility
  },
  watch: {
    searchShow(newvalue, oldvalue) {
      if (!newvalue) {
        this.flag = false // 搜索框
        this.isShow = false // 设备列表框
        this.hisflag = false // 历史下拉框
        this.decShow = false // 设备详情显示
        this.facShow = false // 基础地标详情显示
      }
    },
    clientHeight(newvalue, oldvalue) {
      this.clientHeight = newvalue
      this.$nextTick(() => {
        this.$refs.around.style.cssText = `
          max-height:${this.clientHeight - 430}px;
          display:none;
        `;
      })
    },
    inputValue(newvalue, oldvalue) {
      this.inputValue = newvalue
      this.oldDetail = oldvalue
      if (newvalue.layerid === "policeCar") {
        this.content = newvalue.plateNum
      }else {
        this.content = this.inputValue.name
      }
      let type = this.inputValue.layerid
      this.flag = true
      if (tagsList.indexOf(type) >= 0) {
        this.facDetail = this.inputValue
        this.decShow = false // 设备详情隐藏
        this.facShow = true // 基础地标详情显示
        this.hisflag = false // 历史列表隐藏
        this.isShow = false // 搜索结果列表隐藏
      } else if (shebeiList.indexOf(type) >= 0) {
        this.decDetail = this.inputValue
        this.decShow = true // 设备详情显示
        this.facShow = false // 基础地标详情隐藏
        this.hisflag = false // 设备详情显示
        this.isShow = false // 基础地标详情隐藏
      }
      this.$emit("hideSensorsInfo")
    },
    Arry(newvalue, oldvalue) {
      this.Arry = newvalue
      if (this.Arry.length <= 0) {
        this.clearHistory = false
      } else {
        this.clearHistory = true
      }
    },
    content (newvalue, oldvalue) {
      if (newvalue) {
        this.showclear = true
      } else {
        this.showclear = false
      }
    }
  },
  name: "search",
  data() {
    return {
      listlength: false,
      oldDetail: {},
      resultList: "", // 搜结果出错或者为空显示内容
      flag: false, //控制搜索框显示隐藏
      isShow: false, // 控制搜索内容列表显示隐藏
      clearHistory: false, // 清除历史记录的隐藏和显示
      content: "", //搜索内容
      hisflag: false, //控制历史记录框显示隐藏
      act: "", //类名active显示隐藏
      histags: [
        { name: "摄像机" },
        { name: "限速屏" },
        { name: "桩号" },
        { name: "服务区" },
        { name: "收费站" }
      ],
      arry: null,
      Arry: [], // 历史列表
      changeArray: [], //搜索时历史列表
      imgSrc: require("../../../../assets/img/mapImg/control-layer/numb1.png"),
      normalImgSrc: require("../../../../assets/img/mapImg/control-layer/numb3.png"),
      showclear: false,
      list: [], // 搜索列表数据
      decDetail: {},
      // mock 基础地标详情
      facDetail: {},
      // 控制显示
      decShow: false, // 设备详情显示
      facShow: false, // 基础地标详情显示

      clientHightL: null, // 视窗高度
      feature: null,
      searchbackLevel: null,
      aroundSource: [] // 搜索列表图层集合
    }
  },
  methods: {
    sensorControl () {
      if (this.$refs.detectorDom.videoList.length >0 || this.$refs.facilityDom.videoList.length >0) {
        this.$refs.detectorDom.closeVideo()
        this.$refs.facilityDom.closeVideo()
        return true
      } else {
        return false
      }
    },
    showEmerglPlan () {
      this.$emit("showEmerglPlan")
    },
    showBackPlan(status,center){
      if (status) {
        this.$refs.detectorDom.isPlanBack = true
        this.$refs.detectorDom.accidentCenter = center
      } else {
        this.$refs.detectorDom.isPlanBack = false
      }
      
    },
    showDistributed() {
      // 应急预案返回
      this.$emit("showDistributed")
    },
    
    listenContent(value, obj, status) {
      this.content = value
      if (status) {
        obj = this.oldDetail
        this.searchbackLevel = null
      } else{
        this.searchbackLevel= value
        // this.$refs.detectorDom.isback = true
        // this.$refs.detectorDom.backLevel = value
        this.facDetail = {}
      }
      this.$emit("listenContent", obj)
    },
    hideBack(){
      this.$refs.detectorDom.isback = false
    },
    // 设备修改状态icon
    changeIcon(status) {
      this.$emit("changeIcon", status)
    },
    // 设备详情列表
    decUpdataList(choose, status) {
      this.$emit("decUpdataList", choose, status)
    },
    // 清除历史记录
    clearHis() {
      localStorage.removeItem("searchContent")
      this.arry = ""
      this.Arry = []
    },
    // 列表划过高亮图标
    highTip(index) {
      this.list[index].img = this.normalImgSrc
      // this.aroundSource = []
      // for (let i = 0; i < this.list.length; i++) {
      //   aroundSource.push(this.list[i].source)
      // }
      MapManager.addData2Layer("aroundLayer", this.aroundSource)
      if (this.feature) {
        MapManager.cleanCircleLayer(this.feature)
        this.feature = null
      }
      MapManager.resetDrawLayerStyle()
      this.feature = MapManager.addPoint(
        "drawLayer",
        [this.list[index].source.longitude,this.list[index].source.latitude]
      )
    },
    clearFeature() {
      if (this.feature) {
        MapManager.cleanCircleLayer(this.feature)
        this.feature = null
      }
    },
    // 列表划出正常图标
    normalTip(index) {
      this.list[index].img = this.imgSrc
      // 地图上进行正常图标？？？？？？？？？
      // MapManager.cleanLayer("aroundLayer")
      // this.feature = null
      // MapManager.cleanCircleLayer()
    },
    // 手动关闭设备详情
    decClose() {
      this.decShow = false
      this.act = 1
      MapManager.clearCircleAndLayer()
    },
    // 手动关闭基础地标详情
    facClose() {
      this.facShow = false
      this.act = 1
    },
    //点击搜索图标按钮
    search() {
      this.list = []
      this.content = ""
      this.flag = !this.flag
      MapManager.clearCircleAndLayer()
      if (this.flag === false) {
        this.content = ""
        this.isShow = false // 设备列表框
        this.hisflag = false // 历史下拉框
        this.decShow = false // 设备详情显示
        this.facShow = false // 基础地标详情显示
      }
      this.$parent.closeVideo()
      this.act = 1
      this.$emit("hidePlan")
    },

    //点击输入框事件
    inputGo() {
      if (this.decShow === true || this.facShow === true) {
        this.hisflag = false
        this.isShow = false
      } else {
        this.act = ""
        this.hisflag = true
        this.isShow = false
        // 获取localstorage
        let seacter = localStorage.getItem("searchContent")
        if (seacter !== null) {
          seacter = seacter.replace("null","")
          this.Arry = seacter.split(",")
          this.Arry = this.Arry.reverse()
          // 去重
          let result = []
          let len = this.Arry.length
          for (let i = 0; i < len; i++) {
            if (result.indexOf(this.Arry[i]) < 0) {
              result.push(this.Arry[i])
            }
          }
          result.splice(0, 1)
          this.Arry = result.slice(0, 10)
        }
        // 隐藏关闭按钮
        this.showclear = true
      }
    },
    //点击搜索
    searchGo() {
      this.$parent.closeVideo()
      this.decShow = false
      this.facShow = false
      if (this.content === "" || this.content === null) {
        this.$message({
          type: "info",
          message: "请输入搜索内容"
        })
      } else {
        // 搜索值存到本地
        this.arry += this.content + ","
        this.arry = this.arry.replace('null',"")
        JSON.stringify(localStorage.setItem("searchContent", this.arry))
        //请求数据
        this.queryList()
        this.isShow = true // 设备列表显示
        this.hisflag = false // 历史列表隐藏
      }
    },
    //历史记录与输入值同步
    inputVal(index) {
      this.content = this.Arry[index]
      this.hisflag = false
      this.act = 1
      this.isShow = true
    },
    // 请求数据和同步输入框值和历史列表信息
    historyVal(item) {
      this.content = this.histags[item].name
      this.act = ""
      //输入框内容请求数据
      this.queryList()
      this.hisflag = false
      this.isShow = true
    },
    // 历史列表
    historyList(index) {
      this.content = this.Arry[index]
      this.act = ""
      //输入框内容请求数据
      this.queryList()
      this.hisflag = false
      this.isShow = true
    },

    //同步设备名称与输入框值
    syncList(index) {
      let that = this
      // 判断类型显示不同的详情
      this.clearFeature()
      let type = that.list[index].source.layerid
      console.log(that.list[index].source)
       if (tagsList.indexOf(type) >= 0) {
        that.facDetail = that.list[index].source
        this.$emit("asyncValue",that.facDetail)
      } else if (shebeiList.indexOf(type) >= 0) {
        that.decDetail = that.list[index].source
        this.$emit("asyncValue",that.decDetail)
      }
      that.hisflag = false
      that.isShow = false
    },
    // 清空输入内容
    clearContent() {
      MapManager.clearCircleAndLayer()
      // 清除视频
      this.$refs.detectorDom.closeVideo()
      this.content = ""
      this.isShow = false
      this.hisflag = false
      this.act = 1
      this.list = []
      this.decShow = false // 设备详情显示
      this.facShow = false // 基础地标详情显示
      this.$refs.around.style.display = "none"
      this.$parent.closeVideo()
    },

    //输入时请求数据加载列表
    change() {
      // 对搜索列表进行搜索 、显示
      MapManager.clearCircleAndLayer()
      let that = this
      this.hisflag = false // 历史搜索
      this.isShow = true // 设备搜索列表
      this.decShow = false // 设备详情显示
      this.facShow = false // 基础地标详情显示
      // 改变历史列表
      this.queryList()
    },
    // 数据请求
    queryList() {
      this.feature = null
      MapManager.clearCircleAndLayer()
      this.aroundSource = []
      searchList(this.content)
        .then( res => {
          // 高亮设置
          if (res.length > 0) {
            this.list = []
            this.listlength = false
            this.list = res
            let len = this.list.length
            for (let i = 0; i < len; i++) {
              if (this.list[i].source.layerid === "policeCar") {
                parameter(this.list[i].source.layerid, this.list[i].source.id)
                  .then(res => {
                    if (res.result === "ok" && res.data) {
                      let obj = Object.assign(this.list[i].source,res.data)
                      obj.layerid = "policeCar"
                      this.list[i].source = obj
                      this.$set(this.list[i],"devImg",around[this.list[i].source.layerid].exterior)
                      this.$set(this.list[i],"type",around[this.list[i].source.layerid].layerid)
                      this.$set(this.list[i], "img", this.imgSrc)
                      this.aroundSource.push(this.list[i].source)
                    } else {
                      this.$set(this.list[i],"devImg",around[this.list[i].source.layerid].exterior)
                      this.$set(this.list[i],"type",around[this.list[i].source.layerid].layerid)
                      this.$set(this.list[i], this.imgSrc)
                    }

                  })
                  .catch(err => console.log(err))
              } else if (this.list[i].source.layerid === "camera" && this.list[i].highlight[Object.keys(this.list[i].highlight)[0]].includes("iframe") ) {
                this.$set(this.list[i],"highlight",{name: this.list[i].source.name})
                this.$set(this.list[i],"type",around[this.list[i].source.layerid].layerid)
                this.$set(this.list[i], "img", this.imgSrc)
                this.$set(this.list[i],"devImg",around[this.list[i].source.layerid].exterior)
                this.aroundSource.push(this.list[i].source)
              } else {
                this.$set(this.list[i],"type",around[this.list[i].source.layerid].layerid)
                this.$set(this.list[i], "img", this.imgSrc)
                if (this.list[i].source.layerid === "screenSpeed") {
                  this.$set(this.list[i],"devImg",require(`../../../../assets/img/mapImg/info-device/small${this.list[i].source.limitValue}.png`))
                } else {
                  this.$set(this.list[i],"devImg",around[this.list[i].source.layerid].exterior)
                }
                this.aroundSource.push(this.list[i].source)
              }
            }
          } else {
            this.listlength = true
            this.list = []
            if (res.status === "500") this.resultList = "服务器出错啦"
            else {
              this.resultList = "未找到您想要的结果"
            }
          }
        })
        .catch(err => {
          console.log(err)
          this.list = []
          this.listlength = true
          this.resultList = "请求数据出错啦！,请联系管理员"
        })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.around.style.cssText = `
        max-height:${this.clientHeight - 430}px;
        display:none
      `;
      this.feature = null
      MapManager.cleanCircleLayer()
    })
  }
}
</script>

<style scoped>

/* 左上角搜索 开始 */
.searchLogo {
    width: 460px;
    height: 54px;
    /* margin-left: 10px; */
    box-shadow: 0 2px 3px #B5B3B4;
    border-radius: 20px;
    position: fixed;
    left: 10px;
    top: 10px;
    z-index: 1000;
  }
  
  .searchText {
    height: 54px;
    width: 400px;
    float: left;
    border-radius: 20px 0 0 20px;
    background: #005BAC;
    opacity: 0.7;
  }
  
  .searchText .logo {
    margin: 6px 0 8px 10px;
    display: -webkit-inline-box;
    float: left;
  }
  .searchText .tit {
    font-size: 26px;
    line-height: 54px;
    text-align: center;
    font-weight: 500;
    color: #fff;
    text-shadow: 0px 1px 1px #7D7D7D;
    margin-right: 0;
  }
  .searchLogo .searchBox .iconc{
    position: absolute;
    top: 9px;
    right: 70px;
    font-size: 26px;
    color: #666666;
    cursor:pointer;
  }
  /* 搜索按钮 */
  .searchButton {
    height: 54px;
    width: 60px;
    background: #005BAC;
    opacity: 0.7;
    float: right;
    border-radius: 0 20px 20px 0;
    border-left: 1px solid #3A6D9A;
    box-sizing: border-box;
    text-align: center;
    line-height: 64px;
    cursor: pointer;
    transition: 0.5s;
  }
  
  .searchButton i {
    font-size: 26px;
    color: #fff;
  }
  
  .searchButton:hover {
    opacity: 0.9;
    transition: 0.5s;
  }
  
  .searchLogo .searchBox {
    width: 460px;
    height: 45px;
    margin-top: 10px;
    border-radius: 10px 10px 10px 0;
    padding-left: 36px;
    box-sizing: border-box;
    background: #fff;
    position: relative;
    border: 1px solid #DCDCDC;
  }
  
  .searchLogo .activeing {
    border-radius: 10px;
    box-shadow: 0 2px 3px #B5B3B4;
  }
  
  .searchBox .searchIcon {
    position: absolute;
    top: 14px;
    left: 12px;
  }
  
  /* 搜索输入框 */
  /* input[type=text] {
    width: 362px;
    height: 43px;
    outline: none;
    border: 0px;
    -webkit-appearance: none;
    position: absolute;
    top: 0px;
  } */
  .searchInput{
    width: 362px;
    height: 43px;
    outline: none;
    border: 0px;
    -webkit-appearance: none;
    position: absolute;
    top: 0px;
  }
  
  /* 搜索提交 */
  input[type=button] {
    width: 59px;
    height: 44px;
    float: right;
    background: #027CE9;
    border-radius: 0 8px 9px 0;
    outline: none;
    border: 0px;
    -webkit-appearance: none;
    cursor: pointer;
    transition: all .3s;
  }
  
  input[type=button]:hover {
    background: rgb(1, 88, 163);
    transition: all .3s;
  }
  
  /* 搜索历史记录框 */
  .history {
    width: 401px;
    height: 285px;
    border: 1px solid #D6D6D6;
    border-top: 0;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 0 0 10px 10px;
    background: #fff;
    position: absolute;
    top: 109px;
    left: 0px;
  }
  .history .label {
    padding-bottom: 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #EEEEEE;
  }
  
  .history .label li {
    width: 65px;
    height: 26px;
    padding: 3px;
    box-sizing: border-box;
    border-radius: 5px;
    float: left;
    margin-right: 10px;
    cursor: pointer;
  }
  
  .history .label li:last-child {
    margin-right: 0;
  }
  .history .label li:nth-child(1) {
    transition: all .3s;
    background: #D93165;
  }
  .history .label li:nth-child(1):hover {
    background: #f75083;
    transition: all .3s;
  }
  .history .label li:nth-child(2):hover {
    transition: all .3s;
    background: #FF8500;
  }
  .history .label li:nth-child(2) {
    transition: all .3s;
    background: #ec7b00;
  }
  .history .label li:nth-child(3):hover {
    transition: all .3s;
    background: #015e8c;
  }
  .history .label li:nth-child(3) {
    background: #00324B;
    transition: all .3s;
  }
  .history .label li:nth-child(4):hover {
    background: #00a014;
    transition: all .3s;
  }
  .history .label li:nth-child(4) {
    background: #008A11;
    transition: all .3s;
  }
  .history .label li:nth-child(5):hover {
    background: #FF1E00;
    transition: all .3s;
  }
  .history .label li:nth-child(5) {
    background: #ef1c00;
    transition: all .3s;
  }
  .history .label li img {
    width: 12px;
    height: 14px;
  }
  
  .history .label li span {
    font-size: 14px;
    color: #fff;
    line-height: 22px;
  }
  
  .history .hisTitle {
    margin: 10px 0;
  }
  
  .history .hisTitle img {
    width: 15px;
    height: 13px;
  }
  
  .history .hisTitle h4 {
    display: inline;
    color: #666666;
    font-size: 15px;
    line-height: 2;
  }
  .history .hisTitle ul{
    height: 185px;
  }
  .history .hisTitle ul li {
    background: #E4E2E3;
    margin-bottom: 10px;
    border-radius: 2px;
    height: 22px;
    padding-left: 5px;
    box-sizing: border-box;
    transition: all .3s;
    cursor: pointer;
    color: #848484;
    font-size: 14px;
    line-height: 22px;
  }
  .history .hisTitle ul li:hover {
    background: #a0a0a0;
    color:#fff;
    transition: all .3s;
  }
  /* 搜索 结束 */

  /* 设置滚动条样式 (不支持火狐)*/
  .hisScroll::-webkit-scrollbar {
    width:10px;
    padding-left: 2px
  }
  /*外层轨道。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果*/
  .hisScroll::-webkit-scrollbar-track {
      width: 6px;
      background-color:#606d71;
      -webkit-border-radius: 2em;
      -moz-border-radius: 2em;
      border-radius:2em;
      display:none
  }
  /*滚动条的设置*/
  .hisScroll::-webkit-scrollbar-thumb {
      background-color:#E4E2E3;
      background-clip:padding-box;
      -webkit-border-radius: 2em;
      -moz-border-radius: 2em;
      border-radius:2em;
  }
/* 设备搜索列表 */
.around {
  width: 378px;
  padding: 10px;
  background: #fff;
  border: 1px solid #dcdcdc;
  border-top: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  position: absolute;
  top: 109px;
  left: 0px;
  overflow-x: hidden;
  overflow-y: auto;
}
.around ul li {
  height: 52px;
  width: 100%;
  box-sizing: border-box;
  background: #e5f2fd;
  border-bottom: 1px solid #fff;
  cursor: pointer;
  display: flex;
  transition: all 0.3s
}
.around ul li:hover {
  background: #b3d7f8;
  transition: all 0.3s
}
.around .zuo {
  padding: 6px;
  width: 10%;
  height: 100%;
  box-sizing: border-box;
  justify-content: start;
  position: relative;
}
.around .zuo img {
  width: 24px;
  height: 38px;
}
.around .zuo .num {
  position: absolute;
  display: inline-block;
  left: 8px;
  top: 12px;
  width: 20px;
  font-size: 10px;
  color: #fff;
  text-align: center;
}
.around .zhong {
  width: 70%;
  height: 100%;
  align-items: center;
  padding-top: 10px;
  padding-left: 10px;
  box-sizing: border-box;
}
.around .zhong .shebeiName {
  color: #0459b3;
}
.around .zhong .xiangqing {
  color: #999;
  font-size: 12px;
  padding-top: 5px;
}
.around .you {
  width: 19%;
  height: 100%;
  padding: 6px 13px 6px 0;
  box-sizing: border-box;
}
.around .you .waikuang {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  border: 1px solid #d2d2d2;
  overflow: hidden;
}
.around .you .waikuang img {
  width: 100%;
  height: 100%;
}
.nothing {
  line-height: 52px;
  text-align: center;
  justify-content: center;
}

.detail {
  position: absolute;
  top: 115px;
  left: 0px;
  width: 400px;
  height: auto;
}
/* 设置滚动条样式 (不支持火狐)*/
::-webkit-scrollbar {
  width: 8px;
}
/*外层轨道。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果*/
::-webkit-scrollbar-track {
  width: 6px;
  background-color: #e4e2e3;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
  display: none;
}
/*滚动条的设置*/
::-webkit-scrollbar-thumb {
  background-color: #e4e2e3;
  background-clip: padding-box;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
/* 鼠标移入滚动条 */
::-webkit-scrollbar-thumb:hover {
  background: #999;
}
.clearHistory {
  font-size: 14px;
  line-height: 22px;
}
.clearHistory:hover {
  background: rgb(116, 116, 116);
}
</style>