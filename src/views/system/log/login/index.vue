<template>
  <div>
    <search :query="query" ref="search"/>
    <el-table border ref="multipleTable" v-loading="loading" v-show="!loading" :data="datalist" tooltip-effect="dark"
              size="small" v-cloak style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column prop="operatorId" label="账号" width="150px"></el-table-column>
      <el-table-column prop="operatorName" label="操作员姓名" width="150px"></el-table-column>
      <el-table-column prop="ipAddress" label="IP地址"></el-table-column>
      <el-table-column prop="type" label="类型" width="150px"></el-table-column>
      <el-table-column prop="operationTime" label="发生时间"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
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
      list: [],
      multipleSelection: [],
      query: {
        search_operatorName: ''
      }
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
      this.url = 'api/system/logs/login'
      const sort = 'name desc'
      this.params = {
        page: this.page + 1,
        sortType: sort,
        pageSize: this.pageSize,
        search_operatorName: this.query.search_operatorName
      }
      return true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
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
