// 地图图标样式
/* eslint-disable */
import { Style, Icon, Stroke, Fill, Text, Circle as CircleStyle } from "ol/style"

const white = [255, 255, 255, 1];
const blue = [0, 153, 255, 1];
const yellow = [251, 154, 51, 1];
const width = 3;
// 大队颜色数组0-4
const daduiColor = ['rgba(108, 212, 221, 1)', 'rgba(66, 165, 85, 1)', 'rgba(129, 74, 158, 1)', 'rgba(35, 91, 200, 1)', 'rgba(220, 70, 118, 1)'];
let roadStatusRadioList = {
  "0": { name: "全黑", img: "" },
  "1": { name: "良好", img: require("../assets/img/mapImg/control-legend/qing.png") },
  "2": { name: "降雨", img: require("../assets/img/mapImg/control-legend/zhongyu.png") },
  "3": { name: "暴雨", img: require("../assets/img/mapImg/control-legend/baoyu.png") },
  "4": { name: "降雪", img: require("../assets/img/mapImg/control-legend/xue.png") },
  "5": { name: "雾霾", img: require("../assets/img/mapImg/control-legend/dawu.png") }
}
/**
 * @选中未选中样式
 */
export const searchStyles = {
  // 1.选中状态
  "checked": new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: require("../assets/img/mapImg/control-layer/numb3.png")// red
    })
  }),
  // 2.未选中状态
  "unchecked": new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: require("../assets/img/mapImg/control-layer/numb1.png")// blue
    })
  }),
  // 3.起点
  "startPoint": new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: require("../assets/img/homeImg/start.png")// blue
    })
  }),
  // 4.终点
  "endPoint": new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: require("../assets/img/homeImg/end.png")// blue
    })
  }),
  // 5.分流图层
  roadSelLayer: new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: require("../assets/img/mapImg/control-layer/fenliu.png")// blue
    })
  })
}
export const drawStyles = {
  // 1.点
  "point": searchStyles.checked,
  // 2.线
  "LineString": [
    new Style({
      stroke: new Stroke({
        color: white,
        width: width + 2
      })
    }),
    new Style({
      stroke: new Stroke({
        color: blue,
        width: width
      })
    })
  ],
  "Polygon": [
		new Style({
			fill: new Fill({
				color: 'rgba(1,127,237,0.3)'
			})
		}),
		new Style({
			stroke: new Stroke({
				color: 'rgba(1,127,237,0.8)',
				width: 1
			})
		})
  ],
  "modifyPointWithText": function(feature){
    let text = feature.get("text");
    let rotation = feature.get("rotation");
    if(rotation == undefined) {
      return [];
    }
    return [
      new Style({
        image: new Icon({
          rotation: rotation,
          src: require("../assets/img/mapImg/control-layer/freehand.png")
        }),
        text: new Text({
          offsetX: 16,
          rotation: rotation,
          textAlign: 'left',
          padding: [5, 10, 0, 0],
          font: '14px sans-serif',
          text: text
        })
      })
    ]
  }
}

/**
 * @道路样式
 */
export const roadStyles = {
  // 1.正常道路颜色
  "normal": function(feature){
    return [
      new Style({
        stroke: new Stroke({
          color: white,
          width: width + 2
        })
      }),
      new Style({
        stroke: new Stroke({
          color: yellow,
          width: width
        })
      })
    ]
  },
  "normalWithText": function(feature){
    let points = feature.getGeometry().getCoordinates();
    let start = points[0];
    let end = points[points.length-1];
    let rotation = Math.atan2(end[1]-start[1], end[0]-start[0])// * 180 / Math.PI
    return [
      new Style({
        stroke: new Stroke({
          color: white,
          width: width + 2
        })
      }),
      new Style({
        stroke: new Stroke({
          color: yellow,
          width: width
        }),
        text: new Text({
          rotation: 2*Math.PI - rotation,
          padding: [5, 10, 5, 10],
          font: '14px sans-serif',
          textBaseline: 'bottom',
          text: feature.get('name'),
          backgroundFill: new Fill({
            color: white
          }),
          backgroundStroke: new Stroke({
            color: 'rgba(204, 204, 204, 1)',
            width: 1
          })
        })
      })
    ]
  },
  /*// 2.绘制道路颜色
  "draw": [
    new Style({
      stroke: new Stroke({
        color: white,
        width: width + 2
      })
    }),
    new Style({
      stroke: new Stroke({
        color: blue,
        width: width
      })
    })
  ]*/
  area: function(feature){
    let dadui = feature.get("uploadcode");
    let width = 5;
    let daduiIndex = parseInt(dadui)-1;
    let color = daduiColor[daduiIndex];
    return [
      new Style({
        stroke: new Stroke({
          color: color,
          width: width + 6
        })
      }),
      new Style({
        stroke: new Stroke({
          color: 'rgba(255, 255, 255, 1)',
          width: width
        })
      }),
      new Style({
        stroke: new Stroke({
          color: color,
          width: 1
        })
      })
    ]
  },
  // 7.道路限速 roadStatus也有一个这个样式
  "speed": function(feature){
    let limitSpeed = feature.get("speed");
    let color = 'rgba(210, 210, 210, 1)'
    let width = 5;
    if(limitSpeed > 100) {
      color = 'rgba(81, 210, 127, 1)'
    }
    else if(limitSpeed > 80) {
      color = 'rgba(255, 208, 70, 1)'
    }
    else if(limitSpeed > 40) {
      color = 'rgba(232, 14, 13, 1)'
    }
    else if(limitSpeed > 0) {
      color = 'rgba(182, 0, 1, 1)'
    }
    return [
      new Style({
        stroke: new Stroke({
          color: color,
          width: width + 6
        })
      }),
      new Style({
        stroke: new Stroke({
          color: 'rgba(255, 255, 255, 1)',
          width: width
        })
      }),
      new Style({
        stroke: new Stroke({
          color: color,
          width: 1
        })
      })
    ]
  }
}

/**
 * @基础地标
 */
export const landMarkStyles = {
  // 1.桩号
  "stakeNum": {
    "normal": function(feature, scale){
      let angle = feature.get('angle');
      let direction = feature.get('direction');
      let daduiIndex = parseInt(direction)-1;
      let color = daduiColor[daduiIndex];
      let num = parseInt(feature.get('name'));
      if(scale > 60 && (num % 4 > 0)) {
        return []
      }
      else if(scale > 20 && (num % 2 > 0)) {
        return [];
      }
      if(!angle)angle = 0;
      angle = angle * Math.PI / 180
      return [
        new Style({
          text: new Text({
            rotation: 2*Math.PI - angle,
            textAlign: 'left',
            padding: [5, 10, 0, 0],
            font: 'bold 14px sans-serif',
            text: '一'+num,
            fill: new Fill({color: color})
          })
        })
      ]
    }
  },
  // 2.服务区
  "serviceArea": {
    "normal": new Style({// 正常服务区
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/fuwuqu-normal.png")
      })
    }),
    "choose": new Style({// 选中服务区
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/fuwuqu-choose.png")
      })
    })
  },
  // 3.收费站
  "tollStation": {
    "normal": new Style({// 正常收费站
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/shoufeizhan-normal.png")
      })
    }),
    "choose": new Style({// 选中收费站
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/shoufeizhan-choose.png")
      })
    })
  },
  // 4.交通枢纽
  "trafficHub": {
    "normal": new Style({// 正常枢纽
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/shuniu-normal.png")
      })
    }),
    "choose": new Style({// 选中枢纽
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/shuniu-choose.png")
      })
    })
  }
}
/**
 * @警员警车
 */
export const policeStyle = {
  "policeUser": {
    "normal": new Style({// 正常警员
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/jingyuan-normal.png")
      })
    }),
    "choose": new Style({// 选中警员
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/jingyuan-choose.png")
      })
    })
  },
  "policeCar": {
    "normal": new Style({// 正常警车
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/jingche-normal.png")
      })
    }),
    "choose": new Style({// 选中警车
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/jingche-choose.png")
      })
    })
  }
}
/**
 * @事件录入
 */
export const accitendStyle = {
  "accidentLayer": {
    "normal": new Style({// 正常交通事故
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/accident-normal.png")
      })
    }),
    "choose": new Style({// 选中交通事故
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/accident-choose.png")
      })
    })
  },
  "maintenanceLayer": {
    "normal": new Style({// 正常施工养护
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/maintenance-normal.png")
      })
    }),
    "choose": new Style({// 选中施工养护
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/maintenance-choose.png")
      })
    })
  }
}
/**
 * @设备图标
 */
export const facilityStyles = {
  // 1.检测仪
  "sensor": {
    "normal": new Style({// 正常检测仪
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/jiancy-normal.png")
      })
    }),
    "choose": new Style({// 选中检测仪
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/jiancy-choosel.png")
      })
    }),
    "error": new Style({// 故障
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/jiancy-error.png")
      })
    })
  },
  // 2.引导灯
  "led": {
    "normal": new Style({// 正常引导灯
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/yindd-normal.png")
      })
    }),
    "choose": new Style({// 选中引导灯
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/yindd-choose.png")
      })
    }),
    "error": new Style({// 故障
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/yindd-error.png")
      })
    })
  },
  // 3.无人机
  "uav": {
    "normal": new Style({// 正常无人机
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/wurj-normal.png")
      })
    }),
    "choose": new Style({// 选中无人机
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/wurj-choose.png")
      })
    }),
    "error": new Style({// 故障
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/wurj-error.png")
      })
    })
  },
  // 4.停机坪
  "uavParking": {
    "normal": new Style({// 正常引导灯
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/tingjp-normal.png")
      })
    }),
    "choose": new Style({// 选中引导灯
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/tingjp-choose.png")
      })
    }),
    "error": new Style({// 故障
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/tingjp-error.png")
      })
    })
  },
  // 5.高音号
  "highHorn": {
    "normal": new Style({// 正常高音号
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/gaoyhj-normal.png")
      })
    }),
    "choose": new Style({// 选中高音号
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/gaoyhj-choosel.png")
      })
    }),
    "error": new Style({// 故障
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/gaoyhj-error.png")
      })
    })
  },
  // 6.融雪仪
  "snowmelt": {
    "normal": new Style({// 正常引导灯
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/rongxy-normal.png")
      })
    }),
    "choose": new Style({// 选中引导灯
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/rongxy-choose.png")
      })
    }),
    "error": new Style({// 故障
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/rongxy-error.png")
      })
    })
  },
  // 7.限速屏
  "screenSpeed": {
    "normal": new Style({// 正常限速屏
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/xiansp-normal.png")
      })
    }),
    "choose": new Style({// 选中限速屏
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/xiansp-choose.png")
      })
    }),
    "error": new Style({// 故障
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/xiansp-error.png")
      })
    })
  },
  // 8.复合屏
  "screenComposite": {
    "normal": new Style({// 正常复合屏
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/fuhp-normal.png")
      })
    }),
    "choose": new Style({// 选中复合屏
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/fuhp-choose.png")
      })
    }),
    "error": new Style({// 故障
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/fuhp-error.png")
      })
    })
  },
  // 9.信息屏
  "screenMessage": {
    "normal": new Style({// 正常引导灯
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/xinxp-normal.png")
      })
    }),
    "choose": new Style({// 选中引导灯
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/xinxp-choose.png")
      })
    }),
    "error": new Style({// 故障
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/xinxp-error.png")
      })
    })
  },
  // 10.诱导屏
  "screenInduction": {
    "normal": new Style({// 正常诱导屏
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/youdp-normal.png")
      })
    }),
    "choose": new Style({// 选中诱导屏
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/youdp-choose.png")
      })
    }),
    "error": new Style({// 故障
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/youdp-error.png")
      })
    })
  },
  // 11.摄像机
  "camera": {
    "normal": new Style({// 摄像机
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/shexj-normal.png")
      })
    }),
    "choose": new Style({// 摄像机
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/shexj-choose.png")
      })
    }),
    "error": new Style({// 故障
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/shexj-error.png")
      })
    })
  },
  // 12.卡口
  "crossdev": {
    "normal": new Style({// 摄像机
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/kakou-normal.png")
      })
    }),
    "choose": new Style({// 摄像机
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/kakou-choose.png")
      })
    }),
    "error": new Style({// 故障
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/kakou-error.png")
      })
    })
  },
  // 1.桩号
  "stakeNum": {
    "normal": new Style({// 摄像机
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/zhuanghao-normal.png")
      })
    }),
    "choose": new Style({// 摄像机
      image: new Icon({
        src: require("../assets/img/mapImg/control-layer/zhuanghao-choose.png")
      })
    })
  },
  "policeCar": policeStyle.policeCar,
  // 2.服务区
  "serviceArea": landMarkStyles.serviceArea,
  // 3.收费站
  "tollStation": landMarkStyles.tollStation,
  // 4.交通枢纽
  "trafficHub": landMarkStyles.trafficHub
  /*,
  // 99.周边设备  根据feature的layerid信息获取
  "around": function(feature){
    let properties = feature.getProperties();
    let layerid = properties.get("layerid");
    return facilityStyles[layerid].normal
  }*/
}

/**
 * @道路状况
 */
export const roadStatus = {
  // 1.交通事故   事故点样式为空，采用overlayer来展示
  "trafficAccident": [],
  // 2.施工养护   施工点样式为空，采用overlayer来展示
  "normalWithText": [],
  // 3.团雾  团雾根据浓度设置不同的透明度
  "fog": function(feature){
    let alpha = 0.1;
    if(feature.get("concentration")) {
      alpha = parseFloat(feature.get("concentration"))/100;
    }
    return [
      new Style({
        fill: new Fill({
          color: 'rgba(102,102,102,'+alpha+')'
        })
      }),
      new Style({
        stroke: new Stroke({
          color: 'rgba(102,102,102,0.6)',
          width: 1
        })
      })
    ]
  },
  // 4.天气状况
  "weather": function(feature){
    let properties = feature.getProperties();
    return [
      new Style({
        image: new Icon({
          src: roadStatusRadioList[properties.weatherCond] ? roadStatusRadioList[properties.weatherCond].img :"./static/img/weather/qing.png"
        }),
        stroke: new Stroke({
          color: white,
          width: width + 2
        })
      }),
      new Style({
        image: new Icon({
          src: roadStatusRadioList[properties.weatherCond] ? roadStatusRadioList[properties.weatherCond].img :"./static/img/weather/qing.png"
        }),
        stroke: new Stroke({
          color: yellow,
          width: width
        })
      })
    ]
  },
  // 5.能见度
  "visibility": function(feature){
    let alpha = 0.1;
    if(feature.get("visibility")) {
      alpha = parseFloat(feature.get("visibility"))/100;
    }
    return [
      new Style({
        fill: new Fill({
          color: 'rgba(153,153,153,'+alpha+')'
        })
      }),
      new Style({
        stroke: new Stroke({
          color: 'rgba(153,153,153,0.6)',
          width: 1
        })
      })
    ]
  },
  // 6.路面温度
  "temperature": function(feature){
    let alpha = 0, r=255, g=255, b=255;
    if(feature.get("temperature")) {
      let temp = parseFloat(feature.get("temperature"));
      if(temp < 10) {
        r = 19;
        g = 100;
        b = 156;
        alpha = (40 - temp)/80;
      }
      else {
        r = 253;
        g = 175;
        b = 49;
        alpha = temp/40;
      }
    }
    return [
      new Style({
        fill: new Fill({
          color: 'rgba('+r+','+g+','+b+','+alpha+')'
        })
      }),
      new Style({
        stroke: new Stroke({
          color: 'rgba('+r+','+g+','+b+',0.6)',
          width: 1
        })
      })
    ]
  }
}

