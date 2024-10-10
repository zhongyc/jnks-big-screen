<!--
 * @Author: liz
 * @Date: 2024-10-08 09:43:03
 * @LastEditTime: 2024-10-10 14:15:25
 * @LastEditors: liz
 * @Description: 仪表盘
 * @FilePath: \jnks-big-screen\src\views\Home\index.vue
-->
<template>
    <div class="container-box">
        <div class="container" :class="`container-${layoutExamplesId}`">
            <div
                v-for="item in urlList"
                :key="item.uid"
                class="content"
                :class="`content-${item.index}`"
            >
                <div v-if="!item.show" class="empty-box">
                    <el-empty description="暂无选择" />
                </div>
                <iframe
                    :id="`bi_iframe_${item.index}`"
                    :src="item.url == '' ? 'about:blank' : item.url"
                    frameborder="0"
                    @load="adjustIframe(item)"
                ></iframe>
            </div>
        </div>
        <el-drawer
            v-model="drawer"
            title="配置项"
            append-to-body
            :with-header="false"
            class="drawer-box"
        >
            <LayoutConfiguration
                v-if="drawer"
                ref="layoutConfiguration"
                @change-layout="configureLayout"
            />
        </el-drawer>
        <div class="options-box" @click="configureLayout(true)"></div>
        <div class="fixed_right_side"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import LayoutConfiguration from './layoutConfiguration.vue'
import { useIndustryStore } from '@/store/app.js'
const industryStore = useIndustryStore()

const debounceReload = debounce(() => {
    location.reload()
}, 200)

watch(
    () => industryStore.pageSize.pageHeight,
    () => {
        debounceReload()
    }
)
watch(
    () => industryStore.pageSize.pageWidth,
    () => {
        debounceReload()
    }
)
const layoutExamplesId = ref('1')
const urlList = ref([
    {
        uid: 1,
        index: 1,
        url: '',
        platformName: '',
        bgUrl: '',
        show: false
    },
    {
        uid: 2,
        index: 2,
        url: '',
        platformName: '',
        bgUrl: '',
        show: false
    },
    {
        uid: 3,
        index: 3,
        url: '',
        platformName: '',
        bgUrl: '',
        show: false
    },
    {
        uid: 4,
        index: 4,
        url: '',
        platformName: '',
        bgUrl: '',
        show: false
    }
])
/**
 * @description: 自适应布局
 * @param {*} info
 */
const adjustIframe = info => {
    setTimeout(() => {
        let iframe = document.getElementById(`bi_iframe_${info.index}`)
        if (iframe.src != 'about:blank') {
            let parentContainer = document.querySelector(`.content-${info.index}`)
            //   获取父级容器的宽高
            //也就是弹框在样式中设置的高宽 最好给固定值 在这里可以直接拿到
            let containerWidth = parentContainer.offsetWidth
            let containerHeight = parentContainer.offsetHeight

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
            if (!info.show && info.url != '') {
                urlList.value.map(item => {
                    if (item.uid === info.uid) {
                        info.show = true
                    }
                })
            }
        }
    }, 500)
}
const drawer = ref(false)
const layoutConfiguration = ref()
const configureLayout = (type, isReload = false) => {
    drawer.value = type
    if (!type && isReload) {
        let configurationList = localStorage.getItem(
            'command_room_big_screnn_layout_configuration_list'
        )
        let configurationId = localStorage.getItem(
            'command_room_big_screnn_layout_configuration_id'
        )
        if (configurationList && configurationList.length > 10) {
            urlList.value = []
            urlList.value = JSON.parse(configurationList)
            layoutExamplesId.value = configurationId
            setTimeout(() => {
                location.reload()
            }, 200)
        }
    }
}
onMounted(() => {
    let configurationList = localStorage.getItem(
        'command_room_big_screnn_layout_configuration_list'
    )
    let configurationId = localStorage.getItem('command_room_big_screnn_layout_configuration_id')
    if (configurationList && configurationList.length > 10) {
        urlList.value = []
        urlList.value = JSON.parse(configurationList)
        layoutExamplesId.value = configurationId
    }
})
// 组件卸载时清理定时器
onBeforeUnmount(() => {
    clearTimeout(debounceReload.timeout)
})
function debounce(func, wait) {
    let timeout
    return function () {
        const context = this
        const args = arguments
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            func.apply(context, args)
        }, wait)
    }
}
</script>

<style lang="scss" scoped>
.container-box {
    width: 100%;
    height: 100%;
    .container {
        width: 100%;
        height: 100%;
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
                z-index: 2;
                /* 初始不应用缩放 */
                transform: none;
                transition: transform 0.2s ease;
                /* 可选的过渡效果 */
            }
            .empty-box {
                width: 100%;
                height: 100%;
                background-color: $bg-color;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                align-items: center;
                justify-content: center;
                position: absolute;
                z-index: 10;
            }
        }
    }
    .options-box {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 50%;
        right: 0;
        z-index: 4;
        transform: translateY(-50%);
        cursor: pointer;
        background: url('@/assets/img/arrow.png') no-repeat;
        background-size: 100%;
    }
    .fixed_right_side {
        width: 79px;
        height: 100%;
        background: url('@/assets/img/right-side.png') no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 3;
    }
    .container-1 {
        /* 设置元素为网格容器 */
        display: grid;
        /* 定义2列，每列宽度为1fr（分数单位），即三等分可用空间 */
        grid-template-columns: repeat(2, 1fr);
        /* 定义2行，每行高度为1fr（分数单位），即三等分可用空间 */
        grid-template-rows: repeat(2, 1fr);
        /* 列与列之间有0像素的间隔 */
        grid-column-gap: 0px;
        /* 行与行之间有0像素的间隔 */
        grid-row-gap: 0px;
    }
    .container-2 {
        /* 设置元素为网格容器 */
        display: grid;
        /* 定义3列，每列宽度为1fr（分数单位），即三等分可用空间 */
        grid-template-columns: repeat(3, 1fr);
        /* 定义3行，每行高度为1fr（分数单位），即三等分可用空间 */
        grid-template-rows: repeat(3, 1fr);
        /* 列与列之间有0像素的间隔 */
        grid-column-gap: 0px;
        /* 行与行之间有1像素的间隔 */
        grid-row-gap: 0px;
        /* 定义内容区域的位置和大小 */
        .content-1 {
            /* 内容占据从第1行到第2行、从第1列到第2列的区域 */
            grid-area: 1 / 1 / 3 / 3;
        }
        .content-2 {
            /* 内容占据第1行、第3列的区域 */
            grid-area: 1 / 3 / 2 / 4;
        }
        .content-3 {
            /* 内容占据第2行、第3列的区域 */
            grid-area: 2 / 3 / 3 / 4;
        }
        .content-4 {
            /* 内容占据第3行、第3列的区域 */
            grid-area: 3 / 3 / 4 / 4;
        }
        .content-5 {
            /* 内容占据第3行、第2列的区域 */
            grid-area: 3 / 2 / 4 / 3;
        }
        .content-6 {
            /* 内容占据第3行、第1列的区域 */
            grid-area: 3 / 1 / 4 / 2;
        }
    }
    .container-3 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        .content-1 {
            grid-area: 1 / 1 / 2 / 2;
        }
        .content-2 {
            grid-area: 2 / 1 / 3 / 2;
        }
        .content-3 {
            grid-area: 1 / 2 / 3 / 4;
        }
        .content-4 {
            grid-area: 3 / 1 / 4 / 2;
        }
        .content-5 {
            grid-area: 3 / 2 / 4 / 3;
        }
        .content-6 {
            grid-area: 3 / 3 / 4 / 4;
        }
    }
    .container-4 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        .content-1 {
            grid-area: 1 / 1 / 2 / 2;
        }
        .content-2 {
            grid-area: 1 / 2 / 2 / 3;
        }
        .content-3 {
            grid-area: 1 / 3 / 2 / 4;
        }
        .content-4 {
            grid-area: 2 / 1 / 4 / 3;
        }
        .content-5 {
            grid-area: 2 / 3 / 3 / 4;
        }
        .content-6 {
            grid-area: 3 / 3 / 4 / 4;
        }
    }
    .container-5 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        .content-1 {
            grid-area: 1 / 1 / 2 / 2;
        }
        .content-2 {
            grid-area: 1 / 2 / 2 / 3;
        }
        .content-3 {
            grid-area: 1 / 3 / 2 / 4;
        }
        .content-4 {
            grid-area: 2 / 1 / 3 / 2;
        }
        .content-5 {
            grid-area: 3 / 1 / 4 / 2;
        }
        .content-6 {
            grid-area: 2 / 2 / 4 / 4;
        }
    }
    .container-6 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
    }
}
</style>
<style lang="scss">
.drawer-box {
    // background-color: $bg-color;
    background: url('@/assets/img/drawer-bg.png');
    background-size: 100% 100%;
}
.el-button + .el-button {
    margin-left: 0;
}
</style>
