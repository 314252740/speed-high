import { roadList } from "@/api/road"
import { getAllList } from "@/api/sensor"
const roadInfos = {
  state: {
    roadList: [], // 道路列表
    areaList: [], // 辖区列表
    sensorList: [] // 传感器列表
  },
  mutations: {
    SET_ROAD_LIST: (state, roadList) => {
      state.roadList = roadList
    },
    SET_AREA_LIST: (state, areaList) => {
      state.areaList = areaList
    },
    SET_SENOR_LIST: (state, sensorList) => {
      state.sensorList = sensorList
    }
  },
  actions: {
    // 获取道路列表
    GetRoadInfos ({ commit }) {
      roadList(1) // 道路
        .then(res => {
          commit("SET_ROAD_LIST", res)
        })
        .catch(error => {
          console.error(error)
        })
      roadList(0) // 大队辖区
        .then(res => {
          commit("SET_AREA_LIST", res)
        })
        .catch(error => {
          console.error(error)
        })
      getAllList() // 传感器列表
        .then(res => {
          commit("SET_SENOR_LIST", res)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
export default roadInfos
