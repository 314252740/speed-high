// 初始化瓦片地图
<template>
    <div class="tileMap">
        <div id="containerMap" ref="containerMap"></div>
    </div>
</template>
<script>
import MapManager from '@/components/map/MapManager.js'
export default {
  name: 'tileMap',
  props: {
    params: {
      type: Object,
      default: () => ({

      })
    }
  },
  components: {
  },
  data () {
    return {
      map: null,
      defaultMap: {
        mapContainer: 'containerMap',
        projection: 'EPSG:4326',
        controls: [],
        // View
        center: [113.89, 29.72],
        resolution: 2.9743262572878496E-4,
        maxResolution: 0.0011897305029151398, // 最大分辨率
        minResolution: 3.8071376093284474E-5,
        // layers
        url: 'http://192.168.2.180:8080/geowebcache/service/wmts',
        matrixSet: 'EPSG:4326_chibi4326',
        format: 'image/png', // 格式
        layer: 'chibi4326',
        // tileGrid
        fullExtent: [113.49610335, 29.4449077, 114.26239965, 30.0153083],
        matrixIds: ['EPSG:4326_chibi4326:0', 'EPSG:4326_chibi4326:1', 'EPSG:4326_chibi4326:2', 'EPSG:4326_chibi4326:3', 'EPSG:4326_chibi4326:4', 'EPSG:4326_chibi4326:5'],
        resolutions: [0.0011897305029151398, 5.948652514575699E-4, 2.9743262572878496E-4, 1.522855043731379E-4, 7.614275218656895E-5, 3.8071376093284474E-5],
        tileOrigin: [-400.0, 400.0],
        tileSize: [256, 256],
        wrapX: true
      }
    }
  },
  methods: {
    // 开启绘制点的操作，用于设备添加选择位置
    startDrawPoint (devType, callback, point) {
      MapManager.startDraw(devType, callback)
      if (point && point.length == 2 && point[0] != '') {
        MapManager.addPoint('drawLayer', point)
        MapManager.centerAt(point)
      }
    },
    startDrawWithSelCamera (callback) {
      MapManager.startDrawWithSelCamera(callback)
    },
    // 显示/隐藏道路title
    showRoadText (visiable) {
      MapManager.showRoadText(visiable)
    },
    drawPolygon (callback) {
      MapManager.drawWithType('Polygon', callback)
    },
    drawCircle (callback) {
      MapManager.drawWithType('Circle', callback)
    },
    // 道路绘制方法，返回道路的几何坐标信息数组
    drawRoad (callback, geomWKT, layerid, done) {
      // 添加道路图层，用于绘制的时候参考和捕捉
      MapManager.addLayer({ 'name': 'road', 'visibleLayer': true })
      MapManager.addLayer(layerid, () => {
        let arr = MapManager.getFeautres(layerid)
        if (done) {
          done(arr)
        }
      })
      MapManager.showLayer(layerid, true)
      MapManager.drawRoad(callback)
      if (geomWKT) {
        MapManager.addRoadToDrawLayer(geomWKT)
      }
    },
    // 添加圆形
    addCircle (center, radius) {
      MapManager.addCircle(center, radius)
    },
    // 强制更新map视图
    resetMap () {
      this.map.updateSize()
    },
    addLayer (devType) {
      MapManager.addLayer(devType)
    },
    showLayer (devType, state) {
      MapManager.showLayer(devType, state)
    },
    cleanLayer (devType) {
      MapManager.cleanLayer(devType)
    }
  },
  mounted () {
    // 合并params和defaultMap
    const mapData = Object.assign(this.defaultMap, this.params)
    // 初始化地图
    MapManager.init(mapData)
    // 获取地图对象
    this.map = MapManager.getMap()
    // map对象传出，并且表示map初始化完毕
    this.$emit('mapInfo', this.map)
  },
  updated () {

  }
}
</script>
<style scoped>
#containerMap{
    height: 100%;
    width:100%;
}
.tileMap{
    height: 100%;
    width: 100%;
}
</style>
