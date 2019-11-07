<template>
  <div class="head-container">
    <el-form :inline="true" class="demo-form-inline" v-model="query">
      <!--<el-form-item label="预案事件名称" prop="plannedEventName">
        <el-input v-model="query.search_plannedEventName" required="true" minlength="2" maxlength="20"  autocomplete="off" ></el-input>
      </el-form-item>-->
      <el-form-item label="类型名称" prop="eventCode">
        <el-select v-model="query.search_eventCode" clearable placeholder="类型名称" @change="selectChange">
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
  },
  methods: {
    selectChange: function (event) {
      this.query.search_eventCode = event
    },
    toQuery: function () {
      this.$parent.page = 0
      this.$parent.dialogFormVisible = false
      this.$parent.init()
    }
  }

}
</script>
