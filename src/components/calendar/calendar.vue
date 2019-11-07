<template>
  <div class="calendar">
    <FullCalendar
    ref="calendar"
    :config="config"
    :events="events"
    @event-selected="eventClick"
    @day-click="dayClick"
    >
    </FullCalendar>
    <el-dialog
      @closed="reset"
      :title="isadd ? '添加维护记录' : '编辑维护记录'"
      :visible.sync="dialogVisible"
      width="680px">
      <span>
        <el-form :model="dataform" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="维护记录内容" label-width="80px" prop="title">
                <el-input clearable type="textarea" placeholder="请输入维护记录内容" style="width:220px;" v-model="dataform.title" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="类型" label-width="80px" prop="color">
                <el-select v-model="dataform.color" clearable style="width:220px;">
                  <el-option
                    :key="index"
                    v-for="(item, key, index) in eventType"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="开始时间" label-width="80px" prop="start">
                <el-date-picker
                  style="width:220px;"
                  clearable
                  v-model="dataform.start"
                  placeholder="请选择开始时间"
                  :picker-options="pickerOptionsStart"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="结束时间" label-width="80px">
                <el-date-picker
                  style="width:220px;"
                  clearable
                  v-model="dataform.end"
                  placeholder="请选择结束时间"
                  :picker-options="pickerOptionsEnd"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" v-if="this.roles[0].authority === 'ADMINISTRATOR' && !isadd" @click="deleteEvent">删除记录</el-button>
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      @close="reset"
      title="删除维护记录"
      :visible.sync="dialogVisible2"
      width="500px">
      <span>
        <div class="item">维护内容：<span style="color:red;">{{dataform.title}}</span></div>
        <div class="item">开始时间：<span style="color:red;">{{dataform.start}}</span></div>
        <div class="item">结束时间：<span style="color:red;">{{dataform.end}}</span></div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="canceldelete">取 消</el-button>
        <el-button type="primary" @click="confirmdelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { FullCalendar } from "vue-full-calendar"
import "fullcalendar/dist/fullcalendar.css"
import { mapGetters } from "vuex"
import { Notification } from "element-ui"
import { formatTime } from "@/utils/format"
import {getCalendaraLists, doAdd, doUpdate, doDelete} from "@/api/calendarapi.js"
export default {
  computed: {
    ...mapGetters(["roles", "user"])
  },
  components: {
    FullCalendar
  },
  data () {
    let that = this
    return {
      pickerOptionsEnd: {
        disabledDate (time) {
          let date = new Date()
          return time.getTime() < new Date(that.dataform.start) - 8.64e7 || time.getTime() > date.setDate(date.getDate() + 1) - 8.64e7
        }
      },
      pickerOptionsStart: {
        disabledDate (time) {
          let date = new Date()
          return time.getTime() > date.setDate(date.getDate() + 1) - 8.64e7
        }
      },
      rules: {
        title: [{ required: true, message: "请输入维护记录内容", trigger: "blur" }],
        start: [{ required: true, message: "请选择开始时间", trigger: "change" }],
        end: [{ required: true, message: "请选择结束时间", trigger: "change" }],
        color: [{ required: true, message: "请选择类型", trigger: "change" }]
      },
      isadd: false,
      dialogVisible2: false,
      dialogVisible: false,
      config: {
        timeFormat: "H:mm",
        firstDay: "0",
        height: "auto",
        fixedWeekCount: false,
        buttonText: { prevYear: "<<", nextYear: ">>", today: "今天", prev: "<", next: ">" },
        locale: "zh-cn",
        editable: true, // 是否允许修改事件
        selectable: true,
        eventLimit: 4, // 事件个数
        allDaySlot: false, // 是否显示allDay
        defaultView: "month", // 显示默认视图
        header: {
          left: "prevYear,prev",
          right: "next,nextYear,today"
        },
        center: "title",
        right: "custom"
      },
      events: [],
      event: {
        id: null, // 可选，事件唯一标识，重复的事件具有相同的id
        title: "", // 必须，事件在日历上显示的title
        allDay: 0, // 可选，true or false，是否是全天事件。
        start: "", // 必须，事件的开始时间。
        end: "", // 可选，结束时间。
        url: "", // 可选，当指定后，事件被点击将打开对应url。
        className: "defaultClass", // 指定事件的样式。
        editable: "", // 事件是否可编辑，可编辑是指可以移动, 改变大小等。
        source: "eventsource", // 指向次event的eventsource对象。
        color: "", // 背景和边框颜色。
        backgroundColor: "", // 背景颜色。
        borderColor: "#fff", // 边框颜色。
        textColor: "#fff" // 文本颜色。
      },
      dataform: {
        title: null,
        start: null,
        end: null,
        color: null
      },
      index: -1,
      eventType: [
        {label: "类型1", value: "rgba(160, 160, 160, .6)"},
        {label: "类型2", value: "rgba(130, 175, 111, .6)"},
        {label: "类型3", value: "rgba(209, 91, 71, .6)"},
        {label: "类型4", value: "rgba(149, 133, 197, .6)"},
        {label: "类型5", value: "rgba(194, 179, 7, .6)"},
        {label: "类型6", value: "rgba(214, 72, 126, .6)"},
        {label: "类型7", value: "rgba(58, 135, 173, .6)"}
      ]
    }
  },
  methods: {
    reset () {
      this.$refs.ruleForm.resetFields()
    },
    findIndex (time) {
      let index = this.events.findIndex(function (elem) {
        return elem.id === time
      })
      return index
    },
    canceldelete () {
      this.dialogVisible2 = false
    },
    confirmdelete () { // 删除
      this.dialogVisible2 = false
      this.dialogVisible = false
      doDelete(this.events[this.index].id) // 删除
        .then(res => {
          if (res.result === "ok") {
            this.tip("success", "删除维护记录成功")
            this.getCalendaraList()
          } else {
            this.tip("warning", "删除维护记录失败")
          }
        })
        .catch(err => {
          console.error(err)
          this.tip("error", "删除维护记录出错")
        })
      // this.events.splice(this.index, 1, 0)
    },
    deleteEvent () {
      this.dialogVisible2 = true
    },
    cancel () {
      this.dialogVisible = false
    },
    confirm () { // 添加编辑
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let obj = {}
          obj.title = this.dataform.title
          obj.start = this.dataform.start
          obj.end = this.dataform.end
          obj.color = this.dataform.color
          obj.backgroundColor = this.dataform.color
          obj.editable = 0
          obj = Object.assign(this.event, obj)
          if (this.isadd) {
            doAdd(obj) // 添加
              .then(res => {
                if (res.result === "ok") {
                  this.tip("success", "添加维护记录成功")
                  this.getCalendaraList()
                } else {
                  this.tip("warning", "添加维护记录失败")
                }
              })
              .catch(err => {
                console.error(err)
                this.tip("error", "添加维护记录出错")
              })
            // this.events.push(obj)
          } else {
            this.events[this.index].title = this.dataform.title
            this.events[this.index].start = this.dataform.start
            this.events[this.index].end = this.dataform.end
            this.events[this.index].color = this.dataform.color
            this.events[this.index].backgroundColor = this.dataform.color
            doUpdate(this.events[this.index]) // 更新
              .then(res => {
                if (res.result === "ok") {
                  this.tip("success", "修改维护记录成功")
                  this.getCalendaraList()
                } else {
                  this.tip("warning", "修改维护记录失败")
                }
              })
              .catch(err => {
                console.error(err)
                this.tip("error", "修改维护记录出错")
              })
          }
          this.dialogVisible = false
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },
    eventClick (event) {
      let mapUser = this.roles[0].authority
      // 无人机和其他设备
      if (mapUser !== "ADMINISTRATOR") {
        Notification({
          title: "警告",
          message: "您还没有权限修改日志",
          type: "warning"
        })
        // 如何有url地址，跳转url地址
        return
      }
      this.isadd = false
      this.dialogVisible = true
      this.index = this.findIndex(event.id)
      this.dataform.title = this.events[this.index].title
      this.dataform.start = this.events[this.index].start
      this.dataform.end = this.events[this.index].end
      this.dataform.color = this.events[this.index].color
    },
    dayClick (date, jsEvent, view) {
      this.isadd = true
      this.dialogVisible = true
      let dates = formatTime("yyyy-MM-dd", "yyyy-MM-dd", date._d)
      this.dataform.start = dates
      this.dataform.end = dates
    },
    tip (type, msg) {
      Notification({
        title: "提示",
        message: msg,
        type: type
      })
    },
    getCalendaraList () {
      getCalendaraLists() // 获取
        .then(res => {
          if (res.result === "ok") {
            this.events = res.data
          }
        })
    }
  },
  created () {
    getCalendaraLists() // 获取
      .then(res => {
        if (res.result === "ok") {
          res.data.map((item, index, arr) => {
            if (item.editable === "1") {
              item.editable = true
            } else {
              item.editable = false
            }
            if (item.allDay === "1") {
              item.allDay = false
            } else {
              item.allDay = true
            }
          })
          this.events = res.data
        }
      })
      .catch(err => { console.error(err) })
  }
}
</script>
<style scoped>
.calendar{
  width: 100%;
  height: 100%;
}
.item{
  line-height: 30px;
}
</style>
