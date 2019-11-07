<template>
  <div>
    <search :options="selectOptions" :query="query" ref="search"/>
    <el-col :span="24">
      <div style="margin-bottom:10px">
        <el-button-group>
        <el-button type="success" icon="el-icon-plus"  @click="showAddDialog()" v-has>添加</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="removeDialog()" v-has>删除</el-button>
        <el-button type="warning" icon="el-icon-share" @click="grantRole()" v-has>角色授权</el-button>
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
        v-cloak style="width: 100%"
        @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="name" label="名称" width="150px"></el-table-column>
      <el-table-column prop="deptid" label="所属部门" width="150px"></el-table-column>
      <el-table-column prop="account" label="账号" width="100px"></el-table-column>
      <el-table-column prop="roleIds" label="拥有角色"></el-table-column>
      <el-table-column prop="mobile" label="手机号" width="100px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="创建人" width="100px"></el-table-column>
       <el-table-column prop="puserId" label="警员" width="100px"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150px">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click="showEdit(scope.row)" type="info" size="mini" icon="el-icon-edit" v-has="'修改'"></el-button>
            <el-popover
              :ref="scope.row.id"
              placement="top"
              width="180">
              <p>确定删除本条数据吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                <el-button :loading="delLoading" type="primary" size="mini" @click="removeById(scope.row.id)">确定</el-button>
              </div>
              <el-button slot="reference" type="danger" size="mini" icon="el-icon-delete" v-has="'删除'"></el-button>
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
    <eform :options="puserData" ref="form"/>
    <role-dialog ref="roledia"/>
  </div>
</template>

<script>
import { doDelete } from '@/api/user'
import initData from '@/mixins/initData'
import search from './module/search'
import eform from './module/form.vue'
import roleDialog from './module/role-dialog.vue'

export default {
  mixins: [initData],
  components: {
    search, eform, roleDialog
  },
  data () {
    return {
      puserData: [],
      list: [],
      multipleSelection: [],
      sup_this: this,
      query: {
        search_name: '',
        search_account: ''
      },
      selectOptions: [],
      delLoading: false,
      showAdd: false
    }
  },
  created () {
    this.$nextTick(() => {
      this.init()
        .then(res => {
          if (res.status === 200) {
            this.puserData = res.data.puserId
          }
        })
    })
  },
  mounted () {
  },
  methods: {
    beforeInit () {
      this.url = 'api/system/users'
      const sort = 'name desc'
      this.params = {
        page: this.page + 1,
        sortType: sort,
        pageSize: this.pageSize,
        search_name: this.query.search_name,
        search_account: this.query.search_account
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
      this.$refs.form.dataForm = {
        id: val.id, name: val.name, account: val.account, mobile: val.mobile, memo: val.memo, puserId: val.puserId }
    },
    removeById (id) {
      this.delLoading = true
      doDelete(id).then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.delLoading = false
        this.$refs[id].doClose()
        this.init()
      }).catch(err => {
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
      }).then(() => {
        let ids = []
        this.multipleSelection.forEach(row => {
          ids.push(row.id)
        })
        doDelete(ids.join(',')).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.init()
        }).catch(err => {
          console.log('error:' + err)
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    grantRole () {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请选择要授权的用户')
        return
      }
      this.$refs.roledia.rolevisible = true
      let names = []
      this.multipleSelection.forEach(row => {
        names.push(row.name)
      })
      this.$refs.roledia.userIds = this.multipleSelection
      this.$refs.roledia.usernames = '待授权的用户:' + names.join(',')
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
