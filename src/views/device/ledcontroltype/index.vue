<template>
  <div>
    <search :options="selectOptions" :query="query" ref="search" />
    <el-col :span="24">
      <div style="margin-bottom:10px">
        <el-button-group>
          <el-button type="success" icon="el-icon-plus" @click="showAddDialog()" v-has>添加</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="removeDialog()" v-has>删除</el-button>
        </el-button-group>
      </div>
    </el-col>
    <el-table
      border
      ref="multipleTable"
      v-loading="loading"
      v-show="!loading"
      :data="datalist"
      tooltip-effect="dark"
      size="small"
      v-cloak
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="modelName" label="模式名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150px">
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              @click="showEdit(scope.row)"
              type="info"
              size="mini"
              icon="el-icon-edit"
              v-has="'修改'"
            ></el-button>
            <el-popover :ref="scope.row.id" placement="top" width="180">
              <p>确定删除本条数据吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                <el-button
                  :loading="delLoading"
                  type="primary"
                  size="mini"
                  @click="removeById(scope.row.id)"
                >确定</el-button>
              </div>
              <el-button
                slot="reference"
                type="danger"
                size="mini"
                icon="el-icon-delete"
                v-has="'删除'"
              ></el-button>
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
          :total="total"
        ></el-pagination>
      </el-col>
    </el-row>
    <eform ref="form" />
  </div>
</template>
<script>
import { doDelete } from '@/api/ledcontroltype'
import initData from '@/mixins/initData'
import search from './module/search'
import eform from './module/form.vue'

export default {
  mixins: [initData],
  components: {
    search,
    eform
  },
  data () {
    return {
      list: [],
      multipleSelection: [],
      sup_this: this,
      query: {
        search_modelName: ''
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
  mounted () {},
  methods: {
    beforeInit () {
      this.url = 'module/ledcontroltypeinfos'
      const sort = 'model_name desc'
      this.params = {
        page: this.page + 1,
        sortType: sort,
        pageSize: this.pageSize,
        search_modelName: this.query.search_modelName
      }
      return true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    showAddDialog () {
      this.$refs.form.visible = true
      this.$refs.form.isAdd = true
    },
    showEdit (val) {
      this.$refs.form.visible = true
      this.$refs.form.isAdd = false
      this.$refs.form.dataForm = { modelName: val.modelName }
    },
    removeById (id) {
      this.delLoading = true
      doDelete(id)
        .then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.delLoading = false
          this.$refs[id].doClose()
          this.init()
        })
        .catch(err => {
          this.delLoading = false
          console.log('error:' + err)
          console.log(err)
        })
    },
    removeDialog () {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请选择要删除的记录')
        return
      }
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let ids = []
          this.multipleSelection.forEach(row => {
            ids.push(row.id)
          })
          doDelete(ids.join(','))
            .then(res => {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.init()
            })
            .catch(err => {
              console.log('error:' + err)
              console.log(err)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
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
