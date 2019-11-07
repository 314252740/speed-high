<template>
  <div>
    <!--<search :options="selectOptions" :query="query" ref="search"/>-->
    <el-table border ref="multipleTable" v-loading="loading" v-show="!loading" :data="datalist" tooltip-effect="dark"
              size="small" v-cloak style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"></el-table-column>

      <el-table-column prop="roadCode" label="道路编号" min-width="207px"></el-table-column>
      <el-table-column prop="name" label="检测仪名称" min-width="84px"></el-table-column>
      <el-table-column prop="timeInsert" label="时间" width="142px"></el-table-column>
      <el-table-column prop="limitSpeed" label="限速值(km/h)"></el-table-column>
      <el-table-column prop="visibility" label="能见度(m)"></el-table-column>
      <el-table-column prop="statusRoad" label="路面状况"></el-table-column>
      <el-table-column prop="sunshine" label="光照强度"></el-table-column>

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
    // eslint-disable-next-line vue/no-unused-components
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
      zNodes: [],
      statusRoad: {
        '11': '干燥',
        '12': '潮湿',
        '13': '积水',
        '14': '积雪',
        '15': '结冰',
        '16': '霜',
        '17': '冰水混合物',
        '18': '冰水混合物',
        '99': '冰水混合物'
      }
    }
  },
  created () {
    this.$nextTick(async () => {
      await this.init()
      this.datalists = this.datalist
      this.datalists.forEach(element => {
        this.$set(element, 'statusRoad', this.statusRoad[element.statusRoad])
      })
    })
  },
  mounted () {
  },
  methods: {
    beforeInit () {
      this.url = 'module/sensormessageinfos'
      const sort = 'time_insert desc'
      this.params = {
        page: this.page + 1,
        sortType: sort,
        pageSize: this.pageSize,
        search_sensorIp: this.query.search_name
      }
      return true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    showAddDialog () {

    },
    showEdit (val) {

    },
    removeById (id) {

    },
    removeDialog () {

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
