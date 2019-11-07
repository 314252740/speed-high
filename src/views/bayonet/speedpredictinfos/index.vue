<template>
  <div>
    <search :options="selectOptions" :query="query" ref="search"/>
    <el-table border ref="multipleTable" v-loading="loading" v-show="!loading" :data="datalist" tooltip-effect="dark"
              size="small" v-cloak style="width: 100%">
      <el-table-column prop="carPlateNumber" :formatter="toUPLower" label="车牌"></el-table-column>
      <el-table-column prop="carType" label="车辆类型">
        <template slot-scope="scope">
          <span v-if="scope.row.carType === '0'">轿车</span>
          <span v-if="scope.row.carType === '1'">货车</span>
        </template>
      </el-table-column>
      <el-table-column prop="speed" label="平均速度(km/h)"></el-table-column>
      <el-table-column prop="name" label="路段信息"></el-table-column>
      <el-table-column prop="inserttime" width="145px" :formatter="insertTime" label="插入时间"></el-table-column>
      <el-table-column prop="type" label="超速预测类型">
        <template slot-scope="scope">
          <span v-if="scope.row.type === '0'">历史超速</span>
          <span v-if="scope.row.type === '1'">历史低速</span>
          <span v-if="scope.row.type === '2'">预测低速</span>
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
  </div>
</template>
<script>
import initData from '@/mixins/initData'
import search from './module/search'
export default {
  mixins: [initData],
  components: {
    search
  },
  data () {
    return {
      multipleSelection: [],
      sup_this: this,
      query: {
        search_carPlateNumber: ''
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
  methods: {
    insertTime (row, columns, rowndex, columnsIndex) {
      return row.inserttime.slice(0, -4)
    },
    toUPLower (row, columns, rowndex, columnsIndex) {
      return row.carPlateNumber.toUpperCase()
    },
    beforeInit () {
      this.url = 'module/speedpredictinfos'
      const sort = ''
      this.params = {
        page: this.page + 1,
        sortType: sort,
        pageSize: this.pageSize,
        search_carPlateNumber: this.query.search_carPlateNumber
      }
      return true
    }
  }
}
</script>
<style>
  [v-cloak] {
    display: none;
  }
</style>
