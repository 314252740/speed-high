<template>
  <div class="testBox">
    <div class="testItem">
      <el-form
        v-model="URLs"
        size="small"
        label-width="70px">
        <el-form-item label="URL">
            <el-input
              v-model="URLs"
              style="width:500px;"
            ></el-input>
        </el-form-item>
        <el-form-item label="请求方式">
          <el-select v-model="methods" placeholder="请选择请求方式" style="width:500px;">
            <el-option
              v-for="item in methodsList"
              :key="item.name"
              :label="item.label"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请求参数">
          <el-input
            style="width:500px;"
            type="textarea"
            :rows="3"
            placeholder="请输入参数（json对象）"
            v-model="params">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="testItem">
      <el-button type="success" size="medium" round @click="testAPI">测试接口</el-button>
    </div>
    <ul class="resBox">
      <li class="item" :key="index" v-for="(item, key, index) in res">
        <div class="left">{{key}}:</div>
        <div class="right">{{item}}</div>
      </li>
    </ul>
    <el-button @click="showDialog"></el-button>
    <div style="width:100%;heigth: 500px">
      <map-form
        :dataForm="dataForm"
        :formConfig="formConfig"
        :isAdd="isAdd"
        :visible="visible"
        :formList="formList"
        :formAttr="formAttr"
        @doAdd="doAdd"
        @doEdit="doEdit"
      ></map-form>
    </div>
  </div>
</template>
<script>
import request from "@/utils/request"
import MapForm from "../components/Form/Form"
import {isJSON} from "@/utils/format"
import { Notification } from "element-ui"
export default {
  components: {
    MapForm
  },
  data () {
    return {
      params: null,
      URLs: null,
      methods: "GET",
      methodsList: [
        {name: "GET", label: "GET"},
        {name: "POST", label: "POST"},
        {name: "PATCH", label: "PATCH"},
        {name: "DELETE", label: "DELETE"}
      ],
      res: {},
      data: null,
      result: null,
      style: "widht:500px;",
      dataForm: {id: null, id2: null},
      formConfig: {
        type: "led",
        title: "引导灯",
        mapbtn: [{
          layer: "stakeNum", // 控制图层类型 (必填)
          showlayer: true
        },
        {
          layer: "stakeNum", // 控制图层类型 (必填)
          showlayer: true
        }],
        layer: ["stakeNum"]
      },
      isAdd: true,
      visible: false,
      formList: [
        { type: "input", model: "id", label: "表单名称" },
        { type: "input", model: "id2", label: "表单名称" }
      ],
      formAttr: {
        rules: {}, // Object
        labelWidth: 100 // Number
      }
    }
  },
  methods: {
    doAdd (val) {
      console.log(val)
    },
    doEdit (val) {
      console.log(val)
    },
    showDialog () {
      this.visible = true
    },
    testRequest1 (params) {
      return request({
        url: this.URLs,
        method: this.methods,
        params
      })
    },
    testRequest2 () {
      return request({
        url: this.URLs,
        method: this.methods
      })
    },
    testRequest3 (data) {
      return request({
        url: this.URLs,
        method: this.methods,
        data
      })
    },
    testAPI () {
      this.res = []
      if (!this.URLs) return
      this.URLs = this.URLs.trim()
      if (this.params) {
        let objStr = this.params.replace(/\s/ig, "")
        objStr = objStr.replace(/，/ig, ",")
        if (!isJSON(objStr)) {
          Notification({
            type: "error",
            title: "输入JSON格式错误",
            dangerouslyUseHTMLString: true,
            message: '<span>{<b style="color:red">"</b>id<b style="color:red">"</b>: 1}</span>'
          })
          return
        }
        let params = JSON.parse(objStr)
        if (this.methods === "PATCH") {
          this.testRequest3(params)
            .then(res => {
              this.res = res
            })
            .catch(err => {
              console.error(err)
            })
        } else {
          this.testRequest1(params)
            .then(res => {
              this.res = res
            })
            .catch(err => {
              console.error(err)
            })
        }
      } else {
        this.testRequest2()
          .then(res => {
            this.res = res
          })
          .catch(err => {
            console.error(err)
          })
      }
    }
  }
}
</script>
<style scoped>
.testBox{
  width: 1200px;
  height: 100%;
  margin:0 auto;
  padding:20px;
  box-sizing: border-box;
}
.testItem{
  width: 600px;
  margin:0 auto;
  text-align: center;
}
.resBox{
  width: 100%;
}
.item{
  height: 30px;
  transition: all .5s;
}
.item:hover{
  background: rgb(228, 226, 226);
  transition: all .5s;
}
.left{
  float: left;
  color:red;
  font-weight: 600;
  line-height: 30px;
  padding-right:10px;
}
.right{
  float: left;
  color:sandybrown;
  line-height: 30px;
  font-weight: 600;
}
</style>
<style>
::selection {
background: rgba(1, 17, 15, 0.979);
  color: rgb(248, 19, 19);
}

::-moz-selection {
background: rgba(1, 17, 15, 0.979);
color: rgb(248, 19, 19);
}

::-moz-selection {
background: rgba(1, 17, 15, 0.979);
color: rgb(248, 19, 19);
}
</style>
