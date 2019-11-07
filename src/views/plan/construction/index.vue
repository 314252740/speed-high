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
      <el-table-column prop="constructionType" label="施工类型" style="width: 30%" show-overflow-tooltip></el-table-column>
      <el-table-column prop="roadName" label="施工位置" style="width: 20%"></el-table-column>
      <el-table-column prop="pile" label="桩号" style="width: 20%"></el-table-column>
      <el-table-column prop="constructionDes" label="施工描述" style="width: 30%"></el-table-column>
      <el-table-column prop="startTime" label="开始时间" style="width: 20%"></el-table-column>
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
              <el-button slot="reference" type="danger" size="mini" icon="el-icon-delete"  v-has="'删除'"></el-button>
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
    <eform ref="form"
    :typeOptions="typeOptions"
    :organizationOptions="organizationOptions"
    :roadOptions="roadOptions"/>
  </div>
</template>

<script>
// import {getDicTypes, doDel} from "@/api/dics"
// import {MessageBox } from "element-ui"
import initData from '@/mixins/initData'
import search from './module/search'
import eform from './module/form.vue'
import { doDel } from '@/api/construction'
import {
  getConstructionType,
  getOrganization,
  getTrafficPosition
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
      selectOptions: [],
      delLoading: false,
      showAdd: false,
      typeOptions: [],
      organizationOptions: [],
      roadOptions: []
    }
  },
  created () {
    this.initData()
    // 施工养护类型数据请求
    getConstructionType()
      .then(res => {
        this.typeOptions = res
      })
      .catch(err => {
        console.log(err)
      })
    // 组织机构
    getOrganization()
      .then(res => {
        this.organizationOptions = res
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
    beforeInit () {
      this.url = 'plan/getConstructionList'
      const sort = ''
      this.params = {
        pageNumber: this.page,
        sortType: sort,
        pageSize: this.pageSize,
        search_eventCode: this.query.search_eventCode
      }
      return true
    },
    initData () {
      this.$nextTick(async () => {
        await this.init()
        this.datalists = this.datalist
        this.datalists.forEach((element) => {
          this.$set(element, 'startTime', element.startTime.slice(0, -2))
        })
      })
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
      this.$refs.form.startTime = new Date(val.startTime)
      this.$refs.form.hours = new Date(val.startTime)
      this.$refs.form.dataForm = {
        id: val.id,
        roadName: val.roadName,
        pile: val.pile,
        distance: parseFloat(val.distance),
        constructionDes: val.constructionDes, // 养护描述
        startTime: new Date(val.startTime), // 养护事件日期
        hours: new Date(val.startTime), // 养护开始时间
        constructionType: val.constructionType, // 养护事件类型
        orgId: val.orgId, // 组织机构
        longitude: val.longitude, // 经度
        latitude: val.latitude // 纬度
      }
      this.$refs.form.startDraw()
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
