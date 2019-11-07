<template>
  <div>
    <search :options3="selectOptions" :query="query" ref="search"/>
    <el-col :span="24">
      <div style="margin-bottom:10px">
        <el-button-group>
          <el-button type="success" icon="el-icon-plus"  @click="showAddDialog()" v-has>添加</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="removeDialog()" v-has>删除</el-button>
        </el-button-group>
      </div>
    </el-col>
    <el-table border ref="multipleTable" v-loading="loading" v-show="!loading" :data="datalist" tooltip-effect="dark"
              size="small" v-cloak style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="attendanceTypeStr" label="出勤类型" width="150px"></el-table-column>
      <el-table-column prop="attendanceTime" :formatter="attendanceTimeFormat" label="出勤时间"></el-table-column>
      <el-table-column prop="returnTime" :formatter="returnTimeFormat" label="返回时间"></el-table-column>
      <el-table-column prop="trafficAccident" label="交通事故"></el-table-column>
      <el-table-column prop="policeCar" label="出勤警车"></el-table-column>
       <el-table-column prop="attendancePoliceStr1" label="出勤民警1"></el-table-column>
       <el-table-column prop="attendancePoliceStr2" label="出勤民警2"></el-table-column>
       <el-table-column prop="attendancePoliceStr3" label="出勤民警3"></el-table-column>
       <el-table-column prop="attendancePoliceStr4" label="出勤民警4"></el-table-column>
       <el-table-column prop="attendancePoliceStr5" label="出勤民警5"></el-table-column>
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
    <eform ref="form" :options3="attendanceType" :options1="getPoliceCar" :options2="getTrafficAccident" :options4="policeUser1" :options5="policeUser2" :options6="policeUser3" :options7="policeUser4" :options8="policeUser5"/>
  </div>
</template>
<script>
import { doDelete } from '@/api/attendance'
import initData from '@/mixins/initData'
import search from './module/search'
import eform from './module/form.vue'
import { getCodeByType } from '@/api/dics'
import { getPoliceCar } from '@/api/policecar'
import { getListByName } from '@/api/policeuser'
import { getTrafficAccident } from '@/api/accident'

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
        search_attendanceType: ''
      },
      selectOptions: [],
      delLoading: false,
      showAdd: false,
      attendanceType: [],
      getPoliceCar: [],
      getTrafficAccident: [],
      policeUser1: [],
      policeUser2: [],
      policeUser3: [],
      policeUser4: [],
      policeUser5: [],
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
    returnTimeFormat (row, column, rowIndex, columnIndex) {
      return row.returnTime.slice(0, -2)
    },
    attendanceTimeFormat (row, column, rowIndex, columnIndex) {
      return row.attendanceTime.slice(0, -2)
    },
    beforeInit () {
      this.url = 'module/tattendanceinfos'
      const sort = 'id desc'
      this.params = {
        page: this.page + 1,
        sortType: sort,
        pageSize: this.pageSize,
        search_attendanceType: this.query.search_attendanceType
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
        id: val.id,
        attendanceType: val.attendanceType,
        attendanceTime: val.attendanceTime,
        returnTime: val.returnTime,
        trafficAccidentId: val.trafficAccidentId,
        policeCarId: val.policeCarId,
        attendancePolice1: val.attendancePolice1,
        attendancePolice2: val.attendancePolice2,
        attendancePolice3: val.attendancePolice3,
        attendancePolice4: val.attendancePolice4,
        attendancePolice5: val.attendancePolice5,
        noteInfo: val.noteInfo }
      // this.$refs.form.startDraw();
    },
    changeOptions () {
      getCodeByType('attendanceType').then(res => {
        this.attendanceType = res
        this.selectOptions = res
      }).catch(err => {
        console.log('error:' + err)
        console.log(err)
      })
      getPoliceCar().then(res => {
        this.getPoliceCar = res
      }).catch(err => {
        console.log('error:' + err)
        console.log(err)
      })
      getTrafficAccident().then(res => {
        this.getTrafficAccident = res
      }).catch(err => {
        console.log('error:' + err)
        console.log(err)
      })
      getListByName('null').then(res => {
        this.policeUser1 = res
        this.policeUser2 = res
        this.policeUser3 = res
        this.policeUser4 = res
        this.policeUser5 = res
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
