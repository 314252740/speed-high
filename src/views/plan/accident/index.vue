<template>
  <div>
    <!--<search :options="selectOptions" :query="query" ref="search"/>-->
    <el-col :span="24">
      <div style="margin-bottom:10px">
        <el-button-group>
        <el-button type="success" icon="el-icon-plus"  @click="showAddDialog()" v-has>添加</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="removeDialog()" v-has>删除</el-button>
        </el-button-group>
      </div>
    </el-col>
    <el-table border ref="multipleTable" v-loading="loading" v-show="!loading" :data="datalists" tooltip-effect="dark"
              size="small" v-cloak style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="name" label="道路名称" style="width: 30%" show-overflow-tooltip></el-table-column>
      <el-table-column prop="locationInformation" label="桩号" style="width: 30%"></el-table-column>
      <el-table-column prop="accidentType" label="事故类型" style="width: 20%"></el-table-column>
      <el-table-column prop="orgIdName" label="所属辖区" style="width: 20%"></el-table-column>
      <el-table-column prop="propertyDamage" label="财产损失" style="width: 20%"></el-table-column>
      <el-table-column prop="casualties" label="死亡人数" style="width: 20%"></el-table-column>
      <el-table-column prop="injureNumber" label="受伤人数" style="width: 20%"></el-table-column>
      <el-table-column prop="accidentNote" label="事故描述" style="width: 20%"></el-table-column>
      <el-table-column prop="assistance" label="协助情况" style="width: 20%"></el-table-column>
      <!-- <el-table-column prop="accidentLevel" label="事故等级" style="width: 20%"></el-table-column> -->
      <el-table-column prop="accidentTime" label="开始时间" style="width: 20%"></el-table-column>
      <!-- <el-table-column prop="continuousTime" label="持续时间" style="width: 20%"></el-table-column> -->
      <!-- <el-table-column prop="processingMethod" label="事故处理方法" style="width: 20%"></el-table-column> -->

      <el-table-column fixed="right" label="操作" style="width: 30%">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click="showEdit(scope.row)" type="info" size="mini" icon="el-icon-edit"  v-has="'修改'"></el-button>
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
    <eform ref="form" :roadOptions="roadOptions" :typeOptions="typeOptions" :JurisdictionOptions="JurisdictionOptions" />
  </div>
</template>

<script>

// import {getDicTypes, doDel} from "@/api/dics"
// import {MessageBox } from "element-ui"
import initData from '@/mixins/initData'
import search from './module/search'
import eform from './module/form.vue'
import { doDel } from '@/api/accident'
import {
  getTrafficType,
  getTrafficPosition,
  getAllOrg
} from '@/api/eventInput.js'
export default {
  mixins: [initData],
  components: {
    // eslint-disable-next-line vue/no-unused-components
    search, eform
  },
  data () {
    return {
      datalists: [],
      list: [],
      multipleSelection: [],
      sup_this: this,
      query: {
        search_eventCode: ''
      },
      getRoadNames: [],
      delLoading: false,
      showAdd: false,
      roadOptions: [],
      typeOptions: [],
      JurisdictionOptions: []
    }
  },
  async created () {
    // 获取辖区
    await getAllOrg()
      .then(res => {
        this.JurisdictionOptions = res
      })
      .catch(err => console.log(err))
    this.initData()
    // 事故类型
    getTrafficType()
      .then(res => {
        this.typeOptions = res
      })
      .catch(err => {
        console.log(err)
      })
    // 事故位置
    getTrafficPosition()
      .then(res => {
        this.roadOptions = res
      })
      .catch(err => {
        console.log(err)
      })
  },
  mounted () {
  },
  methods: {
    initData () {
      this.$nextTick(async () => {
        await this.init()
        this.datalists = this.datalist
        this.datalists.forEach((element) => {
          this.$set(element, 'accidentTime', element.accidentTime.slice(0, -2))
          this.JurisdictionOptions.forEach(item => {
            if (item.id === element.orgId) {
              this.$set(element, 'orgIdName', item.name)
            }
          })
        })
      })
    },
    beforeInit () {
      this.url = 'plan/getTrafficAccidentList'
      const sort = ''
      this.params = {
        pageNumber: this.page,
        sortType: sort,
        pageSize: this.pageSize,
        search_eventCode: this.query.search_eventCode
      }
      return true
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    showAddDialog () {
      this.$refs.form.visible = true
      this.$refs.form.isAdd = true
      this.$refs.form.startDraw()
    },
    showEdit (val) {
      this.$refs.form.visible = true
      this.$refs.form.isAdd = false
      this.$refs.form.startDraw()
      if (val.locationInformation) {
        let arr = val.locationInformation.split('+')
        this.$set(val, 'pile', arr[0])
        this.$set(val, 'distance', arr[1])
      }
      if (val.accidentTime) {
        this.$set(val, 'accidentTime', val.accidentTime.substring(-2))
      }
      this.$refs.form.accidentTime = new Date(val.accidentTime)
      this.$refs.form.hours = new Date(val.accidentTime)
      this.$refs.form.dataForm = {
        id: val.id,
        subordinateHighSpeed: val.subordinateHighSpeed, // 道路名称
        locationInformation: val.locationInformation, // 桩号加米
        pile: val.pile, // 桩号
        distance: parseFloat(val.distance), // 米
        accidentType: val.accidentType, // 事件类型
        accidentNote: val.accidentNote, // 事件描述
        casualties: val.casualties, // 死亡人数
        injureNumber: val.injureNumber, // 受伤人数
        accidentTime: new Date(val.accidentTime), // 开始日期
        hours: new Date(val.accidentTime), // 开始时间
        longitude: val.longitude, // 经度
        latitude: val.latitude, // 纬度
        direction: val.direction, // 方向
        propertyDamage: parseFloat(val.propertyDamage), // 财产损失
        assistance: val.assistance, // 协助情况
        orgId: val.orgId// 所属辖区
      }
    },
    removeById (id) {
      this.delLoading = true
      doDel(id).then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.delLoading = false
        this.$refs[id].doClose()
        this.initData()
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
        doDel(ids.join(',')).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.initData()
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
