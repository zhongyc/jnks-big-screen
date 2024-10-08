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
    <iframe src="https://www.zjjnks.cn/swat/hangzhou/" frameborder="0"></iframe>
    <iframe src="https://www.zjjnks.cn/swat/hangzhou/" frameborder="0"></iframe>
    <iframe src="https://www.zjjnks.cn/swat/hangzhou/" frameborder="0"></iframe>
    <iframe src="https://www.zjjnks.cn/keyunit" frameborder="0"></iframe>
    <iframe src="https://www.zjjnks.cn/keyunit" frameborder="0"></iframe>
    <iframe src="https://www.zjjnks.cn/keyunit" frameborder="0"></iframe>
    <iframe src="https://www.zjjnks.cn/keyArea/" frameborder="0"></iframe>
    <iframe src="https://www.zjjnks.cn/keyArea/" frameborder="0"></iframe>
    <iframe src="https://www.zjjnks.cn/keyArea/" frameborder="0"></iframe>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
