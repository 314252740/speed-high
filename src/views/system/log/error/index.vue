<template>
  <div>
    <search :query="query" ref="search"/>
    <el-table border ref="multipleTable" v-loading="loading" v-show="!loading" :data="datalist" tooltip-effect="dark"
              size="small" v-cloak style="width: 100%">
      <el-table-column prop="className" label="类名" width="150px"></el-table-column>
      <el-table-column prop="methodName" label="方法名" width="150px"></el-table-column>
      <el-table-column prop="des" label="描述"></el-table-column>
      <el-table-column prop="ip" label="IP地址"  width="150px"></el-table-column>
      <!--<el-table-column prop="isSuccess" label="是否成功" width="150px"></el-table-column>-->
      <el-table-column prop="operateTime" label="操作时间" width="150px"></el-table-column>
      <el-table-column prop="operator" label="操作员"></el-table-column>
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
        search_operator: '',
        search_startTime: ''
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
      this.url = 'api/system/logs/error'
      const sort = 'name desc'
      this.params = {
        page: this.page + 1,
        sortType: sort,
        pageSize: this.pageSize,
        search_operator: this.query.search_operator,
        search_startTime: this.$refs.search.dateRange[0],
        search_endtime: this.$refs.search.dateRange[1]
      }
      return true
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
