<template>
  <div class="expalnaTion" v-show="userClick">
    <div class="cross">
      <i class="iconfont close" @click.stop="hide">&#xe60e;</i>
    </div>
    <div class="text">
      <h5>预案说明</h5>
      <p class="textP">当团雾，天气状况（恶劣天气下）、能见度（能见度较低）、路面温度（路面结冰、桥面结冰）、交通事故、施工养护事故发生时，需要显示应急预案，根据事件的严重和紧急程度，可以启动不同的应急预案。</p>
      <p class="textP">应急预案的下发方式为两种：</p>
      <p class="textP textB">第一种：使用已经录入的推荐预案，方便快捷的启动应急预案，适用于常见的事件；</p>
      <p class="textP textB" >第二种：自定义预案，可根据情况灵活配置各个设备的工作方式和呈现内容，适用于复杂事件；</p>
      <p class="textP">推荐预案由三部分组成：
        <span>管控措施、限速措施、辅助措施。</span>
      </p>
      <p class="textP">推荐预案和自定义预案的详情如下表所示：</p>
    </div>
    <div class="tab">
      <div class="tabOne">
        <p class="textP">表1应急预案总体说明</p>
        <table class="plantable">
          <tr>
            <th  colspan="4" class="detailed">应急预案细则</th>
            <th class="explain">说明</th>
          </tr>
          <tr>
            <td rowspan="10" class="detailedTd" align="center">应急<br>预案</td>
            <td rowspan="9" align="center">推荐<br>方案</td>
            <td rowspan="3" align="center">管控<br>措施</td>
            <td align="center">降速行驶</td><td>适用于轻微事件，且高速公路车道较多的情况下，只需要降低车辆行驶速度，即可保证车辆安全通过;</td>
          </tr>
          <tr>
            <td align="center">择路分流</td>
            <td>适用于一般事件，且高速公路附件有国道省道可以分流，可以缓解高速公路的通行压力;</td>
          </tr>
          <tr>
            <td align="center">道路封闭</td>
            <td>适用于严重事件，如危化品泄露，地震灾害等;</td>

          </tr>
          <tr>
            <td rowspan="4" align="center">限速<br>措施</td>
            <td align="center">10公里开始限速</td><td rowspan="4">根据道路的宽度、车流量的大小，选择合适的限速措施;<br>
            其中1公里开始限速比较适合于施工养护;
          </td>
          </tr>
          <tr>
            <td align="center">5公里开始限速</td>
          </tr>
          <tr>
            <td align="center">3公里开始限速</td>
          </tr>
          <tr>
            <td align="center">1公里开始限速</td>
          </tr>
          <tr>
            <td rowspan="2" align="center">辅助<br>措施</td><td align="center">无人机巡查</td><td>根据需要启动，无人机具备视频抓拍、事故勘察等功能;</td>
          </tr>
          <tr>
            <td align="center">融雪融冰</td><td>根据需要启动，当出现路面结冰、桥面结冰时启动;</td>
          </tr>
          <tr>
            <td colspan="3" align="center">自定义方案</td><td>当推荐方案无法满足实际需要时，通过人工控制各类设备的工作方式和呈现内容，达到疏导交通的效果;</td>
          </tr>
        </table>
      </div>
      <div class="tabTwo">
        <p class="textP">表2管控措施的设备控制</p>
        <table class="plantable">
          <tr align="center">
            <th class="measure" >管控措施</th>
            <th class="information" >信息屏</th>
            <th class="high" >高音号角</th>
            <th class="recom" >复合屏</th>
            <th class="guide" >引导灯</th>
          </tr>
          <tr>
            <td align="center">降速行驶</td>
            <td>前方XX 减速慢行</td>
            <td>播放减速提醒</td>
            <td rowspan="3" align="center">显示实时的能见度、路面状况、天气状况。</td>
            <td rowspan="3" align="center">能见度低时，自动开启<br>闪烁功能</td>
          </tr>
          <tr>
            <td align="center">择路而行</td>
            <td>前方XX 择路而行</td>
            <td>播放绕行提醒</td>
          </tr>
          <tr>
            <td align="center">道路封闭</td>
            <td>道路封闭 驶离高速</td>
            <td>播放封路提醒</td>
          </tr>
        </table>
      </div>
      <div class="tabThree">
        <p class="textP">表3限速措施的设备控制</p>
        <table class="plantable">
          <tr align="center">
            <th class="rate" >限速措施</th>
            <th class="rateScreen">限速屏</th>
          </tr>
          <tr class="planRateTr">
            <td>10公里开始限速</td>
            <td>10公里处显示限速120;8公里处显示限速100;6公里处显示限速80;4公里处显示限速60;2公里处显示限速40;1公里处<br>显示限速20;</td>
          </tr>
          <tr>
            <td>5公里开始限速</td>
            <td>5公里处显示限速100;3公里处显示限速80;1公里处显示限速60;500米处显示限速40;</td>
          </tr>
          <tr>
            <td>3公里开始限速</td>
            <td>3公里处显示限速100;2公里处显示限速80;1公里处显示限速60;500米处显示限速60;</td>
          </tr>
          <tr>
            <td>1公里开始限速</td>
            <td>1公里处显示限速100;500米处显示限速60;300米处显示限速40；</td>
          </tr>
        </table>
      </div>
      <div class="tabFour">
        <p class="textP">表4辅助措施的设备控制</p>
        <table class="plantable">
          <tr align="center">
            <th class="assist" >辅助措施</th>
            <th class="tarmac" >停机坪</th>
            <th class="unmanned">无人机</th>
            <th class="snow">融雪仪</th>
          </tr>
          <tr align="center">
            <td>无人机巡查</td>
            <td>存储、回收无人机并补充电源；</td>
            <td>抓拍视频、事故勘察；</td>
            <td>--</td>
          </tr>
          <tr align="center">
            <td>融雪融冰</td>
            <td>--</td>
            <td>--</td>
            <td>路面桥面结冰时启动喷洒融雪剂</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userClick: true
    }
  },
  methods: {
    hide () {
      this.$emit('hideAccPlan')
    }
  }
}
</script>
<style scoped>
  .expalnaTion{
    width:1094px ;
    height:684px ;
    background:#ffffff;
    border:1px solid #469ffa;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-radius: 8px;
    overflow: auto;
    z-index: 2;
  }
  .cross{
    float: right;
    color: #469ffa;
  }
  .text{
    margin-top: 22px;
  }
  .text h5{
    font-size: 16px;
    color: #469ffa;
    text-align: center;
    margin-bottom: 30px;
  }
  .textP{
    height: 100%;
    margin-left: 19px;
    margin-right: 27px;
    font-size: 14px;
    color: #333333;
    font-weight: 700;
    line-height: 25px;
  }
  .textP span{
    color: #469ffa;
  }
  .textB{
    color: #469ffa;
  }
  .tab{
    margin-top: 24px;
    margin-left: 19px;
    margin-right: 20px;

  }
  .tab p{
    text-align: center;
    margin-bottom: 14px;
  }
  .tabOne{
    margin-bottom: 20px;
  }
  table.plantable {
    font-family: verdana,arial,sans-serif;
    font-size:14px;
    color:#333333;
    border-width: 1px;
    border-color: #666666;
    border-collapse: collapse;
  }
  table.plantable th {
    border-width: 1px;
    height: 46px;
    border-style: solid;
    border-color: #666666;
    background-color: #dedede;
  }
  table.plantable td {
    border-width: 1px;
    height: 46px;
    border-style: solid;
    border-color: #666666;
    background-color: #ffffff;
  }
  .detailed{
    width: 320px;
  }
  .explain{
    width: 724px;
  }
  .measure{
    width: 88px;
  }
  .information{
    width: 230px;
  }
  .high{
    width: 264px;
  }
  .recom{
    width: 288px;
  }
  .guide{
    width: 168px;
  }
  .tabTwo{
    margin-bottom: 20px;
  }
  .rate{
    width: 152px;
  }
  .rateScreen{
    width: 899px;
  }
  .planRateTr{
    height: 92px;
  }
  .tabThree{
    margin-bottom: 20px;
  }
  .assist{
    width: 108px;
  }
  .tarmac{
    width: 284px;
  }
  .unmanned{
    width: 324px;
  }
  .snow{
    width: 324px;
  }
  .tabFour{
    margin-bottom: 24px;
  }
  /* 设置滚动条样式 (不支持火狐)*/
  ::-webkit-scrollbar {
    width:3px;
  }
  /*外层轨道。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果*/
  ::-webkit-scrollbar-track {
    width: 6px;
    background-color:#E4E2E3;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius:2em;
    display:none
  }
  /*滚动条的设置*/
  ::-webkit-scrollbar-thumb {
    background-color:#E4E2E3;
    background-clip:padding-box;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius:2em;
  }
  .close{
    cursor: pointer;
  }
</style>
