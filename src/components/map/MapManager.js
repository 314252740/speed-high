/* eslint-disable */
import 'ol/ol.css';
import { Map, View, Overlay, Feature } from 'ol';
import { Draw, Modify, Snap } from 'ol/interaction.js';
import { Point, LineString, Polygon, Circle, MultiLineString } from 'ol/geom';
import {defaults as defaultControls, ScaleLine} from 'ol/control.js';
import { get as getProjection, transform } from 'ol/proj.js';
import WKT from 'ol/format/WKT.js';
import {toPng} from 'html-to-image';
import { applyTransform } from 'ol/extent.js';
import TileLayer from 'ol/layer/Tile.js';
import {getDistance} from "ol/sphere.js"
import WMTS from 'ol/source/WMTS.js';
import TileGridWMTS from 'ol/tilegrid/WMTS.js';
import TileGrid from 'ol/tilegrid/TileGrid';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import TileImage from 'ol/source/TileImage';
import { toStringXY } from 'ol/coordinate';

import LayerConfig from "@/mapConfig/LayerConfig";
import {searchStyles} from "@/mapConfig/StyleConfig";
import LayerManager from "@/components/map/LayerManager.js";
import BaiduProjection from "@/components/map/BaiduProjection.js";

let map, mapData, layers={}, featureNameOverlay, featureNameOverlayDiv, preOverlay, clickEventHandler={}, draw, modifyPoint, drawSel;
let api = {
  init: init,
  getMap: function(){
    return map;
  },
  // 坐标转换，将百度坐标转换为经纬度坐标，返回的是坐标串不是对象
  converBaiduPrj2Lnglat: function(geom){
    if(!geom || !geom.getType)return null;
    let _points = geom.getCoordinates();
    let _type = geom.getType();
    if(_type === 'Point') {
      return transform([_points[0], _points[1]], 'EPSG:3857', 'EPSG:4326');
    }
    else if(_type === 'LineString') {
      let _point, i=0, len=_points.length, temps=[];
      for(; i<len; i++) {
        _point = _points[i];
        _point = transform([parseFloat(_point[0]), parseFloat(_point[1])], 'EPSG:3857', 'EPSG:4326');
        temps.push(_point);
      }
      return temps;
    }
    else if(_type === 'Polygon') {
      let _point, i=0, len=_points[0].length, temps=[];
      for(; i<len; i++) {
        _point = _points[0][i];
        _point = transform([parseFloat(_point[0]), parseFloat(_point[1])], 'EPSG:3857', 'EPSG:4326');
        temps.push(_point);
      }
      return [temps];
    }
  },
  addPoint: function(layerName, point){
    if(!layers[layerName])return;
    point = transform([parseFloat(point[0]), parseFloat(point[1])], 'EPSG:4326', 'EPSG:3857');
    let feature = new Feature({geometry: new Point(point)});
    layers[layerName].getSource().addFeature(feature);
    return feature;
  },
  addLayer: async function(layerName, done){
    let params = {map: map};
    if(typeof layerName === "string") {
      params.name = layerName;
    }
    else if(typeof layerName === "object") {
      params = Object.assign(params, layerName)
    }
    if (done) {
      params.callback = done
    }
    let layer = new LayerManager(params);
    map.addLayer(layer.getInstance());
    layers[params.name] = layer;
  },
  addData2Layer: function(layerName, list){
    if(!layers[layerName])return;
    let features = [];
    let i=0,len=list.length,item,feature;
    for(; i<len; i++) {
      item = list[i];
      feature = new Feature();
      feature.setId(item.id);
      feature.setGeometry(new Point(transform([parseFloat(item.longitude), parseFloat(item.latitude)], 'EPSG:4326', 'EPSG:3857')));
      feature.setProperties(item);
      features.push(feature);
    }
    layers[layerName].addFeautres(features);
  },
  addFeautre(layerName,feature){
    if(!layers[layerName])return; 
    layers[layerName].addFeautre(feature);
  },
  addFeautres(layerName,features){
    if(!layers[layerName])return; 
    let i=0,len=features.length;
    for(; i<len; i++) {
      layers[layerName].addFeautre(features[i]);
    }
  },
  getFeautres(layerName){
    if(!layers[layerName])return; 
    return layers[layerName].getSource().getFeatures();
  },
  getVisible(layerName) {
    if(!layers[layerName])return
    return layers[layerName].getVisible()
  },
  // 添加图层的单击事件
  addEvent: function(layerName, callback){
    if(!layerName || !callback)return;
    clickEventHandler[layerName] = callback;
  },
  // 移出图层的单击事件
  removeEvent: function(layerName){
    if(!clickEventHandler[layerName])return;
    delete clickEventHandler[layerName];
  },
  // 显示/隐藏道路title
  showRoadText: function(visiable){
    layers["road"].showRoadText(visiable);
  },
  addRoadToDrawLayer: function(wktstr){
    let layerName = "drawLayer";
    let format = new WKT();
    let feature = format.readFeature(wktstr, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    });
    layers[layerName].getSource().addFeature(feature);
  },
  // 道路绘制方法，返回道路的几何坐标信息wkt字符串
  drawRoad: async function(callback){
    if(draw) {
      layers["drawLayer"].clear();
    }
    else {
      await api.addLayer("drawLayer");
      let source = layers['drawLayer'].getSource();
      draw = new Draw({
        stopClick: true,
        source: source,
        type: "LineString"
      });
      draw.on('drawend', function(evt) {
        // 清空图层
        layers['drawLayer'].clear();
        //let temps = api.converBaiduPrj2Lnglat(evt.feature.getGeometry());
        let format = new WKT();
        let wktstr = format.writeFeature(evt.feature, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
        });
        if(callback)callback(wktstr);
      });
      map.addInteraction(draw);

      // 判断如果添加了道路图层，则设置其为捕捉图层
      if(layers["road"]) {
        let snap = new Snap({
          source: layers["road"].getInstance().getSource()
        });
        map.addInteraction(snap);
      }
    }
  },
  // 绘制多边形，返回绘制的几何对象 type:LineString/Polygon/Circle freehand:是否开启拖动绘制，默认false
  drawWithType: function(type, callback, freehand){
    if(!type) {
      console.log("MapManager.draw() parameter drawType is undefined");
      return;
    }
    if(draw) {
      layers["drawLayer"].clear();
    }
    else {
      api.addLayer("drawLayer");
      let source = layers['drawLayer'].getSource();
      let freehand = freehand? freehand : false;
      draw = new Draw({
        stopClick: true,
        source: source,
        freehand: freehand,
        type: type
      });
      draw.on('drawend', function(evt) {
        // 清空图层
        layers['drawLayer'].clear();
        if(callback)callback(evt.feature.getGeometry());
      });
      map.addInteraction(draw);
    }
  },
  // 设备添加的时候，选点设置经纬度的方法
  startDraw: function(layerName, callback){
    if(drawSel) {
      map.removeInteraction(drawSel);
    }
    if(draw) {
      layers['drawLayer'].clear();
    }
    else {
      api.drawPointFn(layerName, callback)
    }
    map.addInteraction(draw);
  },
  // 修改drawLayer图层的样式
  resetDrawLayerStyle: function () {
    layers['drawLayer'].setStyle(LayerConfig["drawLayer"].style);
  },
  // 修改整个图层样式
  setStyle: function (layerid, type) {
    layers[layerid].setStyle(LayerConfig[layerid][type]);
  },
  drawPointFn: function (layerName, callback) {
    if(!layers['drawLayer']) {
      api.addLayer({"name": "drawLayer", "style": LayerConfig[layerName].style});
    }
    layers['drawLayer'].setStyle(LayerConfig[layerName].style);
    let source = layers['drawLayer'].getSource();
    draw = new Draw({
      stopClick: true,
      source: source,
      type: "Point"
    });
    draw.on('drawend', function(evt) {
      // 清空图层
      layers['drawLayer'].clear();
      let point = evt.feature.getGeometry().getCoordinates();
      // 百度地图默认为3857的投影坐标，需要转换为4326的经纬度坐标
      point = transform(point, 'EPSG:3857', 'EPSG:4326');
      callback([point[0].toFixed(6), point[1].toFixed(6)]);
    });
  },
  // 移除地图绘点
  removeDraw: function (type) {
    if (type === undefined) {
      map.removeInteraction(draw)
      map.removeInteraction(drawSel)
    } else {
      map.removeInteraction(type)
      map.removeInteraction(draw)
      map.removeInteraction(drawSel)
    }
  },
  // 地图描绘点
  DrawPoint(layerName, callback, points){
    api.drawPointFn(layerName, callback, true)
    map.addInteraction(draw);
    if(points && points.length == 2 && points[0] != "") {
      api.addPoint("drawLayer", points);
      // api.centerAt(points);
    }
  },
  // 设备添加的时候，选择摄像机的方法，返回摄像机信息数组
  startDrawWithSelCamera: function(callback){
    if(draw) {
      map.removeInteraction(draw);
    }
    if(drawSel) {
      layers['aroundLayer'].clear();
    }
    else {
      if(!layers['aroundLayer']) {
        api.addLayer({"name": "aroundLayer", "visibleLayer": true, "style": LayerConfig["drawLayer"].style, "zIndex": 3000});
      }
      layers['aroundLayer'].setStyle(LayerConfig["drawLayer"].style);
      let source = layers['aroundLayer'].getSource();
      drawSel = new Draw({
        stopClick: true,
        source: source,
        type: "Polygon"
      });
      drawSel.on('drawend', function(evt) {
        // 获取绘制的多边形，并查询摄像机列表返回
        layers['aroundLayer'].clear();
        let cameras = [];
        let features = api.getIncludeFeaturesOnLayer("camera", evt.feature.getGeometry());
        features.forEach(item => {
          cameras.push(item.getProperties());
        });
        if(callback)callback(cameras);
      });
    }
    map.addInteraction(drawSel);
  },
  // 绘制圆，根据中心点(经纬度坐标)，和半径(单位米)
  addCircle: function(center, radius, modify, modifyCallback){
    if(!center || center.length != 2)return;
    center = transform([parseFloat(center[0]), parseFloat(center[1])], 'EPSG:4326', 'EPSG:3857');
    api.resetDrawLayerStyle()
    let geom = new Circle(center, radius);
    if(!layers["drawLayer"]) {
      api.addLayer("drawLayer");
    }
    let feature = new Feature({geometry: geom});
    let drawSource = layers["drawLayer"].getSource();
    drawSource.addFeature(feature);
    
    if(modify) {
      // 设置位置为：圆水平右侧边际点坐标
      let lastPoint = [center[0]+radius, center[1]];
      let rotation = 0;
      modifyPoint = new Feature();
      modifyPoint.setGeometry(new Point(lastPoint));
      modifyPoint.setProperties({layerid: "drawLayer", canclick: 1, text: Math.round(radius-1500)+"米", rotation: 2*Math.PI - rotation});
      modifyPoint.setStyle(LayerConfig["drawLayer"].modifyPointWithText);
      drawSource.addFeature(modifyPoint);

      layers['drawLayer'].setModifyHandler('modifychange', function(evt) {
        let lastPoint = evt.features
        let center = evt.mapBrowserEvent.getCenter()
        let radius = evt.mapBrowserEvent.getRadius()
        if(modifyPoint) {
          api.cleanCircleLayer(modifyPoint);
          modifyPoint = null;
        }
        let rotation = Math.atan2(lastPoint[1]-center[1], lastPoint[0]-center[0])// * 180 / Math.PI
        // 设置位置为：圆水平右侧边际点坐标
        //lastPoint = [center[0]+radius, center[1]];
        //rotation = 0;
        modifyPoint = new Feature();
        modifyPoint.setGeometry(new Point(lastPoint));
        modifyPoint.setProperties({layerid: "drawLayer", canclick: 1, text: Math.round(radius-1500)+"米", rotation: 2*Math.PI - rotation});
        modifyPoint.setStyle(LayerConfig["drawLayer"].modifyPointWithText);
        drawSource.addFeature(modifyPoint);
      });
      layers['drawLayer'].setModifyHandler('modifyend', function(evt) {
        layers['drawLayer'].stopModify();
        let radius,center;
        if(evt.features.getLength() > 0) {
          radius = evt.features.item(0).getGeometry().getRadius();
          center = evt.features.item(0).getGeometry().getCenter();
          // 获取鼠标up的时候的坐标点
          let lastPoint = evt.mapBrowserEvent.coordinate;
          if(modifyCallback) {
            modifyCallback(evt.features.item(0));
          }
        }
      });
    }
    return feature;
  },
  // 清空绘制圆的图层，如果有feature参数则删除指定的feature，如果没有则清空整个图层。指定要素删除未测
  cleanCircleLayer: function(feature){
    // 添加图层判断，如果drawLayer不存在则跳过
    if(!layers["drawLayer"])return;
    if(feature) {
      layers['drawLayer'].clear(feature);
    }
    else {
      layers['drawLayer'].clear();
    }
  },
  // 清空绘制圆的图层，如果有feature参数则删除指定的feature，如果没有则清空整个图层。指定要素删除未测
  cleanCircleLayer2: function(layerid, feature){
    // 添加图层判断，如果drawLayer不存在则跳过
    if(!layers[layerid])return;
    if(feature) {
      layers[layerid].clear(feature);
    }
    else {
      layers[layerid].clear();
    }
  },
  cleanLayer: function(layerName){
    if(layers[layerName]) {
      layers[layerName].clear();
    }
  },
  showLabels: function(layerName, visiable){
    if(layers[layerName]) {
      layers[layerName].showLabels(visiable);
    }
  },
  showLayer: function(layerName, visiable, done){
    if(!layers[layerName])return;
    if(visiable) {
      layers[layerName].show();
    }
    else {
      layers[layerName].hide();
    }
    if (done) {
      done()
    }
  },
  getIncludeFeaturesOnLayer: function(layerName, geom){
    if(!layers[layerName])return [];
    return layers[layerName].getIncludeFeatures(geom);
  },
  centerAt: function(point){
    let view = map.getView();
    point = transform([parseFloat(point[0]), parseFloat(point[1])], 'EPSG:4326', 'EPSG:3857');
    view.setCenter(point);
  },
  zoomHome: function(){
    let view = map.getView();
    // view.setZoom(mapData.zoom);
    view.animate({
      zoom: mapData.zoom,
      center: transform(mapData.center, 'EPSG:4326', 'EPSG:3857'),
      duration: 500
    });
    // view.setCenter();
  },
  zoomIn: function(){
    let view = map.getView();
    let zoom = view.getZoom();
    view.animate({
      zoom: zoom-1,
      duration: 500
    });
    // view.setZoom(zoom-1);
  },
  zoomOut: function(){
    let view = map.getView();
    let zoom = view.getZoom();
    view.animate({
      zoom: zoom+1,
      duration: 500
    });
    // view.setZoom(zoom+1);
  },
  zoomCenter: function (center) {
    if (!center[0] && !center[1]) return
    let view = map.getView();
    // view.setZoom(mapData.zoom+1);
    let transformCenter = transform(center, 'EPSG:4326', 'EPSG:3857')
    // view.setCenter(transformCenter);
    view.animate({
      center: transformCenter,
      duration: 500
    });
  },
  // 默认删除aroundLayer、roadSelLayer图层
  clearCircleAndLayer: function (layer) {
    if (layer === undefined) {layer = "aroundLayer"}
    api.cleanLayer(layer)
    api.cleanLayer("roadSelLayer")
    api.cleanCircleLayer()
  },
  atlongDistance(origin,center){
    return getDistance(origin,center)
  },
  changeValue(layerName, val) {
    if(!layers[layerName] || !val)return
    return layers[layerName].changeValue(val);
  },
  saveImage(elementId) {
    map.once('rendercomplete', function() {
      toPng(map.getTargetElement(),mapData.exportOptions)
        .then(function(dataURL) {
          var link = document.getElementById(elementId);
          link.href = dataURL;
          link.click()
        });
    });
    map.renderSync()
  }
}

let _defaultConf = {
  // 地图容器DIV的ID
  mapContainer: 'mapContainer',
  // 空间参考，坐标系统
  projection: 'EPSG:4326',
  // 控制组件，默认为空，不加载任何组件
  controls: [
    
  ],
  crossOrigin:'anonymous',
  // View
  // 中心点
  center: [115.472601,35.062753],
  // 显示级别
  zoom: 12,
  // 可显示的最大级别
  maxZoom: 5,
  // 可显示的最小级别
  minZoom: 0,
  // 显示的分辨率
  resolution: 2.9743262572878496E-4,
  // 显示的最大分辨率
  maxResolution: 0.0011897305029151398,
  // 显示的最小分辨率
  minResolution: 3.8071376093284474E-5,
  // wmts服务地址
  url: 'http://192.168.2.180:8080/geowebcache/service/wmts', 
  // wmts服务对应的TileMatrixSet字符串，可通过访问http://192.168.2.180:8080/geowebcache目录后，点击<a>WMTS 1.0.0 GetCapabilities document</a>超链接下载当前geowebcache所有服务的wmts服务能力说明文件查看
  matrixSet: 'EPSG:4326_chibi4326',
  // 瓦片格式
  format: 'image/png',
  // wmts服务图层名称ows:Title标签名称
  layer: 'chibi4326',
  // tileGrid
  // wmts服务显示的最大范围，超过该范围将无法拖动地图[xmin,ymin,xmax,ymax]
  fullExtent: [113.49610335,29.4449077,114.26239965,30.0153083],
  // 查找方式同matrixSet，xml中找TileMatrix标签内容
  matrixIds: ['EPSG:4326_chibi4326:0', 'EPSG:4326_chibi4326:1', 'EPSG:4326_chibi4326:2', 'EPSG:4326_chibi4326:3', 'EPSG:4326_chibi4326:4', 'EPSG:4326_chibi4326:5'],
  // 分辨率数组，由于加载的是arcgis发布的瓦片服务，所以需要在arcgis服务上查询对应的分辨率，或者在geowebcache的预览[png]页面查看源代码查询对应参数
  resolutions: [0.0011897305029151398, 5.948652514575699E-4, 2.9743262572878496E-4, 1.522855043731379E-4, 7.614275218656895E-5, 3.8071376093284474E-5],
  // 瓦片中心点，同上
  tileOrigin: [-400.0, 400.0],
  // 瓦片像素大小
  tileSize: [256, 256],
  wrapX: true,
  exportOptions: {
    filter: function(element) {
      return element.className ? element.className.indexOf('ol-control') === -1 : true;
    }
  }
};



/**
 * 初始化地图
 * @param {*} conf 必须包含mapContainer属性
 */
function init(conf) {
  // 合并params和defaultMap
  mapData = Object.assign(_defaultConf, conf);
  // 菏泽配置
  mapData.center = [115.470876,35.255208];
  mapData.zoom = 11;
  // 徐州配置
  mapData.center = [117.578175,34.079237];
  mapData.zoom = 15;
  // 如果没有指定maxZoom的值，则赋值为resolutions的长度
  if(!conf || !conf.maxZoom) {
    mapData.maxZoom = mapData.resolutions.length-1;
  }
  const projection = getProjection(mapData.projection); // 设置地图投影
  let bmercResolutions = new Array(19), i=0;
  for (; i < 19; ++i) {
    bmercResolutions[i] = Math.pow(2, 18 - i);
  }
  let tilegrid = new TileGrid({
    resolutions: bmercResolutions,
    origin: [0, 0],
    //extent: mapData.fullExtent,
    //tileSize: [256, 256]
  });
  /*map = new Map({
      controls:mapData.controls,
      target: mapData.mapContainer, // 绑定容器
      view: new View({ // 视图
        extent: mapData.fullExtent,
        center: mapData.center, // 中心点坐标
        resolution: mapData.resolutions[mapData.zoom],
        maxResolution: mapData.resolutions[mapData.minZoom], //最大分辨率
        minResolution: mapData.resolutions[mapData.maxZoom]
      }),
      layers: [
        new TileLayer({
          source: new WMTS({
              // geoserver发布地图的url，发布成功后在浏览器调试工具network查看详细的url和属性
              url: mapData.url, 
              matrixSet: mapData.matrixSet,
              format: mapData.format, // 格式
              layer: mapData.layer,  // 对应图层信息
              tileGrid: new WMTSTileGrid({
                  extent: mapData.fullExtent,
                  origin: mapData.tileOrigin,
                  resolutions: mapData.resolutions,
                  matrixIds: mapData.matrixIds,
                  tileSize: mapData.tileSize
              }),
              wrapX: true // 限制地图在X轴方向重复，例如地球的横向连贯图
          })
        })
      ]
  })*/
  var scaleLineControl = new ScaleLine();
  scaleLineControl.setUnits("metric");
  map = new Map({
    controls: defaultControls().extend([
      scaleLineControl
    ]),
    target: mapData.mapContainer, // 绑定容器
    view: new View({ // 视图
      center: transform(mapData.center, 'EPSG:4326', 'EPSG:3857'), // 中心点坐标
      zoom: mapData.zoom,
      // extent: mapData.fullExtent,
      // minZoom: mapData.minZoom - 10,
      // maxZoom: mapData.maxZoom + 6
    }),
    oadTilesWhileAnimating: true,
    layers: [
      new TileLayer({
        source: new TileImage({
          projection: "baidu",
          tileGrid: tilegrid,
          // crossOrigin: 'Anonymous',
          tileUrlFunction: function(tileCoord, pixelRatio, proj){
            if(!tileCoord){
              return "";
            }
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = tileCoord[2];
            if(x<0){
              x = "M"+(-x);
            }
            if(y<0){
              y = "M"+(-y);
            }
            mapData.url = "http://online3.map.bdimg.com/onlinelabel/?qt=tile&x="+x+"&y="+y+"&z="+z+"&styles=pl&udt=20151021&scaler=1&p=1"
            // mapData.url = "http://192.168.2.181:80/baiduTitle/xuzhou/"+z+"/"+y+"/"+x+".jpg";
            return mapData.url
          },
          url: mapData.url
        })
      })
    ]
  })
  // 重置绘制对象
  draw = null;
  // 创建全局overlay对象
  featureNameOverlayDiv = document.createElement("div");
  featureNameOverlayDiv.className = "ol-popup";
  featureNameOverlay = new Overlay({  
    element: featureNameOverlayDiv
  });
  addHighlightEvent();
  addClickEvent();
  // 初始化设备周边图层，存储不同图层的设备，并且也有点击事件
  this.addLayer("aroundLayer");
  this.addLayer("roadSelLayer");
  this.addLayer("drawLayer");
  this.addLayer("startLayer");
  this.addLayer("endlLayer");
}

let highlightLayer, highlight;
// 添加鼠标移上高亮事件
function addHighlightEvent() {
  map.on('pointermove', function(evt) {
      if (evt.dragging) {
          return;
      }
      let pixel = map.getEventPixel(evt.originalEvent);
      displayFeatureInfo(pixel);
  });
  // 当鼠标移动时，高亮相应的区域的函数 
  highlightLayer = new VectorLayer({
    zIndex: 1000,
    source: new VectorSource()
  });
  highlightLayer.id = 'highlightLayer';
  highlightLayer.name = 'highlightLayer';
  layers["highlightLayer"] = highlightLayer;
  map.addLayer(highlightLayer);
}
// 鼠标移动时候的监听函数，判断是否已经移除要素，以及更新移动到要素上的高亮显示
let displayFeatureInfo = function(pixel) {
    let feature = map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        return feature;
    });
    // 鼠标移上手型展示，其实设置的整个map鼠标手型展示
    if(!feature) {
      map.getTargetElement().style.cursor = "auto"
    }
    // 如果highlight非空的时候，并且和feature不相等(feature可能为空)则移出，否则当feature非空时添加高亮
    if(highlight) {
      if(highlight !== feature) {
        // 移出
        highlightLayer.getSource().removeFeature(highlight);
        highlight = null;
      }
    }
    else if(feature){
      map.getTargetElement().style.cursor = "pointer"
      // 扩展，根据图层要素的指定属性，比如layerid获取对应的高亮图标
      let layerName = feature.get("layerid");
      if(!layerName)return;
      // 如果没有设置高亮样式，则不进行高亮处理
      let highlightStyle = LayerConfig[layerName].styleHighlight;
      if(!highlightStyle)return;
      // 添加
      highlight = new Feature({
        geometry: feature.getGeometry()
      });
      highlight.setStyle(LayerConfig[layerName].styleHighlight);
      highlightLayer.getSource().addFeature(highlight);
    }
};
// 添加鼠标移上高亮事件  end

// 用于绘制圆后，动态编辑圆大小的事件启动方法
function addPointermoveEvent() {
  if(layers['drawLayer']) {
    layers['drawLayer'].stopModify();
  }
  map.on('pointermove', function(evt) {
    if(map.hasFeatureAtPixel(evt.pixel, {layerFilter:function(layer){
        // 判断layer.type  TILE   VECTOR
        return (layer.type === 'VECTOR' && layer.id === "drawLayer"); // boolean
      }})) {
      // 鼠标移动到feature上
      let features = map.getFeaturesAtPixel(evt.pixel, {layerFilter:function(layer){
        // 判断layer.type  TILE   VECTOR
        return (layer.type === 'VECTOR' && layer.id === "drawLayer"); // boolean
      }});
      // 判断是否为 drawLayer 图层，如果是则判断当前的要素是否有canclick属性，如果有，则启用编辑否则忽略
      if(features && features.length > 0 && features[0].get("layerid") && features[0].get("canclick")) {
        layers['drawLayer'].startModify();
      }
    }
  });
}
function addClickEvent() {
  addPointermoveEvent();
  map.on('click', function(evt) {
    let pixel = map.getEventPixel(evt.originalEvent);
    if(!map.hasFeatureAtPixel(evt.pixel, {layerFilter:function(layer){
        // 判断layer.type  TILE   VECTOR
        return (layer.type === 'VECTOR'); // boolean
      }})) {
      // 没有点击到feature上，还原初始状态，移出全局featureNameOverlay，并判断之前是否有因为点击移出掉的设备屏显preOverlay
      map.removeOverlay(featureNameOverlay);
      if(preOverlay) {
        map.addOverlay(preOverlay);
        preOverlay = null;
      }
      return;
    }
    let features = map.getFeaturesAtPixel(evt.pixel, {layerFilter:function(layer){
      // 判断layer.type  TILE   VECTOR
      return (layer.type === 'VECTOR'); // boolean
    }});
    
    let feature = features[0];
    // 因为添加了鼠标移上的事件，会在同一位置添加高亮的feature，所以会返回两个，而且由于高亮的feature所在图层的zIndex最高，所以他会是第一个
    if(features.length > 1 && feature.getId() == undefined) {
      feature = features[1];
    }
    let coordinate = evt.coordinate;
    //let hdms = toStringHDMS(ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326'));
    //let hdms = toStringXY(coordinate, 6);
    let _position;
    // 判断是否是点对象
    if(feature.getGeometry().constructor === Point) {
      // 获取要素的坐标信息
      _position = feature.getGeometry().getCoordinates();
      if(preOverlay) {
        map.addOverlay(preOverlay);
      }
      if(feature.getId()) {
        preOverlay = map.getOverlayById(feature.getId());
      }
      if(preOverlay) {
        map.removeOverlay(preOverlay);
      }
      if(feature.get("name")) {
        featureNameOverlayDiv.innerHTML = feature.get("name");
        featureNameOverlay.setPosition(_position);
        map.addOverlay(featureNameOverlay);
      }
      // 调用事件监听的回调函数
      if(feature.get("layerid") && clickEventHandler[feature.get("layerid")]) {
        clickEventHandler[feature.get("layerid")](feature.getProperties());
      }
    }
    // 团雾
    else if(feature.getGeometry().constructor === Circle) {
      // 调用事件监听的回调函数
      if(feature.get("layerid") && clickEventHandler[feature.get("layerid")]) {
        clickEventHandler[feature.get("layerid")](feature.getProperties());
      }
    }
    // 道路
    else if(feature.getGeometry().constructor === LineString) {
      // 调用事件监听的回调函数
      if(feature.get("layerid") && clickEventHandler[feature.get("layerid")]) {
        clickEventHandler[feature.get("layerid")](feature.getProperties());
      }
    }
     // 道路拥堵
     else if(feature.getGeometry().constructor === MultiLineString) {
      // 调用事件监听的回调函数
      if(feature.get("layerid") && clickEventHandler[feature.get("layerid")]) {
        clickEventHandler[feature.get("layerid")](feature.getProperties());
      }
    }
  });
}

export default api;