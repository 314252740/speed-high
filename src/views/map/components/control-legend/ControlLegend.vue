<template>
  <div class="rightBottom" style="z-index:999">
    <ul>
      <li @click="zoomHome()">
        <i class="iconfont" style="font-size:24px;" title="中心">&#xe70a;</i>
      </li>
      <li @click="zoomOut()">
        <i class="el-icon-circle-plus-outline ol-zoom-in" title="放大"></i>
      </li>
      <li @click="zoomIn()">
        <i class="el-icon-remove-outline" title="缩小"></i>
      </li>
      <li>
        <el-popover
            placement="right"
            trigger="manual"
            popper-class="mapOperation"
            v-model="visible">
            <div class="legend">
              <h3>图例</h3>
              <el-carousel trigger="click" :autoplay="false" indicator-position="outside" :loop="false">
                <!--第一页 地标 -->
                <el-carousel-item>
                  <div>
                    <!-- 基础地标图例 -->
                    <div class="baseIcon">
                      <h4>基础地标图例</h4>
                      <ul class="iconList">
                        <li>
                          <div class="left">
                            <img src="../../../../assets/img/mapImg/control-layer/zhuanghao-normal.png" alt="">
                            <span class="paddingLeft">桩号</span>
                          </div>
                          <div class="left">
                            <img src="../../../../assets/img/mapImg/control-layer/fuwuqu-normal.png" alt="">
                            <span class="paddingLeft">服务区</span>
                          </div>
                        </li>
                        <li>
                          <div class="left">
                            <img src="../../../../assets/img/mapImg/control-layer/shoufeizhan-normal.png" alt="">
                            <span class="paddingLeft">收费站</span>
                          </div>
                          <div class="left">
                            <img src="../../../../assets/img/mapImg/control-layer/shuniu-normal.png" alt="">
                            <span class="paddingLeft">枢纽</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <!-- 设备图例 -->
                    <div class="baseIcon">
                      <h4>设备图例</h4>
                      <ul class="iconList">
                        <li>
                          <div class="left">
                            <img src="../../../../assets/img/mapImg/control-layer/jiancy-normal.png" alt="">
                            <span class="paddingLeft">检测仪</span>
                          </div>
                          <div class="left">
                            <img src="../../../../assets/img/mapImg/control-layer/xiansp-normal.png" alt="">
                            <span class="paddingLeft">限速屏</span>
                          </div>
                        </li>
                        <li>
                          <div class="left">
                            <img src="../../../../assets/img/mapImg/control-layer/fuhp-normal.png" alt="">
                            <span class="paddingLeft">复合屏</span>
                          </div>
                          <div class="left">
                            <img src="../../../../assets/img/mapImg/control-layer/yindd-normal.png" alt="">
                            <span class="paddingLeft">引导灯</span>
                          </div>
                        </li>
                        <li>
                          <div class="left">
                            <img src="../../../../assets/img/mapImg/control-layer/wurj-normal.png" alt="">
                            <span class="paddingLeft">无人机</span>
                          </div>
                          <div class="left">
                            <img src="../../../../assets/img/mapImg/control-layer/tingjp-normal.png" alt="">
                            <span class="paddingLeft">停机坪</span>
                          </div>
                        </li>
                        <li>
                          <div class="left">
                            <img src="../../../../assets/img/mapImg/control-layer/xinxp-normal.png" alt="">
                            <span class="paddingLeft">信息屏</span>
                          </div>
                          <div class="left">
                            <img src="../../../../assets/img/mapImg/control-layer/youdp-normal.png" alt="">
                            <span class="paddingLeft">诱导屏</span>
                          </div>
                        </li>
                        <li>
                          <div class="left">
                            <img src="../../../../assets/img/mapImg/control-layer/gaoyhj-normal.png" alt="">
                            <span class="paddingLeft">高音号角</span>
                          </div>
                          <div class="left">
                            <img src="../../../../assets/img/mapImg/control-layer/shexj-normal.png" alt="">
                            <span class="paddingLeft">摄像机</span>
                          </div>
                        </li>
                        <li>
                          <div class="left">
                            <img src="../../../../assets/img/mapImg/control-layer/rongxy-normal.png" alt="">
                            <span class="paddingLeft">融雪仪</span>
                          </div>
                          <div class="left">
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </el-carousel-item>
                <!--第二页 天气 -->
                <el-carousel-item>
                  <img src="../../../../assets/img/mapImg/control-legend/page2.png" alt="">
                </el-carousel-item>
                <!--第三页 能见度 -->
                <el-carousel-item>
                  <img src="../../../../assets/img/mapImg/control-legend/page3.png" alt="">
                </el-carousel-item>
              </el-carousel>
            </div>
            <el-button slot="reference" class="rightButton" @click="visible=!visible">
              图例
            </el-button>
          </el-popover>
      </li>
    </ul>
  </div>
</template>

<script>
import MapManager from '@/components/map/MapManager.js'

export default {
  data () {
    return {
      visible: false
    }
  },
  methods: {
    zoomHome: function () {
      MapManager.zoomHome()
    },
    zoomOut: function () {
      MapManager.zoomOut()
    },
    zoomIn: function () {
      MapManager.zoomIn()
    }
  }
}
</script>

<style scoped>

/* 右下角功能开始 */
.rightBottom {
  position: absolute;
  right: 10px;
  bottom: 10px;
}

.rightBottom ul {
  background: #fff;
  width: 45px;
  border-radius: 10px;
  box-shadow: 2px 2px 2px #7C7A7B;
}

.rightBottom ul li {
  height: 45px;
  width: 100%;
  border-bottom: 1px solid #E3E1E2;
  text-align: center;
  line-height: 45px;
  cursor: pointer;
}

.rightBottom ul li i {
  font-size: 20px;
  color: #848484;
}

.rightBottom ul li:last-child {
  border-bottom: none;
}

.rightBottom ul li:hover i {
  color: #000;
}

.rightBottom ul li span {
  color: #848484;
  font-size: 15px;
}

.rightBottom ul li span:hover {
  color: #000;
}
/* 图例按钮 */
.rightButton{
  border: none;
  padding: 5px;
  height: 45px;
  width: 45px;
  border-radius: 8px;
  background: #fff;
}
.rightButton:hover{
  background: #fff;
  color: #000;
}
/* 图例弹框 */
.el-popover{
  border-radius: 15px;
}
.el-popover .legend{
  width: 265px;
  padding: 14px 22px 6px;
  box-sizing: border-box;
}
.el-popover .legend h3{
  text-align: center;
  color: #005BAC;
  margin-bottom: 12px;
}
.el-popover .legend .baseIcon h4{
  color: #666666;
  font-size: 15px;
  font-weight: normal;
  margin-bottom: 12px;
}
.el-popover .legend .baseIcon .iconList{
  width: 100%;
  border: 1px solid #E5E5E5;
  box-sizing: border-box;
}
.el-popover .legend .baseIcon .iconList li{
  width: 100%;
  height: 32px;
  border-bottom: 1px solid #E5E5E5;
  box-sizing: border-box;
}
.el-popover .legend .baseIcon .iconList li:last-child{
  border-bottom: none;
}
.el-popover .legend .baseIcon .iconList li .left{
  width: 50%;
  height: 100%;
  float: left;
  padding: 4px 0 0 2px;
  border-right: 1px solid #E5E5E5;
  box-sizing: border-box;
  padding-left: 5px;
}
.el-popover .legend .baseIcon .iconList li .left:last-child{
  border-bottom: none;
}
.el-popover .legend .baseIcon .iconList li .left img{
  width: 23px;
  vertical-align:bottom;
}
.el-popover .legend .baseIcon .iconList li .left span{
  color: #005BAC;
  font-size: 15px;
  font-weight: 600;
}
.paddingLeft{
  padding-left: 5px;
}
</style>
<style>
/* popover弹出框圆角 */
.mapOperation{
  border-radius: 15px!important;
  padding:0!important;
}
/* 图例 轮播 */
.el-carousel__container{
  height: 350px;
}
.el-carousel__indicators .el-carousel__button{
  width: 10px;
  height: 10px;
  border-radius: 5px;
  border: 1px solid #A0A0A0;
}
</style>
