<!--
 * @Author: liz
 * @Date: 2024-10-08 09:43:03
 * @LastEditTime: 2024-10-08 11:03:03
 * @LastEditors: liz
 * @Description: 
 * @FilePath: \large-screen\src\views\Home\index.vue
-->
<template>
  <div class="container">
    <div class="content">
      <iframe
        src="https://www.zjjnks.cn/swat/hangzhou/"
        id="bi_iframe_1"
        frameborder="0"
        @load="adjustIframe('bi_iframe_1')"
      ></iframe>
    </div>
    <div class="content">
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
    <div class="content">
      <iframe
        src="https://www.zjjnks.cn/keyunit"
        id="bi_iframe_4"
        frameborder="0"
        @load="adjustIframe('bi_iframe_4')"
      ></iframe>
    </div>
    <div class="content">
      <iframe
        src="https://www.zjjnks.cn/keyunit"
        id="bi_iframe_5"
        frameborder="0"
        @load="adjustIframe('bi_iframe_5')"
      ></iframe>
    </div>
    <div class="content">
      <iframe
        src="https://www.zjjnks.cn/keyunit"
        id="bi_iframe_6"
        frameborder="0"
        @load="adjustIframe('bi_iframe_6')"
      ></iframe>
    </div>
    <div class="content">
      <iframe
        src="https://www.zjjnks.cn/keyArea/"
        id="bi_iframe_7"
        frameborder="0"
        @load="adjustIframe('bi_iframe_7')"
      ></iframe>
    </div>
    <div class="content">
      <iframe
        src="https://www.zjjnks.cn/keyArea/"
        id="bi_iframe_8"
        frameborder="0"
        @load="adjustIframe('bi_iframe_8')"
      ></iframe>
    </div>
    <div class="content">
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
const adjustIframe = (domName) => {
  var iframe = document.getElementById(domName);
  //   获取父级容器的宽高
  //也就是弹框在样式中设置的高宽 最好给固定值 在这里可以直接拿到
  var containerWidth = window.innerWidth / 3;
  var containerHeight = window.innerHeight / 3;
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
</style>
