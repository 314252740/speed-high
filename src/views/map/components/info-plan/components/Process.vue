<template>
  <transition name="el-zoom-in-bottom">
    <div class="box" ref="processbox" v-show="proscessShow">
      <div class="title">
        <h5>
          系统设备操作流程
          <i class="iconfont close" @click.stop="decClose()">&#xe60e;</i>
          <!-- 图标-->
        </h5>
      </div>
      <!-- 复合屏开始 -->
      <div class="fuhescreen" v-for="(item,index,key) in list" :key="key">
        <div>
          <img style="vertical-align:middle;width:19px;" :src="item.img" alt />
          <span style="color:#666;font-size:14px;">
            {{item.typeName}}
            <el-tooltip effect="dark" :content="item.info.enName" placement="top">
              <strong
                class="hidden_one"
                style="width:50px;display:inline-block;"
              >{{item.info.enName}}</strong>
            </el-tooltip>
            <el-tooltip effect="dark" :content="item.info.name" placement="top">
              <strong
                class="hidden_one"
                style="width:80px;display:inline-block;"
              >{{item.info.name}}</strong>
            </el-tooltip>
          </span>
        </div>
        <ul class="clear-both">
          <li class="clear-both" v-for="(itemed,index,key) in item.info.updataValue" :key="key">
            <div class="left">
              <span style="letter-spacing:2px;color:#666;font-size:14px;">{{itemed.name}}</span>&nbsp;-&nbsp;
              <strong style="color:red;font-size:14px;">{{itemed.main}}</strong>
            </div>
            <div class="right">
              <i v-show="item.info.status" class="el-icon-check success" title="修改成功"></i>
              <i v-show="item.info.status === null" class="el-icon-loading" title="修改中"></i>
              <i v-show="item.info.status === false" class="el-icon-close error" title="修改失败"></i>
            </div>
          </li>
        </ul>
      </div>
      <!-- 复合屏结束 -->

      <!-- 信息屏开始 -->
      <div class="messagescreen" v-for="(item,index,key) in arry" :key="key">
        <div>
          <img style="vertical-align:middle;width:19px;" :src="item.img" alt />
          <span style="color:#666;font-size:14px;">
            {{item.typeName}}
            <el-tooltip effect="dark" :content="item.info.enName" placement="top">
              <strong
                class="hidden_one"
                style="width:65px;display:inline-block;"
              >{{item.info.name}}</strong>
            </el-tooltip>
            <el-tooltip effect="dark" :content="item.info.name" placement="top">
              <strong
                class="hidden_one"
                style="width:150px;display:inline-block;"
              >{{item.info.name}}</strong>
            </el-tooltip>
          </span>
        </div>
        <div class="clear-both" style="margin-left:24px;">
          <strong
            style="color:red;float:left;margin-top:5px;font-size:14px;"
          >{{item.info.updataValue}}</strong>
          <div class="right">
            <i v-show="item.info.status === true" class="el-icon-check success" title="修改成功"></i>
            <i v-show="item.info.status === null" class="el-icon-loading" title="修改中"></i>
            <i v-show="item.info.status === false" class="el-icon-close error" title="修改失败"></i>
          </div>
        </div>
      </div>
      <!-- 信息屏结束 -->

      <!-- 限速屏开始 -->
      <div class="limitscreen clear-both" v-for="(item,index,key) in limit" :key="key">
        <div style="float:left;">
          <img style="vertical-align:middle;width:19px" :src="item.img" alt />
          <span style="color:#666;font-size:14px;">
            {{item.typeName}}
            <el-tooltip effect="dark" :content="item.info.enName" placement="top">
              <strong
                class="hidden_one"
                style="width:56px;display:inline-block;"
              >{{item.info.enName}}</strong>
            </el-tooltip>
            <el-tooltip effect="dark" :content="item.info.name" placement="top">
              <strong
                class="hidden_one"
                style="width:56px;display:inline-block;"
              >{{item.info.name}}</strong>
            </el-tooltip>
          </span>
          <span style="color:#666;font-size:14px;">
            限速值 -
            <strong style="color:red;">{{item.info.updataValue}}</strong>
          </span>
        </div>
        <div class="right">
          <i v-show="item.info.status" class="el-icon-check success" title="修改成功"></i>
          <i v-show="item.info.status === null" class="el-icon-loading" title="修改中"></i>
          <i v-show="item.info.status === false" class="el-icon-close error" title="修改失败"></i>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { processObj, processTranslate } from '../../../config/process'
// import { updataDecValue } from "@/api/roadCondition.js"
export default {
  props: {
    UpdataList: {
      type: Array,
      default: () => []
    },
    clientHeight: {
      type: Number,
      default: 0
    },
    updataType: {
      type: String,
      default: 'cancel'
    }
  },
  watch: {
    UpdataList (newvalue, oldvalue) {
      this.UpdataList = newvalue
      // console.log(this.UpdataList)
      if (this.UpdataList.length <= 0) {
        this.proscessShow = false
        return
      } else {
        this.proscessShow = true
      }
      this.list = [] // 复合屏
      this.arry = [] // 其他
      this.limit = [] // 限速屏
      // 根据类型判断设备类型
      this.UpdataList.forEach(item => {
        // console.log(item)
        let type = item.layerid
        // 列表循环
        let obj = {}
        for (let key in processObj[type].info) {
          if (type === 'screenComposite' && key === 'updataValue') {
            for (let i in processObj[type].info[key]) {
              if (processTranslate[i][item[key][i]]) {
                processObj[type].info[key][i].main = processTranslate[i][item[key][i]].name
              }
            }
          } else {
            processObj[type].info[key] = item[key]
          }
        }
        // console.log(item)
        let str = JSON.stringify(processObj[type])
        obj = JSON.parse(str)
        this.pushType(type, obj)
      })
    }
    // updataType(newvalue, oldvalue) {
    //   let that = this
    //   if (newvalue === "cancel") {
    //     // 撤销预案，改回原来的值
    //     this.UpdataList.forEach(element => {
    //       this.$set(element, "status", true)
    //     })
    //     let start = 0
    //     let end = this.UpdataList.length - 1
    //     // 发送请求
    //   } else {
    //     // 更改设备控制内容
    //     let start = 0
    //     let end = this.UpdataList.length - 1
    //     this.UpdataList.forEach(element => {
    //       this.$set(element, "status", true)
    //     })
    //   }
    // },
  },
  name: 'process',
  data () {
    return {
      proscessShow: false,
      list: [], // 复合屏
      arry: [], // 信息屏，诱导屏，高音号
      limit: [], // 限速屏
      processItem: {}
    }
  },
  computed: {
    modify () {
      return this.UpdataList
    }
  },
  methods: {
    reset () {
      this.list = [] // 复合屏
      this.arry = [] // 其他
      this.limit = [] // 限速屏
    },
    forceUpdate () {
      this.$forceUpdate()
    },
    decClose () {
      this.proscessShow = false
      this.list = []
      this.arry = []
      this.limit = []
      this.$emit('clearProcess')
    },
    pushType (type, item) {
      if (type === 'screenComposite') {
        this.list.push(item)
      } else if (type === 'screenSpeed') {
        this.limit.push(item)
      } else {
        this.arry.push(item)
      }
    },
    UpdataListFn () {
      // this.UpdataList = newvalue
      if (this.UpdataList.length <= 0) {
        this.proscessShow = false
        return
      } else {
        this.proscessShow = true
      }
      this.list = [] // 复合屏
      this.arry = [] // 其他
      this.limit = [] // 限速屏
      // 根据类型判断设备类型
      this.UpdataList.forEach(item => {
        // console.log(item)
        let type = item.layerid
        // 列表循环
        let obj = {}
        for (let key in processObj[type].info) {
          if (type === 'screenComposite' && key === 'updataValue') {
            for (let i in processObj[type].info[key]) {
              processObj[type].info[key][i].main = item[key][i]
            }
          } else {
            processObj[type].info[key] = item[key]
          }
        }
        obj = Object.assign({}, processObj[type])
        this.pushType(type, obj)
      })
    }
  }
}
</script>
<style scoped>
.box {
  width: 310px;
  padding: 10px;
  background: #fff;
  box-sizing: border-box;
  box-shadow: 2px 2px 5px #333333;
  overflow-y: auto;
  overflow-x: hidden;
}
.box .title {
  margin-bottom: 0;
}
.box .title h5 {
  color: #0289fe;
  text-align: center;
  font-size: 16px;
  margin-bottom: 5px;
}
/* 复合屏 */
.box .fuhescreen {
  padding-top: 6px;
  padding-bottom: 2px;
  box-sizing: border-box;
  border-bottom: 1px solid #e2e2e2;
}
.box .fuhescreen ul {
  margin-left: 24px;
}
.box .fuhescreen ul li {
  width: 222px;
  border-bottom: 1px dashed #e2e2e2;
  padding: 5px 0;
  box-sizing: border-box;
}
.box .fuhescreen ul li:last-child {
  border-bottom: none;
}
.box .fuhescreen ul li .left {
  float: left;
}
.box .fuhescreen ul li .right {
  float: right;
}
.right {
  float: right;
}
/* 信息屏 */
.box .messagescreen {
  padding: 6px 0;
  box-sizing: border-box;
  border-bottom: 1px solid #e2e2e2;
}
/* 限速屏 */
.box .limitscreen {
  padding: 6px 0;
  box-sizing: border-box;
  border-bottom: 1px solid #e2e2e2;
}
.box .limitscreen:last-child {
  border-bottom: none;
}
.close {
  float: right;
  font-size: 14px;
  color: #ccc;
  cursor: pointer;
}
.success {
  color: green;
  font-size: 12px;
  font-weight: 600;
}
.error {
  color: red;
  font-size: 12px;
  font-weight: 600;
}
/* scroll 全局样式s*/
/* 设置滚动条样式 (不支持火狐)*/
::-webkit-scrollbar {
  width: 3px;
}
/*外层轨道。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果*/
::-webkit-scrollbar-track {
  width: 6px;
  background-color: #e4e2e3;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
  display: none;
}
/*滚动条的设置*/
::-webkit-scrollbar-thumb {
  background-color: #e4e2e3;
  background-clip: padding-box;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
</style>
