<script setup>
import { onMounted } from 'vue'
import { useIndustryStore } from '@/store/app' // pinia 导航
const industryStore = useIndustryStore()

onMounted(() => {
    window.addEventListener('resize', onWindowResize, false)
    onWindowResize()
})
/**
 * @description: 页面尺寸变化
 */
const onWindowResize = () => {
    let obj = {
        width: document.documentElement.clientWidth || document.body.clientWidth,
        height: document.documentElement.clientHeight || document.body.clientHeight
    }
    industryStore.setPageSize(obj)
}
</script>

<template>
    <div id="app-box">
        <RouterView />
        <div class="support">技术支持©杰能科世智能安全科技(杭州)有限公司</div>
        <audio id="eventAudio" autoplay="autoplay" src></audio>
    </div>
</template>
<style lang="scss">
@import '/fonts/fonts.css';
#app-box {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
    background-color: #041427;
    .support {
        position: absolute;
        bottom: 1.5%;
        right: 1%;
        font-weight: 400;
        font-size: 14px;
        color: #ffffff;
        z-index: 999;
        letter-spacing: 4px;
    }
}
</style>
