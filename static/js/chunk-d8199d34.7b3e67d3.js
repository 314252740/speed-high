(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d8199d34"],{"0a1b":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{title:t.isAdd?"新增机构分组":"修改机构分组",visible:t.visible,width:"500px","label-width":"80px"},on:{"update:visible":function(e){t.visible=e}}},[a("el-form",{ref:"form",attrs:{model:t.dataForm,size:"small","label-position":"right","label-width":"70px"}},[a("el-input",{attrs:{type:"hidden"},model:{value:t.dataForm.id,callback:function(e){t.$set(t.dataForm,"id",e)},expression:"dataForm.id"}}),a("el-form-item",{attrs:{label:"组名",prop:"typeName"}},[a("el-input",{staticStyle:{width:"330px"},attrs:{required:"true",autocomplete:"off"},model:{value:t.dataForm.typeName,callback:function(e){t.$set(t.dataForm,"typeName",e)},expression:"dataForm.typeName"}})],1),a("el-form-item",{attrs:{label:"组长",prop:"groupLeader"}},[a("el-input",{staticStyle:{width:"330px"},attrs:{required:"true",autocomplete:"off"},model:{value:t.dataForm.groupLeader,callback:function(e){t.$set(t.dataForm,"groupLeader",e)},expression:"dataForm.groupLeader"}})],1),a("el-form-item",{attrs:{label:"副组长",prop:"deputyGroupLeader"}},[a("el-input",{staticStyle:{width:"330px"},attrs:{required:"true",autocomplete:"off"},model:{value:t.dataForm.deputyGroupLeader,callback:function(e){t.$set(t.dataForm,"deputyGroupLeader",e)},expression:"dataForm.deputyGroupLeader"}})],1),a("el-form-item",{attrs:{label:"工作职责",prop:"workTask"}},[a("el-input",{staticStyle:{width:"330px"},attrs:{required:"true",autocomplete:"off"},model:{value:t.dataForm.workTask,callback:function(e){t.$set(t.dataForm,"workTask",e)},expression:"dataForm.workTask"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:t.doSubmit}},[t._v("确 定")]),a("el-button",{on:{click:function(e){return t.cancel()}}},[t._v("取 消")])],1)],1)},r=[],i=a("a27e"),n={props:{options:{type:Array,required:!0}},data:function(){return{loading:!1,visible:!1,isAdd:!1,dataForm:{id:"",typeName:"",groupLeader:"",deputyGroupLeader:"",workTask:""}}},methods:{selectOne:function(t){this.$parent.query.search_type=t},cancel:function(){this.resetForm()},resetForm:function(){this.visible=!1,this.$refs["form"].resetFields(),this.dataForm={id:"",typeName:"",groupLeader:"",deputyGroupLeader:"",workTask:""}},continueAdd:function(){var t=this;this.dataForm.type;this.isAdd&&Object(i["a"])(this.dataForm).then((function(e){t.$message({message:"添加成功",type:"success"}),t.dataForm={id:"",typeName:"",groupLeader:"",deputyGroupLeader:"",workTask:""},t.$parent.page=0,t.isAdd=!0,t.$parent.init()})).catch((function(t){console.log("error:"+t),console.log(t)}))},doSubmit:function(){var t=this;this.isAdd?Object(i["a"])(this.dataForm).then((function(e){"ok"===e.result?(t.resetForm(),t.$message({message:"添加成功",type:"success"})):t.$message({message:"添加失败",type:"error"}),t.loading=!1,t.$parent.page=0,t.$parent.dialogFormVisible=!1,t.$parent.init()})).catch((function(t){console.log("error:"+t),console.log(t)})):this.doEdit()},doEdit:function(){var t=this;this.isAdd||Object(i["c"])(this.dataForm).then((function(e){t.resetForm(),t.$message({message:"修改成功",type:"success"}),t.loading=!1,t.$parent.dialogFormVisible=!1,t.$parent.init()})).catch((function(t){console.log("error:"+t),console.log(t)}))}}},s=n,d=a("2877"),l=Object(d["a"])(s,o,r,!1,null,null,null);e["default"]=l.exports},a27e:function(t,e,a){"use strict";a.d(e,"a",(function(){return r})),a.d(e,"c",(function(){return i})),a.d(e,"b",(function(){return n}));var o=a("b775");function r(t){return console.log(t),Object(o["a"])({url:"institutions/organization/addOrganizationType",method:"POST",data:t})}function i(t){return Object(o["a"])({url:"institutions/organization/updateOrganizationType",method:"PATCH",data:t})}function n(t){return Object(o["a"])({url:"institutions/organization/deleteOrganizationType/"+t,method:"DELETE"})}}}]);