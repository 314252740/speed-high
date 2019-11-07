<template>
  <div>
    <div>
      <div>
        <search :options="selectOptions" :query="query" ref="search"/>
      </div>
    </div>
    <el-table border ref="multipleTable" v-loading="loading" v-show="!loading" :data="datalist" tooltip-effect="dark"
              size="small" v-cloak style="width: 100%">
      <el-table-column prop="carPlateNumber" :formatter="toUPLower" label="号牌号码"></el-table-column>
      <el-table-column prop="inserttime" :formatter="insertTime" width="145px" label="通行时间"></el-table-column>
      <el-table-column prop="bayId" label="通行卡口">
      </el-table-column>
      <el-table-column prop="speed" label="通行速度(km/h)" width="200px"></el-table-column>
      <el-table-column prop="carPlateColor" label="号牌颜色">
        <template slot-scope="scope">
          <span v-if="scope.row.carPlateColor === '0'">白色</span>
          <span v-if="scope.row.carPlateColor === '1'">黄色</span>
          <span v-if="scope.row.carPlateColor === '2'">蓝色</span>
          <span v-if="scope.row.carPlateColor === '3'">黑色</span>
          <span v-if="scope.row.carPlateColor === '4'">其它颜色</span>
        </template>
      </el-table-column>
      <el-table-column prop="carPlateType" label="号牌类型">
        <template slot-scope="scope">
          <span v-if="scope.row.carPlateType === '1'">大型汽车号牌</span>
          <span v-if="scope.row.carPlateType === '2'">小型汽车号牌</span>
          <span v-if="scope.row.carPlateType === '3'">使馆汽车号牌</span>
          <span v-if="scope.row.carPlateType === '4'">领馆汽车号牌</span>
          <span v-if="scope.row.carPlateType === '5'">境外汽车号牌</span>
          <span v-if="scope.row.carPlateType === '6'">外籍汽车号牌</span>
          <span v-if="scope.row.carPlateType === '7'">普通摩托车号牌</span>
          <span v-if="scope.row.carPlateType === '8'">轻便摩托车号牌</span>
          <span v-if="scope.row.carPlateType === '9'">使馆摩托车号牌</span>
          <span v-if="scope.row.carPlateType === '10'">领馆摩托车号牌</span>
          <span v-if="scope.row.carPlateType === '11'">境外摩托车号牌</span>
          <span v-if="scope.row.carPlateType === '12'">外籍摩托车号牌</span>
          <span v-if="scope.row.carPlateType === '13'">低速车号牌</span>
          <span v-if="scope.row.carPlateType === '14'">拖拉机号牌</span>
          <span v-if="scope.row.carPlateType === '15'">挂车号牌</span>
          <span v-if="scope.row.carPlateType === '16'">教练汽车号牌</span>
          <span v-if="scope.row.carPlateType === '17'">教练摩托车号牌</span>
          <span v-if="scope.row.carPlateType === '20'">临时入境汽车号牌</span>
          <span v-if="scope.row.carPlateType === '21'">临时入境摩托车号牌</span>
          <span v-if="scope.row.carPlateType === '23'">警用汽车号牌</span>
          <span v-if="scope.row.carPlateType === '24'">警用摩托号牌</span>
          <span v-if="scope.row.carPlateType === '25'">原农机号牌</span>
          <span v-if="scope.row.carPlateType === '26'">香港入出境车号牌</span>
          <span v-if="scope.row.carPlateType === '27'">澳门入出境车号牌</span>
          <span v-if="scope.row.carPlateType === '31'">武警号牌</span>
          <span v-if="scope.row.carPlateType === '32'">军队号牌</span>
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
        search_carPlateNumber: '',
        search_valueStart: '',
        search_valueEnd: ''
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
      this.url = 'yhl/tresultcarinfos'
      const sort = ''
      this.params = {
        page: this.page + 1,
        sortType: sort,
        pageSize: this.pageSize,
        startTime: this.query.valueStart,
        endTime: this.query.valueEnd,
        search_carPlateNumber: this.query.search_carPlateNumber,
        search_valueStart: this.query.search_valueStart,
        search_valueEnd: this.query.search_valueEnd
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
