<!--
 * @Author: liz
 * @Date: 2024-10-08 09:43:03
 * @LastEditTime: 2024-10-09 09:55:40
 * @LastEditors: liz
 * @Description: 
 * @FilePath: \jnks-big-screen\src\views\Home\index.vue
-->
<template>
    <div class="container-box">
        <div class="container">
            <div v-for="item in urlList" :key="item.uid" class="content">
                <div class="empty-box">
                    <el-empty description="暂无选择" />
                </div>
                <!-- <iframe
            src="about: blank"
            :id="item.id"
            frameborder="0"
            @load="adjustIframe(item)"
            ></iframe> -->
            </div>
        </div>
        <el-drawer
            v-model="drawer"
            title="配置项"
            append-to-body
            :with-header="false"
            class="drawer-box"
        >
            <div class=""></div>
        </el-drawer>
        <div class="options-box" @click="configureLayout"></div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const layoutOption = [
    {
        name: '1:1',
        value: '1:1'
    },
    {
        name: '2:1',
        value: '2:1'
    },
    {
        name: '3:1',
        value: '3:1'
    }
]
const urlList = [
    {
        url: 'https://www.zjjnks.cn/swat/hangzhou/',
        id: 'bi_iframe_1',
        uid: 1
    },
    {
        url: 'https://www.zjjnks.cn/swat/wenzhou/',
        id: 'bi_iframe_2',
        uid: 2
    },
    {
        url: 'https://www.zjjnks.cn/swat/hangzhou/',
        id: 'bi_iframe_3',
        uid: 3
    },
    {
        url: 'https://www.zjjnks.cn/keyArea',
        id: 'bi_iframe_4',
        uid: 4
    },
    {
        url: 'https://www.zjjnks.cn/keyArea',
        id: 'bi_iframe_5',
        uid: 5
    },
    {
        url: 'http://10.1.0.5:5173/zsCompany/',
        id: 'bi_iframe_6',
        uid: 6
    },
    {
        url: 'http://10.1.0.5:5173/zsCompany/',
        id: 'bi_iframe_7',
        uid: 7
    },
    {
        url: 'http://10.1.0.5:5173/zsCompany/',
        id: 'bi_iframe_8',
        uid: 8
    },
    {
        url: 'http://10.1.0.5:5173/zsCompany/',
        id: 'bi_iframe_9',
        uid: 9
    }
]
onMounted(() => {})

/**
 * @description: 自适应布局
 * @param {*} info
 */
const adjustIframe = info => {
    setTimeout(() => {
        let iframe = document.getElementById(info.id)
        if (iframe.src == 'about: blank') {
            iframe.src = info.url
        } else {
            //   获取父级容器的宽高
            //也就是弹框在样式中设置的高宽 最好给固定值 在这里可以直接拿到
            let containerWidth = window.innerWidth / 3
            let containerHeight = window.innerHeight / 3
            // 计算缩放比例
            let scaleWidth = containerWidth / window.innerWidth
            let scaleHeight = containerHeight / window.innerHeight
            let scale = Math.min(scaleWidth, scaleHeight) // 选择较小的缩放比例以保持宽高比
            // 应用缩放和定位
            iframe.style.transformOrigin = 'top left'
            iframe.style.transform = `scale(${scale}) translate(-50%, -50%)`
            // 如果需要，可以调整iframe的宽高以匹配容器
            // 但由于我们使用了scale，所以通常不需要这样做
            iframe.style.width = `${window.innerWidth}px`
            iframe.style.height = `${window.innerHeight}px`
        }
    }, 1000)
}
const drawer = ref(false)
const configureLayout = () => {
    drawer.value = true
}
</script>

<style lang="scss" scoped>
.container-box {
    width: 100%;
    height: 100%;
    .container {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        background-color: $bg-color;
        position: relative;
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
    .options-box {
        width: 20px;
        height: 20px;
        border: 1px solid seagreen;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(-50%, -50%);
        cursor: pointer;
    }
}
</style>
<style lang="scss">
.drawer-box {
    background-color: $bg-color;
}
</style>
