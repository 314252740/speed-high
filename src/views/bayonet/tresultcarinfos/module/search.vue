<template>
  <div class="head-container">
    <el-form :inline="true" class="demo-form-inline" v-model="query">
      <el-form-item label="号牌号码" prop="carPlateNumber">
        <el-input clearable v-model="query.search_carPlateNumber" required="true" minlength="2" maxlength="20"  autocomplete="off" ></el-input>
      </el-form-item>
      <!-- <el-time-picker
        is-range
        value-format="yyyy-MM-dd HH:mm"
        type="datetime"
        format="yyyy-MM-dd HH:mm"
        v-model="value"
        @change="chooseTime"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        placeholder="选择时间范围">
      </el-time-picker> -->
      <el-date-picker
          v-model="query.search_valueStart"
          clearable
          type="datetime"
          :picker-options="pickerOptions1"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择开始时间">
      </el-date-picker>
      <el-date-picker
          v-model="query.search_valueEnd"
          clearable
          type="datetime"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择结束时间">
      </el-date-picker>
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
  data () {
    let that = this
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < new Date(that.query.search_valueStart) - 8.64e7
        }
      },
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() >= Date.now() - 8.64e7
        }
      },
      // value: "",
      // startTime: "",
      // endTime: ""
      valueStart: '',
      valueEnd: ''
    }
  },
  mounted () {
  },
  methods: {
    // chooseTime (val) {
    //   this.startTime = val[0]
    //   this.endTime = val[1]
    //   console.log(this.startTime)
    //   console.log(this.endTime)
    // },
    toQuery: function () {
      this.$parent.page = 0
      this.$parent.dialogFormVisible = false
      this.$parent.init()
    }
  }

}
</script>
