/* eslint-disable */
import { searchStyles, drawStyles, roadStyles, landMarkStyles, facilityStyles, roadStatus, policeStyle, accitendStyle } from "@/mapConfig/StyleConfig"
import WebSocketSID from "@/components/map/WebSocketSID";

export default{
  // 绘制图层
  "drawLayer": {
    "zIndex": 3000,
    "visibleLayer": true,
    "name": "drawLayer",
    "modify": true,
    "style": drawStyles.Polygon.concat(drawStyles.LineString).concat(drawStyles.point),
    "modifyPointWithText": drawStyles.modifyPointWithText
  },
  // 分流图层
  "roadSelLayer": {
    "zIndex": 9000,
    "visibleLayer": true,
    "name": "roadSelLayer",
    "style": searchStyles.roadSelLayer
  },
  // 起点图层
  "startLayer": {
    "zIndex": 9000,
    "visibleLayer": true,
    "name": "startLayer",
    "style": searchStyles.startPoint
  },
  // 终点图层
  "endlLayer": {
    "zIndex": 9000,
    "visibleLayer": true,
    "name": "endlLayer",
    "style": searchStyles.endPoint
  },
  // 周边设备图层
  "aroundLayer": {
    // 周边设备渲染的图层数据
    "data": [],
    "zIndex": 2000,
    "visibleLayer": true,
    "hasClickEvent": true,
    "name": "aroundLayer",
    // 根据feature的layerid信息获取设备展示样式 
    "style": function(feature){
      //let properties = feature.getProperties();
      let layerid = feature.get("layerid");
      return facilityStyles[layerid].normal
    },
    // 根据feature的layerid信息获取设备展示样式 
    "styleError": function(layerid){
      //let properties = feature.getProperties();
      return facilityStyles[layerid].styleError ? facilityStyles[layerid].styleError : facilityStyles[layerid].normal
    }
  },
  // 1.道路
  "road": {
    "geojsonUrl": "module/road/geojson/0",
    "zIndex": 100,
    "visibleLayer": false,
    "visibleLabel": false,
    "hasLabel": false,
    "hasClickEvent": false,
    // name属性必须和key值相同，主要用于获取图层高亮样式
    "name": "road",
    "style": roadStyles.normal,
    "styleText": roadStyles.normalWithText
  },
///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////           基础地标                     ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 1.桩号
  "stakeNum": {
    "geojsonUrl": "module/pile/geojson",
    "zIndex": 100,
    "visibleLayer": true,
    "visibleLabel": false,
    "hasLabel": false,
    "hasClickEvent": true,
    // name属性必须和key值相同，主要用于获取图层高亮样式
    "name": "stakeNum",
    "style": landMarkStyles.stakeNum.normal,
    "styleHighlight": landMarkStyles.stakeNum.choose,
    // 图层未加载时，复选按钮警用状态
    checkTType: true
  },
  // 2.服务区
  "serviceArea": {
    "geojsonUrl": "module/servicearea/geojson",
    "zIndex": 100,
    "visibleLayer": false,
    "visibleLabel": false,
    "hasLabel": false,
    "hasClickEvent": true,
    "name": "serviceArea",
    "style": landMarkStyles.serviceArea.normal,
    "styleHighlight": landMarkStyles.serviceArea.choose,
    // 图层未加载时，复选按钮警用状态
    checkTType: true
  },
  // 3.收费站
  "tollStation": {
    "geojsonUrl": "module/tollStation/geojson",
    "zIndex": 100,
    "visibleLayer": true,
    "visibleLabel": false,
    "hasLabel": false,
    "hasClickEvent": true,
    "name": "tollStation",
    "style": landMarkStyles.tollStation.normal,
    "styleHighlight": landMarkStyles.tollStation.choose,
    // 图层未加载时，复选按钮警用状态
    checkTType: true
  },
  // 4.交通枢纽
  "trafficHub": {
    "geojsonUrl": "module/pub/geojson",
    "zIndex": 100,
    "visibleLayer": true,
    "visibleLabel": false,
    "hasLabel": false,
    "hasClickEvent": true,
    "name": "trafficHub",
    "style": landMarkStyles.trafficHub.normal,
    "styleHighlight": landMarkStyles.trafficHub.choose,
    // 图层未加载时，复选按钮警用状态
    checkTType: true
  },
///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////           设备图标                     ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 1.检测仪
  "sensor": {
    "geojsonUrl": "module/sensor/geojson",
    "zIndex": 100,
    "visibleLayer": false,
    "visibleLabel": false,
    "hasLabel": false,
    "hasClickEvent": true,
    // name属性必须和key值相同，主要用于获取图层高亮样式
    "name": "sensor",
    "style": facilityStyles.sensor.normal,
    "styleHighlight": facilityStyles.sensor.choose,
    "styleError": facilityStyles.sensor.error,
    // 图层未加载时，复选按钮警用状态
    checkTType: true
  },
  // 2.引导灯
  "led": {
    "geojsonUrl": "module/led/geojson",
    "zIndex": 100,
    "visibleLayer": true,
    "visibleLabel": false,
    "hasLabel": false,
    "hasClickEvent": true,
    "name": "led",
    "style": facilityStyles.led.normal,
    "styleHighlight": facilityStyles.led.choose,
    "styleError": facilityStyles.led.error,
    // 图层未加载时，复选按钮警用状态
    checkTType: true
  },
  // 3.无人机
  "uav": {
    "geojsonUrl": "module/uav/geojson",
    "zIndex": 100,
    "visibleLayer": false,
    "visibleLabel": false,
    "hasLabel": false,
    "hasClickEvent": true,
    "name": "uav",
    "style": facilityStyles.uav.normal,
    "styleHighlight": facilityStyles.uav.choose,
    "styleError": facilityStyles.uav.error,
    // 图层未加载时，复选按钮警用状态
    checkTType: true
  },
  // 4.停机坪
  // "uavParking": {
  //   "geojsonUrl": "module/uav-parking/geojson",
  //   "zIndex": 100,
  //   "visibleLayer": true,
  //   "visibleLabel": false,
  //   "hasLabel": false,
  //   "hasClickEvent": true,
  //   "name": "uavParking",
  //   "style": facilityStyles.uavParking.normal,
  //   "styleHighlight": facilityStyles.uavParking.choose,
  // 图层未加载时，复选按钮警用状态
  // checkTType: true
  // },
  // 5.高音号角
  "highHorn": {
    "geojsonUrl": "module/high/geojson",
    "zIndex": 100,
    "visibleLayer": false,
    "visibleLabel": false,
    "hasLabel": false,
    "hasClickEvent": true,
    "name": "highHorn",
    "style": facilityStyles.highHorn.normal,
    "styleHighlight": facilityStyles.highHorn.choose,
    "styleError": facilityStyles.highHorn.error,
    // 图层未加载时，复选按钮警用状态
    checkTType: true

  },
  // 6.融雪仪
  // "snowmelt": {
  //   "geojsonUrl": "module/snowmelt/geojson",
  //   "zIndex": 100,
  //   "visibleLayer": true,
  //   "visibleLabel": false,
  //   "hasLabel": false,
  //   "hasClickEvent": true,
  //   "name": "snowmelt",
  //   "style": facilityStyles.snowmelt.normal,
  //   "styleHighlight": facilityStyles.snowmelt.choose,
  // "styleError": facilityStyles.snowmelt.error,m
  // 图层未加载时，复选按钮警用状态
  // checkTType: true
  // },
  // 7.限速屏
  "screenSpeed": {
    "geojsonUrl": "module/speedlimit/geojson",
    "zIndex": 100,
    "visibleLayer": false,
    "visibleLabel": false,
    "hasLabel": true,
    "hasClickEvent": true,
    "name": "screenSpeed",
    "style": facilityStyles.screenSpeed.normal,
    "styleHighlight": facilityStyles.screenSpeed.choose,
    "styleError": facilityStyles.screenSpeed.error,
    // 图层未加载时，复选按钮警用状态
    checkTType: true
  },
  // 8.复合屏
  "screenComposite": {
    "geojsonUrl": "module/composite/geojson",
    "zIndex": 100,
    "visibleLayer": false,
    "visibleLabel": false,
    "hasLabel": true,
    "hasClickEvent": true,
    "name": "screenComposite",
    "style": facilityStyles.screenComposite.normal,
    "styleHighlight": facilityStyles.screenComposite.choose,
    "styleError": facilityStyles.screenComposite.error,
    // 图层未加载时，复选按钮警用状态
    checkTType: true

  },
  // 9.信息屏
  "screenMessage": {
    "geojsonUrl": "module/message/geojson",
    "zIndex": 100,
    "visibleLayer": false,
    "visibleLabel": false,
    "hasLabel": true,
    "hasClickEvent": true,
    "name": "screenMessage",
    "style": facilityStyles.screenMessage.normal,
    "styleHighlight": facilityStyles.screenMessage.choose,
    "styleError": facilityStyles.screenMessage.error,
    // 图层未加载时，复选按钮警用状态
    checkTType: true

  },
  // 10.诱导屏
  "screenInduction": {
    "geojsonUrl": "module/induction/geojson",
    "zIndex": 100,
    "visibleLayer": false,
    "visibleLabel": false,
    "hasLabel": true,
    "hasClickEvent": true,
    "name": "screenInduction",
    "style": facilityStyles.screenInduction.normal,
    "styleHighlight": facilityStyles.screenInduction.choose,
    "styleError": facilityStyles.screenInduction.error,
    // 图层未加载时，复选按钮警用状态
    checkTType: true

  },
  // 11.摄像机
  "camera": {
    "geojsonUrl": "module/camera/geojson",
    "zIndex": 100,
    "visibleLayer": false,
    "visibleLabel": false,
    "hasLabel": true,
    "hasClickEvent": true,
    "name": "camera",
    "style": facilityStyles.camera.normal,
    "styleHighlight": facilityStyles.camera.choose,
    "styleError": facilityStyles.camera.error,
    // 图层未加载时，复选按钮警用状态
    checkTType: true
  },
  //12 易华录  卡口信息
  "crossdev": {
    "list": "module/tbuckleinfo/list",
    "zIndex": 100,
    // "socketSID": WebSocketSID.GPS_CAR,
    "visibleLayer": false,
    "hasClickEvent": true,
    "name": "crossdev",
    "style": facilityStyles.crossdev.normal,
    "styleHighlight": facilityStyles.crossdev.choose,
    "styleError": facilityStyles.crossdev.error,
    // 图层未加载时，复选按钮警用状态
    checkTType: true
  },
///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////           道路状况                    ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 1.交通事故
  "trafficAccident": {
    "list": "roadstatus/trafficAccidents",
    "zIndex": 999,
    "socketSID": WebSocketSID.TRAFFIC_ACCIDENT,
    "visibleLayer": false,
    "visibleLabel": false,
    "hasLabel": true,
    "hasClickEvent": true,
    // name属性必须和key值相同，主要用于获取图层高亮样式
    "name": "trafficAccident",
    "style": accitendStyle.accidentLayer.normal,
    "styleHighlight": accitendStyle.accidentLayer.choose,
    // 图层未加载时，复选按钮警用状态
    checkTType: true
  },
  // 2.施工养护
  "maintenance": {
    "list": "roadstatus/maintenances",
    "zIndex": 990,
    "socketSID": WebSocketSID.MAINTENANCE,
    "visibleLayer": false,
    "visibleLabel": false,
    "hasLabel": true,
    "hasClickEvent": true,
    // name属性必须和key值相同，主要用于获取图层高亮样式
    "name": "maintenance",
    "style": accitendStyle.maintenanceLayer.normal,
    "styleHighlight": accitendStyle.maintenanceLayer.choose,
    // 图层未加载时，复选按钮警用状态
    checkTType: true
  },
  // 3.团雾
  "fog": {
    "list": "roadstatus/fogs",
    "zIndex": 90,
    // 绘制圆的半径，单位米，如果这个值存在，则绘制图形为圆
    "radius": 5000,
    "socketSID": WebSocketSID.ROAD_FOG,
    "visibleLayer": false,
    "visibleLabel": false,
    "hasLabel": true,
    "hasClickEvent": true,
    // name属性必须和key值相同，主要用于获取图层高亮样式
    "name": "fog",
    "style": roadStatus.fog,
    // 图层未加载时，复选按钮警用状态
    checkTType: true
  },
  // 4.天气状况
  "weather": {
    "list": "roadstatus/weathers",
    "zIndex": 110,
    "socketSID": WebSocketSID.ROAD_WEATHER,
    "visibleLayer": false,
    "visibleLabel": false,
    "hasLabel": false,
    "hasClickEvent": true,
    // name属性必须和key值相同，主要用于获取图层高亮样式
    "name": "weather",
    "style": roadStatus.weather,
    // 图层未加载时，复选按钮警用状态
    checkTType: true
  },
  // 5.能见度
  "visibility": {
    "list": "roadstatus/visibilitys",
    "zIndex": 80,
    // 绘制圆的半径，单位米，如果这个值存在，则绘制图形为圆
    "radius": 5000,
    "socketSID": WebSocketSID.ROAD_VISIBILITY,
    "visibleLayer": false,
    "visibleLabel": false,
    "hasLabel": false,
    "hasClickEvent": true,
    // name属性必须和key值相同，主要用于获取图层高亮样式
    "name": "visibility",
    "style": roadStatus.visibility,
    // 图层未加载时，复选按钮警用状态
    checkTType: true
  },
  // 6.路面温度
  "temperature": {
    "list": "roadstatus/temperatures",
    "zIndex": 80,
    // 绘制圆的半径，单位米，如果这个值存在，则绘制图形为圆
    "radius": 5000,
    "socketSID": WebSocketSID.ROAD_TEMPERATURE,
    "visibleLayer": false,
    "visibleLabel": false,
    "hasLabel": false,
    "hasClickEvent": true,
    // name属性必须和key值相同，主要用于获取图层高亮样式
    "name": "temperature",
    "style": roadStatus.temperature,
    // 图层未加载时，复选按钮警用状态
    checkTType: true
  },
  // 7.道路限速
  "speed": {
    //"list": "roadstatus/speeds",
    "geojsonUrl": "module/road/geojson/1",
    "zIndex": 10,
    "socketSID": WebSocketSID.ROAD_SPEED,
    "visibleLayer": false,
    "hasClickEvent": false,
    // name属性必须和key值相同，主要用于获取图层高亮样式
    "name": "speed",
    "style": roadStyles.speed
  },
  // 8.大队辖区
  "area": {
    "geojsonUrl": "module/road/geojson/0",
    "zIndex": 10,
    "visibleLayer": true,
    "hasClickEvent": true,
    // name属性必须和key值相同，主要用于获取图层高亮样式
    "name": "area",
    "style": roadStyles.area
  },
  // 9.互联网路况
  "roadinternet": {
    "geojsonUrl": "module/roadstategaodeinfos/geojson",
    "zIndex": 10,
    "visibleLayer": false,
    "hasClickEvent": true,
    // name属性必须和key值相同，主要用于获取图层高亮样式
    "name": "roadinternet",
    "style": roadStyles.speed
  },
  // 10.卡口路况
  "roadcross": {
    "geojsonUrl": "module/troadcloudidinfo/geojson",
    "zIndex": 10,
    "visibleLayer": false,
    // name属性必须和key值相同，主要用于获取图层高亮样式
    "name": "roadcross",
    "style": roadStyles.speed
  },
///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////           警员警车                     ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 1. 警员
  "policeUser": {
    "list": "module/syspoliceuser/list",
    "socketSID": WebSocketSID.GPS_USER,
    "zIndex": 100,
    "visibleLayer": false,
    "visibleLabel": false,
    "hasLabel": false,
    "hasClickEvent": true,
    "name": "policeUser",
    "style": policeStyle.policeUser.normal,
    "styleHighlight": policeStyle.policeUser.choose,
    // 图层未加载时，复选按钮警用状态
    checkTType: true
  },
  // 2.警车
  "policeCar": {
    "list": "module/syspolicecar/list",
    "zIndex": 100,
    "socketSID": WebSocketSID.GPS_CAR,
    "visibleLayer": false,
    "visibleLabel": false,
    "hasLabel": true,
    "hasClickEvent": true,
    "name": "policeCar",
    "style": policeStyle.policeCar.normal,
    "styleHighlight": policeStyle.policeCar.choose,
    // 图层未加载时，复选按钮警用状态
    checkTType: true
  },
}
