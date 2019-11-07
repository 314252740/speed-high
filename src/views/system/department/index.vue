<template>
  <div>
    <el-button-group>
      <el-button type="success" icon="el-icon-plus" @click="showAddMenu()">道路分配</el-button>
      <el-button type="info" icon="el-icon-plus" @click="showAddDialog()">添加子部门</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="showEdit()" v-has>修改</el-button>
      <el-button type="danger" icon="el-icon-delete" @click="removeNode()" v-has>删除</el-button>
    </el-button-group>
    <div style="height:2px;width: 100px;background-color: #fff;margin: 5px auto;">&nbsp;</div>
    <div class="ztree_box custom-scroll table-responsive">
      <ul id="tree-rec" class="ztree" style="margin-top: 5px;min-height:400px;overflow: auto;"></ul>
    </div>
    <eform ref="form" :isAdd="showAdd"/>
    <search ref="search" :options="getSysOrgLevels"/>
  </div>
</template>
<script>
import 'jquery'
import 'ztree'
import 'ztree/css/metroStyle/metroStyle.css'
import search from './module/search'
import eform from './module/form.vue'
import { getList, doDelete, getSysOrgLevels } from '@/api/depart'
export default {
  name: 'areaZtree',
  components: {
    search, eform
  },
  data () {
    return {
      setting: {
        edit: {
          enable: true,
          showRemoveBtn: false,
          showRenameBtn: false,
          drag: {
            autoExpandTrigger: false,
            prev: this.prevTree,
            next: this.nextTree,
            inner: this.innerTree
          }
        },
        check: {
          enable: false
        },
        data: {
          simpleData: {
            enable: true
          }
        },
        callback: {

          onClick: this.treeClick,
          beforeDrop: this.confirmDrop,
          onDrop: this.moveNode,
          onExpand: this.zTreeOnExpand
        }
      },
      zNodes: [],
      clickId: '',
      showAdd: false,
      getSysOrgLevels: [],
      treeNode: {}
    }
  },
  methods: {
    init: function (selectId) {
      let that = this
      getList().then(res => {
        that.zNodes.pop()
        that.zNodes.push(res.data)
        // eslint-disable-next-line no-undef
        var tree = $.fn.zTree.init($('#tree-rec'), that.setting, that.zNodes)
        var node = tree.getNodeByParam('pId', selectId, null)
        tree.expandNode(node, true, false, false)
      }).catch(err => {
        console.log('error:' + err)
        console.log(err)
      })
    },
    treeClick: function (event, treeId, treeNode, clickFlag) {
      this.clickId = treeNode.id
      this.treeNode = treeNode
    },
    confirmDrop: function () {},
    moveNode: function () {},
    zTreeOnExpand: function () {

    },
    prevTree: function (treeId, treeNodes, targetNode) {
      return targetNode.parentTId === treeNodes[0].parentTId
    },
    nextTree: function (treeId, treeNodes, targetNode) {
      return targetNode.parentTId === treeNodes[0].parentTId
    },
    innerTree: function (treeId, treeNodes, targetNode) {
      return targetNode != null && targetNode.pId !== '00'
    },
    showAddDialog () {
      if (this.clickId.length === 0) {
        this.$message.error('请选择父部门')
        return
      }
      this.$refs.search.visible = true
      this.$refs.search.title = '添加子部门'
      this.$refs.search.isAdd = true
      this.$refs.search.dataForm.parentid = this.clickId
      this.$refs.search.dataForm.parentName = this.treeNode.name
      this.showAdd = true
    },
    showAddMenu () {
      if (this.clickId.length === 0) {
        this.$message.error('请选择父部门')
      } else {
        if (this.clickId === '0') {
          this.$message.error('虚拟根节点不能修改。')
          return
        }
        this.$refs.form.title = '道路分配'
        this.$refs.form.visible = true
        this.$refs.form.isAdd = false
        this.$refs.form.showparent = false
        this.$refs.form.dataForm = {
          id: this.clickId,
          name: this.treeNode.name,
          parentid: this.treeNode.parentid,
          code: this.treeNode.code,
          principalname: this.treeNode.principalname,
          mobile: this.treeNode.mobile,
          memo: this.treeNode.memo
        }
      }
    },
    showEdit () {
      if (this.clickId.length === 0) {
        this.$message.error('请选择父部门')
      } else {
        if (this.clickId === '0') {
          this.$message.error('虚拟根节点不能修改。')
          return
        }
        this.$refs.form.title = '修改信息'
        this.$refs.form.visible = true
        this.$refs.form.isAdd = false
        this.$refs.form.showparent = false
        this.$refs.form.dataForm = {
          id: this.clickId,
          name: this.treeNode.name,
          parentid: this.treeNode.parentid,
          code: this.treeNode.code,
          principalname: this.treeNode.principalname,
          mobile: this.treeNode.mobile,
          memo: this.treeNode.memo
        }
      }
    },
    changeOptions () {
      getSysOrgLevels().then(res => {
        this.getSysOrgLevels = res
      }).catch(err => {
        console.log('error:' + err)
        console.log(err)
      })
    },
    removeNode () {
      if (this.clickId.length === 0) {
        this.$message.error('请选择要删除的部门！')
        return
      }
      if (this.clickId === '0' || this.clickId === '00') {
        this.$message.error('虚拟根节点和顶级部门不能删除。')
        return
      }
      this.$confirm('删除后数据将无法恢复，确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        doDelete(this.clickId).then(res => {
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
    }

  },
  created () {
    this.init(0)
    this.changeOptions()
  },
  mounted () {
    // this.init(0),
    // this.changeOptions()
  }
}
</script>
<style lang="scss" scoped>
  .custom-scroll{
    height:calc(100vh - 160px);
    overflow-y: scroll;
    background-color: #fff;
  }
</style>
