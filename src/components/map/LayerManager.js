/* eslint-disable */
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON.js';
import { Draw, Modify, Snap } from 'ol/interaction.js';
import { Point, LineString, Polygon, Circle } from 'ol/geom';
import { Overlay, Feature } from 'ol';
import { get as getProjection, transform } from 'ol/proj.js';

import LayerConfig from "@/mapConfig/LayerConfig";
// import WebSocketWrapper from "@/components/map/WebSocketWrapper";
import WebSocketWrapper from "./mapWebsocket";
import ScreenCreated from "@/mapConfig/ScreenCreated"
import request from "@/utils/request";
import { isJSON } from "@/utils/format.js"
// import "../../../static/css/fog.css"
export default class LayerManager {
  constructor (opt_options) {
    // 构造方法
    //const options = opt_options ? opt_options : ({});
    if(!opt_options || !opt_options.name)return null;
    const options = Object.assign(LayerConfig[opt_options.name], opt_options)
    this.id_ = options.name;
    this.map_ = options.map;
    this.callback_ = options.callback;
    // 初始化图层
    this.layerObj_ = new VectorLayer({
      visible: options.visibleLayer,
      zIndex: options.zIndex,
      source: new VectorSource(),
      style: options.style
      
    });
    this.layerObj_.id = this.id_;
    this.layerObj_.name = options.name;
    this.jsondata_ = {};
    this.datalist_ = [];
    this.overlays_ = [];
    this.isModify = false;
    this.webOptions = options
    this.finised = false
    this.overlayControl = true
    let that = this;
    this.modifyChangeHandler = function(evt){};
    this.modifyEndHandler = function(evt){
      that.stopModify();
    };
    if(options.modify) {
      // 创建编辑对象
      this.modifyObj = new Modify({source: this.layerObj_.getSource(), pixelTolerance: 14, style: []});
      this.modifyObj.on('modifychange', function(evt){
        that.modifyChangeHandler(evt)
      });
      this.modifyObj.on('modifyend', function(evt){
        that.modifyEndHandler(evt)
      });
    }
    if(LayerConfig[options.name].geojsonUrl) {
      // 数据加载完成后，根据配置文件，是否有对应的overlay来创建overlay对象数组
      request({
        url: LayerConfig[options.name].geojsonUrl,
        method: "get"
      }).then(res => {
        let _features = (new GeoJSON()).readFeatures(res, { featureProjection: "EPSG:3857" });
        that.jsondata_.features = _features;
        that.layerObj_.getSource().addFeatures(_features);
        
        // 如果配置的有overlayers，则创建
        if(LayerConfig[options.name].hasLabel) {
          that.createAllOverlays();
        }
        // 如果配置的是现实lable，则打开
        if(LayerConfig[options.name].visibleLabel) {
          that.showLabels(true);
        }
        // 图层创建完毕后，调用回调函数，通知调用者图层加载数据完毕
        if(that.callback_) {
          that.callback_(that.layerObj_);
        }
        // 图层创建完毕，解除按钮禁用状态
        if (Object.getOwnPropertyDescriptor(LayerConfig[options.name], "checkTType")) {
          LayerConfig[options.name].checkTType = false
        }
      }).catch(err => {
        console.log(err)
        console.log(LayerConfig[options.name].geojsonUrl);
      });
    }
    // 道路状况图层请求
    else if(LayerConfig[options.name].list) {
      request({
        url: LayerConfig[options.name].list,
        method: "get"
      }).then(res => {
        if(res && res.length > 0) {
          that.datalist_ = res;
          // 数据转换，循环创建feature对象，并添加到图层上
          let i = 0, len = res.length, item, features = [], feature, point;
          for(; i<len; i++) {
            item = res[i];
            if(!item.longitude || !item.longitude) { continue }
            point = transform([parseFloat(item.longitude), parseFloat(item.latitude)], 'EPSG:4326', 'EPSG:3857');
            feature = new Feature();
            feature.setId(item.id);
            feature.setProperties(item);
            if(LayerConfig[options.name].radius) {
              feature.setGeometry(new Circle(point, LayerConfig[options.name].radius));
            }
            else {
              feature.setGeometry(new Point(point));
            }
            features.push(feature); 
          }
          // 设置jsondata_的features，用于创建overlayer
          that.jsondata_.features = features;
          that.layerObj_.getSource().addFeatures(features);

          // 如果配置的有overlayers，则创建
          if(LayerConfig[options.name].hasLabel) {
            that.createAllOverlays();
          }
          // 如果配置的是现实lable，则打开
          if(LayerConfig[options.name].visibleLabel) {
            that.showLabels(true);
          }
        }
        // 创建socket连接 hasSocket
        if (LayerConfig[options.name].socketSID) {
          new WebSocketWrapper({sid: LayerConfig[options.name].socketSID, onmessage: that.webSocketOnMessage,layerObj:that})
          // WebSocketWrapper.init({sid: LayerConfig[options.name].socketSID, onmessage: that.webSocketOnMessage,layerObj:that});
        }
        // 图层创建完毕后，调用回调函数，通知调用者图层加载数据完毕
        if(that.callback_) {
          that.callback_(that.layerObj_);
        }
        // 图层创建完毕，解除按钮禁用状态
        if (Object.getOwnPropertyDescriptor(LayerConfig[options.name], "checkTType")) {
          LayerConfig[options.name].checkTType = false
        }
        that.finised = true
      }).catch(err => {
        console.log(err)
      });
    }
    else {
      // 图层创建完毕后，调用回调函数，通知调用者图层加载数据完毕
      if(that.callback_) {
        that.callback_(that.layerObj_);
      }
    }
  }
  // 根据属性id获取feature
  getFeatureById(id){
     return this.layerObj_.getSource().getFeatureById(id);
  }
  // 获取features
  getFeautres(){
    return this.layerObj_.getSource().getFeatures();
  }
  webSocketOnMessage(agentData, layerObj) {
    if (!isJSON(agentData.data)) return
    if (!layerObj.finised) { }
    else {
      // console.log(agentData)
      let data = JSON.parse(agentData.data)
      if (data.delete !== undefined && data.delete.length > 0) {
        // console.log("----delete----")
        data.delete.forEach( element =>{
          if(layerObj.getFeatureById(element)) {
            // 删除feature
            let indexF, indexO
            layerObj.clear(layerObj.getFeatureById(element))
            indexF = layerObj.jsondata_.features.indexOf(layerObj.getFeatureById(element))
            layerObj.jsondata_.features.splice(indexF,1)
            // 删除overlayer
            indexO = layerObj.overlays_.indexOf(layerObj.map_.getOverlayById(element))
            layerObj.overlays_.splice(indexO,1)
            layerObj.map_.removeOverlay(layerObj.map_.getOverlayById(element))
          }
        })
      }
      if (data.update !== undefined && data.update.length > 0) {
        let webItem,webFeatures=[],webFeature,webPoint
        data.update.forEach(element => {
          if(!element.longitude || !element.longitude) {  
          } else if(layerObj.getFeatureById(element.id)) {
            let featureObj = layerObj.getFeatureById(element.id)
            let OverlayerObj = layerObj.map_.getOverlayById(element.id)
            // 警车样式修改
            if (element.isonline === "1" && OverlayerObj) {
              // console.log(element)
              OverlayerObj.getElement().classList.add("policeCarMove")
              OverlayerObj.getElement().style.zIndex = "1"
              webPoint = transform([parseFloat(element.longitude), parseFloat(element.latitude)], 'EPSG:4326', 'EPSG:3857');
              featureObj.setGeometry(new Point(webPoint))
              if (OverlayerObj) {
                OverlayerObj.setPosition(webPoint)
              }
            } else if(OverlayerObj && OverlayerObj.getElement().classList.contains("policeCarMove")){
              OverlayerObj.getElement().classList.remove("policeCarMove")
              OverlayerObj.getElement().style.zIndex = "0"
            }
          } else {
            // console.log("new: "+element.layerid)
            webItem = element;
            webPoint = transform([parseFloat(element.longitude), parseFloat(element.latitude)], 'EPSG:4326', 'EPSG:3857');
            webFeature = new Feature()
            webFeature.setId(webItem.id)
            webFeature.setProperties(webItem)
            if(LayerConfig[layerObj.webOptions.name].radius) {
              webFeature.setGeometry(new Circle(webPoint, LayerConfig[layerObj.webOptions.name].radius));
            }
            else {
              webFeature.setGeometry(new Point(webPoint))
            }
            if (layerObj.jsondata_.features === undefined) {
              let features = []
              layerObj.jsondata_.features = features
              layerObj.jsondata_.features.push(webFeature)
            } else {
              layerObj.jsondata_.features.push(webFeature)
            }
            layerObj.layerObj_.getSource().addFeature(webFeature)
            layerObj.createOverlay(webFeature)
            if(LayerConfig[layerObj.webOptions.name].visibleLabel) {
              layerObj.showLabels(true);
            }
          }
        })
      }
    }
    
  }
  // 设置图层编辑的回调函数
  setModifyHandler(type, callback) {
    if(type === "modifychange") {
      this.modifyChangeHandler = callback;
    }
    else if(type === "modifyend") {
      this.modifyEndHandler = callback;
    }
  }
  // 启用图层编辑
  startModify(){
    if(!this.isModify) {
      this.map_.addInteraction(this.modifyObj);
      this.isModify = true;
    }
  }
  // 停止图层编辑
  stopModify(){
    if(this.isModify) {
      this.map_.removeInteraction(this.modifyObj);
      this.isModify = false;
    }
  }
  // 获取图层实例
  getInstance() {
    return this.layerObj_;
  }
  setStyle(style){
    this.layerObj_.setStyle(style);
  }
  getSource() {
    return this.layerObj_.getSource();
  }
  // 清空图层
  clear(feature) {
    if(feature) {
      this.layerObj_.getSource().removeFeature(feature);
    }
    else {
      // 派发相关的事件，要不然绘制和编辑的对象不会更新自己的features数组
      this.layerObj_.getSource().clear(false);
      this.stopModify();
    }
  }
  setJsondata(jsondata) {
    this.jsondata_ = jsondata;
  }
  // 获取图层ID
  getLayerId() {
    return this.id_;
  }
  // 获取图层名称
  getLayerName() {
    return this.layerObj_.name;
  }
  // 展示
  show(){
    this.layerObj_.setVisible(true);
  }
  // 隐藏
  hide(){
    this.layerObj_.setVisible(false);
    this.stopModify();
  }
  // 设置图层顺序
  setIndex(zindex) {
    this.layerObj_.setZIndex(zindex);
  }
  // 获取图层隐藏，显示状态
  getVisible() {
    return this.layerObj_.getVisible();
  }
  createOverlay(feature) {
    // let features = this.jsondata_.features, len=features.length, i=0, feature, overlay;
    // for(; i<len; i++) {
      // feature = features[i];
      // 判断几何类型，如果是圆，则转换为点
      let _type = feature.getGeometry().getType();
      let _coordinates = feature.getGeometry().getCoordinates();
      if(_type === 'Circle') {
        _coordinates = feature.getGeometry().getCenter();
      }
      let overlay = new Overlay({
        id: feature.get("id"),
        // 这里根据配置文件加载不同的js类，创建不同的信息框(屏显) 
        element: this.createPopup(feature.getProperties()),
        position: _coordinates
      });
      this.overlays_.push(overlay);
    // }
  }
  createAllOverlays() {
    let features = this.jsondata_.features, len=features.length, i=0, feature, overlay;
    for(; i<len; i++) {
      feature = features[i];
      // 判断几何类型，如果是圆，则转换为点
      let _type = feature.getGeometry().getType();
      let _coordinates = feature.getGeometry().getCoordinates();
      if(_type === 'Circle') {
        _coordinates = feature.getGeometry().getCenter();
      }
      overlay = new Overlay({
        id: feature.get("id"),
        // 这里根据配置文件加载不同的js类，创建不同的信息框(屏显) 
        element: this.createPopup(feature.getProperties()),
        position: _coordinates
      });
      this.overlays_.push(overlay);
    }
  }
  // 私有方法，用于创建不同的信息框
  createPopup(attributes) {
    let popupDiv = document.createElement("div");
    popupDiv.className = "ol-popup";
    let Dom = ScreenCreated(this.id_, attributes)
    return Dom;
  }
  // text样式的开关
  showRoadText(visible) {
    if(visible) {
      this.layerObj_.setStyle(LayerConfig.road.styleText);
    }
    else {
      this.layerObj_.setStyle(LayerConfig.road.style);
    }
  }
  // 屏显
  showLabels(visible) {
    let overlays = this.overlays_, len = overlays.length, i = 0;
    if(visible) {
      for (; i < len; i++) {
        // this.map_.getOverlayById(overlays[i].id).setVisible(true)
        this.map_.removeOverlay(overlays[i]);
        this.map_.addOverlay(overlays[i]);
      }
    }
    else {
      for (; i < len; i++) {
        // this.map_.getOverlayById(overlays[i].id).setVisible(false)
        this.map_.removeOverlay(overlays[i]);
      }
    }
  }
  // 获取指定几何体包含的图层要素
  getIncludeFeatures(geom){
    if(!geom)return [];
    let features = this.layerObj_.getSource().getFeatures(), i=0, len=features.length, feature, result=[];
    // 如果没有选中，则返回空数组
    if(!features || features.length == 0)return [];
    let _type = features[0].getGeometry().getType();
    if(_type === 'Point') {
      for(; i<len; i++) {
        feature = features[i];
        if(geom.intersectsCoordinate(feature.getGeometry().getCoordinates())) {
          result.push(feature);
        }
      }
    }
    else if(_type === 'LineString') {
      for(; i<len; i++) {
        feature = features[i];
        let _points = feature.getGeometry().getCoordinates(), j=0, jl=_points.length, isInclude=true;
        for(; j<jl; j++) {
          if(!geom.intersectsCoordinate(_points[j])) {
            isInclude = false;
            break;
          }
        }
        if(isInclude)result.push(feature);
      }
    }
    else if(_type === 'Polygon') {
      for(; i<len; i++) {
        feature = features[i];
        let _points = feature.getGeometry().getCoordinates()[0], j=0; jl=_points.length, isInclude=true;
        for(; j<jl; j++) {
          if(!geom.intersectsCoordinate(_points[j])) {
            isInclude = false;
            break;
          }
        }
        if(isInclude)result.push(feature);
      }
    }
    return result;
  }
  // 添加单个要素到图层上，坐标为3857投影坐标
  addFeautre(feature){
    //feature.setGeometry(feature.getGeometry().transform('EPSG:4326', 'EPSG:3857'));
    this.layerObj_.getSource().addFeature(feature);
  }
  // 添加要素集合到地图上，坐标为3857投影坐标
  addFeautres(features){
    /*let i=0,len=features.length,feature;
    for(; i<len; i++) {
      feature = features[i];
      feature.setGeometry(feature.getGeometry().transform('EPSG:4326', 'EPSG:3857'));
    }*/
    this.layerObj_.getSource().addFeatures(features);
  }
  changeValue(val) {
    if (val.id) {
      let OverlayerObj = this.map_.getOverlayById(val.id)
      for (let i = 0; i < this.jsondata_.features.length; i++) {
        if (this.jsondata_.features[i].getProperties().id === val.id) {
          this.jsondata_.features[i].setProperties(val)
          break
        } 
      }
      if (OverlayerObj) {
        let el = OverlayerObj.getElement()
        return el
      } else {
        return false
      }
      
    }
  }
}
