<template>
  <el-dialog title="角色授权" :visible.sync="rolevisible" width="600px" label-width="80px">
    <div v-text="usernames" class="user-div"></div>
    <el-table border ref="multipleTable" v-loading="loading" v-show="!loading" :data="datalist" tooltip-effect="dark"
              size="small" v-cloak style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="name" label="名称" width="150px"></el-table-column>
      <el-table-column prop="code" label="编码"></el-table-column>
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
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="doSubmit">确 定</el-button>
      <el-button @click="cancel()">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { doGrantRole } from '@/api/user'
import initData from '@/mixins/initData'
export default {
  name: 'role-dialog',
  mixins: [initData],
  data () {
    return {
      loading: false,
      rolevisible: false,
      list: [],
      roles: [],
      userIds: [],
      usernames: ''
    }
  },
  created () {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    beforeInit () {
      this.url = 'api/system/roles'
      const sort = 'name desc'
      this.params = {
        pageNumber: this.page,
        sortType: sort,
        pageSize: this.pageSize,
        search_name: this.query.search_name
      }
      return true
    },
    handleSelectionChange (val) {
      this.roles = val
    },
    doSubmit () {
      if (this.roles.length === 0) {
        this.$message.error('请选择角色')
        return
      }
      this.loading = true
      let roleIds = []
      this.roles.forEach(row => {
        roleIds.push(row.id)
      })
      let uids = []
      this.userIds.forEach(row => {
        uids.push(row.id)
      })
      doGrantRole(uids.join(','), roleIds.join(',')).then(res => {
        this.$message({
          message: '授权成功',
          type: 'success'
        })
        this.loading = false
        this.rolevisible = false
        this.$parent.init()
      }).catch(err => {
        console.log('error:' + err)
        console.log(err)
      })
    },
    cancel () {
      this.rolevisible = false
    }
  }
}
</script>

<style scoped>
  .el-dialog__body {
    padding: 10px 20px;
    color: #606266;
    font-size: 14px;
  }
  .user-div{
    margin: 10px auto;
  }
</style>
