(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-406741a4"],{1:function(t,e){},"32f0":function(t,e,a){"use strict";a.d(e,"c",(function(){return l})),a.d(e,"e",(function(){return o})),a.d(e,"d",(function(){return i})),a.d(e,"g",(function(){return r})),a.d(e,"i",(function(){return s})),a.d(e,"f",(function(){return u})),a.d(e,"b",(function(){return c})),a.d(e,"h",(function(){return d})),a.d(e,"j",(function(){return h})),a.d(e,"k",(function(){return m})),a.d(e,"a",(function(){return b}));var n=a("b775");function l(t){return Object(n["a"])({url:"module/tschedule",method:"POST",data:t})}function o(t){return Object(n["a"])({url:"module/tschedule",method:"PATCH",data:t})}function i(t){return Object(n["a"])({url:"module/tschedule/"+t,method:"DELETE"})}function r(t){return Object(n["a"])({url:"module/syspoliceusers/"+t,method:"GET"})}function s(){return Object(n["a"])({url:"system/org/getall",method:"GET"})}function u(){return Object(n["a"])({url:"system/org/geAll",method:"GET"})}function c(t){return Object(n["a"])({url:"module/updatepolicestatus/"+t,method:"DELETE"})}function d(t){return Object(n["a"])({url:"module/policeusers",method:"GET",params:t})}function h(t){return Object(n["a"])({url:"module/tscheduleByDate",method:"GET",params:t})}function m(t){return Object(n["a"])({url:"module/tscheduleByMonth",method:"GET",params:t})}function b(t){return Object(n["a"])({url:"module/addTschedule",method:"POST",params:t})}},fd75:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{title:"新增模板",visible:t.visible,width:"1000px","label-width":"80px"},on:{"update:visible":function(e){t.visible=e},open:function(e){return t.openData()}}},[a("el-form",{ref:"form",attrs:{"label-width":"80px"}},[a("el-form-item",{attrs:{label:"大队信息"}},[a("el-select",{attrs:{placeholder:"请选择大队"},on:{change:t.selectGet},model:{value:t.orgid,callback:function(e){t.orgid=e},expression:"orgid"}},t._l(t.selectList,(function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1),a("el-select",{attrs:{disabled:t.mondisable,placeholder:"请选择月份"},on:{change:t.selectGetMon},model:{value:t.month,callback:function(e){t.month=e},expression:"month"}},t._l(t.monList,(function(t){return a("el-option",{key:t.id,attrs:{label:t.month,value:t.value}})})),1),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.disabledOk()}}},[t._v("确定选择")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.exportExcel()}}},[t._v("导出为Excel表格")])],1)],1),a("el-table",{ref:"dialogTable",staticStyle:{width:"100%"},attrs:{data:t.tableData,"span-method":t.colsStatus?t.notingMethod:t.arraySpanMethod,border:"",stripe:"","row-key":"id",id:"out-table"}},[a("el-table-column",{attrs:{prop:"name",label:"带班领导",width:"120"}}),t.colsStatus?a("el-table-column",{attrs:{label:"带班日期"}}):a("el-table-column",{attrs:{label:"带班日期"}},t._l(t.cols,(function(t,e){return a("el-table-column",{key:e,attrs:{label:"","show-header":!1,"min-width":"15",prop:"leaderData"+e}})})),1),a("el-table-column",{attrs:{prop:"telPhone",label:"联系电话",width:"120"}}),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{disabled:t.comfirmStatuse,type:"text",size:"small"},nativeOn:{click:function(a){return a.preventDefault(),t.deleteRow(e.$index,t.tableData)}}},[t._v("移除")])]}}])})],1),a("el-table",{staticStyle:{width:"100%"},attrs:{id:"out-table2",data:t.tableDataList,border:""}},[a("el-table-column",{attrs:{prop:"dateMonth",align:"center",width:"120",label:"时间"}}),a("el-table-column",{attrs:{label:"路段"}},[a("el-table-column",{attrs:{prop:"maiClass",align:"center",label:"早上8时30分至次日8时30分（主班）"}}),a("el-table-column",{attrs:{prop:"subClass",align:"center",label:"（副班）"}}),a("el-table-column",{attrs:{prop:"maneuver",align:"center",label:"机动中队"}}),a("el-table-column",{attrs:{prop:"accident",align:"center",label:"事故勘察中队"}})],1)],1)],1)},l=[],o=(a("4de4"),a("4160"),a("caad"),a("c975"),a("a434"),a("e25e"),a("2532"),a("159b"),a("aa47")),i=a("21a6"),r=a.n(i),s=a("4979"),u=a.n(s),c=a("32f0"),d={data:function(){return{comfirmStatuse:!1,colsStatus:!0,mondisable:!0,undisable:!1,leadershipNum:"",monthAll:"",someOne:"",orgid:null,indexPerson:null,selectList:[],visible:!1,cells:null,cols:null,tableData:[],leaderData:["1","2","3","4","56","7"],month:"",monList:[{month:"一月",value:"1"},{month:"二月",value:"2"},{month:"三月",value:"3"},{month:"四月",value:"4"},{month:"五月",value:"5"},{month:"六月",value:"6"},{month:"七月",value:"7"},{month:"八月",value:"8"},{month:"九月",value:"9"},{month:"十月",value:"10"},{month:"十一月",value:"11"},{month:"十二月",value:"12"}],tableDataList:[{dateMonth:"7月1日",maiClass:"二中队 1223153454554454",subClass:"一中队 54545454545",maneuver:"林 超 王大锤",accident:"朱日和 王猛"},{dateMonth:"7月2日",maiClass:"二中队 1223153454554454",subClass:"一中队 54545454545",maneuver:"林 超 王大锤",accident:"朱日和 王猛"}]}},methods:{selectGet:function(){var t=this;this.mondisable=!1,Object(c["g"])(this.orgid).then((function(e){"ok"===e.result&&(t.tableData=e.data.filter((function(t){return"0"===t.status})),t.colsStatus=!0,t.leadershipNum=t.tableData.length)})).catch((function(t){console.log(t)}))},selectGetMon:function(){this.orgid||(this.mondisable=!0)},disabledOk:function(){var t=this;this.orgid&&this.month?(this.comfirmStatuse=!0,this.undisable=!0,this.rowDrop(),Object(c["h"])({mon:this.month}).then((function(e){if("ok"===e.result){for(var a in e.data)t.monthAll=a,t.someOne=e.data[a];t.cells=t.monthAll-1+t.leadershipNum,t.cells%t.leadershipNum===0?t.cols=parseInt(t.cells/t.leadershipNum):t.cols=parseInt(t.cells/t.leadershipNum)+1,t.calculationF(),t.colsStatus=!1}else t.$notify.error({title:"提示",message:"获取信息失败"})})).catch((function(t){console.error(t)}))):this.$notify.info({title:"提示",message:"请选择大队信息"})},arraySpanMethod:function(t){t.row,t.column;var e=t.rowIndex,a=t.columnIndex;if(1===a&&0===e)return[1,2]},notingMethod:function(){},openData:function(){this.tableData=[],this.undisable=!1,this.month=null,this.orgid=null,this.colsStatus=!0,this.comfirmStatuse=!1,this.rowDrop()},deleteRow:function(t,e){var a=this,n=e[t].id;this.$confirm("是否确认删除","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){a.leadershipNum=a.leadershipNum-1,e.splice(t,1),Object(c["b"])(n).then((function(t){t.result})).catch((function(t){console.log(t)})),a.$message({type:"success",message:"删除成功!"})})).catch((function(){a.$message({type:"info",message:"已取消删除"})}))},rowDrop:function(){var t=this;this.$nextTick((function(){var e=t.$refs.dialogTable.$el.children[2].children[0].children[1],a=t;o["a"].create(e,{onEnd:function(t){var e=t.newIndex,n=t.oldIndex,l=a.tableData.splice(n,1)[0];a.tableData.splice(e,0,l)},disabled:a.undisable})}))},exportExcel:function(){if(0!==this.tableData.length){var t=u.a.utils.table_to_book(document.querySelector("#out-table")),e=u.a.write(t,{bookType:"xlsx",bookSST:!0,type:"array"});try{r.a.saveAs(new Blob([e],{type:"application/octet-stream"}),"值班表.xlsx")}catch(a){"undefined"!==typeof console&&console.log(a,e)}return e}this.$notify.info({title:"提示",message:"表格无数据"})},calculationF:function(){var t=this;this.tableData.forEach((function(e){e.id===t.someOne&&(t.$set(e,"start",0),t.indexPerson=t.tableData.indexOf(e))}));for(var e=-1,a=this.indexPerson;a<this.tableData.length;a++)e++,this.$set(this.tableData[a],"start",e),this.$set(this.tableData[a],"startNull",!1);for(var n=0;n<this.indexPerson;n++)e++,this.$set(this.tableData[n],"start",e),this.$set(this.tableData[n],"startNull",!0);for(var l=this.cols,o=function(e){var a=[];t.startNull&&a.push(" ");for(var n=t.tableData[e].start,o=0;o<l;o++)a.push(n),n+=t.leadershipNum;a=a.filter((function(e){return e<=t.monthAll})),a.includes(0)&&a.splice(a.indexOf(0),1," "),a.forEach((function(n,l){t.$set(t.tableData[e],"leaderData"+l,a[l])})),t.$set(t.tableData[e],"leaderData",a)},i=0;i<this.tableData.length;i++)o(i)}},created:function(){var t=this;Object(c["i"])().then((function(e){t.selectList=e})).catch((function(t){console.log(t)}))},mounted:function(){}},h=d,m=a("2877"),b=Object(m["a"])(h,n,l,!1,null,null,null);e["default"]=b.exports}}]);