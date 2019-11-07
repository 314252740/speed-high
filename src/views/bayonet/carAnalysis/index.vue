<template>
  <div class="varAnalysis" id="varAnalysis" ref="varAnalysis">
    <el-row :gutter="20">
      <el-col :span='6'>
         <h4 class="msgTitle">卡口信息</h4>
        <el-input
          style="margin-bottom:10px;"
          placeholder="输入关键字进行查询卡口"
          v-model="filterText">
        </el-input>
        <div class="treebox" ref="treebox">
          <el-tree
            :default-expand-all='true'
            class="filter-tree"
            :data="setTree"
            :props="defaultProps"
            :filter-node-method="filterNode"
            :highlight-current="true"
            ref="tree2"
            @node-click="treeNodeClick">
          </el-tree>
        </div>
      </el-col>
      <el-col :span='18'>
        <div class="nav">
          <div class="item" :key='index' v-for='(item, index) in navlist' @click="chooseItem(index, item.enName)">
            <span class="itemname" :class="idx === index ? 'activeColor' : 'inactiveColor'" :title="item.name">{{item.name}}</span>
            <div class="line" :class="idx === index ? 'active' : 'inactive'"></div>
          </div>
        </div>
        <ul class="info">
          <li :key='index' v-for="(item, index) in infoList">
            <div class="list_item">
              <span class="info_item">{{item.name}}</span>
              <span class="info_value">{{item.value + item.unit}}</span>
            </div>
          </li>
        </ul>
      </el-col>
    </el-row>
    <myDialog ref="myDialog"></myDialog>
  </div>
</template>
<script>
import { Notification } from 'element-ui'
import { getBayonetList, changeUrlRq } from '@/api/bayonet'

import myDialog from './dialog'
export default {
  name: 'carAnlysis',
  components: {
    myDialog
  },
  data () {
    return {
      url: null,
      clientHeight: null,
      filterText: '',
      id: null,
      idx: -1,
      navlist: [
        { name: '过车总数实时统计', enName: 'getAllCar' },
        { name: '两客一危数量实时统计', enName: 'getListDgCar' },
        { name: '外地车数量统计', enName: 'getNonlocalCar' },
        { name: '过车频率统计', enName: 'getHzCarByMonth' },
        // {name: "货车变道频率统计"},
        { name: '货车违法变道记录', enName: 'getIllegalChangeCar' }
      ],
      infoList: [],
      infoType: {
        getAllCar: { number: { name: '过车总数', value: null, unit: null } },
        getListDgCar: { number: { name: '两客一危数量', value: null, unit: null } },
        getNonlocalCar: { number: { name: '外地车数量', value: null, unit: null } },
        getHzCarByMonth: { number: { name: '过车频率', value: null, unit: null } },
        getIllegalChangeCar: { number: { name: '货车违法变道', value: null, unit: null } }
      },
      setTree: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      detail: null,
      dataForm: {
        carPlateNumber: null,
        time: null
      },
      show: false
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree2.filter(val)
    }
  },
  methods: {
    getInfoOfType (obj, url) {
      changeUrlRq(obj, url)
        .then(res => {
          if (res.result === 'ok') {
            this.detail = res.data
            this.infoType[this.url].number.value = this.detail
            this.infoList = this.infoType[this.url]
          } else {
            Notification.error({
              title: '获取数据失败',
              duration: 2500,
              offset: 50
            })
            this.idx = -1
          }
        })
        .catch(err => console.log(err))
    },
    async chooseItem (index, enName) {
      this.show = false
      this.idx = index
      this.url = enName
      if (this.id === null) {
        Notification.warning({
          title: '请选择卡口',
          duration: 2500,
          offset: 50
        })
        this.idx = -1
        return
      }
      if (this.url === 'getHzCarByMonth') {
        this.$refs.myDialog.show()
        return
      }
      let obj = {}
      if (this.url === 'getHzCarByMonth') {
        return
      } else if (this.url === 'getAllCar') {
        obj = { time: 200, bay_id: this.id }
        this.show = true
      } else {
        this.show = true
        obj = { bay_id: this.id }
      }
      if (this.show) {
        await this.getInfoOfType(obj, this.url)
      }
    },
    // 筛选节点树查找
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    treeNodeClick (data) {
      if (data.id === undefined) {
        return false
      } else {
        this.id = data.cloud
      }
    }
  },
  created () {
    this.setTree = []
    getBayonetList({ pageSize: 10000 })
      .then(res => {
        if (res.result === 'ok') {
          let obj = {
            id: 1,
            name: '卡口列表',
            children: []
          }
          for (let i = 0; i < res.data.result.length; i++) {
            if (res.data.result[i].cloud === '' || res.data.result[i].cloud === null) continue
            obj.children.push(res.data.result[i])
          }
          this.setTree.push(obj)
        }
      })
      .catch(err => console.log(err))
  },
  mounted () {
    let that = this
    this.$refs.varAnalysis.style.marginTop = '0'
    if (document.getElementById('varAnalysis')) {
      this.clientHeight = document.getElementById('varAnalysis').clientHeight
      that.$refs.treebox.style.cssText = `
            max-height:${that.clientHeight - 135}px;
          `
    }
    window.onresize = function () {
      that.clientHeight = document.getElementById('varAnalysis').clientHeight
      that.$refs.treebox.style.cssText = `
          max-height:${that.clientHeight - 135}px;
        `
    }
  }
}
</script>
<style scoped>
.varAnalysis{
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 11px 6px 16px;
}
.nav{
  height: 48px;
  line-height: 48px;
  width: 100%;
  box-sizing: border-box;
  padding-top:8px;
  background: #405977;
}
.item{
  width: 20%;
  height: 40px;
  float: left;
  line-height: 40px;
  text-align: center
}
.itemname{
  display: block;
  font-size: 12px;
  line-height: 30px;
  height: 30px;
  width: 100%;
  border-right: 2px solid #0c0f14;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.activeColor{
  color: #fd8a03;
  transition: all .5s;
}
.inactiveColor{
  color: #fff;
  transition: all .5s;
}
.nav .item:last-child .itemname{
  border-right: 0;
}
.line{
  width: 57px;
  height: 2px;
  margin:0 auto
}
.active{
  background: #fd8a03;
  transition: all .5s;
}
.inactive{
  background: #405977;
  transition: all .5s;
}
.info{
  width: 100%;
  height: calc(100% - 64px);
  margin-top:16px;
  background: linear-gradient(#eeeeee 50%, #dcdcdc 50%);
  background-size: 100% 96px;
  overflow: hidden;
}
.info li{
  width: 33%;
  height: 48px;
  line-height: 48px;
  float: left;
  box-sizing: border-box;
}
.list_item{
  width: 100%;
  height: 100%;
  float: left;
  line-height: 48px;
  padding-left: 10%;
}
.msgTitle{
  height: 48px;
  line-height: 48px;
  background: #405977;
  color: #fff;
  padding-left: 17px;
  font-weight: 100;
  margin-bottom: 10px;
}
.treebox{
  overflow-x: hidden;
  overflow-y: auto;
}
.info_item{
  font-size: 14px;
  color: #001528;
  font-weight: 600;
  padding-right: 10%;
}
.info_value{
  font-size: 14px;
  color: #fd8a03;
  font-weight: 600;
 }
</style>
