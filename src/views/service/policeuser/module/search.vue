<template>
  <div class="head-container">
    <el-form :inline="true" class="demo-form-inline" v-model="query">
      <el-form-item label="姓名" prop="name">
        <el-input clearable v-model="query.search_name" required="true" minlength="2" maxlength="20" style="width:150px;" autocomplete="off" ></el-input>
      </el-form-item>

        <el-form-item label="机构名称" prop="orgId1">
          <el-select clearable v-model="query.search_orgId1" placeholder="机构名称" style="width:150px;" required="true" @change="selecOrg(query.search_orgId1)">
            <el-option v-for="(item,index) in options6" :label="item.name" :value="item.key" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="子机构" prop="orgId">
          <el-select clearable v-model="query.search_orgId" placeholder="子机构" style="width:250px;" required="true">
            <el-option v-for="(item,index) in options7" :label="item.name" :value="item.key" :key="index"></el-option>
          </el-select>
        </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="toQuery">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { selecOrg } from '@/api/depart'
export default {
  props: {
    query: {
      type: Object,
      required: true
    },
    options: {
      type: Array
    },
    options6: {
      type: Array
    }
  },
  data () {
    return {
      options7: []
    }
  },
  mounted () {
  },
  methods: {
    toQuery: function () {
      this.$parent.page = 0
      this.$parent.dialogFormVisible = false
      this.$parent.init()
    },
    selecOrg (orgId) {
      selecOrg(orgId)
        .then(res => {
          this.options7 = res
          this.query.search_orgId = this.options7[0].key
        })
        .catch(err => console.log(err))
    }
  }

}
</script>
