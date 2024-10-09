<!--
 * @Author: liz
 * @Date: 2024-10-08 09:43:03
 * @LastEditTime: 2024-10-08 11:03:03
 * @LastEditors: liz
 * @Description: 
 * @FilePath: \large-screen\src\views\Home\index.vue
-->
<template>
  <div class="container" :class="gridIndex == 2 ? 'container2' : ''">
    <div class="change_modal">
      <el-button @click="changeModal('9')" class="layout_btn"
        >切换 9宫格</el-button
      >
      <el-button @click="changeModal('4')" class="layout_btn"
        >切换 4宫格</el-button
      >
      <el-button @click="changeModal('6_1')" class="layout_btn"
        >切换 6宫格左上</el-button
      >
      <el-button @click="changeModal('6_2')" class="layout_btn"
        >切换 6宫格右上</el-button
      >
      <el-button @click="changeModal('6_3')" class="layout_btn"
        >切换 6宫格左下</el-button
      >
      <el-button @click="changeModal('6_4')" class="layout_btn"
        >切换 6宫格右下</el-button
      >
    </div>

    <div class="content" :class="layoutTyle == '6_1' ? 'grid_item1' : ''">
      <iframe
        src="https://www.zjjnks.cn/swat/hangzhou/"
        id="bi_iframe_1"
        frameborder="0"
        @load="adjustIframe('bi_iframe_1')"
      ></iframe>
    </div>
    <div class="content" :class="layoutTyle == '6_2' ? 'grid_item2' : ''">
      <iframe
        src="https://www.zjjnks.cn/swat/hangzhou/"
        id="bi_iframe_2"
        frameborder="0"
        @load="adjustIframe('bi_iframe_2')"
      ></iframe>
    </div>
    <div class="content">
      <iframe
        src="https://www.zjjnks.cn/swat/hangzhou/"
        id="bi_iframe_3"
        frameborder="0"
        @load="adjustIframe('bi_iframe_3')"
      ></iframe>
    </div>
    <div class="content" :class="layoutTyle == '6_3' ? 'grid_item3' : ''">
      <iframe
        src="https://www.zjjnks.cn/keyunit"
        id="bi_iframe_4"
        frameborder="0"
        @load="adjustIframe('bi_iframe_4')"
      ></iframe>
    </div>
    <div
      class="content"
      v-if="layoutNum == 6 || layoutNum == 9"
      :class="layoutTyle == '6_4' ? 'grid_item4' : ''"
    >
      <iframe
        src="https://www.zjjnks.cn/keyunit"
        id="bi_iframe_5"
        frameborder="0"
        @load="adjustIframe('bi_iframe_5')"
      ></iframe>
    </div>
    <div class="content" v-if="layoutNum == 6 || layoutNum == 9">
      <iframe
        src="https://www.zjjnks.cn/keyunit"
        id="bi_iframe_6"
        frameborder="0"
        @load="adjustIframe('bi_iframe_6')"
      ></iframe>
    </div>
    <div class="content" v-if="layoutNum == 9">
      <iframe
        src="https://www.zjjnks.cn/keyArea/"
        id="bi_iframe_7"
        frameborder="0"
        @load="adjustIframe('bi_iframe_7')"
      ></iframe>
    </div>
    <div class="content" v-if="layoutNum == 9">
      <iframe
        src="https://www.zjjnks.cn/keyArea/"
        id="bi_iframe_8"
        frameborder="0"
        @load="adjustIframe('bi_iframe_8')"
      ></iframe>
    </div>
    <div class="content" v-if="layoutNum == 9">
      <iframe
        src="https://www.zjjnks.cn/keyArea/"
        id="bi_iframe_9"
        frameborder="0"
        @load="adjustIframe('bi_iframe_9')"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
const gridIndex = ref(3);
const layoutTyle = ref("6_1");
const layoutNum = ref(6);
const adjustIframe = (domName) => {
  var iframe = document.getElementById(domName);
  //   获取父级容器的宽高
  //也就是弹框在样式中设置的高宽 最好给固定值 在这里可以直接拿到
  var containerWidth, containerHeight;
  if (layoutTyle.value == "6_1" && domName == "bi_iframe_1") {
    containerWidth = (window.innerWidth / 3) * 2;
    containerHeight = (window.innerHeight / 3) * 2;
  } else if (layoutTyle.value == "6_2" && domName == "bi_iframe_2") {
    containerWidth = (window.innerWidth / 3) * 2;
    containerHeight = (window.innerHeight / 3) * 2;
  } else if (layoutTyle.value == "6_3" && domName == "bi_iframe_4") {
    containerWidth = (window.innerWidth / 3) * 2;
    containerHeight = (window.innerHeight / 3) * 2;
  } else if (layoutTyle.value == "6_4" && domName == "bi_iframe_5") {
    containerWidth = (window.innerWidth / 3) * 2;
    containerHeight = (window.innerHeight / 3) * 2;
  } else {
    containerWidth = window.innerWidth / gridIndex.value;
    containerHeight = window.innerHeight / gridIndex.value;
  }
  // var containerWidth = window.innerWidth / gridIndex.value;
  // var containerHeight = window.innerHeight / gridIndex.value;
  // 计算缩放比例
  var scaleWidth = containerWidth / window.innerWidth;
  var scaleHeight = containerHeight / window.innerHeight;
  var scale = Math.min(scaleWidth, scaleHeight); // 选择较小的缩放比例以保持宽高比
  // 应用缩放和定位
  iframe.style.transformOrigin = "top left";
  iframe.style.transform = `scale(${scale}) translate(-50%, -50%)`;
  // 如果需要，可以调整iframe的宽高以匹配容器
  // 但由于我们使用了scale，所以通常不需要这样做
  iframe.style.width = "1920px";
  iframe.style.height = "1080px";
};
const layoutList = [
  "bi_iframe_1",
  "bi_iframe_2",
  "bi_iframe_3",
  "bi_iframe_4",
  "bi_iframe_5",
  "bi_iframe_6",
  "bi_iframe_7",
  "bi_iframe_8",
  "bi_iframe_9",
];
const changeModal = (ele) => {
  if (ele == "9") {
    gridIndex.value = 3;
    layoutNum.value = 9;
  } else if (ele == "4") {
    gridIndex.value = 2;
    layoutNum.value = 4;
  } else {
    gridIndex.value = 3;
    layoutNum.value = 6;
  }
  layoutTyle.value = ele;
  nextTick(() => {
    layoutList.map((item, index) => {
      if (index < layoutNum.value) {
        adjustIframe(item);
      }
    });
  });
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  position: relative;
  background-color: #03182f;
  .change_modal {
    position: absolute;
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    top: 50px;
    right: 50px;
    z-index: 2;
    .layout_btn {
      margin: 0 0 10px 0;
    }
  }
  .grid_item1 {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 3;
  }
  .grid_item2 {
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 3;
  }
  .grid_item3 {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 4;
  }
  .grid_item4 {
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 4;
  }
  .content {
    width: 100%;
    height: 100%;
    position: relative;
    iframe {
      width: 100%;
      /* 初始宽度设置为100% */
      height: 100%;
      /* 初始高度设置为100% */
      border: none;
      position: absolute;
      top: 50%;
      left: 50%;
      /* 初始不应用缩放 */
      transform: none;
      transition: transform 0.2s ease;
      /* 可选的过渡效果 */
    }
  }
}
.container2 {
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
}
</style>
