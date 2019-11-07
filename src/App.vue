<template>
  <div id="app" style="height:100%">
    <router-view />
  </div>
</template>
<style>
body,h1,h2,h3,h4,h5,h6,p,hr,ul,li {
  margin: 0;
}
ul {
  padding: 0;
  list-style: none;
}
a {
  color: #000;
  text-decoration: none;
}
body {
  font-family: "微软雅黑", "Helvetica Neue", Helvetica, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
}
textarea {
  resize: none; /*禁止多行文本框拉伸*/
}
input,
textarea {
  padding: 0;
  box-sizing: border-box;
  font-family: "微软雅黑", "Helvetica Neue", Helvetica, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
  outline: 0; /*轮廓线*/
}
.clear-both::after {
  content: "";
  /*修改追加样式*/
  display: block;
  clear: both;
}
/* 单行文字超出显示省略号 */
.hidden_one {
  overflow: hidden;
  /* 文字超出显示省略 */
  text-overflow: ellipsis;
  /* 文字不能换行 */
  white-space: nowrap;
  vertical-align: middle;
}
.hidden_2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 固定显示2行*/
  overflow: hidden;
  /* 容器高度不能固定 */
}
/* 规定p标签宽度 */
.hidden_3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* 固定显示3行*/
  overflow: hidden;
  /* 容器高度不能固定 */
}
iframe {
  border: 0;
}
* {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
/* 设置滚动条样式 (不支持火狐)*/
::-webkit-scrollbar {
  width: 8px;
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
/* 鼠标移入滚动条 */
::-webkit-scrollbar-thumb:hover {
  background: #999;
}
img[src=""],img:not([src]){opacity:0;}
</style>
