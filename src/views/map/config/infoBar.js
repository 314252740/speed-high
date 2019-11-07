import { formatTime } from '@/utils/format'
export let interCongestionList = {
  roadName: { name: '所属高速', info: null, toolTip: false },
  roadType: { name: '道路类型', info: null, toolTip: false }, // （0普通道路1轮渡航线2隧道3桥）
  angle: { name: '方向', info: null, toolTip: false },
  speed: { name: '平均速度', info: null, toolTip: false },
  distance: { name: '拥堵距离', info: null, toolTip: false },
  state: { name: '拥堵状态', info: null, toolTip: false }, // （2缓行3拥堵4严重拥堵）
  trend: { name: '拥堵趋势', info: null, toolTip: false }, // 1拥堵2趋向严重3趋向疏通
  initTime: { name: '开始时间', info: null, toolTip: false } // 1拥堵2趋向严重3趋向疏通
}
export let congestionValue = {
  roadType: {
    0: '普通道路',
    1: '轮渡航线',
    2: '隧道',
    3: '桥'
  },
  state: {
    2: '缓行',
    3: '拥堵',
    4: '严重拥堵'
  },
  trend: {
    1: '拥堵',
    2: '趋向严',
    3: '趋向疏通'
  }
}
export function formateCongestion (type, value) {
  switch (type) {
    case 'roadType' : return congestionValue[type][value]
    case 'state' : return congestionValue[type][value]
    case 'trend' : return congestionValue[type][value]
    case 'speed' : return value + '公里/小时'
    case 'distance' : return value + '米'
    case 'initTime' : return formatTime('yyyy-MM-dd hh:mm:ss', 'yyyy-MM-dd hh:mm:ss', value)
    default: return value
  }
}
