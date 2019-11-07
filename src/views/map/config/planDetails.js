export const detailedList = {
  // 1.交通事故
  'trafficAccident': {
    title: '交通事故详情',
    planTitle: '交通事故事件',
    list: {
      position: { name: '事故位置', main: '' },
      accidentType: { name: '事故类型', main: '' },
      casualties: { name: '伤亡人数', main: '' },
      accidentNote: { name: '事故描述', main: '' },
      accidentTime: { name: '开始时间', main: '' },
      incidentTime: { name: '录入时间', main: '' },
      leveAccident: { name: '事故等级', main: '' },
      warningLevel: { name: '预警级别', main: '' },
      warningInfo: { name: '预警说明', main: '' },
      continueTime: { name: '开始时间', main: '' }
      // deal: {name: "已执行的事故处理方法", main: ""}
    },
    type: function () { return this.list.accidentType },
    planInfo: {}
  },
  // 2.施工养护
  'maintenance': {
    title: '施工养护详情',
    planTitle: '施工养护事件',
    list: {
      position: { name: '养护位置', main: '' },
      constructionType: { name: '养护类型', main: '' },
      constructionDes: { name: '养护描述', main: '' },
      startTime: { name: '开始时间', main: '' },
      continueTime: { name: '持续时间', main: '' },
      warningLevel: { name: '预警级别', main: '' },
      warningInfo: { name: '预警说明', main: '' }
      // deal: {name: "已执行的事故处理方法", main: ""}
    },
    type: function () { return this.list.constructionType },
    planInfo: {}
  },
  // 3.团雾
  'fog': {
    title: '团雾详情',
    planTitle: '团雾事件',
    list: {
      position: { name: '团雾位置', main: '' },
      concentration: { name: '团雾浓度', main: '' },
      timeStart: { name: '开始时间', main: '' },
      timeUpdate: { name: '更新时间', main: '' },
      continueTime: { name: '持续时间', main: '' },
      warningLevel: { name: '预警级别', main: '' },
      warningInfo: { name: '预警说明', main: '' }
      // deal: {name: "已执行的事故处理方法", main: ""}
    },
    type: function () { return this.list.concentration },
    planInfo: {}
  },
  // 4.天气状况
  'weather': {
    title: '天气状况详情',
    planTitle: '',
    list: {
      weatherStaus: { name: '天气状况', main: '' },
      accidentTime: { name: '开始时间', main: '' },
      continueTime: { name: '持续时间', main: '' },
      rain: { name: '降雨量', main: '' },
      snow: { name: '积雪厚度', main: '' },
      ice: { name: '结冰厚度', main: '' }
      // deal: {name: "已执行的事故处理方法", main: ""}
    },
    type: function () { return this.list.weatherStaus },
    planInfo: {}
  },
  // 5.能见度
  'visibility': {
    title: '能见度详情',
    planTitle: '',
    list: {
      visibilityValue: { name: '能见度数值', main: '' },
      accidentTime: { name: '开始时间', main: '' },
      continueTime: { name: '持续时间', main: '' }
      // deal: {name: "已执行的事故处理方法", main: ""}
    },
    type: function () { return this.list.visibilityValue },
    planInfo: {}
  },
  // 6.路面温度
  'temperature': {
    title: '路面温度详情',
    planTitle: '',
    list: {
      roadtemperature: { name: '路面温度', main: '' },
      humidity: { name: '湿度', main: '' },
      accidentTime: { name: '开始时间', main: '' },
      continueTime: { name: '持续时间', main: '' }
      // deal: {name: "已执行的事故处理方法", main: ""}
    },
    type: function () { return this.list.roadtemperature },
    planInfo: {}
  }
}
