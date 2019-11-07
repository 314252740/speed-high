<template>
  <div class="head-container">
    <el-form :inline="true" class="demo-form-inline" v-model="query">
      <el-form-item label="诱导屏名称" prop="name">
        <el-input clearable v-model="query.search_name" required="true" minlength="2" maxlength="20"  autocomplete="off" ></el-input>
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
  },
  methods: {
    toQuery: function () {
      this.$parent.page = 0
      this.$parent.dialogFormVisible = false
      this.$parent.init()
    }
  }

}
</script>
