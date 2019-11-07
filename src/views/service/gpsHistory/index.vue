<template>
  <div>
    <search :options="selectOptions" :query="query" ref="search"/>
   <!--<el-col :span="24">
      <div style="margin-bottom:10px">
       <el-button-group>
          <el-button type="danger" icon="el-icon-delete" @click="removeDialog()" v-has>删除</el-button>
        </el-button-group>
      </div>
    </el-col>-->
    <el-table border ref="multipleTable" v-loading="loading" v-show="!loading" :data="datalist" tooltip-effect="dark"
              size="small" v-cloak style="width: 100%" @selection-change="handleSelectionChange">
      <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
      <el-table-column prop="iscar" :formatter="formatisCar" label="警员/车" width="150px"></el-table-column>
      <el-table-column prop="policeId" label="车牌号码/警员名称" width="150px"></el-table-column>
      <el-table-column prop="type" width="200px" label="类型" show-overflow-tooltip></el-table-column>
      <el-table-column prop="gpstime" width="200px" label="GPS时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="velocity" width="150px" label="速度（km/h）"></el-table-column>
      <el-table-column prop="isonline" width="100px" label="是否在线">
        <template slot-scope="scope">
          <span v-if="scope.row.isonline === '0'">否</span>
          <span v-if="scope.row.isonline === '1'">是</span>
        </template>
      </el-table-column>
      <el-table-column prop="posinfo" label="位置" show-overflow-tooltip></el-table-column>
      <el-table-column fixed="right" label="操作" width="150px">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click="showEdit(scope.row)" type="info" size="mini" icon="el-icon-view" v-has="'查看'"></el-button>
            <el-popover
              :ref="scope.row.id"
              placement="top"
              width="180">
              <p>确定删除本条数据吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                <el-button :loading="delLoading" type="primary" size="mini" @click="removeById(scope.row.id)">确定</el-button>
              </div>
              <!--<el-button slot="reference" type="danger" size="mini" icon="el-icon-delete" v-has="'删除'"></el-button>-->
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
    <eform ref="form"/>
  </div>
</template>
<script>
// import {MessageBox } from "element-ui"
// import {doDelete} from "@/api/gpstime"
import initData from '@/mixins/initData'
import search from './module/search'
import eform from './module/form.vue'

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
        search_policeId: ''
      },
      selectOptions: [],
      delLoading: false,
      showAdd: false,
      zNodes: [],
      datalists: [],
      iscar: {
        '1': '警车',
        '0': '警员'
      }
    }
  },
  created () {
    this.init()
  },
  mounted () {
  },
  methods: {
    formatisCar (row, column, rowIndex, columnIndex) {
      return this.iscar[row.iscar]
    },
    // initData () {
    //   this.$nextTick(async () => {
    //     await this.init()
    //     this.datalists = this.datalist
    //     this.datalists.forEach(element => {
    //       this.$set(element, "iscar", this.iscar[element.iscar])
    //     })
    //   })
    // },
    beforeInit () {
      this.url = 'module/gpshistorys'
      const sort = 'id desc'
      this.params = {
        page: this.page + 1,
        sortType: sort,
        pageSize: this.pageSize,
        search_policeId: this.query.search_policeId
      }
      return true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // showAddDialog () {
    //   this.$refs.form.visible = true
    //   this.$refs.form.isAdd = true
    //   // this.$refs.form.startDraw();

    // },
    showEdit (val) {
      this.$refs.form.visible = true
      this.$refs.form.isAdd = false
      this.$refs.form.dataForm = {
        id: val.id,
        iscar: this.iscar[val.iscar],
        type: val.type,
        policeId: val.policeId,
        gpstime: val.gpstime,
        longitude: val.longitude,
        latitude: val.latitude,
        altitude: val.altitude,
        velocity: val.velocity,
        angle: val.angle,
        isonline: val.isonline,
        isOnLine: val.isOnLine,
        posinfo: val.posinfo
      }
      // this.$refs.form.startDraw();
    }
    /* removeById (id) {
      this.delLoading = true
      doDelete(id).then(res => {
        this.$message({
          message: "删除成功",
          type: "success"
        })
        this.delLoading = false
        this.$refs[id].doClose()
        this.initData()
      }).catch(err => {
        this.delLoading = false
        console.log("error:" + err)
        console.log(err)
      })
    }, */
    /* removeDialog () {
      if (this.multipleSelection.length === 0) {
        this.$message.error("请选择要删除的记录")
        return
      }
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let ids = []
        this.multipleSelection.forEach(row => {
          ids.push(row.id)
        })
        doDelete(ids.join(",")).then(res => {
          this.$message({
            message: "删除成功",
            type: "success"
          })
          this.initData()
        }).catch(err => {
          console.log("error:" + err)
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        })
      })
    } */
  },
  computed: {}
}
</script>
<style>
  [v-cloak] {
    display: none;
  }
</style>
