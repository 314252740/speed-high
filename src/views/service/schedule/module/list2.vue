<template>
  <el-dialog
    title="新增模板"
    :visible.sync="visible"
    width="1000px"
    label-width="80px"
    @open="openData()"
  >
    <el-form ref="form" label-width="80px">
      <el-form-item label="大队信息">
        <el-select @change="selectGet" v-model="orgid" placeholder="请选择大队">
          <el-option v-for="item in selectList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-select
          @change="selectGetMon"
          :disabled="mondisable"
          v-model="month"
          placeholder="请选择月份"
        >
          <el-option v-for="item in monList" :key="item.id" :label="item.month" :value="item.value"></el-option>
        </el-select>
        <el-button type="primary" @click="disabledOk()">确定选择</el-button>
        <el-button type="primary" @click="exportExcel()">导出为Excel表格</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      ref="dialogTable"
      :span-method="!colsStatus?arraySpanMethod:notingMethod"
      border
      stripe
      row-key="id"
      id="out-table"
      style="width: 100%"
    >
      <el-table-column prop="name" label="带班领导" width="120"></el-table-column>
      <el-table-column label="带班日期" v-if="colsStatus"></el-table-column>
      <el-table-column label="带班日期" v-else>
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

     <!-- 警员排班表 -->
    <el-table
        id="out-table2"
        :data="tableDataList"
        border
        style="width:100%">
        <el-table-column
            prop="dateMonth"
            align="center"
            width="120"
            label="时间">
        </el-table-column>
        <el-table-column label="路段">
            <el-table-column
                prop="maiClass"
                align="center"
                label="早上8时30分至次日8时30分（主班）">
            </el-table-column>
            <el-table-column
                prop="subClass"
                align="center"
                label="（副班）">
            </el-table-column>
            <el-table-column
                prop="maneuver"
                align="center"
                label="机动中队">
            </el-table-column>
            <el-table-column
                prop="accident"
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
import FileSaver from 'file-saver'
import XLSX from 'xlsx/dist/xlsx'
// 数据接口
import { getLeaderShip, getOrgid, deletePerson, getMon } from '@/api/schedule'
export default {
  data () {
    return {
      comfirmStatuse: false,
      colsStatus: true,
      mondisable: true,
      undisable: false,
      leadershipNum: '', // 总人数
      monthAll: '', // 总天数
      someOne: '', // 某个人
      orgid: null,
      indexPerson: null,
      selectList: [],
      visible: false,
      cells: null,
      cols: null,
      tableData: [],
      leaderData: ['1', '2', '3', '4', '56', '7'],
      month: '',
      monList: [
        { month: '一月', value: '1' },
        { month: '二月', value: '2' },
        { month: '三月', value: '3' },
        { month: '四月', value: '4' },
        { month: '五月', value: '5' },
        { month: '六月', value: '6' },
        { month: '七月', value: '7' },
        { month: '八月', value: '8' },
        { month: '九月', value: '9' },
        { month: '十月', value: '10' },
        { month: '十一月', value: '11' },
        { month: '十二月', value: '12' }
      ],
      tableDataList: [{
        dateMonth: '7月1日',
        maiClass: '二中队 1223153454554454',
        subClass: '一中队 54545454545',
        maneuver: '林 超 王大锤',
        accident: '朱日和 王猛'
      }, {
        dateMonth: '7月2日',
        maiClass: '二中队 1223153454554454',
        subClass: '一中队 54545454545',
        maneuver: '林 超 王大锤',
        accident: '朱日和 王猛'
      }]
    }
  },
  methods: {
    selectGet () {
      this.mondisable = false
      getLeaderShip(this.orgid)
        .then(res => {
          if (res.result === 'ok') {
            this.tableData = res.data.filter(element => {
              return element.status === '0'
            })
            // 总带班领导人数
            this.colsStatus = true
            this.leadershipNum = this.tableData.length
          }
        })
        .catch(err => {
          console.log(err)
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
      if (this.orgid) {
      } else {
        this.mondisable = true
      }
    },
    // 确认选择，出现排班日期
    disabledOk () {
      if (this.orgid && this.month) {
        this.comfirmStatuse = true
        this.undisable = true // 禁用行拖拽
        this.rowDrop()
        getMon({ mon: this.month })
          .then(res => {
            if (res.result === 'ok') {
              for (let i in res.data) {
                this.monthAll = i
                this.someOne = res.data[i]
              }
              // 计算单元格
              this.cells = this.monthAll - 1 + this.leadershipNum
              if (this.cells % this.leadershipNum === 0) {
                this.cols = parseInt(this.cells / this.leadershipNum)
              } else {
                this.cols = parseInt(this.cells / this.leadershipNum) + 1
              }
              this.calculationF()
              this.colsStatus = false
            } else {
              this.$notify.error({
                title: '提示',
                message: '获取信息失败'
              })
            }
          })
          .catch(err => { console.error(err) })
      } else {
        this.$notify.info({
          title: '提示',
          message: '请选择大队信息'
        })
      }
    },
    // 合并当前列,当前行row、当前列column、当前行号rowIndex、当前列号columnIndex
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      // 把列合并为行
      if (columnIndex === 1 && rowIndex === 0) {
        return [1, 2]
      }

      // if (rowIndex % 2 === 0) {
      //     if (columnIndex === 0) {
      //     return [1, 2];
      //     } else if (columnIndex === 1) {
      //     return [0, 0];
      //     }
      // }
    },
    notingMethod () {

    },
    // 打开弹框
    openData () {
      this.tableData = []
      this.undisable = false
      this.month = null
      this.orgid = null
      this.colsStatus = true
      this.comfirmStatuse = false
      this.rowDrop()
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
          },
          disabled: _this.undisable
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
        var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
        /* get binary string as output */
        var wbout = XLSX.write(wb, {
          bookType: 'xlsx',
          bookSST: true,
          type: 'array'
        })
        try {
          FileSaver.saveAs(
            new Blob([wbout], { type: 'application/octet-stream' }),
            '值班表.xlsx'
          )
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
      }
    },
    calculationF () {
      this.tableData.forEach(element => {
        if (element.id === this.someOne) {
          this.$set(element, 'start', 0)
          this.indexPerson = this.tableData.indexOf(element)
        }
      })
      let startindex = -1
      for (let i = this.indexPerson; i < this.tableData.length; i++) {
        startindex++
        this.$set(this.tableData[i], 'start', startindex)
        this.$set(this.tableData[i], 'startNull', false)
      }
      for (let s = 0; s < this.indexPerson; s++) {
        startindex++
        this.$set(this.tableData[s], 'start', startindex)
        this.$set(this.tableData[s], 'startNull', true)
      }
      let len = this.cols
      for (let m = 0; m < this.tableData.length; m++) {
        let arr = []
        if (this.startNull) {
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
        this.$set(this.tableData[m], 'leaderData', arr)
      }
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
