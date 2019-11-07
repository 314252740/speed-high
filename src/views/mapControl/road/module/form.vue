<template>
  <el-dialog :title="isAdd ? '新增道路信息' : '修改道路信息'" :closeOnClickModal="false" :visible.sync="visible" width="1200px" label-width="80px" top="30px" @close="hide" @open="changeHeight">
    <div class="container">
      <div class="mapCont" ref="dialogMap">
        <tile-map  ref="map"></tile-map>
        <el-button :type="type" :icon="icon" circle class="button" @click.stop="trigger" :title="status"></el-button>
      </div>
      <div class="mapCont mapConts" ref=dialogForm>
        <el-form ref="form" :model="dataForm" :rules="rules" size="small" label-position="right" label-width="100px" >
          <el-row>
            <el-col :span="24">
              <el-form-item label="道路名称" prop="name" :inline="true">
                  <el-input clearable v-model="dataForm.name" required="true" width="210px" minlength="2" maxlength="50" autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="父道路" prop="parentId" :inline="true">
                <el-select clearable v-model="dataForm.parentId" width="210px" placeholder="请选择父道路类型">
                  <el-option
                    v-for="item in optionsArea"
                    :key="item.key"
                    :label="item.name"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="道路类型" prop="type" :inline="true">
                <el-select clearable v-model="dataForm.type" width="210px" placeholder="请选择道路类型">
                  <el-option
                    v-for="item in roadTypeOptions"
                    :key="item.index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="起点" prop="roadStart" :inline="true">
                  <el-input clearable v-model="dataForm.roadStart" placeholder="请输入道路起点" required="true" width="210px" minlength="1" maxlength="20" autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="终点" prop="roadEnd" :inline="true">
                  <el-input clearable v-model="dataForm.roadEnd" placeholder="请输入道路终点" required="true" width="210px" minlength="1" maxlength="20" autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="道路英文名称" prop="enName" :inline="true">
                  <el-input clearable v-model="dataForm.enName" required="true" width="210px" minlength="2" maxlength="20" autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="道路编号" prop="code">
                <el-input clearable v-model="dataForm.code" required="true" width="210px" minlength="2" maxlength="32" autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="小车限速值" prop="stdSpeed">
                <el-input clearable v-model="dataForm.stdSpeed" required="true" width="210px" maxlength="3" autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="大车限速值" prop="stdBigCarSpeed">
                <el-input clearable v-model="dataForm.stdBigCarSpeed" required="true" width="210px" maxlength="3" autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <!-- <el-col :span="24">
              <el-form-item label="管理部门" prop="orgId">
                <el-input v-model="dataForm.orgId" required="true" width="210px" autocomplete="off" ></el-input>
              </el-form-item>
            </el-col> -->
            <el-form-item label="管理部门" prop="orgId">
            <el-select clearable v-model="dataForm.orgId" width="210px" placeholder="请选择管理部门" required="true" autocomplete="off">
              <el-option
                v-for="item in options"
                :key="item.index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注" prop="memo">
                <el-input v-model="dataForm.memo" required="true" width="210px" maxlength="120"  autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="doSubmit">确 定</el-button>
      <el-button @click="cancel()">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { doAdd, doUpdate } from '@/api/road'
import tileMap from '@/components/map/tileMap'// 初始化瓦片地图
import { getAllOrg } from '@/api/eventInput.js'
import { mapGetters } from 'vuex'
export default {
  components: {
    tileMap
  },
  computed: {
    ...mapGetters(['areaList']), // areaList为大队辖区道路，roadList为设备道路
    optionsArea () {
      return this.areaList // areaList为大队辖区道路，roadList为设备道路
    }
  },
  data () {
    return {
      options: [],
      roadTypeOptions: [
        {
          value: '0',
          label: '大队辖区道路'
        },
        {
          value: '1',
          label: '危险路段'
        }
      ],
      status: '显示',
      type: 'success',
      icon: 'el-icon-view',
      loading: false,
      visible: false,
      isAdd: false,
      dataForm: { id: '',
        parentId: '',
        name: '',
        code: '',
        ip: '',
        statusUseble: '',
        recSpeed: '',
        recBigCarSpeed: '',
        stdSpeed: '',
        stdBigCarSpeed: '',
        limitSpeed: '',
        limitBigCarSpeed: '',
        memo: '',
        uploadcode: '',
        geom: '',
        enName: '',
        orgId: '',
        type: '',
        roadStart: '', // 道路起点
        roadEnd: '' // 道路终点
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个文字', trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    trigger () {
      if (this.type === 'danger') {
        this.type = 'success'
        this.status = '桩号显示中'
        this.$refs.map.showLayer('stakeNum', true)
      } else {
        this.type = 'danger'
        this.status = '桩号隐藏中'
        this.$refs.map.showLayer('stakeNum', false)
      }
    },
    hide () {
      this.$refs.map.cleanLayer('stakeNum')
    },
    startDraw () {
      this.$nextTick(() => {
        this.$refs.map.drawRoad(this.setPoints, this.dataForm.geom, 'sensor')
      })
    },
    setPoints (wktstr) {
      this.dataForm.geom = wktstr
    },
    cancel: function () {
      this.resetForm()
    },
    resetForm () {
      this.visible = false
      this.$refs['form'].resetFields()
      this.dataForm = { id: '',
        parentId: '',
        name: '',
        code: '',
        ip: '',
        statusUseble: '',
        recSpeed: '',
        recBigCarSpeed: '',
        stdSpeed: '',
        stdBigCarSpeed: '',
        limitSpeed: '',
        limitBigCarSpeed: '',
        memo: '',
        uploadcode: '',
        orgId: '',
        geom: '',
        enName: '',
        roadStart: '', // 道路起点
        roadEnd: '' // 道路终点
      }
    },
    doSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            doAdd(this.dataForm).then(res => {
              if (res.result === 'ok') {
                this.resetForm()
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '添加失败',
                  type: 'error'
                })
              }
              this.loading = false
              this.$parent.page = 0
              this.$parent.dialogFormVisible = false
              this.$parent.init()
            }).catch(err => {
              console.log('error:' + err)
              console.log(err)
            })
          } else {
            this.doEdit()
          }
        }
      })
    },
    doEdit () {
      if (!this.isAdd) {
        doUpdate(this.dataForm).then(res => {
          this.resetForm()
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.loading = false
          this.$parent.dialogFormVisible = false
          this.$parent.init()
        }).catch(err => {
          console.log('error:' + err)
          console.log(err)
        })
      }
    },
    // 自适应高度
    changeHeight () {
      // 获取大队信息
      getAllOrg()
        .then(res => {
          this.options = res
        })
        .catch(err => console.log(err))
      this.$nextTick(() => {
        this.$refs.dialogMap.style.height = this.$refs.dialogForm.offsetHeight + 'px'
        // 重新加载地图
        this.$refs.map.resetMap()
        this.$refs.map.addLayer('stakeNum')
        this.status = '桩号显示中'
        this.type = 'success'
      })
    }
  }
}

</script>
<style scoped>
.container{
  height: 500px;
  width: 100%;
  overflow: hidden;
}
.mapCont{
  height: inherit;
  width: 70%;
  float: left;
  position: relative;
}
.mapConts{
  width: 30%;
}
.button{
  position: absolute;
  right: 6px;
  bottom: 6px;
}
</style>
