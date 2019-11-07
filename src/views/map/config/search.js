// 应急预案集合
import { timestampToTime } from '@/utils/format'
export const roadList = ['trafficAccident', 'maintenance', 'fog', 'weather', 'visibility', 'temperature', 'planDec']
// 事件录入
export const eventInputList = ['trafficAccidentInput', 'maintenanceInput']
// 地标类型集合
export const tagsList = ['stakeNum', 'serviceArea', 'tollStation', 'trafficHub', 'policeCar', 'trafficAccident', 'maintenance', 'roadinternet'] // "policeUser",
// 设备类型集合
export const shebeiList = ['sensor', 'screenSpeed', 'screenComposite', 'led', 'uav', 'screenMessage', 'screenInduction', 'highHorn', 'camera', 'policeCar']
// 设备、地标集合
export const devList = [...shebeiList]
// 集合policeList
export const policeList = ['policeCar', 'camera']
// 集合事件类型
export const accidentType = ['trafficAccident', 'maintenance']
// 设备控制范围搜索集合
export const detectorRangeList = ['screenSpeed', 'screenComposite', 'screenMessage', 'screenInduction', 'highHorn']
// 分流范围搜索集合
export const diversionList = ['tollStation', 'trafficHub']
// 搜索限速屏
export const speedList = ['screenSpeed']
// 设备控制
export const shebeiControl = ['screenSpeed', 'screenComposite', 'led', 'uav', 'screenMessage', 'screenInduction', 'highHorn', 'snowmelt']
// 设备没有重启权限列表
export const resetControl = ['led', 'uav', 'screenMessage', 'screenInduction', 'highHorn', 'snowmelt']
// 设备无修改值权限列表
export const changeControl = ['sensor', 'snowmelt', 'led']
// facility无周边列表
export const noAroundList = ['roadinternet']
// 设备详情数据
export const decDetailObj = {
  // 检测仪
  'sensor': {
    icon: require('@/assets/img/mapImg/control-layer/jiancy-normal.png'),
    img: require('@/assets/img/mapImg/info-device/sensor.png'),
    name: '检测仪',
    info: {
      roadName: { infoName: '位置坐标', infoDetail: '' },
      temperature: { infoName: '路面温度', infoDetail: '' },
      visibility: { infoName: '能见度', infoDetail: '' },
      roadCondition: { infoName: '道路状况', infoDetail: '' },
      weatherCondition: { infoName: '天气状况', infoDetail: '' },
      visualState: { infoName: '视程状态', infoDetail: '' },
      modifyTime: { infoName: '数据时间', infoDetail: '' }, // ???
      workWay: { infoName: '工作方式', infoDetail: '' },
      ip: { infoName: '网络地址', infoDetail: '' },
      networkStatus: { infoName: '网络状态', infoDetail: '' }
    }
  },
  // 限速屏
  'screenSpeed': {
    icon: require('@/assets/img/mapImg/control-layer/xiansp-normal.png'),
    img: require('@/assets/img/mapImg/info-device/120.png'),
    name: '限速屏',
    info: {
      position: { infoName: '位置坐标', infoDetail: '' },
      limitValue: { infoName: '限速值', infoDetail: '' },
      modifyTime: { infoName: '数据时间', infoDetail: '' }, // ???
      workWay: { infoName: '控制方式', infoDetail: '' },
      ip: { infoName: '网络地址', infoDetail: '' },
      networkStatus: { infoName: '网络状态', infoDetail: '' }
      // 位置坐标、限速值、网络地址、控制方式、网络状态
    }
  },
  // 复合屏
  'screenComposite': {
    icon: require('@/assets/img/mapImg/control-layer/fuhp-normal.png'),
    img: require('@/assets/img/mapImg/info-device/screenComposite1.png'),
    name: '复合屏',
    info: {
      // 位置坐标、能见度、路面状况、天气状况、网络地址、控制方式、网络状态；
      position: { infoName: '位置坐标', infoDetail: '' },
      visibility: { infoName: '能见度', infoDetail: '' },
      roadCond: { infoName: '路面状况', infoDetail: '' },
      weatherCond: { infoName: '天气状况', infoDetail: '' },
      roadIp: { infoName: '网络地址', infoDetail: '' },
      modifyTime: { infoName: '数据时间', infoDetail: '' }, // ???
      workWay: { infoName: '控制方式', infoDetail: '' },
      // ip: {infoName: "网络地址", infoDetail: ""},
      networkStatus: { infoName: '网络状态', infoDetail: '' }
      // type: function () { return this.list.accidentType }
    }
  },
  // 引导灯
  'led': {
    icon: require('@/assets/img/mapImg/control-layer/yindd-normal.png'),
    img: require('@/assets/img/mapImg/info-device/led.jpg'),
    name: '引导灯',
    info: {
      location: { infoName: '位置坐标', infoDetail: '' },
      createTime: { infoName: '创建时间', infoDetail: '' },
      updateTime: { infoName: '更新时间', infoDetail: '' },
      model: { infoName: '型号', infoDetail: '' },
      lampNum: { infoName: '数量', infoDetail: '' },
      code: { infoName: '编码', infoDetail: '' },
      visibility: { infoName: '能见度检测仪数量', infoDetail: '' }
    }
  },
  // 无人机
  'uav': {
    icon: require('@/assets/img/mapImg/control-layer/wurj-normal.png'),
    img: require('@/assets/img/mapImg/info-device/uav.jpg'),
    name: '无人机',
    info: {// 电量、续航时间、飞行速度、飞行经度、飞行纬度、飞行高度；
      electricity: { infoName: '电量', infoDetail: '' },
      batteryLife: { infoName: '续航时间', infoDetail: '' },
      controlModel: { infoName: '飞行速度', infoDetail: '' },
      modifyTime: { infoName: '数据时间', infoDetail: '' }, // ???
      longitude: { infoName: '飞行经度', infoDetail: '' },
      latitude: { infoName: '飞行纬度', infoDetail: '' },
      flightHigh: { infoName: '飞行高度', infoDetail: '' },
      ip: { infoName: '网络地址', infoDetail: '' },
      networkStatus: { infoName: '网络状态', infoDetail: '' }
    }
  },
  // 停机坪
  'uavParking': {
    icon: require('@/assets/img/mapImg/control-layer/tingjp-normal.png'),
    img: '',
    name: '停机坪',
    info: {}
    // 名称、地址
  },
  // 信息屏
  'screenMessage': {
    icon: require('@/assets/img/mapImg/control-layer/xinxp-normal.png'),
    img: require('@/assets/img/mapImg/info-device/screenMessage.jpg'),
    name: '信息屏',
    info: {
      // 位置坐标、显示内容、网络地址、控制方式、网络状态
      roadName: { infoName: '位置坐标', infoDetail: '' },
      // note: {infoName: "显示内容", infoDetail: ""},
      workWay: { infoName: '控制方式', infoDetail: '' },
      modifyTime: { infoName: '数据时间', infoDetail: '' }, // ???
      ip: { infoName: '网络地址', infoDetail: '' },
      networkStatus: { infoName: '网络状态', infoDetail: '' }
    }
  },
  // 诱导屏
  'screenInduction': {
    icon: require('@/assets/img/mapImg/control-layer/youdp-normal.png'),
    img: require('@/assets/img/mapImg/info-device/screenInduction.jpg'),
    name: '诱导屏',
    info: {
      // 位置坐标、网络地址、控制方式、网络状态；
      roadName: { infoName: '位置坐标', infoDetail: '' },
      workWay: { infoName: '控制方式', infoDetail: '' },
      ip: { infoName: '网络地址', infoDetail: '' },
      modifyTime: { infoName: '数据时间', infoDetail: '' }, // ???
      networkStatus: { infoName: '网络状态', infoDetail: '' }
    }
  },
  // 高音号
  'highHorn': {
    icon: require('@/assets/img/mapImg/control-layer/gaoyhj-normal.png'),
    img: require('@/assets/img/mapImg/info-device/highHorn.jpg'),
    name: '高音号',
    info: {
    // 名称、网络地址、所属道路；
      name: { infoName: '名称', infoDetail: '' },
      volume: { infoName: '音量', infoDetail: '' },
      roadName: { infoName: '所属道路', infoDetail: '' },
      modifyTime: { infoName: '数据时间', infoDetail: '' }, // ???
      ip: { infoName: '网络地址', infoDetail: '' },
      networkStatus: { infoName: '网络状态', infoDetail: '' }
    }
  },
  // 摄像机
  'camera': {
    icon: require('@/assets/img/mapImg/control-layer/shexj-normal.png'),
    img: require('@/assets/img/mapImg/info-device/camera.jpg'),
    name: '摄像机',
    info: {
      // 名称、网络地址、所属道路；
      name: { infoName: '名称', infoDetail: '' },
      roadName: { infoName: '所属道路', infoDetail: '' },
      modifyTime: { infoName: '数据时间', infoDetail: '' }, // ???
      ip: { infoName: '网络地址', infoDetail: '' },
      networkStatus: { infoName: '网络状态', infoDetail: '' }
    }
  },
  // 融雪仪
  'snowmelt': {
    icon: require('@/assets/img/mapImg/control-layer/rongxy-normal.png'),
    img: '',
    name: '融雪仪',
    info: {}
    // 余量、工作状态、电压、电流
  },
  // 卡口
  'crossdev': {
    icon: require('@/assets/img/mapImg/control-layer/kakou-normal.png'),
    img: require('@/assets/img/mapImg/info-device/kakou.png'),
    name: '卡口',
    info: {
      kkmc: { infoName: '位置坐标', infoDetail: '' },
      pileinfo: { infoName: '桩号信息', infoDetail: '' },
      type: { infoName: '类型', infoDetail: '' }
    }
  }
}
// 地标详情数据
export const facDetailObj = {
  // 桩号
  'stakeNum': {
    icon: require('@/assets/img/mapImg/control-layer/zhuanghao-normal.png'),
    name: '桩号',
    info: {
      name: { infoName: '名称', infoDetail: '' },
      code: { infoName: '所属道路', infoDetail: '' },
      // direction: {infoName: "方向", infoDetail: ""},
      // km: {infoName: "公里数", infoDetail: ""},
      longitude: { infoName: '经度', infoDetail: '' },
      latitude: { infoName: '纬度', infoDetail: '' }
      // 名称、所属道路、方向、公里数、经纬度；
    }

  },
  // 服务区
  'serviceArea': {
    icon: require('@/assets/img/mapImg/control-layer/fuwuqu-normal.png'),
    name: '服务区',
    info: {
      serviceName: { infoName: '名称', infoDetail: '' },
      roadNames: { infoName: '所属道路', infoDetail: '' },
      // affiliation: {infoName: "所属行政单位", infoDetail: ""},
      pileId: { infoName: '公里桩号', infoDetail: '' },
      status: { infoName: '运营状态', infoDetail: '' }
    }
  },
  // 收费站
  'tollStation': {
    icon: require('@/assets/img/mapImg/control-layer/shoufeizhan-normal.png'),
    name: '收费站',
    info: {
      name: { infoName: '名称', infoDetail: '' },
      roadNames: { infoName: '所属道路', infoDetail: '' },
      // affiliation: {infoName: "所属行政单位", infoDetail: ""},
      pileInfo: { infoName: '公里桩号', infoDetail: '' },
      status: { infoName: '运营状态', infoDetail: '' }
    }
  },
  // 枢纽
  'trafficHub': {
    icon: require('@/assets/img/mapImg/control-layer/shuniu-normal.png'),
    name: '枢纽',
    info: {
      name: { infoName: '名称', infoDetail: '' },
      roadNames: { infoName: '所属道路', infoDetail: '' },
      // affiliation: {infoName: "所属行政单位", infoDetail: ""},
      pileInfo: { infoName: '公里桩号', infoDetail: '' },
      status: { infoName: '运营状态', infoDetail: '' }
    }
  },
  // "policeUser": {
  //   icon: "./static/img/police/jingyuan-normal.png",
  //   name: "",
  //   info: {
  //     name: {infoName: "名称", infoDetail: ""},
  //     roadNames: {infoName: "所属道路", infoDetail: ""},
  //     Government: {infoName: "所属行政单位", infoDetail: ""},
  //     pileId: {infoName: "公里桩号", infoDetail: ""}
  //   }
  // },
  // 警车
  'policeCar': {
    icon: require('@/assets/img/mapImg/control-layer/jingche-normal.png'),
    name: '警车',
    info: {
      plateNum: { infoName: '车牌号', infoDetail: '' },
      orgId: { infoName: '所属大队', infoDetail: '' },
      plateType: { infoName: '车辆颜色', infoDetail: '' },
      types: { infoName: '车辆类型', infoDetail: '' },
      carBrand: { infoName: '车辆型号', infoDetail: '' },
      posinfo: { infoName: '车辆位置', infoDetail: '' }
    }
  },
  'trafficAccident': {
    icon: require('@/assets/img/mapImg/control-layer/accident-normal.png'),
    name: '交通事故',
    info: {
      subordinateHighSpeed: { infoName: '事故位置', infoDetail: '' },
      accidentType: { infoName: '事故类型', infoDetail: '' },
      leveAccident: { infoName: '事故等级', infoDetail: '' },
      casualties: { infoName: '伤亡人数', infoDetail: '' },
      injureNumber: { infoName: '受伤人数', infoDetail: '' },
      accidentTime: { infoName: '事故时间', infoDetail: '' },
      incidentTime: { infoName: '录入时间', infoDetail: '' }
      // warningLevel: {name: "预警级别", main: ""},
      // warningInfo: {name: "预警说明", main: ""}
    }
  },
  'maintenance': {
    icon: require('@/assets/img/mapImg/control-layer/maintenance-choose.png'),
    name: '施工养护',
    info: {
      roadNames: { infoName: '施工位置', infoDetail: '' },
      constructionType: { infoName: '事故类型', infoDetail: '' },
      constructionDes: { infoName: '详情描述', infoDetail: '' },
      startTime: { infoName: '开始时间', infoDetail: '' }
      // continuousTime: {name: "持续时间", main: ""}
      // warningLevel: {name: "预警级别", main: ""},
      // warningInfo: {name: "预警说明", main: ""}
    }
  },
  roadinternet: {
    icon: require('@/assets/img/mapImg/info-bar/hulianwangcheliang.png'),
    name: '互联网拥堵信息',
    info: {
      roadName: { infoName: '所属高速', infoDetail: '' },
      roadType: { infoName: '道路类型', infoDetail: '' }, // （0普通道路1轮渡航线2隧道3桥）
      angle: { infoName: '方向', infoDetail: '' },
      speed: { infoName: '平均速度', infoDetail: '' },
      distance: { infoName: '拥堵距离', infoDetail: '' },
      state: { infoName: '拥堵状态', infoDetail: '' }, // （2缓行3拥堵4严重拥堵）
      trend: { infoName: '拥堵趋势', infoDetail: '' }, // 1拥堵2趋向严重3趋向疏通
      initTime: { infoName: '开始时间', infoDetail: '' } // 1拥堵2趋向严重3趋向疏通
    }
  }
}
export const around = {
  // 枢纽
  'trafficHub': {
    exterior: require('@/assets/img/mapImg/info-device/trafficHub.jpg'),
    layerid: '枢纽'
  },
  //  收费站
  'tollStation': {
    exterior: require('@/assets/img/mapImg/info-device/tollStation.jpg'),
    layerid: '收费站'
  },
  // 服务区
  'serviceArea': {
    exterior: require('@/assets/img/mapImg/info-device/serviceArea.jpg'),
    layerid: '服务区'
  },
  // 桩号
  'stakeNum': {
    exterior: require('@/assets/img/mapImg/info-device/stakeNum.jpg'),
    layerid: '桩号'
  },
  // 融雪仪
  'snowmelt': {
    exterior: '',
    layerid: '融雪仪'
  },
  // 摄像机
  'camera': {
    exterior: require('@/assets/img/mapImg/info-device/cameraSmall.png'),
    layerid: '摄像机'
  },
  // 高音号
  'highHorn': {
    exterior: require('@/assets/img/mapImg/info-device/highHornSmall.png'),
    layerid: '高音号'
  },
  // 诱导屏
  'screenInduction': {
    exterior: require('@/assets/img/mapImg/info-device/screenInductionSmall.png'),
    layerid: '诱导屏'
  },
  // 信息屏
  'screenMessage': {
    exterior: require('@/assets/img/mapImg/info-device/screenMessageSmall.png'),
    layerid: '信息屏'
  },
  // 停机坪
  'uavParking': {
    exterior: require('@/assets/img/mapImg/info-device/uavParking.jpg'),
    layerid: '停机坪'
  },
  // 无人机
  'uav': {
    exterior: require('@/assets/img/mapImg/info-device/uavSmall.png'),
    layerid: '无人机'
  },
  // 引导灯
  'led': {
    exterior: require('@/assets/img/mapImg/info-device/ledSmall.png'),
    layerid: '引导灯'
  },
  // 复合屏
  'screenComposite': {
    exterior: require('@/assets/img/mapImg/info-device/screenCompositeSmall1.jpg'),
    layerid: '复合屏'
  },
  // 限速屏
  'screenSpeed': {
    exterior: require('@/assets/img/mapImg/info-device/small120.png'),
    layerid: '限速屏'
  },
  // 检测仪
  'sensor': {
    exterior: require('@/assets/img/mapImg/info-device/sensorSmall.png'),
    layerid: '检测仪'
  },
  // 警员
  'policeUser': {
    exterior: require('@/assets/img/mapImg/info-device/trafficHub.jpg'),
    layerid: '警员'
  },
  // 警车
  'policeCar': {
    exterior: require('@/assets/img/mapImg/info-device/police_small.png'),
    layerid: '警车'
  },
  // 卡口
  'crossdev': {
    exterior: require('@/assets/img/mapImg/info-device/kakouSmall.png'),
    layerid: '卡口'
  }
}
// 设备控制选项
export const decUpdataInfo = {
  // 限速屏
  'screenSpeed': {
    name: '限速值限制:',
    info: [
      { name: '40', value: '40' },
      { name: '60', value: '60' },
      { name: '80', value: '80' },
      { name: '100', value: '100' },
      { name: '120', value: '120' }
    ]
    // info: ["40", "60", "80", "100", "120"]
  },
  // 信息屏
  'screenMessage': {
    name: '提示信息修改为:',
    info: [
      { name: '前方多发事故路段，减速慢行', value: '1' },
      { name: '前方多发事故路段，减速慢行', value: '2' },
      { name: '前方多发事故路段，减速慢行', value: '3' },
      { name: '前方多发事故路段，减速慢行', value: '4' },
      { name: '前方多发事故路段，减速慢行', value: '5' }
    ]
    // info: ["前方多发事故路段，减速慢行", "前方多发事故路段，减速慢行", "前方多发事故路段，减速慢行", "前方多发事故路段，减速慢行", "前方多发事故路段，减速慢行"]
  },
  // 诱导屏
  'screenInduction': {
    name: '提示信息修改为',
    info: [
      { name: '前方多发事故路段，减速慢行', value: '1' },
      { name: '前方多发事故路段，减速慢行', value: '2' },
      { name: '前方多发事故路段，减速慢行', value: '3' },
      { name: '前方多发事故路段，减速慢行', value: '4' },
      { name: '前方多发事故路段，减速慢行', value: '5' }
    ]
  },
  // 高音号
  'highHorn': {
    name: '提示音修改为',
    info: [
      { name: '前方多发事故路段，减速慢行', value: '1' },
      { name: '前方多发事故路段，减速慢行', value: '2' },
      { name: '前方多发事故路段，减速慢行', value: '3' },
      { name: '前方多发事故路段，减速慢行', value: '4' },
      { name: '前方多发事故路段，减速慢行', value: '5' }
    ]
  }
}
export const LampLists = {
  name: '引导灯状态',
  list: {
    mainControlLeadId: { name: '主控编号:', info: '', line: false },
    code: { name: '灯号:', info: '', line: false },
    nightMod: { name: '夜间状态:', info: '', line: false }, // 0-关 1-开
    voice: { name: '声音:', info: '', line: false },
    batteryVoltage: { name: '电池电压:', info: '', line: false },
    brightness: { name: '亮度:', info: '', line: false },
    sunVoltage: { name: '太阳能电压:', info: '', line: false },
    wake: { name: '尾迹:', info: '', line: false },
    frequency: { name: '频率:', info: '', line: true },
    cpuTemperature: { name: 'CPU温度:', info: '', line: true },
    createTime: { name: '更新时间:', info: '', line: true }
  }
}
export function formatLed (type, value) {
  switch (type) {
    case 'mainControlLeadId': return value
    case 'code': return value
    case 'brightness': if (value === 0) { return value + '%' } else { return value + '0' + '%' }
    case 'frequency': if (value === 0) { return value + 'Hz' } else { return value + '0' + 'Hz' }
    case 'batteryVoltage': return value + 'V'
    case 'sunVoltage': return value + 'V'
    case 'voice': return value ? '开' : '关'
    case 'nightMod': return value ? '开' : '关'
    case 'wake': return value ? '开' : '关'
    case 'cpuTemperature': return value + '℃'
    case 'createTime': return timestampToTime(value)
  }
}
