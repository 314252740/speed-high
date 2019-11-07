<template>
  <div class="head-container">
    <el-form :inline="true" class="demo-form-inline" v-model="query">
      <el-form-item label="限速措施类型" prop="plannedEventTypeIds">
        <el-select v-model="query.search_plannedEventTypeIds" placeholder="限速措施类型" @change="selectChange">
          <el-option label="请选择" value="" key=""/>
          <el-option v-for="(item,index) in options" :label="item.name" :value="item.key" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="toQuery">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    query: {
      type: Object,
      required: true
    },
    options: {
      type: Array
    }
  },
  mounted () {
    // this.$emit('changeOptions',null)
  },
  methods: {
    selectChange: function (event) {
      this.query.search_type = event
    },
    toQuery: function () {
      this.$parent.page = 0
      this.$parent.dialogFormVisible = false
      this.$parent.initData()
    }
  }

}
</script>
