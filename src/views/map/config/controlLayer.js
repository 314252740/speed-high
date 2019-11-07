/* eslint-disable standard/object-curly-even-spacing */
import LayerConfig from '@/mapConfig/LayerConfig'
// 应急预案集合
export const roadList = ['trafficAccident', 'maintenance', 'fog', 'weather', 'visibility', 'temperature', 'planDec']
// 事件录入
export const eventInputList = ['trafficAccidentInput', 'maintenanceInput']
// 地标类型集合
export const tagsList = ['stakeNum', 'serviceArea', 'tollStation', 'trafficHub']
// 设备类型集合
export const shebeiList = ['crossdev', 'sensor', 'screenSpeed', 'screenComposite', 'led', 'uav', 'screenMessage', 'screenInduction', 'highHorn', 'camera', 'uavParking', 'snowmelt']
// 警员警车集合
export const policeList = ['policeCar', 'policeUser']
let equip = {
  'road': [
    {
      name: '交通事故',
      id: 'trafficAccident',
      icon: '&#xe604;',
      rootName: 'accident',
      checkTType: LayerConfig.trafficAccident.checkTType
    },
    {
      name: '施工养护',
      id: 'maintenance',
      icon: '&#xe603;',
      rootName: 'road-maintain',
      checkTType: LayerConfig.maintenance.checkTType
    },
    {
      name: '团雾',
      id: 'fog',
      icon: '&#xe690;',
      rootName: 'cluster-fog',
      checkTType: LayerConfig.fog.checkTType
    },
    {
      name: '预案说明',
      id: 'planDec',
      icon: '&#xe637;',
      rootName: 'road-temperature'
    }
  ],
  'roadRadio': [
    {
      name: '天气状况',
      icon: '&#xe60f;',
      id: 'weather',
      label: '1',
      rootName: 'weather',
      checkTType: LayerConfig.weather.checkTType

    },
    {
      name: '能见度',
      icon: '&#xe629;',
      id: 'visibility',
      label: '2',
      rootName: 'visibility',
      checkTType: LayerConfig.visibility.checkTType

    },
    {
      name: '路面温度',
      icon: '&#xe61c;',
      id: 'temperature',
      label: '3',
      rootName: 'road-temperature',
      checkTType: LayerConfig.temperature.checkTType

    }
  ],
  'eventinput': [
    {
      name: '交通事故录入',
      icon: '&#xe617;',
      id: 'trafficAccidentInput',
      label: '1',
      rootName: 'accident'
    },
    {
      name: '施工养护录入',
      icon: '&#xe617;',
      id: 'maintenanceInput',
      label: '2',
      rootName: 'road-maintain'
    }
  ],
  'tags': [
    {
      name: '桩号',
      picture: require('@/assets/img/mapImg/control-layer/zhuanghao-normal.png'),
      id: 'stakeNum',
      rootName: 'stake-num',
      checkTType: LayerConfig.stakeNum.checkTType
    },
    {
      name: '服务区',
      picture: require('@/assets/img/mapImg/control-layer/fuwuqu-normal.png'),
      id: 'serviceArea',
      rootName: 'service-area',
      checkTType: LayerConfig.serviceArea.checkTType
    },
    {
      name: '收费站',
      picture: require('@/assets/img/mapImg/control-layer/shoufeizhan-normal.png'),
      id: 'tollStation',
      rootName: 'toll-station',
      checkTType: LayerConfig.tollStation.checkTType
    },
    {
      name: '枢纽',
      picture: require('@/assets/img/mapImg/control-layer/shuniu-normal.png'),
      id: 'trafficHub',
      rootName: 'traffic-hub',
      checkTType: LayerConfig.trafficHub.checkTType
    }
  ],
  'shebei': [
    {
      name: '检测仪',
      picture: require('@/assets/img/mapImg/control-layer/jiancy-normal.png'),
      id: 'sensor',
      rootName: 'sensor',
      checkTType: LayerConfig.sensor.checkTType
    },
    {
      name: '限速屏',
      picture: require('@/assets/img/mapImg/control-layer/xiansp-normal.png'),
      screenshow: '屏显',
      show: LayerConfig.screenSpeed.visibleLabel,
      id: 'screenSpeed',
      rootName: 'screen-speed',
      checkTType: LayerConfig.screenSpeed.checkTType
    },
    {
      name: '复合屏',
      picture: require('@/assets/img/mapImg/control-layer/fuhp-normal.png'),
      screenshow: '屏显',
      show: LayerConfig.screenComposite.visibleLabel,
      id: 'screenComposite',
      rootName: 'screen-composite',
      checkTType: LayerConfig.screenComposite.checkTType
    },
    {
      name: '引导灯',
      picture: require('@/assets/img/mapImg/control-layer/yindd-normal.png'),
      id: 'led',
      rootName: 'led',
      checkTType: LayerConfig.led.checkTType
    },
    {
      name: '无人机',
      picture: require('@/assets/img/mapImg/control-layer/wurj-normal.png'),
      id: 'uav',
      rootName: 'uav',
      checkTType: LayerConfig.uav.checkTType
    },
    {
      name: '停机坪',
      picture: require('@/assets/img/mapImg/control-layer/tingjp-normal.png'),
      id: 'uavParking',
      rootName: 'uav-parking'
      // checkTType: LayerConfig.uavParking.checkTType
    },
    {
      name: '信息屏',
      picture: require('@/assets/img/mapImg/control-layer/xinxp-normal.png'),
      screenshow: '屏显',
      show: LayerConfig.screenMessage.visibleLabel,
      id: 'screenMessage',
      rootName: 'screen-message',
      checkTType: LayerConfig.screenMessage.checkTType
    },
    {
      name: '诱导屏',
      picture: require('@/assets/img/mapImg/control-layer/youdp.png'),
      show: LayerConfig.screenInduction.visibleLabel,
      id: 'screenInduction',
      rootName: 'screen-induction',
      checkTType: LayerConfig.screenInduction.checkTType
    },
    {
      name: '高音号角',
      picture: require('@/assets/img/mapImg/control-layer/gaoyhj-normal.png'),
      id: 'highHorn',
      rootName: 'high-horn',
      checkTType: LayerConfig.highHorn.checkTType
    },
    {
      name: '摄像机',
      picture: require('@/assets/img/mapImg/control-layer/shexj-normal.png'),
      screenshow: '视频',
      show: LayerConfig.camera.visibleLabel,
      id: 'camera',
      rootName: 'camera',
      checkTType: LayerConfig.camera.checkTType
    },
    {
      name: '融雪仪',
      picture: require('@/assets/img/mapImg/control-layer/rongxy-normal.png'),
      id: 'snowmelt',
      rootName: 'snowmelt'
      // checkTType: LayerConfig.snowmelt.checkTType
    },
    {
      name: '卡口',
      picture: require('@/assets/img/mapImg/control-layer/kakou-normal.png'),
      id: 'crossdev',
      rootName: 'crossdev',
      checkTType: LayerConfig.crossdev.checkTType
    }
  ],
  'police': [
    {
      name: '警员信息',
      picture: require('@/assets/img/mapImg/control-layer/jingyuan-normal.png'),
      id: 'policeUser',
      rootName: 'police-user',
      checkTType: LayerConfig.policeUser.checkTType
    },
    {
      name: '警车信息',
      picture: require('@/assets/img/mapImg/control-layer/jingche-normal.png'),
      id: 'policeCar',
      rootName: 'police-car',
      screenshow: '屏显',
      show: LayerConfig.policeCar.visibleLabel,
      checkTType: LayerConfig.policeCar.checkTType
    }
  ]
}
// 获取权限列表
export function seekList (item, obj) {
  let equipmentList = item.find(item => { return item.name === 'map' })
  equipmentList.children.forEach(element => {
    if (element.name === 'layers-base') {
      obj.layers_base = element.children
    } else if (element.name === 'layers-dev') {
      obj.layers_dev = element.children
    } else if (element.name === 'road-status') {
      obj.layers_status = element.children
    } else if (element.name === 'event-input') {
      obj.event_input = element.children
    } else if (element.name === 'layers-police') {
      obj.layers_police = element.children
    }
  })
  let arr = {
    layers_base: [],
    layers_dev: [],
    layers_status: [],
    event_input: [],
    layers_police: []
  }
  for (let key in obj) {
    obj[key].forEach(name => { arr[key].push(name.name) })
  }
  return arr
}
// 创建列表
export function getList (data, type) {
  let arr = []
  for (let i = 0; i < equip[`${type}`].length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (data[j] === equip[`${type}`][i].rootName) {
        arr.push(equip[`${type}`][i])
      }
    }
  }
  return arr
}
// 列表图层创建取消禁用
export function cancelDisabel (type) {
  let obj = {}
  for (let key in equip) {
    for (let i = 0; equip[key].length; i++) {
      if (type.name === equip[key][i]) {
        obj.type = key
        obj.index = i
        break
      }
    }
  }
  return obj
}
