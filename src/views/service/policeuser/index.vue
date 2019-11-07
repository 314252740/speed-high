<template>
  <div>
    <search :options="selectOptions" :options6="getSysOrgByParid" :query="query" ref="search"/>
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
      <el-table-column prop="name" label="姓名" width="150px"></el-table-column>
      <el-table-column prop="code" label="警员编号" width="150px"></el-table-column>
      <el-table-column prop="types" :formatter="formatTypes" label="职务类型"></el-table-column>
      <el-table-column prop="org" label="部门"></el-table-column>
      <el-table-column prop="postCode" label="职务编码"></el-table-column>
      <el-table-column prop="telPhone" label="电话"></el-table-column>
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
    <eform ref="form" :options6="getPoliceType" :options1="getSysOrgByParid" :options3="status" :options4="hasGps" :options5="isTrack"/>
  </div>
</template>
<script>
// import {MessageBox } from "element-ui"
// import {doDelete} from "@/api/policeuser"
import { doDelete, getPoliceType } from '@/api/policeuser'
import { getSysOrgByParid } from '@/api/depart'
import initData from '@/mixins/initData'
import search from './module/search'
import eform from './module/form.vue'
import { getCodeByType } from '@/api/dics'
// import {loadTree} from "@/api/menu"

export default {
  mixins: [initData],
  components: {
    search, eform
  },
  data () {
    return {
      datalists: [],
      list: [],
      multipleSelection: [],
      sup_this: this,
      query: {
        search_name: '',
        search_orgId: ''
      },
      selectOptions: [],
      delLoading: false,
      showAdd: false,
      zNodes: [],
      getPoliceType: [],
      getSysOrgByParid: [],
      status: [],
      hasGps: [],
      isTrack: [],
      // datalists:[],
      types: {
        '1': '民警',
        '0': '协警',
        '2': '中队长',
        '3': '副大队长',
        '4': '大队政委',
        '5': '大队长'
      }
    }
  },

  created () {
    this.changeOptions()
    // this.initData()
    this.init()
  },
  mounted () {

  },
  methods: {
    formatTypes (row, column, cellValue, index) {
      return this.types[row.types]
    },
    initData () {
      this.$nextTick(async () => {
        await this.init()
        this.datalists = this.datalist
        this.datalists.forEach(element => {
          this.$set(element, 'types', this.types[element.types])
        })
      })
    },
    beforeInit () {
      this.url = 'module/syspoliceusers'
      const sort = 'name asc'
      this.params = {
        page: this.page + 1,
        sortType: sort,
        pageSize: this.pageSize,
        search_name: this.query.search_name,
        search_orgId: this.query.search_orgId
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
        code: val.code,
        name: val.name,
        types: val.types,
        orgId: val.orgId,
        postCode: val.postCode,
        telPhone: val.telPhone,
        gpsTelnumber: val.gpsTelnumber,
        createTime: val.createTime,
        note: val.note,
        callnumber: val.callnumber,
        frequency: val.frequency,
        status: val.status,
        hasGps: val.hasGps,
        gpsSerialId: val.gpsSerialId,
        isTrack: val.isTrack,
        isDelete: val.isDelete }
      // this.$refs.form.startDraw();
    },
    changeOptions () {
      // eslint-disable-next-line no-unused-expressions
      getPoliceType().then(res => {
        this.getPoliceType = res
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
      getCodeByType('policeUserStatus').then(res => {
        this.status = res
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
        doDelete(ids.join(',')).then(res => {
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
