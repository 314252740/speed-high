(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-192838f6"],{"3e3e":function(e,t,a){"use strict";a.d(t,"a",(function(){return r})),a.d(t,"c",(function(){return i})),a.d(t,"b",(function(){return s}));var o=a("b775");function r(e){return console.log(e),Object(o["a"])({url:"api/system/params/add",method:"POST",data:e})}function i(e){return Object(o["a"])({url:"api/system/params/update",method:"PATCH",data:e})}function s(e){return Object(o["a"])({url:"api/system/params/delete/"+e,method:"DELETE"})}},"7a8e":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:e.isAdd?"新增预案事件类型":"修改预案事件类型",closeOnClickModal:!1,visible:e.visible,width:"500px","label-width":"80px"},on:{"update:visible":function(t){e.visible=t}}},[a("el-form",{ref:"form",attrs:{model:e.dataForm,size:"small","label-position":"right","label-width":"70px"}},[a("el-input",{attrs:{type:"hidden"},model:{value:e.dataForm.id,callback:function(t){e.$set(e.dataForm,"id",t)},expression:"dataForm.id"}}),a("el-form-item",{attrs:{label:"参数类型",prop:"types"}},[a("el-input",{staticStyle:{width:"330px"},attrs:{clearable:"",required:"true",autocomplete:"off"},model:{value:e.dataForm.types,callback:function(t){e.$set(e.dataForm,"types",t)},expression:"dataForm.types"}})],1),a("el-form-item",{attrs:{label:"参数名称",prop:"name"}},[a("el-input",{staticStyle:{width:"330px"},attrs:{clearable:"",required:"true",autocomplete:"off"},model:{value:e.dataForm.name,callback:function(t){e.$set(e.dataForm,"name",t)},expression:"dataForm.name"}})],1),a("el-form-item",{attrs:{label:"参数值",prop:"value"}},[a("el-input",{staticStyle:{width:"330px"},attrs:{clearable:"",required:"true",autocomplete:"off"},model:{value:e.dataForm.value,callback:function(t){e.$set(e.dataForm,"value",t)},expression:"dataForm.value"}})],1),a("el-form-item",{attrs:{label:"备注",prop:"memo"}},[a("el-input",{staticStyle:{width:"330px"},attrs:{clearable:"",required:"true",autocomplete:"off"},model:{value:e.dataForm.memo,callback:function(t){e.$set(e.dataForm,"memo",t)},expression:"dataForm.memo"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.doSubmit}},[e._v("确 定")]),a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.isAdd,expression:"isAdd"}],attrs:{type:"info"},on:{click:function(t){return e.continueAdd()}}},[e._v("继续添加")]),a("el-button",{on:{click:function(t){return e.cancel()}}},[e._v("取 消")])],1)],1)},r=[],i=a("3e3e"),s={props:{options:{type:Array,required:!0}},data:function(){return{loading:!1,visible:!1,isAdd:!1,dataForm:{id:"",types:"",name:"",value:"",memo:""}}},methods:{selectOne:function(e){this.$parent.query.search_type=e},cancel:function(){this.resetForm()},resetForm:function(){this.visible=!1,this.$refs["form"].resetFields(),this.dataForm={id:"",types:"",name:"",value:"",memo:""}},continueAdd:function(){var e=this;this.dataForm.type;this.isAdd&&Object(i["a"])(this.dataForm).then((function(t){e.$message({message:"添加成功",type:"success"}),e.dataForm={id:"",types:"",name:"",value:"",memo:""},e.$parent.page=0,e.isAdd=!0,e.$parent.init()})).catch((function(e){console.log("error:"+e),console.log(e)}))},doSubmit:function(){var e=this;this.isAdd?Object(i["a"])(this.dataForm).then((function(t){"ok"===t.result?(e.resetForm(),e.$message({message:"添加成功",type:"success"})):e.$message({message:"添加失败",type:"error"}),e.loading=!1,e.$parent.page=0,e.$parent.dialogFormVisible=!1,e.$parent.init()})).catch((function(e){console.log("error:"+e),console.log(e)})):this.doEdit()},doEdit:function(){var e=this;this.isAdd||Object(i["c"])(this.dataForm).then((function(t){e.resetForm(),e.$message({message:"修改成功",type:"success"}),e.loading=!1,e.$parent.dialogFormVisible=!1,e.$parent.init()})).catch((function(e){console.log("error:"+e),console.log(e)}))}}},n=s,l=a("2877"),c=Object(l["a"])(n,o,r,!1,null,null,null);t["default"]=c.exports}}]);