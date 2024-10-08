<!--
 * @Author: liz
 * @Date: 2024-10-08 09:43:03
 * @LastEditTime: 2024-10-08 09:54:23
 * @LastEditors: liz
 * @Description: 
 * @FilePath: \large-screen\src\views\HomeView.vue
-->
<template>
  <div class="container">
    <div class="content">
      <iframe
        id="bi_iframe1"
        src="https://www.zjjnks.cn/swat/hangzhou/"
        frameborder="0"
        @load="adjustIframe('bi_iframe1')"
      ></iframe>
    </div>

    <div class="content">
      <iframe
        id="bi_iframe2"
        src="https://www.zjjnks.cn/swat/hangzhou/"
        frameborder="0"
        @load="adjustIframe('bi_iframe2')"
      ></iframe>
    </div>

    <div class="content">
      <iframe
        id="bi_iframe3"
        src="https://www.zjjnks.cn/swat/hangzhou/"
        frameborder="0"
        @load="adjustIframe('bi_iframe3')"
      ></iframe>
    </div>

    <div class="content">
      <iframe
        id="bi_iframe4"
        src="https://www.zjjnks.cn/keyunit"
        frameborder="0"
        @load="adjustIframe('bi_iframe4')"
      ></iframe>
    </div>
    <div class="content">
      <iframe
        id="bi_iframe5"
        src="https://www.zjjnks.cn/keyunit"
        frameborder="0"
        @load="adjustIframe('bi_iframe5')"
      ></iframe>
    </div>

    <div class="content">
      <iframe
        id="bi_iframe6"
        src="https://www.zjjnks.cn/keyunit"
        frameborder="0"
        @load="adjustIframe('bi_iframe6')"
      ></iframe>
    </div>
    <div class="content">
      <iframe
        id="bi_iframe7"
        src="https://www.zjjnks.cn/keyArea/"
        frameborder="0"
        @load="adjustIframe('bi_iframe7')"
      ></iframe>
    </div>

    <div class="content">
      <iframe
        id="bi_iframe8"
        src="https://www.zjjnks.cn/keyArea/"
        frameborder="0"
        @load="adjustIframe('bi_iframe8')"
      ></iframe>
    </div>

    <div class="content">
      <iframe
        id="bi_iframe9"
        src="https://www.zjjnks.cn/keyArea/"
        frameborder="0"
        @load="adjustIframe('bi_iframe9')"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
/**
 * 等比例缩放
 */
const previewObj = ref({
  //内嵌地址的宽高
  widthValue: 1920,
  heightValue: 1080,
});
const adjustIframe = (div) => {
  var iframe = document.getElementById(div);
  // 获取父级容器的宽高  //iframe_box设置的高宽 最好给固定值 在这里可以直接拿到
  var containerWidth = iframe.offsetWidth;
  var containerHeight = iframe.offsetHeight;

  // 计算缩放比例
  var scaleWidth = containerWidth / previewObj.value.widthValue;
  var scaleHeight = containerHeight / previewObj.value.heightValue;
  var scale = Math.min(scaleWidth, scaleHeight); // 选择较小的缩放比例以保持宽高比
  // 应用缩放和定位
  iframe.style.transformOrigin = "top left";
  iframe.style.transform = `scale(${scale}) translate(-50%, -50%)`;

  // 如果需要，可以调整iframe的宽高以匹配容器
  // 但由于我们使用了scale，所以通常不需要这样做
  iframe.style.width = `${previewObj.value.widthValue}px`;
  iframe.style.height = `${previewObj.value.heightValue}px`;
};
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  .content {
    width: 100%;
    height: 100%;
    position: relative;
    iframe {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 50%;
      left: 50%;
    }
  }
}
</style>
