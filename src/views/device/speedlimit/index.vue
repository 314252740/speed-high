<template>
  <div>
    <search :options="selectOptions" :query="query" ref="search"/>
    <el-col :span="24">
      <div style="margin-bottom:10px">
        <el-button-group>
          <el-button type="success" icon="el-icon-plus"  @click="showAddDialog()" v-has>添加</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="removeDialog()" v-has>删除</el-button>
        </el-button-group>
      </div>
    </el-col>
    <el-table border ref="multipleTable" v-loading="loading" v-show="!loading" :data="datalist" tooltip-effect="dark"
              size="small" v-cloak style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="name" label="限速屏名称" min-width="161px"></el-table-column>
      <el-table-column prop="limitValue" label="实时限速值(km/h)"></el-table-column>
      <el-table-column prop="ip" label="ip地址"></el-table-column>
      <el-table-column prop="cnName" label="道路名称" min-width="152px"></el-table-column>
      <el-table-column prop="enName" label="道路编号"></el-table-column>
      <el-table-column label="控制方式" prop="workWay" width="150px">
        <template slot-scope="scope">
          <el-switch
            style="display: block"
            v-model="scope.row.workWay"
            @change="changeSwitch(scope.row)"
            active-color="#13ce66"
            inactive-color="#999"
            :active-value='0'
            :inactive-value='1'
            active-text="自动"
            inactive-text="手动">
          </el-switch>
        </template>
      </el-table-column>
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
    <eform ref="form" :options1="roadStartList"/>
  </div>
</template>
<script>
import { doDelete, doUpdateWorkWay } from '@/api/speedlimit'
import initData from '@/mixins/initData'
import search from './module/search'
import eform from './module/form.vue'
import { selectRoadStart } from '@/api/road'

export default {
  mixins: [initData],
  components: {
    search, eform
  },
  data () {
    return {
      controlSwitch: true, // 自动手动
      list: [],
      multipleSelection: [],
      sup_this: this,
      query: {
        search_name: ''
      },
      selectOptions: [],
      roadStartList: [],
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
  mounted () {
    this.changeOptions()
  },
  methods: {
    changeSwitch (val) {
      let workWay = val.workWay
      let id = val.id
      doUpdateWorkWay(workWay, id).then(res => {
        if (res.status === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        } else {
          this.$message.error('修改失败')
          if (val.workWay === 0) {
            val.workWay = 1
          } else {
            val.workWay = 0
          }
        }
      }).catch(err => {
        console.log('error:' + err)
        if (val.workWay === 0) {
          val.workWay = 1
        } else {
          val.workWay = 0
        }
      })
    },
    beforeInit () {
      this.url = 'module/speedlimitscreeninfos'
      const sort = 'name desc'
      this.params = {
        page: this.page + 1,
        sortType: sort,
        pageSize: this.pageSize,
        search_name: this.query.search_name
      }
      return true
    },
    changeOptions () {
      selectRoadStart('0').then(res => {
        this.roadStartList = res
      }).catch(err => {
        console.log('error:' + err)
        console.log(err)
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    showAddDialog () {
      this.$refs.form.visible = true
      this.$refs.form.isAdd = true
      this.$refs.form.startDraw()
    },
    showEdit (val) {
      this.$refs.form.visible = true
      this.$refs.form.isAdd = false
      this.$refs.form.dataForm = {
        id: val.id,
        ip: val.ip,
        name: val.name,
        cnName: val.cnName,
        enName: val.enName,
        longitude: val.longitude,
        latitude: val.latitude,
        workWay: val.workWay,
        networkStatus: val.networkStatus,
        size: val.size,
        manufacturer: val.manufacturer,
        limitValue: val.limitValue,
        sensorId: val.sensorId,
        note: val.note,
        setNo: val.setNo,
        cameraIds: val.cameraIds,
        cameraIps: val.cameraIps,
        sign: val.sign,
        roadId: val.roadId,
        direction: val.direction }
      this.$refs.form.startDraw()
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
