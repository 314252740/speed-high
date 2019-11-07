/* eslint-disable */
<template>
  <div class="tableBox">
    <el-table
      :data="tableDataList"
      border
      tooltip-effect="dark"
      style="width:100%">
      <el-table-column :label='`${dutymsg}值班信息`' align="center">
        <el-table-column
          :resizable="false"
          prop="orgId"
          align="center"
          width="80"
          label='大队'>
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="roadPostId"
          align="center"
          show-overflow-tooltip
          label='值班路段'>
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="mainSquadronId"
          align="center"
          label='主班'>
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="viceSquadronId"
          align="center"
          label='副班'>
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="motorSquadronId"
          align="center"
          label="机动中队">
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="accidentSquadronId"
          align="center"
          label="事故勘察中队">
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  /* eslint-disable */
  import { formatTime } from "@/utils/format"
  import {tscheduleByDate} from "@/api/schedule"
  export default {
    name: "scheduling",
    data () {
      return {
        dutymsg: "",
        roadSection: "",
        tableDataList: [],
        orgID: null,
        brigadeName:"",
      }
    },
    methods: {
      getScheduling () {
        this.getDate = new Date()
        let getYMD = formatTime("yyyy-MM-dd hh:mm:ss", "yyyy-MM-dd", this.getDate)
        if (getYMD === this.dutymsg) return
        this.dutymsg = getYMD
        tscheduleByDate({date: getYMD})
          .then(res=>{
            if(res.result==="ok"){
              this.tableDataList=res.data
            }
          })
          .catch(res=>{
          })
      }
    },
    created () {
      // this.getScheduling()
    }
  }
</script>

<style scoped>
  .tableBox{
    width:100%;
  }
</style>
