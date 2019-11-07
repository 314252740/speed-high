<template>
  <el-dialog title="资源授权" :visible.sync="resvisible" width="600px" label-width="80px">
    <div v-text="rolenames" class="user-div"></div>
    <div style="height:1px;width: 100%;background-color: #989898;margin: 5px auto;">&nbsp;</div>
    <div class="ztree_box custom-scroll">
      <ul id="res-tree" class="ztree" style="margin-top: 5px;height:400px;overflow: auto;"></ul>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="doSubmit">确 定</el-button>
      <el-button @click="cancel()">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import 'jquery'
import 'ztree'
import 'ztree/css/metroStyle/metroStyle.css'
import { doGrantRes } from '@/api/role'
import { loadTree } from '@/api/menu'
export default {
  name: 'res-dialog',
  data () {
    return {
      loading: false,
      resvisible: false,
      roleIds: '',
      rolenames: '',
      setting: {
        check: {
          enable: true
        },
        callback: {
          onClick: this.treeClick
        }
      },
      zNodes: [],
      clickId: '',
      treeNode: {},
      tree: {}
    }
  },
  computed: {
    uid () {
      return this.$store.state.user.user.id
    }
  },
  methods: {
    init: function (roleid) {
      let that = this
      loadTree(roleid, this.uid).then(res => {
        that.zNodes = []
        that.zNodes.push(res.data)
        // eslint-disable-next-line no-undef
        this.tree = $.fn.zTree.init($('#res-tree'), that.setting, that.zNodes)
        let node = this.tree.getNodeByParam('parentid', '0', null)
        this.tree.expandNode(node, true, false, false)
      }).catch(err => {
        console.log('error:' + err)
        console.log(err)
      })
    },
    treeClick: function (event, treeId, treeNode, clickFlag) {
      this.clickId = treeNode.id
      this.treeNode = treeNode
    },
    doSubmit () {
      // 选中
      var checkedNodes = this.tree.getCheckedNodes(true)
      var checkedIds = []
      for (var i = 0; i <= checkedNodes.length - 1; i++) {
        checkedIds.push(checkedNodes[i].id)
      }
      console.log(checkedIds)
      if (checkedNodes.length === 0) {
        this.$message.error('请选择要授权的资源')
        return
      }
      this.loading = true
      doGrantRes(this.roleIds, { 'resids': checkedIds.join(',') }).then(res => {
        if (res.result === 'ok') {
          this.loading = false
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.resvisible = false
        } else {
          this.loading = false
          this.$message.error('操作失败')
          this.resvisible = false
        }
      }).catch(err => {
        console.log(err)
      })
    },
    cancel () {
      this.resvisible = false
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
    margin: 0;
    padding: 0;
    color: #3a8ee6;
  }
  .custom-scroll{
    height: 420px;
    line-height: 420px;
    margin-top:5px;
    padding-top: 0;
    overflow: auto;
  }
</style>
