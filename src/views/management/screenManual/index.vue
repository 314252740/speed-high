<template>
  <div id="treeFlow" ref="treeFlow">
    <el-form :inline="true" ref="form" :model="form" label-width="80px">
      <div style="padding-top:20px;">
        <el-form-item label="能见度">
          <el-select clearable v-bind:disabled="disabled" v-model="form.visibility" placeholder="请选择能见度" style="width:150px">
            <el-option
              v-for="item in visibility"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="路面状况">
          <el-select clearable v-bind:disabled="disabled" v-model="form.roadCondition" placeholder="请选择路面状况" style="width:150px">
            <el-option
              v-for="item in roadCondition"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="天气现象">
          <el-select clearable v-bind:disabled="disabled" v-model="form.weather" placeholder="请选择天气现象" style="width:150px">
            <el-option
              v-for="item in weather"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="限速值">
          <el-select v-bind:disabled="disabledLimitValue" clearable v-model="form.limitValue" placeholder="请选择限速值" style="width:150px">
            <!-- <el-option label="全黑" value="全黑"></el-option> -->
            <el-option label="120" value="120"></el-option>
            <el-option label="110" value="110"></el-option>
            <el-option label="100" value="100"></el-option>
            <el-option label="90" value="90"></el-option>
            <el-option label="80" value="80"></el-option>
            <el-option label="70" value="70"></el-option>
            <el-option label="60" value="60"></el-option>
            <el-option label="50" value="50"></el-option>
            <el-option label="40" value="40"></el-option>
            <el-option label="30" value="30"></el-option>
            <el-option label="20" value="20"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="控制方式">
          <el-select clearable v-model="form.control" placeholder="请选择控制方式" style="width:150px">
            <el-option
              v-for="item in control"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">设置</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-row :gutter="20" style="margin-left:16px">
      <el-col :span="6" style="background:#fff;border:1px solid #EBEEF5;padding:10px;">
        <h4 class="msgTitle">路段信息</h4>
        <el-input
          style="margin-bottom:10px;"
          placeholder="输入关键字进行查询"
          v-model="filterText">
        </el-input>

        <div class="treebox" ref="treebox">
          <el-tree
            class="filter-tree"
            :data="setTree"
            :props="defaultProps"
            :filter-node-method="filterNode"
            :highlight-current="true"
            ref="tree2"
            @node-click="treeNodeClick">
          </el-tree>
        </div>

      </el-col>
      <el-col :span="18">
          <el-table
            ref="multipleTable"
            :stripe="true"
            :border="true"
            :data="datalist"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              align="center"
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="显示屏名称"
              show-overflow-tooltip
              width="200">
            </el-table-column>
            <el-table-column
              align="center"
              prop="layerid"
              label="显示屏类型"
              width="120"
              show-overflow-tooltip>
               <template slot-scope="scope">
                  <span v-if="scope.row.layerid === 'screenSpeed'">限速屏</span>
                  <span v-else>复合屏</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="workWay"
              label="控制方式"
              width="120">
              <template slot-scope="scope">
                  <span v-if="scope.row.workWay === '0'">自动</span>
                  <span v-else>手动</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="sensorName"
              label="所属传感器"
              width="200"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              align="center"
              prop="roadName"
              label="所属道路"
              width="120"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              align="center"
              prop="roadCode"
              label="道路编号"
              width="120"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              align="center"
              prop="pileInfo"
              label="桩号信息"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
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
import { updataDecValue, getBrigadeRoadDevInfo, getScreenData } from '@/api/roadCondition'
import initData from '@/mixins/initData'
export default {
  mixins: [initData],
  name: 'screenManual',
  data () {
    return {
      disabled: true,
      disabledLimitValue: true, // 禁用限速值下拉框
      clientHeight: '',
      checkboxChoose: '',
      // 分页
      currentPage: 1, // 当前页数,默认在第一页
      myPageSize: 10, // 每页显示条目个数,默认每页显示1条数据
      total: 0,
      // form表单数据
      form: {
        visibility: '',
        roadCondition: '',
        weather: '',
        limitValue: ''
        // control: ""
      },
      // 输入框关键字
      filterText: '',
      // 树节点
      setTree: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 表格
      datalist: [],
      multipleSelection: [],
      // 能见度
      visibility: [
        { value: '0', label: '全黑' },
        { value: '1', label: '良好' },
        { value: '2', label: '一般' },
        { value: '3', label: '较差' },
        { value: '4', label: '极差' }
      ],
      // 路面状况
      roadCondition: [
        { value: '0', label: '全黑' },
        { value: '1', label: '良好' },
        { value: '2', label: '湿滑' },
        { value: '3', label: '积水' },
        { value: '4', label: '结冰' }
      ],
      // 天气现象
      weather: [
        { value: '0', label: '全黑' },
        { value: '1', label: '良好' },
        { value: '2', label: '降雨' },
        { value: '3', label: '暴雨' },
        { value: '4', label: '降雪' },
        { value: '5', label: '雾霾' }
      ],
      control: [
        { value: '0', label: '自动' },
        { value: '1', label: '手动' }
      ]
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree2.filter(val)
    }
  },
  methods: {
    onSubmit () {
      let formData = this.form
      if ((formData.limitValue || formData.visibility || formData.roadCondition || formData.weather) && this.checkboxChoose.length !== 0) {
        this.checkboxChoose.forEach(element => {
          let msg
          if (element.layerid === 'screenSpeed') {
            msg = this.form.limitValue
          } else {
            msg = {
              visibility: this.form.visibility,
              roadStatus: this.form.roadCondition,
              weatherState: this.form.weather
            }
          }
          updataDecValue(element.layerid,
            {
              layerid: element.layerid,
              devid: element.id,
              msg: msg
            }
          )
            .then((res) => {
              if (res.result === 'ok') {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '修改失败',
                  type: 'error'
                })
              }
            })
            .catch((err) => {
              console.log(err)
            })
        })
      } else if (this.checkboxChoose.length === 0) {
        this.$notify.error({
          title: '设置失败',
          message: '请选择要设置的显示屏！',
          duration: 2000
        })
      } else {
        this.$notify.error({
          title: '设置失败',
          message: '请选择要设置的参数！',
          duration: 2000
        })
      }
    },
    beforeInit () {
      this.url = '/module/speedAndcomposites'
      const sort = 'id desc'
      this.params = {
        page: this.page + 1,
        sortType: sort,
        pageSize: this.pageSize
      }
      return true
    },
    // 树形菜单
    getDataList () {
      getBrigadeRoadDevInfo()
        .then(res => {
          if (res.result === 'ok') {
            for (let i in res.data) {
              let obj = {
                name: '',
                children: []
              }
              obj.name = i
              obj.children = res.data[i]
              this.setTree.push(obj)
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleSelectionChange (val) {
      this.checkboxChoose = val
      let arr = []
      if (val.length === 0) {
        this.disabledLimitValue = true
        this.disabled = true
      } else {
        arr = []
        this.checkboxChoose.forEach(element => {
          arr.push(element.layerid)
        })
        if (arr.includes('screenComposite') && !arr.includes('screenSpeed')) {
          this.disabled = false
          this.disabledLimitValue = true
        } else if (arr.includes('screenSpeed') && !arr.includes('screenComposite')) {
          this.disabledLimitValue = false
          this.disabled = true
        } else {
          this.disabled = false
          this.disabledLimitValue = false
        }
      }
      this.multipleSelection = val
    },
    // 筛选节点树查找
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    // 根据传感器信息查找表格数据
    treeNodeClick (data) {
      if (data.id === undefined) {
        return
      }
      getScreenData(data.id)
        .then(res => {
          // 合并数组
          this.datalist = [...res.data.complite, ...res.data.speedscreen]
          this.total = res.data.complite.length + res.data.speedscreen.length
        })
        .catch((err) => {
          console.log(err)
        })
    }
    // pageChange (e) {
    //   this.page = e - 1
    //   this.init()
    //     .then(res => {
    //       if (res.result === "ok") {
    //         console.log(res)
    //         this.tableData = [...res.data.complite.result, ...res.data.speedscreen.result]
    //         this.total = res.data.complite.totalSize + res.data.speedscreen.totalSize
    //         this.pageSize = res.data.complite.pageSize
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
    // sizeChange (e) {
    //   this.page = 0
    //   this.myPageSize = e
    //   this.init()
    // }
    // initData () {
    //   this.init()
    //     .then(res => {
    //       console.log(res)
    //       if (res.result === "ok") {
    //         console.log(res)
    //         // this.tableData = [...res.data.complite.result, ...res.data.speedscreen.result]
    //         // this.total = res.data.complite.totalSize + res.data.speedscreen.totalSize
    //         // this.pageSize = res.data.complite.pageSize
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // }
  },
  created () {
    this.getDataList()
    // 获取传感器全部数据
    this.init()
  },
  mounted () {
    // 节点树自适应高度
    let that = this
    this.$refs.treeFlow.style.marginTop = '0'
    if (document.getElementById('treeFlow')) {
      this.clientHeight = document.getElementById('treeFlow').clientHeight
      that.$refs.treebox.style.cssText = `
            max-height:${that.clientHeight - 210}px;
          `
      // 窗口改变，最外层div高度改变
      // let treeFlowBox=document.getElementById("treeFlow");
      // treeFlowBox.style.cssText=`
      //   max-height:${treeFlowBox.clientHeight-50}px;
      // `
      window.onresize = function () {
        that.clientHeight = document.getElementById('treeFlow').clientHeight
        that.$refs.treebox.style.cssText = `
            max-height:${that.clientHeight - 210}px;
          `
        // 窗口改变，最外层div高度改变
        // let treeFlowBox=document.getElementById("treeFlow");
        // treeFlowBox.style.cssText=`
        //   max-height:${treeFlowBox.clientHeight-50}px;
        // `
      }
    }
  }
}
</script>
<style scoped>
  .msgTitle{
    margin-bottom: 10px;
    color: #3276B1;
  }
  #treeFlow{
    width: 100%;
    height: 100%;
  }
  .treebox{
    overflow-x: hidden;
    overflow-y: auto;
  }

/* 设置滚动条样式 (不支持火狐)*/
::-webkit-scrollbar {
  width: 8px;
}
/*外层轨道。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果*/
::-webkit-scrollbar-track {
  width: 6px;
  background-color: #e4e2e3;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
  display: none;
}
/*滚动条的设置*/
::-webkit-scrollbar-thumb {
  background-color: #e4e2e3;
  background-clip: padding-box;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
/* 鼠标移入滚动条 */
::-webkit-scrollbar-thumb:hover {
  background: #999;
}
</style>
