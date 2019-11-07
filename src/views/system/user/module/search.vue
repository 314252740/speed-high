<template>
  <div class="head-container">
    <el-form :inline="true" class="demo-form-inline" v-model="query">
      <el-form-item label="名称" prop="name">
        <el-input v-model="query.search_name" clearable required="true" minlength="6" maxlength="20"  autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="account">
        <el-input v-model="query.search_account" clearable minlength="6" maxlength="20"  autocomplete="off" ></el-input>
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
    toQuery: function () {
      this.$parent.page = 0
      this.$parent.dialogFormVisible = false
      this.$parent.init()
    }
  }

}
</script>
