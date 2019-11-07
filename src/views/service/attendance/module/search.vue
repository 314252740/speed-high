<template>
  <div class="head-container">
    <el-form :inline="true" class="demo-form-inline" v-model="query">
      <el-form-item label="出勤类型" prop="attendanceType">
        <el-select clearable v-model="query.search_attendanceType" placeholder="出勤类型" style="width:150px;" required="true">
          <el-option v-for="(item,index) in options3" :label="item.name" :value="item.key" :key="index"></el-option>
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
    },
    options3: {
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
