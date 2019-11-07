<template>
  <div>
    <search :options="selectOptions" :query="query" ref="search"/>
    <el-col :span="24">
      <div style="margin-bottom:10px">
        <el-button-group>
          <el-button type="success" icon="el-icon-plus"  @click="showAddDialog()" v-has>添加</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="removeDialog()" v-has>删除</el-button>
          <el-button type="warning" icon="el-icon-warning" @click="CarWebsocket()">WebSocket Car</el-button>
        </el-button-group>
      </div>
    </el-col>
    <el-table border ref="multipleTable" v-loading="loading" v-show="!loading" :data="datalist" tooltip-effect="dark"
              size="small" v-cloak style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="plateNum" label="号牌号码"></el-table-column>
      <el-table-column prop="types" label="车辆类型" width="150px"></el-table-column>
       <el-table-column prop="plateType" label="号牌种类"></el-table-column>
       <el-table-column prop="carBrand" label="车辆中文品牌"></el-table-column>
       <el-table-column prop="org" label="所属部门"></el-table-column>
       <el-table-column prop="isAlarm" label="是否有报警器"></el-table-column>
       <el-table-column prop="hasGps" label="是否有GPS定位设备"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150px">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click="showEdit(scope.row)" type="info" size="mini" icon="el-icon-edit" v-has="'修改'"></el-button>
            <el-popover
              :ref="scope.row.id"
              placement="top"
              width="180">
              <p>确定删除本条数据吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                <el-button :loading="delLoading" type="primary" size="mini" @click="removeById(scope.row.id)">确定</el-button>
              </div>
              <el-button slot="reference" type="danger" size="mini" icon="el-icon-delete" v-has="'删除'"></el-button>
            </el-popover>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="12">
        <el-pagination
          @size-change="sizeChange"
          @current-change="pageChange"
          :currentPageNo="0"
          :page-sizes="[15, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, prev, pager, next,sizes"
          :total=total>
        </el-pagination>
      </el-col>
    </el-row>
    <eform ref="form" :options8="plateType" :options1="getSysOrgByParid" :options3="carTypes" :options4="hasGps" :options5="isTrack" :options6="status" :options7="isAlarm"/>
  </div>
</template>
<script>
// import {MessageBox} from "element-ui"
import { doDelete } from '@/api/policecar'
import { getSysOrgByParid } from '@/api/depart'
import initData from '@/mixins/initData'
import search from './module/search'
import eform from './module/form.vue'
import { getCodeByType } from '@/api/dics'
// import {loadTree} from "@/api/menu"
import { wensocketFogInfo } from '@/api/accidentMap.js'
export default {
  mixins: [initData],
  components: {
    search, eform
  },
  data () {
    return {
      list: [],
      multipleSelection: [],
      sup_this: this,
      query: {
        search_plateNum: ''
      },
      selectOptions: [],
      delLoading: false,
      showAdd: false,
      plateType: [],
      carTypes: [],
      getSysOrgByParid: [],
      hasGps: [],
      isTrack: [],
      status: [],
      isAlarm: [],
      zNodes: []
    }
  },
  created () {
    this.$nextTick(() => {
      this.init()
    })
    this.changeOptions()
  },
  mounted () {
  },
  methods: {
    beforeInit () {
      this.url = 'module/syspolicecars'
      const sort = 'plate_num asc'
      this.params = {
        page: this.page + 1,
        sortType: sort,
        pageSize: this.pageSize,
        search_plateNum: this.query.search_plateNum
      }
      return true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    showAddDialog () {
      this.$refs.form.visible = true
      this.$refs.form.isAdd = true
      // this.$refs.form.startDraw();
    },
    showEdit (val) {
      this.$refs.form.visible = true
      this.$refs.form.isAdd = false
      this.$refs.form.dataForm = {
        orgId1: val.orgId1,
        id: val.id,
        plateNum: val.plateNum,
        plateType: val.plateType,
        carBrand: val.carBrand,
        orgId: val.orgId,
        isAlarm: val.isAlarm,
        createTime: val.createTime,
        buyTime: val.buyTime,
        callnumber: val.callnumber,
        frequency: val.frequency,
        skyShootCode: val.skyShootCode,
        carUseType: val.carUseType,
        types: val.types,
        hasGps: val.hasGps,
        note: val.note,
        status: val.status,
        gpsTelnumber: val.gpsTelnumber,
        gpsSerialId: val.gpsSerialId,
        isTrack: val.isTrack,
        isDelete: val.isDelete }
      // this.$refs.form.startDraw();
    },
    changeOptions () {
      getCodeByType('plateType').then(res => {
        this.plateType = res
      }).catch(err => {
        console.log('error:' + err)
        console.log(err)
      })
      getSysOrgByParid('00').then(res => {
        this.getSysOrgByParid = res
      }).catch(err => {
        console.log('error:' + err)
        console.log(err)
      })
      getCodeByType('policecartype').then(res => {
        this.carTypes = res
      }).catch(err => {
        console.log('error:' + err)
        console.log(err)
      })
      getCodeByType('isGps').then(res => {
        this.hasGps = res
      }).catch(err => {
        console.log('error:' + err)
        console.log(err)
      })
      getCodeByType('isTrack').then(res => {
        this.isTrack = res
      }).catch(err => {
        console.log('error:' + err)
        console.log(err)
      })
      getCodeByType('plateType').then(res => {
        this.status = res
      }).catch(err => {
        console.log('error:' + err)
        console.log(err)
      })
      getCodeByType('isAlarm').then(res => {
        this.isAlarm = res
      }).catch(err => {
        console.log('error:' + err)
        console.log(err)
      })
    },
    removeById (id) {
      this.delLoading = true
      doDelete(id).then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.delLoading = false
        this.$refs[id].doClose()
        this.init()
      }).catch(err => {
        this.delLoading = false
        console.log('error:' + err)
        console.log(err)
      })
    },
    removeDialog () {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请选择要删除的记录')
        return
      }
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = []
        this.multipleSelection.forEach(row => {
          ids.push(row.id)
        })
        doDelete(ids.join(',')).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.init()
        }).catch(err => {
          console.log('error:' + err)
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    CarWebsocket () { // test
      wensocketFogInfo('deleteId')
        .then(res => {
          if (res.result === 'ok') {
            this.$message({
              message: 'websocket request success',
              type: 'success'
            })
          } else {
            this.$message({
              message: 'websocket request error',
              type: 'error'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {}
}
</script>
<style>
  [v-cloak] {
    display: none;
  }
</style>
