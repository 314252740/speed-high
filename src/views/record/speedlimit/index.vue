<template>
  <div>
    <search :options="selectOptions" :query="query" ref="search"/>
    <!-- <el-col :span="24">
      <div style="margin-bottom:10px">
        <el-button-group>
          <el-button type="success" icon="el-icon-plus"  @click="showAddDialog()" v-has>添加</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="removeDialog()" v-has>删除</el-button>
        </el-button-group>
      </div>
    </el-col> -->
    <el-table border ref="multipleTable" v-loading="loading" v-show="!loading" :data="datalist" tooltip-effect="dark"
              size="small" v-cloak style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column prop="name" label="限速屏名称"></el-table-column>
      <el-table-column prop="ip" label="ip地址"></el-table-column>
      <el-table-column prop="limitValue" label="限速值（单位/公里）"></el-table-column>
      <el-table-column prop="opType" label="修改方式">
        <template slot-scope="scope">
          <span v-if="scope.row.opType === '0'">否</span>
          <span v-if="scope.row.opType === '1'">是</span>
        </template>
      </el-table-column>
      <el-table-column prop="modifyTime" label="操作时间"></el-table-column>
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
    <!-- <eform ref="form"/> -->
  </div>
</template>
<script>
import initData from '@/mixins/initData'
import search from './module/search'
// import eform from "./module/form.vue"

export default {
  mixins: [initData],
  components: {
    search
  },
  data () {
    return {
      list: [],
      multipleSelection: [],
      sup_this: this,
      query: {
        search_name: ''
      },
      selectOptions: [],
      delLoading: false,
      showAdd: false,
      zNodes: []
    }
  },
  created () {
    this.$nextTick(() => {
      this.init()
    })
  },
  mounted () {
  },
  methods: {
    beforeInit () {
      this.url = 'record/speedlimitScreenHistorys'
      const sort = 'modify_time desc'
      this.params = {
        page: this.page + 1,
        sortType: sort,
        pageSize: this.pageSize,
        search_name: this.query.search_name
      }
      return true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // showAddDialog () {
    //   this.$refs.form.visible = true
    //   this.$refs.form.isAdd = true
    //   this.$refs.form.startDraw()
    // },
    showEdit (val) {
      this.$refs.form.visible = true
      this.$refs.form.isAdd = false
      this.$refs.form.dataForm = {
        id: val.id,
        ip: val.ip,
        name: val.name,
        cnName: val.cnName,
        enName: val.enName,
        longitude: val.longitude,
        latitude: val.latitude,
        workWay: val.workWay,
        networkStatus: val.networkStatus,
        size: val.size,
        manufacturer: val.manufacturer,
        limitValue: val.limitValue,
        sensorId: val.sensorId,
        note: val.note,
        setNo: val.setNo,
        cameraIds: val.cameraIds,
        cameraIps: val.cameraIps,
        sign: val.sign,
        opType: val.opType }
      this.$refs.form.startDraw()
    }
    // removeById (id) {
    //   this.delLoading = true
    //   doDelete(id).then(res => {
    //     this.$message({
    //       message: "删除成功",
    //       type: "success"
    //     })
    //     this.delLoading = false
    //     this.$refs[id].doClose()
    //     this.init()
    //   }).catch(err => {
    //     this.delLoading = false
    //     console.log("error:" + err)
    //     console.log(err)
    //   })
    // },
    // removeDialog () {
    //   if (this.multipleSelection.length === 0) {
    //     this.$message.error("请选择要删除的记录")
    //     return
    //   }
    //   this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   }).then(() => {
    //     let ids = []
    //     this.multipleSelection.forEach(row => {
    //       ids.push(row.id)
    //     })
    //     doDelete(ids.join(",")).then(res => {
    //       this.$message({
    //         message: "删除成功",
    //         type: "success"
    //       })
    //       this.init()
    //     }).catch(err => {
    //       console.log("error:" + err)
    //       console.log(err)
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: "info",
    //       message: "已取消删除"
    //     })
    //   })
    // }
  },
  computed: {}
}
</script>
<style>
  [v-cloak] {
    display: none;
  }
</style>
