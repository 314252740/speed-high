<template>
  <el-dialog
    title="新增排班"
    :visible.sync="visible"
    width="1000px"
    label-width="80px"
    :close-on-click-modal="false"
    @open="openData()"
    @close='closeDialog'
  >
    <el-form ref="form" label-width="80px">
      <el-form-item label="大队信息">
        <el-select clearable @change="selectGet" v-model="orgid" placeholder="请选择大队">
          <el-option v-for="item in selectList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <!--  选择年月 -->
        <el-date-picker
          clearable
          v-model="brigade"
          :disabled="mondisable"
          @change="selectGetMon"
          type="month"
          format="yyyy-MM"
          value-format="yyyy-MM"
          :picker-options="pickerOptions"
          placeholder="请选择年月">
        </el-date-picker>
        <!-- <el-select
          @change="selectGetMon"
          :disabled="mondisable"
          v-model="month"
          placeholder="请选择月"
        >
          <el-option v-for="item in monList" :key="item.id" :label="item.month" :value="item.value"></el-option>
        </el-select> -->
        <el-button type="primary" @click="disabledOk()">确定排班</el-button>
        <el-button type="primary" @click="submitShift()">提交排班</el-button>
        <el-button type="primary" @click="exportExcel()">导出为Excel表格</el-button>
      </el-form-item>
    </el-form>

    <div class="bigTableBox" ref="bigTableBox">
      <el-table
        :data="tableData"
        ref="dialogTable"
        border
        stripe
        row-key="id"
        id="out-table"
        style="width: 100%"
      >
        <el-table-column prop="name" label="带班领导" width="120"></el-table-column>
        <el-table-column label="带班日期" align="center" v-if="colsStatus"></el-table-column>
        <el-table-column label="带班日期" align="center" v-else>
          <el-table-column
            label=""
            :show-header="false"
            min-width="15"
            :prop='"leaderData"+index'
            v-for="(item,index) in cols"
            :key="index">
          </el-table-column>
        </el-table-column>
        <el-table-column prop="telPhone" label="联系电话" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120" >
          <template slot-scope="scope">
            <el-button
              :disabled="comfirmStatuse"
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
            >移除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 遮罩 -->
      <div v-show="istableMask" class="tableMask" ref="tableMask"></div>
    </div>
     <!-- 警员排班表 -->
    <el-table
        id="out-table2"
        :data="tableDataList"
        border
        style="width:100%">
        <el-table-column
            prop="dutyDate"
            align="center"
            width="120"
            label="时间">
        </el-table-column>
        <el-table-column align="center" :label="`值班路段：${roadSection}`">
            <el-table-column
                prop="mainSquadronId"
                align="center"
                label="早上8时30分至次日8时30分（主班）">
            </el-table-column>
            <el-table-column
                prop="viceSquadronId"
                align="center"
                label="（副班）">
            </el-table-column>
            <el-table-column
                prop="motorSquadronId"
                align="center"
                label="机动中队">
            </el-table-column>
            <el-table-column
                prop="accidentSquadronId"
                align="center"
                label="事故勘察中队">
            </el-table-column>
        </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
// 引入列拖拽依赖
import Sortable from 'sortablejs'
// 引入导出Excel表格依赖
// eslint-disable-next-line no-unused-vars
import FileSaver from 'file-saver'
// eslint-disable-next-line no-unused-vars
import XLSX from 'xlsx/dist/xlsx'
// 数据接口
import { getLeaderShip, getOrgid, deletePerson, getMon, tscheduleByMonth, addTschedule } from '@/api/schedule'
export default {
  data () {
    return {
      brigade: '',
      brigadeYear: '',
      brigadeMon: '',
      tablewidth: null,
      tableHeight: null,
      istableMask: true,
      comfirmStatuse: false,
      colsStatus: true,
      mondisable: true,
      leadershipNum: '', // 总人数
      monthAll: '', // 总天数
      someOne: '', // 某个人
      roadSection: '',
      orgid: null,
      indexPerson: null,
      selectList: [],
      visible: false,
      cells: null,
      cols: null,
      tableData: [],
      leaderData: ['1', '2', '3', '4', '56', '7'],
      tableDataList: [],
      tableAddTschedule: [],
      pickerOptions: {
        disabledDate (value) {
          if (Date.now() >= value) {
            return true
          }
          return false
        }
      }
    }
  },
  methods: {
    reset () {
      this.brigade = ''
      this.tableDataList = []
      this.tableData = []
      this.tablewidth = null
      this.tableHeight = null
      this.istableMask = false
      // this.comfirmStatuse = false
      // this.colsStatus = true
      // this.mondisable = true
      // this.leadershipNum = "" // 总人数
      // this.monthAll = "" // 总天数
      // this.someOne = "" // 某个人
      // this.roadSection = ""
      // this.indexPerson = null
      // this.cells = null
      // this.cols = null
      // this.month = ""
    },
    async selectGet () {
      this.istableMask = false
      this.tableData = []
      this.colsStatus = false
      this.mondisable = false
      this.comfirmStatuse = false
      await getLeaderShip(this.orgid)
        .then(res => {
          if (res.result === 'ok') {
            this.tableData = res.data.filter(element => {
              return element.status === '0'
            })
            // 总带班领导人数
            this.leadershipNum = this.tableData.length
          }
        })
        .catch(err => {
          console.log(err)
        })
      this.$nextTick(() => {
        this.tableHeight = this.$refs.bigTableBox.offsetHeight
      })
      // getSquadron({pid:this.orgid})
      // .then(res => {
      //   if (res.result === "ok") {
      //     console.log(res.data)
      //   }
      // })
      // .catch(err => {
      //   console.log(err);
      // });
    },
    selectGetMon () {
      if (this.brigade) {
        this.brigadeYear = this.brigade.split('-')[0]
        this.brigadeMon = this.brigade.split('-')[1]
        if (this.orgid) {
        } else {
          this.mondisable = true
        }
      }
    },
    // 确认选择，出现排班日期
    disabledOk () {
      let that = this
      if (this.orgid && this.brigadeMon) {
        this.istableMask = true
        this.$refs.tableMask.style.cssText = `
          height:${this.tableHeight}px;
          width:${this.tablewidth}px;
        `
        this.comfirmStatuse = true
        this.rowDrop()
        getMon({ mon: this.brigadeMon })
          .then(res => {
            if (res.result === 'ok') {
              for (let i in res.data) {
                that.monthAll = i
                that.someOne = res.data[i]
              }
              if (!that.someOne) {
                let len = that.tableData.length - 1
                that.someOne = that.tableData[len].id
              }
              // 计算单元格
              that.cells = that.monthAll - 1 + that.leadershipNum
              if (that.cells % that.leadershipNum === 0) {
                that.cols = parseInt(that.cells / that.leadershipNum)
              } else {
                that.cols = parseInt(that.cells / that.leadershipNum) + 1
              }
              that.calculationF()
              that.colsStatus = false
            } else {
              that.$notify.error({
                title: '提示',
                message: '获取信息失败'
              })
            }
          })
          .catch(err => { console.log(err) })
          // 获取自动排班
        tscheduleByMonth({ orgid: this.orgid, mon: this.brigadeMon, year: this.brigadeYear })
          .then(res => {
            if (res.result === 'ok') {
              this.tableDataList = res.data
              if (res.data[0].jobsName === null) {
                this.roadSection = '暂无路段信息'
              } else {
                this.roadSection = res.data[0].jobsName
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.$notify.info({
          title: '提示',
          message: '请选择大队信息和日期'
        })
      }
    },
    submitShift () {
      // let tableStr = ""
      // this.tableData.forEach(ele => {
      //   tableStr = tableStr + "#" + JSON.stringify(ele)
      //   console.log(tableStr)
      // })
      addTschedule({ scheduleJson: this.tableAddTschedule.join('#') })
        .then(res => {
          if (res.result === 'ok') {
            this.$message({
              message: '提交排班成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '提交排班失败',
              type: 'warning'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 合并当前列,当前行row、当前列column、当前行号rowIndex、当前列号columnIndex
    // arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
    //   // 把列合并为行
    //   if (columnIndex === 1 && rowIndex === 0) {
    //     return [1, 2]
    //   }
    // },
    notingMethod () {

    },
    // 打开弹框
    openData () {
      this.tableData = []
      this.brigade = null
      this.orgid = null
      this.colsStatus = true
      this.comfirmStatuse = false
      this.istableMask = false
      this.rowDrop()
      this.reset()
    },
    closeDialog () {
      this.reset()
    },
    // 删除
    deleteRow (index, rows) {
      let rowsID = rows[index].id
      this.$confirm('是否确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.leadershipNum = this.leadershipNum - 1
          rows.splice(index, 1)
          deletePerson(rowsID)
            .then(res => {
              if (res.result === 'ok') {
              } else {
              }
            })
            .catch(err => {
              console.log(err)
            })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 行拖拽
    rowDrop () {
      this.$nextTick(() => {
        const tbody = this.$refs.dialogTable.$el.children[2].children[0]
          .children[1]
        const _this = this
        Sortable.create(tbody, {
          onEnd ({ newIndex, oldIndex }) {
            const currRow = _this.tableData.splice(oldIndex, 1)[0]
            _this.tableData.splice(newIndex, 0, currRow)
          }
        })
      })
    },
    // 定义导出Excel表格事件
    exportExcel () {
      /* out-table关联导出的dom节点 */
      if (this.tableData.length === 0) {
        this.$notify.info({
          title: '提示',
          message: '表格无数据'
        })
      } else {
        // var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"))
        // /* get binary string as output */
        // var wbout = XLSX.write(wb, {
        //   bookType: "xlsx",
        //   bookSST: true,
        //   type: "array"
        // })
        // try {
        //   FileSaver.saveAs(
        //     new Blob([wbout], { type: "application/octet-stream" }),
        //     "值班表.xlsx"
        //   )
        // } catch (e) {
        //   if (typeof console !== "undefined") console.log(e, wbout)
        // }
        // return wbout
        this.$confirm('确定下载列表文件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.excelData = this.tableData // 你要导出的数据list。
          this.export2Excel()
        }).catch(() => {

        })
      }
    },
    // 数据写入excel
    export2Excel () {
      let colsArr = []
      let dataArr = []
      for (let i = 0; i < this.cols; i++) {
        colsArr.push(`leaderData${i}`)
        dataArr.push(`${i}""`)
      }
      var that = this
      require.ensure([], () => {
        // eslint-disable-next-line camelcase
        const { export_json_to_excel } = require('@/excel/Export2Excel') // 这里必须使用绝对路径，使用@/+存放export2Excel的路径
        const tHeader = ['带班领导', ...dataArr + '带班日期', '联系电话'] // 导出的表头名信息
        const filterVal = ['name', ...colsArr, 'telPhone'] // 导出的表头字段名，需要导出表格字段名
        const list = that.tableData
        const data = that.formatJson(filterVal, list)

        export_json_to_excel(tHeader, data, '下载数据excel')// 导出的表格名称，根据需要自己命名
      })
    },
    // 格式转换，直接复制即可
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    calculationF () {
      this.tableAddTschedule = []
      // 获取上个月值班人id，下标
      for (let pr = 0; pr < this.tableData.length; pr++) {
        if (this.tableData[pr].id === this.someOne) {
          this.$set(this.tableData[pr], 'start', 0)
          this.indexPerson = this.tableData.indexOf(this.tableData[pr])
        }
      }
      if (this.indexPerson === null) {
        this.indexPerson = this.tableData.length - 1
      }
      // 计算显示列表总单元格数量
      let startindex = -1
      let startPer = 0
      if (this.indexPerson !== (this.tableData.length - 1)) {
        startPer = this.indexPerson
      }
      if ((startPer + parseInt(this.monthAll)) <= (this.cols - 1) * this.tableData.length) {
        this.cols = this.cols - 1
      }
      // 计算首列是否为空
      let i = this.indexPerson
      let isNull = true
      for (i; i < this.tableData.length; i++) {
        startindex++
        this.$set(this.tableData[i], 'start', startindex)
        this.$set(this.tableData[i], 'startNull', false)
      }
      if (this.indexPerson === this.tableData.length - 1) {
        isNull = false
      }
      for (let s = 0; s <= this.indexPerson; s++) {
        startindex++
        this.$set(this.tableData[s], 'start', startindex)
        this.$set(this.tableData[s], 'startNull', isNull)
      }
      // 计算每人值班天数
      let len = this.cols
      for (let m = 0; m < this.tableData.length; m++) {
        let arr = []
        if (this.tableData[m]['startNull']) {
          arr.push(' ')
        }
        let start = this.tableData[m].start
        for (let n = 0; n < len; n++) {
          arr.push(start)
          start += this.leadershipNum
        }
        arr = arr.filter((item) => {
          return item <= this.monthAll
        })
        if (arr.includes(0)) {
          arr.splice(arr.indexOf(0), 1, ' ')
        }
        arr.forEach((element, index) => {
          this.$set(this.tableData[m], 'leaderData' + index, arr[index])
        })
        for (var q = 0; q < arr.length; q++) {
          if (arr[q] === ' ' || arr[q] === null || typeof (arr[q]) === 'undefined') {
            arr.splice(q, 1)
            q = q - 1
          }
        }
        let dataTable = { }
        this.$set(dataTable, 'date', arr.join(';'))
        this.$set(dataTable, 'dutyLeader', this.tableData[m].id)
        this.$set(dataTable, 'orgid', this.tableData[m].orgId)
        this.$set(dataTable, 'phone', this.tableData[m].telPhone)
        this.$set(dataTable, 'mon', this.brigadeMon)
        this.$set(dataTable, 'year', this.brigadeYear)
        this.tableAddTschedule.push(JSON.stringify(dataTable))
      }
      // console.log(this.tableData)
    }
  },
  created () {
    getOrgid()
      .then(res => {
        this.selectList = res
      })
      .catch(err => {
        console.log(err)
      })
  },
  mounted () {}
}
</script>

<style scope>
.bigTableBox{
  position: relative;
}
.tableMask{
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  opacity: 0;
  z-index: 3;
}
.el-table__header{
  width: 100%!important;
}
</style>
