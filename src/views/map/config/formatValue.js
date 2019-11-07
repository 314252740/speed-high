export default {
  // ------------------------------------地标-----------------------------------------------
  // 枢纽
  'trafficHub': {
    status: {
      '0': { name: '封闭', value: '0' },
      '1': { name: '正常', value: '1' }
    },
    direction: {
      '0': { name: '上行', value: '0' },
      '1': { name: '下行', value: '1' }
    }
  },
  //  收费站
  'tollStation': {
    status: {
      '0': { name: '封闭', value: '0' },
      '1': { name: '正常', value: '1' }
    }
  },
  // 服务区
  'serviceArea': {
    status: {
      '0': { name: '关闭', value: '0' },
      '1': { name: '启用', value: '1' }
    }
  },
  // 桩号
  'stakeNum': {
    status: {
      '0': { name: '正常', value: '0' },
      '1': { name: '停业', value: '1' }
    }
  },
  // 警车
  'policeCar': {
  },
  // ------------------------------------设备-----------------------------------------------
  // 融雪仪
  'snowmelt': {
  },
  // 摄像机
  'camera': {
    workWay: {
      '0': { name: '自动', value: '0' },
      '1': { name: '手动', value: '1' }
    }
  },
  // 高音号
  'highHorn': {
    networkStatus: {
      '0': { name: '连接', value: '0' },
      '1': { name: '未连接', value: '1' }
    },
    volume: {
      '0': { name: '高', value: '0' },
      '1': { name: '中', value: '1' },
      '2': { name: '低', value: '2' }
    }
  },
  // 诱导屏
  'screenInduction': {
    workWay: {
      '0': { name: '自动', value: '0' },
      '1': { name: '手动', value: '1' }
    },
    networkStatus: {
      '0': { name: '连接', value: '0' },
      '1': { name: '未连接', value: '1' }
    }
  },
  // 信息屏
  'screenMessage': {
    workWay: {
      '0': { name: '自动', value: '0' },
      '1': { name: '手动', value: '1' }
    },
    networkStatus: {
      '0': { name: '连接', value: '0' },
      '1': { name: '未连接', value: '1' }
    }
  },
  // 停机坪
  'uavParking': {
  },
  // 无人机
  'uav': {
    workWay: {
      '0': { name: '自动', value: '0' },
      '1': { name: '手动', value: '1' }
    }
  },
  // 引导灯
  'led': {
    settingState: {
      '0': { name: '开启', value: '0' },
      '1': { name: '关闭', value: '1' }
    },
    routingNumber: {
      '0': { name: '开启', value: '0' },
      '1': { name: '关闭', value: '1' }
    },
    networkStatus: {
      '0': { name: '连接', value: '0' },
      '1': { name: '未连接', value: '1' }
    },
    workWay: {
      '0': { name: '自动', value: '0' },
      '1': { name: '手动', value: '1' }
    },
    workingStatus: {
      '0': { name: '工作', value: '0' },
      '1': { name: '不工作', value: '1' }
    },
    useState: {
      '0': { name: '使用', value: '0' },
      '1': { name: '未使用', value: '1' }
    },
    nightModel: {
      '0': { name: '是', value: '0' },
      '1': { name: '否', value: '1' }
    },
    warningModel: {
      '0': { name: '是', value: '0' },
      '1': { name: '否', value: '1' }
    },
    controlModel: {
      '0': { name: '是', value: '0' },
      '1': { name: '否', value: '1' }
    }
  },
  // 复合屏
  'screenComposite': {
    visibility: {
      '0': { name: '全黑', value: '0' },
      '1': { name: '良好', value: '1' },
      '2': { name: '一般', value: '2' },
      '3': { name: '较差', value: '3' },
      '4': { name: '极差', value: '4' }
    },
    roadCond: {
      '0': { name: '全黑', value: '0' },
      '1': { name: '良好', value: '1' },
      '2': { name: '湿滑', value: '2' },
      '3': { name: '结冰', value: '3' },
      '4': { name: '积雪', value: '4' }
    },
    weatherCond: {
      '0': { name: '全黑', value: '0' },
      '1': { name: '良好', value: '1' },
      '2': { name: '降雨', value: '2' },
      '3': { name: '暴雨', value: '3' },
      '4': { name: '降雪', value: '4' },
      '5': { name: '雾霾', value: '5' }
    },
    workWay: {
      '0': { name: '自动', value: '0' },
      '1': { name: '手动', value: '1' }
    },
    networkStatus: {
      '0': { name: '连接', value: '0' },
      '1': { name: '未连接', value: '1' }
    }

  },
  // 限速屏
  'screenSpeed': {
    workWay: {
      '0': { name: '自动', value: '0' },
      '1': { name: '手动', value: '1' }
    },
    networkStatus: {
      '0': { name: '连接', value: '0' },
      '1': { name: '未连接', value: '1' }
    }
  },
  // 卡口
  'crossdev': {
    type: {
      '0': { name: '自动', value: '0' },
      '1': { name: '手动', value: '1' },
      '2': { name: '手动', value: '2' },
      '3': { name: '手动', value: '3' }
    }
  },
  // 检测仪
  'sensor': {
    visibility: {
      '0': { name: '全黑', value: '0' },
      '1': { name: '良好', value: '1' },
      '2': { name: '一般', value: '2' },
      '3': { name: '较差', value: '3' },
      '4': { name: '极差', value: '4' }
    },
    roadCondition: {
      '0': { name: '全黑', value: '0' },
      '1': { name: '良好', value: '1' },
      '2': { name: '湿滑', value: '2' },
      '3': { name: '结冰', value: '3' },
      '4': { name: '积雪', value: '4' }
    },
    weatherCondition: {
      '0': { name: '全黑', value: '0' },
      '1': { name: '良好', value: '1' },
      '2': { name: '降雨', value: '2' },
      '3': { name: '暴雨', value: '3' },
      '4': { name: '降雪', value: '4' },
      '5': { name: '雾霾', value: '5' }
    },
    workWay: {
      '0': { name: '自动', value: '0' },
      '1': { name: '手动', value: '1' }
    },
    networkStatus: {
      '0': { name: '连接', value: '0' },
      '1': { name: '未连接', value: '1' }
    },
    visualState: {
      '0': { name: '已连接', value: '0' },
      '1': { name: '未连接', value: '1' }
    }
  },
  'policeUser': {
  },
  'trafficAccident': {
  },
  'maintenance': {
  },
  'roadinternet': {
    roadType: {
      0: { name: '普通道路', value: '0' },
      1: { name: '轮渡航线', value: '1' },
      2: { name: '隧道', value: '2' },
      3: { name: '桥', value: '3' }
    },
    state: {
      2: { name: '缓行', value: '2' },
      3: { name: '拥堵', value: '3' },
      4: { name: '严重拥堵', value: '4' }
    },
    trend: {
      1: { name: '拥堵', value: '1' },
      2: { name: '趋向严重', value: '2' },
      3: { name: '趋向疏通', value: '3' }
    }
  }
}
