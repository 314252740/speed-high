let screenCompositedata = {// 传入的复合屏的实时数据
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
  }
}
export default {
  screenSpeed: function (el, val) {
    el.firstElementChild.innerHTML = val.limitValue
  },
  screenComposite: function (el, val) {
    console.log(el)
    val.visibility ? el.children[1].children[0].children[1].innerHTML = screenCompositedata.visibility[val.visibility].name : el.children[1].children[0].children[1].innerHTML = val.visibility
    val.roadCond ? el.children[1].children[1].children[1].innerHTML = screenCompositedata.roadCond[val.roadCond].name : el.children[1].children[1].children[1].innerHTML = val.roadCond
    val.weatherCond ? el.children[1].children[2].children[1].innerHTML = screenCompositedata.weatherCond[val.weatherCond].name : el.children[1].children[2].children[1].innerHTML = val.weatherCond
    // el.firstElementChild.innerHTML = val.limitValue
  },
  screenMessage: function (el, val) {
    console.log(el)
  }
}
