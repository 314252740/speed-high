(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1101aecc"],{"44e3":function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{attrs:{title:t.isAdd?"新增预案事件类型":"修改预案事件类型",visible:t.visible,width:"500px","label-width":"80px"},on:{"update:visible":function(e){t.visible=e}}},[i("el-form",{ref:"form",attrs:{model:t.dataForm,size:"small","label-position":"right","label-width":"70px"}},[i("el-input",{attrs:{type:"hidden"},model:{value:t.dataForm.id,callback:function(e){t.$set(t.dataForm,"id",e)},expression:"dataForm.id"}}),i("el-form-item",{attrs:{label:"所属机构",prop:"organizationTypeId"}},[i("el-select",{staticStyle:{width:"330px"},attrs:{placeholder:"所属机构",required:"true"},model:{value:t.dataForm.organizationTypeId,callback:function(e){t.$set(t.dataForm,"organizationTypeId",e)},expression:"dataForm.organizationTypeId"}},t._l(t.options,(function(t,e){return i("el-option",{key:e,attrs:{label:t.name,value:t.key}})})),1)],1),i("el-form-item",{attrs:{label:"机构名称",prop:"organizationName"}},[i("el-input",{staticStyle:{width:"330px"},attrs:{required:"true",autocomplete:"off"},model:{value:t.dataForm.organizationName,callback:function(e){t.$set(t.dataForm,"organizationName",e)},expression:"dataForm.organizationName"}})],1)],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:t.doSubmit}},[t._v("确 定")]),i("el-button",{on:{click:function(e){return t.cancel()}}},[t._v("取 消")])],1)],1)},a=[],n=i("d368"),r={props:{options:{type:Array,required:!0}},data:function(){return{loading:!1,visible:!1,isAdd:!1,dataForm:{id:"",organizationTypeId:"",organizationName:""}}},methods:{selectOne:function(t){this.$parent.query.search_type=t},cancel:function(){this.resetForm()},resetForm:function(){this.visible=!1,this.$refs["form"].resetFields(),this.dataForm={id:"",organizationTypeId:"",organizationName:""}},continueAdd:function(){var t=this;this.dataForm.type;this.isAdd&&Object(n["a"])(this.dataForm).then((function(e){t.$message({message:"添加成功",type:"success"}),t.dataForm={id:"",organizationTypeId:"",organizationName:""},t.$parent.page=0,t.isAdd=!0,t.$parent.init()})).catch((function(t){console.log("error:"+t),console.log(t)}))},doSubmit:function(){var t=this;this.isAdd?Object(n["a"])(this.dataForm).then((function(e){"ok"===e.result?(t.resetForm(),t.$message({message:"添加成功",type:"success"})):t.$message({message:"添加失败",type:"error"}),t.loading=!1,t.$parent.page=0,t.$parent.dialogFormVisible=!1,t.$parent.init()})).catch((function(t){console.log("error:"+t),console.log(t)})):this.doEdit()},doEdit:function(){var t=this;this.isAdd||Object(n["c"])(this.dataForm).then((function(e){t.resetForm(),t.$message({message:"修改成功",type:"success"}),t.loading=!1,t.$parent.dialogFormVisible=!1,t.$parent.init()})).catch((function(t){console.log("error:"+t),console.log(t)}))}}},s=r,l=i("2877"),d=Object(l["a"])(s,o,a,!1,null,null,null);e["default"]=d.exports},d368:function(t,e,i){"use strict";i.d(e,"d",(function(){return a})),i.d(e,"a",(function(){return n})),i.d(e,"c",(function(){return r})),i.d(e,"b",(function(){return s}));var o=i("b775");function a(){return Object(o["a"])({url:"institutions/organization/getOrganizationTypes",method:"get"})}function n(t){return console.log(t),Object(o["a"])({url:"institutions/organization/addOrganization",method:"POST",data:t})}function r(t){return Object(o["a"])({url:"institutions/organization/updateOrganization",method:"PATCH",data:t})}function s(t){return Object(o["a"])({url:"institutions/organization/deleteOrganization/"+t,method:"DELETE"})}}}]);