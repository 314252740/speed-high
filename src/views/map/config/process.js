export const processObj = {
  // 限速屏
  'screenSpeed': {
    typeName: '限速屏',
    img: require('@/assets/img/mapImg/control-layer/xiansp-normal.png'),
    info: {
      enName: '',
      name: '',
      updataValue: '',
      status: ''
    }
  },
  // 复合屏
  'screenComposite': {
    typeName: '复合屏',
    img: require('@/assets/img/mapImg/control-layer/fuhp-normal.png'),
    info: {
      enName: '',
      name: '',
      updataValue: {
        visibility: {
          name: '能见度',
          main: ''
        },
        roadStatus: {
          name: '路面状况',
          main: ''
        },
        weatherState: {
          name: '天气现象',
          main: ''
        }
      },
      status: ''
    }
  },
  // 信息屏
  'screenMessage': {
    typeName: '信息屏',
    img: require('@/assets/img/mapImg/control-layer/xinxp-normal.png'),
    info: {
      enName: '',
      name: '',
      updataValue: '',
      status: ''
    }
  },
  // 诱导屏
  'screenInduction': {
    typeName: '诱导屏',
    img: require('@/assets/img/mapImg/control-layer/youdp-normal.png'),
    info: {
      enName: '',
      name: '',
      updataValue: '',
      status: ''
    }
  },
  // 高音号
  'highHorn': {
    typeName: '高音号',
    img: require('@/assets/img/mapImg/control-layer/gaoyhj-normal.png'),
    info: {
      enName: '',
      name: '',
      updataValue: '',
      status: ''
    }
  }
}
// 数据转换
export const processTranslate = {
  visibility: {
    '0': { name: '全黑', value: '0' },
    '1': { name: '良好', value: '1' },
    '2': { name: '一般', value: '2' },
    '3': { name: '较差', value: '3' },
    '4': { name: '极差', value: '4' }
  },
  roadStatus: {
    '0': { name: '全黑', value: '0' },
    '1': { name: '良好', value: '1' },
    '2': { name: '湿滑', value: '2' },
    '3': { name: '结冰', value: '3' },
    '4': { name: '积雪', value: '4' }
  },
  weatherState: {
    '0': { name: '全黑', value: '0' },
    '1': { name: '良好', value: '1' },
    '2': { name: '降雨', value: '2' },
    '3': { name: '暴雨', value: '3' },
    '4': { name: '降雪', value: '4' },
    '5': { name: '雾霾', value: '5' }
  }
}
// export function deepCopy (obj) {
//   let result = Array.isArray(obj) ? [] : {}
//   for (let key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       if (typeof obj[key] === "object" && obj[key] !== null) {
//         result[key] = deepCopy(obj[key])
//       } else {
//         result[key] = obj[key]
//       }
//     }
//   }
//   return result
// }
