(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21f4d9"],{d8f5:function(e,t,o){"use strict";o.r(t);var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-dialog",{attrs:{title:e.title,closeOnClickModal:!1,visible:e.visible,width:"550px"},on:{"update:visible":function(t){e.visible=t}}},[o("el-form",{ref:"form",staticStyle:{padding:"0",margin:"0"},attrs:{model:e.dataForm,rules:e.rules,size:"small","label-position":"right","label-width":"130px"}},[o("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.showparent,expression:"showparent"}],attrs:{label:"父节点名称"}},[o("el-input",{attrs:{required:"true",disabled:"disabled",autocomplete:"off"},model:{value:e.dataForm.resourceName,callback:function(t){e.$set(e.dataForm,"resourceName",t)},expression:"dataForm.resourceName"}})],1),o("el-form-item",{attrs:{label:"名称",prop:"name"}},[o("el-input",{attrs:{autocomplete:"off",minlength:"2",maxlength:"20"},model:{value:e.dataForm.name,callback:function(t){e.$set(e.dataForm,"name",t)},expression:"dataForm.name"}})],1),o("el-form-item",{attrs:{label:"编码",prop:"code"}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:e.dataForm.code,callback:function(t){e.$set(e.dataForm,"code",t)},expression:"dataForm.code"}})],1),o("el-form-item",{attrs:{label:"图标",prop:"icon"}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:e.dataForm.icon,callback:function(t){e.$set(e.dataForm,"icon",t)},expression:"dataForm.icon"}})],1),o("el-form-item",{directives:[{name:"show",rawName:"v-show",value:!e.btnshow,expression:"!btnshow"}],attrs:{label:"排序",prop:"sortOrder"}},[o("el-input",{attrs:{type:"number",rules:{required:!e.btnshow,message:"请输入排序",trigger:"blur"}},model:{value:e.dataForm.sortOrder,callback:function(t){e.$set(e.dataForm,"sortOrder",e._n(t))},expression:"dataForm.sortOrder"}})],1),o("el-form-item",{directives:[{name:"show",rawName:"v-show",value:!e.compdisabled&&e.dataForm.leaf,expression:"(!compdisabled && dataForm.leaf)"}],attrs:{label:"组件路径",prop:"component",rules:{required:!e.compdisabled&&e.dataForm.leaf,message:"组件路径不能为空",trigger:"blur"}}},[o("el-input",{attrs:{type:"text",autocomplete:"off"},model:{value:e.dataForm.component,callback:function(t){e.$set(e.dataForm,"component",t)},expression:"dataForm.component"}})],1),o("el-form-item",{directives:[{name:"show",rawName:"v-show",value:!e.btnshow,expression:"!btnshow"}],attrs:{label:"访问地址(path)",prop:"content",rules:{required:!e.btnshow,message:"访问地址不能为空",trigger:"blur"}}},[o("el-input",{attrs:{type:"text",autocomplete:"off"},model:{value:e.dataForm.content,callback:function(t){e.$set(e.dataForm,"content",t)},expression:"dataForm.content"}})],1)],1),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.doSubmit()}}},[e._v("确 定")]),o("el-button",{on:{click:function(t){return e.cancel()}}},[e._v("取 消")])],1)],1)},a=[],n=o("1f27"),i={data:function(){return{loading:!1,visible:!1,isAdd:!1,title:"添加模块",dataForm:{id:"",name:"",parentid:"",resourceName:"",type:"0",code:"",sortOrder:"",icon:"",component:"",content:"",iframe:"0",leaf:!1},rules:{name:[{required:!0,message:"请输入名称",trigger:"blur"},{min:2,max:20,message:"长度在 2 到 20 个字符",trigger:"blur"}],code:[{required:!0,message:"请输入编码",trigger:"blur"},{min:3,max:20,message:"长度在 3 到 20 个字符",trigger:"blur"},{pattern:/^[A-Za-z_-]+$/,message:"只能输入英文字符",trigger:"blur"}],component:[{message:"请输入组件路径",trigger:"change"},{min:3,max:40,message:"长度在 3 到 40 个字符",trigger:"blur"}],content:[{required:!0,message:"请输入访问地址",trigger:"change"},{min:3,max:40,message:"长度在 3 到 40 个字符",trigger:"blur"}],sortOrder:[{type:"number",min:0,message:"排序不能小于0",trigger:"blur"}]},compdisabled:!1,showparent:!0,btnshow:!1}},methods:{selectOne:function(e){this.$parent.query.search_type=e},cancel:function(){this.resetForm()},resetForm:function(){this.visible=!1,this.$refs["form"].resetFields(),this.dataForm={id:"",name:"",parentid:"",resourceName:"",type:"0",code:"",sortOrder:"",icon:"",component:"",content:"",iframe:"0",leaf:!1}},doSubmit:function(){var e=this;this.$refs["form"].validate((function(t){t&&(e.loading=!0,e.isAdd?e.compdisabled?(console.log(e.dataForm),Object(n["e"])(e.dataForm).then((function(t){"ok"===t.result?(e.resetForm(),e.$notify({title:"添加成功",type:"success",duration:2500}),e.loading=!1,e.$parent.page=0,e.$parent.dialogFormVisible=!1,e.$parent.init()):e.$notify({title:"添加失败",type:"error",duration:2500})})).catch((function(e){console.log("error:"+e),console.log(e)}))):Object(n["d"])(e.dataForm).then((function(t){e.resetForm(),e.$notify({title:"添加成功",type:"success",duration:2500}),e.loading=!1,e.$parent.page=0,e.$parent.dialogFormVisible=!1,e.$parent.init()})).catch((function(e){console.log("error:"+e),console.log(e)})):e.doEdit())}))},doEdit:function(){var e=this;this.isAdd||Object(n["f"])(this.dataForm).then((function(t){e.resetForm(),e.$notify({title:"修改成功",type:"success",duration:2500}),e.loading=!1,e.$parent.dialogFormVisible=!1,e.$parent.init()})).catch((function(e){console.log("error:"+e),console.log(e)}))}},watch:{compdisabled:function(e){var t=this;this.$nextTick((function(){e||(t.$refs.form.validateField("component"),t.$refs.form.validateField("content"))}))}}},s=i,l=o("2877"),m=Object(l["a"])(s,r,a,!1,null,null,null);t["default"]=m.exports}}]);