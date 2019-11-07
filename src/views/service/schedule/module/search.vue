<template>
  <div class="head-container">
    <el-form :inline="true" class="demo-form-inline" v-model="query">

      <el-form-item label="大队信息">
        <el-select clearable v-model="query.search_orgId" placeholder="请选择大队" style="width:150px;" required="true">
          <el-option v-for="(item,index) in options" :label="item.name" :value="item.key" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排班日期">
        <el-date-picker
          clearable
          v-model="query.search_startTime"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="请选择日期">
        </el-date-picker>
        至
        <el-date-picker
          clearable
          v-model="query.search_endTime"
          type="date"
          :picker-options="pickerOptions"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="请选择日期">
        </el-date-picker>
        <!--
        <el-date-picker
          v-model="value6"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        -->
      </el-form-item>

      <el-form-item style="margin-bottom:6px;">
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
  computed: {
    StartTrue () {
      if (this.query.search_startTime) {
        return false
      } else {
        return true
      }
    }
  },
  data () {
    let that = this
    return {
      value6: '',
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < new Date(that.query.search_startTime) - 8.64e7
        }
      }
    }
  },
  mounted () {
  },
  methods: {
    toQuery: function () {
      // console.log(this.value6) // 返回结果为[DateObject,DateObject]
      // return
      this.$parent.page = 0
      this.$parent.dialogFormVisible = false
      this.$parent.init()
    }
  }
}
</script>
