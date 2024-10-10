<!--
 * @Author: liz
 * @Date: 2024-10-09 10:28:33
 * @LastEditTime: 2024-10-10 11:28:04
 * @LastEditors: liz
 * @Description: 布局配置
 * @FilePath: \jnks-big-screen\src\views\Home\layoutConfiguration.vue
-->
<template>
    <div class="drawer-content">
        <div class="title">
            <div class="gradient_text">布局预览</div>
        </div>
        <div class="layout-examples" :class="`layout-examples-${examplesLayoutOption}`">
            <div
                v-for="item in urlList"
                :key="item.uid"
                class="content"
                :class="`content-${item.index}`"
            >
                <img v-if="item.bgUrl != ''" class="img" :src="require(item.bgUrl)" alt="" />
                <div class="serial-number vertical-horizontal-center">{{ item.index }}</div>
            </div>
        </div>
        <div class="layout-options">
            <!-- <el-radio-group v-model="examplesLayoutOption" @change="changeLayout">
                <el-radio-button label="布局一" value="1" />
                <el-radio-button label="布局二" value="2" />
                <el-radio-button label="布局二" value="3" />
                <el-radio-button label="布局四" value="4" />
                <el-radio-button label="布局五" value="5" />
                <el-radio-button label="布局六" value="6" />
            </el-radio-group> -->
            <template v-for="item in layoutList" :key="item.index">
                <div class="layout_item" @click="changeLayoutType(item.index)">
                    <img
                        class="layout_img"
                        :src="examplesLayoutOption == item.index ? item.activeUrl : item.url"
                        alt=""
                    />
                    <div class="layout_title">{{ item.title }}</div>
                </div>
            </template>
        </div>
        <div class="title"><div class="gradient_text">模块分配</div></div>
        <el-scrollbar class="layout-distribute-box">
            <div
                v-for="item in urlList"
                :key="item.uid"
                class="box-li"
                :class="item.platformName ? 'box-li-selected' : 'box-li-default'"
            >
                <div class="serial-number vertical-horizontal-center">
                    {{ '模块' + item.index }}
                </div>
                <div class="name text-ellipsis">{{ item.platformName }}</div>
                <img
                    class="box-li-img"
                    src="@/assets/img/detail.png"
                    alt=""
                    @click="configuration(item)"
                    title="选择平台"
                />
                <!-- <el-button type="primary" :icon="'Operation'" circle @click="configuration(item)" /> -->
            </div>
        </el-scrollbar>

        <div class="footer-btn">
            <div class="cancel-btn" @click="operate(1)"></div>
            <div class="apply-btn" @click="operate(3)"></div>
        </div>

        <!-- 模块分配抽屉 -->
        <el-drawer v-model="innerDrawer" append-to-body :with-header="false" class="drawer-box">
            <div class="inner-drawer-content">
                <el-scrollbar class="platform-box">
                    <!-- <el-radio-group
                        v-model="platformId"
                        class="platform-list"
                        @change="changePlatform"
                    >
                        <el-radio
                            v-for="item in platformList"
                            :key="item.platformId"
                            :value="item.platformId"
                            size="large"
                            class="box-li"
                            :class="
                                platformId == item.platformId
                                    ? 'box-li-activebg'
                                    : 'box-li-defaultbg'
                            "
                        >
                            <div class="box-name">{{ item.platformName }}</div>
                            <img class="box-img" :src="require(item.bgUrl)" alt="" />
                        </el-radio>
                    </el-radio-group> -->
                    <div class="platform-list">
                        <div
                            v-for="item in platformList"
                            :key="item.platformId"
                            class="box-li"
                            :class="
                                platformId == item.platformId
                                    ? 'box-li-activebg'
                                    : 'box-li-defaultbg'
                            "
                            @click="onSelectPlat(item.platformId)"
                        >
                            <div class="box-name">{{ item.platformName }}</div>
                            <img class="box-img" :src="require(item.bgUrl)" alt="" />
                        </div>
                    </div>
                </el-scrollbar>
                <div class="footer-btn">
                    <!-- 取消 -->
                    <div class="cancel-btn" @click="operate(2)"></div>
                    <!-- 确认呢 -->
                    <div class="confirm-btn" @click="operate(4)"></div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { require } from '@/utils/require.js'
const examplesLayoutOption = ref('1')
const emits = defineEmits(['changeLayout'])
onMounted(() => {
    let configurationList = localStorage.getItem(
        'command_room_big_screnn_layout_configuration_list'
    )
    let configurationId = localStorage.getItem('command_room_big_screnn_layout_configuration_id')
    if (configurationList && configurationList.length > 10) {
        urlList.value = JSON.parse(configurationList)
        examplesLayoutOption.value = configurationId
    }
})
const urlList = ref([
    {
        uid: 1,
        index: 1,
        url: '',
        platformName: '',
        platformId: 0,
        bgUrl: '',
        show: false
    },
    {
        uid: 2,
        index: 2,
        url: '',
        platformName: '',
        platformId: 0,
        bgUrl: '',
        show: false
    },
    {
        uid: 3,
        index: 3,
        url: '',
        platformName: '',
        platformId: 0,
        bgUrl: '',
        show: false
    },
    {
        uid: 4,
        index: 4,
        url: '',
        platformName: '',
        platformId: 0,
        bgUrl: '',
        show: false
    }
])
/**
 * @description: 切换布局
 */
const changeLayoutType = index => {
    examplesLayoutOption.value = index
    switch (Number(examplesLayoutOption.value)) {
        case 1:
            if (urlList.value.length > 4) {
                urlList.value.splice(4)
            }
            break
        case 2:
        case 3:
        case 4:
        case 5:
            if (urlList.value.length > 6) {
                urlList.value.splice(6)
            } else {
                urlList.value.push(
                    ...[
                        {
                            uid: 5,
                            index: 5,
                            url: '',
                            platformName: '',
                            bgUrl: '',
                            show: false
                        },
                        {
                            uid: 6,
                            index: 6,
                            url: '',
                            platformName: '',
                            bgUrl: '',
                            show: false
                        }
                    ]
                )
            }
            break
        case 6:
            if (urlList.value.length == 4) {
                urlList.value.push(
                    ...[
                        {
                            uid: 5,
                            index: 5,
                            url: '',
                            platformName: '',
                            bgUrl: '',
                            show: false
                        },
                        {
                            uid: 6,
                            index: 6,
                            url: '',
                            platformName: '',
                            bgUrl: '',
                            show: false
                        },
                        {
                            uid: 7,
                            index: 7,
                            url: '',
                            platformName: '',
                            bgUrl: '',
                            show: false
                        },
                        {
                            uid: 8,
                            index: 8,
                            url: '',
                            platformName: '',
                            bgUrl: '',
                            show: false
                        },
                        {
                            uid: 9,
                            index: 9,
                            url: '',
                            platformName: '',
                            bgUrl: '',
                            show: false
                        }
                    ]
                )
            } else if (urlList.value.length == 6) {
                urlList.value.push(
                    ...[
                        {
                            uid: 7,
                            index: 7,
                            url: '',
                            platformName: '',
                            bgUrl: '',
                            show: false
                        },
                        {
                            uid: 8,
                            index: 8,
                            url: '',
                            platformName: '',
                            bgUrl: '',
                            show: false
                        },
                        {
                            uid: 9,
                            index: 9,
                            url: '',
                            platformName: '',
                            bgUrl: '',
                            show: false
                        }
                    ]
                )
            }
            break
        default:
            break
    }
}
const innerDrawer = ref(false) // 平台模块分配 抽屉
const currentChooseUid = ref('') // 当前配置 模块 uid
const platformList = ref([
    {
        url: 'https://www.zjjnks.cn/swat/hangzhou/navigation',
        platformName: '杭州市公安局低空安保指挥调度平台',
        bgUrl: 'platformImg/swat-hangzhou.png',
        platformId: 1
    },
    // {
    //     url: 'https://www.zjjnks.cn/swat/zhoushan/DailyInspection',
    //     platformName: '舟山市公安局无人机监管平台',
    //     bgUrl: 'platformImg/swat-zhoushan.png',
    //     platformId: 2
    // },
    // {
    //     url: 'https://www.zjjnks.cn/swat/westlake/command',
    //     platformName: '浙江省杭州市民用无人机公共安全监管平台',
    //     bgUrl: 'platformImg/swat-westlake.png',
    //     platformId: 3
    // },
    {
        url: 'https://www.zjjnks.cn/keyunit/',
        platformName: '重点区域（单位）无人机公共安全监管指控系统',
        bgUrl: 'platformImg/keyunit.png',
        platformId: 4
    },
    {
        url: 'https://www.zjjnks.cn/keyArea/',
        platformName: '重点区域（单位）无人机公共安全监管指控系统(三维版)',
        bgUrl: 'platformImg/keyArea.png',
        platformId: 5
    },
    // {
    //     url: 'https://www.zjjnks.cn/province/cockpit',
    //     platformName: '浙江省民用无人机公共监管平台',
    //     bgUrl: 'platformImg/province.png',
    //     platformId: 6
    // },
    // {
    //     url: 'https://www.zjjnks.cn/asianGames/command',
    //     platformName: '2022杭州亚运低空安全监管平台',
    //     bgUrl: 'platformImg/asianGames.png',
    //     platformId: 7
    // },
    // {
    //     url: 'https://www.zjjnks.cn/asianGames/district/command',
    //     platformName: '2022杭州亚运低空安全监管平台(区平台)',
    //     bgUrl: 'platformImg/asianGames-district.png',
    //     platformId: 8
    // },
    // {
    //     url: 'https://www.zjjnks.cn/asianGames/city/command',
    //     platformName: '2022杭州亚运低空安全监管平台(市平台)',
    //     bgUrl: 'platformImg/asianGames-city.png',
    //     platformId: 9
    // },
    // {
    //     url: 'https://www.zjjnks.cn/asianGames/province/cockpit',
    //     platformName: '2022杭州亚运低空安全监管平台(省平台)',
    //     bgUrl: 'platformImg/asianGames-province.png',
    //     platformId: 10
    // },
    // {
    //     url: 'https://www.zjjnks.cn/asianWinterGames/command',
    //     platformName: '哈尔滨市民用无人机监管平台',
    //     bgUrl: 'platformImg/asianWinterGames.png',
    //     platformId: 11
    // },
    // {
    //     url: 'https://www.zjjnks.cn/patrolPolice/',
    //     platformName: '巡特警指挥调度平台',
    //     bgUrl: 'platformImg/patrolPolice.png',
    //     platformId: 12
    // },
    // {
    //     url: 'https://www.zjjnks.cn/airservices',
    //     platformName: '麒云低空服务管理系统',
    //     bgUrl: 'platformImg/airservices.png',
    //     platformId: 13
    // },
    {
        url: 'https://www.zjjnks.cn/gov-air-service',
        platformName: '临平区低空飞行控制系统',
        bgUrl: 'platformImg/gov-air-service.png',
        platformId: 14
    },
    {
        url: 'https://www.zjjnks.cn/nationwide/',
        platformName: '杰能科世运营可视化看板',
        bgUrl: 'platformImg/nationwide.png',
        platformId: 15
    }
    // {
    //     url: 'https://www.zjjnks.cn/jnksfkwz/#/chart',
    //     platformName: '重点目标单位督查抄报平台全景舱',
    //     bgUrl: 'platformImg/jnksfkwzChart.png',
    //     platformId: 16
    // }
    // {
    //     url: 'http://61.191.199.84:18080/keyArea/login?key=66ba85aba5e651bcef4b7a8f795469489ebebf72bca5a960b478423d3fe42cfd116c8023b7cc0de80324b9c02d96ca9f',
    //     platformName: '安徽奥体试点',
    //     bgUrl: 'platformImg/anhui.png',
    //     platformId: 17
    // }
    // {
    //     url: 'https://www.zjjnks.cn/jnksfkwz',
    //     platformName: '重点目标单位督查抄报平台',
    //     bgUrl: 'jnksfkwz'
    // }
])

const layoutList = ref([
    {
        url: require('img/layout-1.png'),
        activeUrl: require('img/layout-active-1.png'),
        title: '布局一',
        index: 1
    },
    {
        url: require('img/layout-2.png'),
        activeUrl: require('img/layout-active-2.png'),
        title: '布局二',
        index: 2
    },
    {
        url: require('img/layout-3.png'),
        activeUrl: require('img/layout-active-3.png'),
        title: '布局三',
        index: 3
    },
    {
        url: require('img/layout-4.png'),
        activeUrl: require('img/layout-active-4.png'),
        title: '布局四',
        index: 4
    },
    {
        url: require('img/layout-5.png'),
        activeUrl: require('img/layout-active-5.png'),
        title: '布局五',
        index: 5
    },
    {
        url: require('img/layout-6.png'),
        activeUrl: require('img/layout-active-6.png'),
        title: '布局六',
        index: 6
    }
])
/**
 * @description: 配置当前模块
 * @param {*} info
 */
const configuration = info => {
    currentChooseUid.value = info.uid
    innerDrawer.value = true
    platformId.value = ''
    currentChoosePlatform.value = {}
}
const platformId = ref('')
const currentChoosePlatform = ref({})
/**
 * @description: 切换选择的平台
 */
const changePlatform = () => {
    currentChoosePlatform.value = platformList.value.find(item => {
        return item.platformId === platformId.value
    })
}
/**
 * @description: 切换选择的平台
 */
const onSelectPlat = id => {
    platformId.value = id
}
/**
 * @description: 抽屉操作
 * @param {*} type 操作类型
 */
const operate = type => {
    let updatedUrlList = []
    switch (type) {
        case 1:
            // 外层抽屉取消
            emits('changeLayout', false)
            break
        case 2:
            // 内层抽屉取消
            platformId.value = ''
            currentChoosePlatform.value = {}
            innerDrawer.value = false
            break
        case 3:
            // 外层抽屉确认
            localStorage.setItem(
                'command_room_big_screnn_layout_configuration_list',
                JSON.stringify(urlList.value)
            )
            localStorage.setItem(
                'command_room_big_screnn_layout_configuration_id',
                examplesLayoutOption.value
            )
            currentChooseUid.value = ''
            emits('changeLayout', false, true)
            break
        case 4:
            // 内层抽屉确认
            updatedUrlList = urlList.value.map(item => {
                if (item.uid === currentChooseUid.value) {
                    return {
                        ...item,
                        ...currentChoosePlatform.value
                    }
                }
                return item
            })
            urlList.value = updatedUrlList
            innerDrawer.value = false
            break

        default:
            break
    }
}
</script>

<style lang="scss" scoped>
.drawer-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    box-sizing: border-box;
    .title {
        width: 354px;
        height: 33px;
        text-shadow: 0px 2px 4px #024473;
        position: relative;
        background: url('@/assets/img/title-bg.png');
        background-size: 100% 100%;
        .gradient_text {
            position: absolute;
            width: 80px;
            font-size: 20px;
            color: #ffffff;
            font-family: Microsoft YaHei;
            font-weight: bold;
            // background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, #78ccff 100%);
            background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 50%, #78ccff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            top: 0;
            left: 50%;
            text-align: center;
            transform: translateX(-50%);
            z-index: 3;
        }
    }
    .layout-options {
        width: 100%;
        padding: 0 100px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .layout_item {
            width: 40px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            cursor: pointer;
            .layout_img {
                width: 22px;
                height: 22px;
                margin-bottom: 10px;
            }
            .layout_title {
                font-family: Microsoft YaHei;
                font-weight: 400;
                font-size: 12px;
                color: #ffffff;
                text-shadow: 0px 2px 4px #024473;
                background: linear-gradient(0deg, rgba(255, 255, 255, 0.5) 0%, #78ccff 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
        }
    }
    .layout-examples {
        width: 100%;
        height: 40%;
        padding: 10px;
        border: 1px solid #409eff;
        .content {
            width: 100%;
            height: 100%;
            border: 1px solid #152e3f;
            background: #061823;
            position: relative;
            .img {
                width: 100%;
                height: 100%;
            }
            .serial-number {
                width: 50px;
                height: 50px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                font-size: 28px;
                font-weight: bolder;
                color: #fff;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }
    .layout-distribute-box {
        width: 100%;
        height: 30%;
        .box-li {
            width: 100%;
            height: 32px;
            margin: 10px auto;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            box-sizing: border-box;
            .serial-number {
                font-size: 14px;
                color: #fff;
            }
            .name {
                font-size: 14px;
                color: #fff;
            }
        }
        .box-li-default {
            background: url('@/assets/img/module-default.png');
            background-size: 100% 100%;
        }
        .box-li-selected {
            background: url('@/assets/img/module-selected.png');
            background-size: 100% 100%;
        }
        .box-li-img {
            cursor: pointer;
        }
    }
    .footer-btn {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-evenly;
        .cancel-btn {
            width: 119px;
            height: 48px;
            background: url('@/assets/img/cancel.png');
            cursor: pointer;
        }
        .apply-btn {
            width: 119px;
            height: 48px;
            background: url('@/assets/img/apply.png');
            cursor: pointer;
        }
    }

    .layout-examples-1 {
        /* 设置元素为网格容器 */
        display: grid;
        /* 定义2列，每列宽度为1fr（分数单位），即三等分可用空间 */
        grid-template-columns: repeat(2, 1fr);
        /* 定义2行，每行高度为1fr（分数单位），即三等分可用空间 */
        grid-template-rows: repeat(2, 1fr);
        /* 列与列之间有10像素的间隔 */
        grid-column-gap: 10px;
        /* 行与行之间有10像素的间隔 */
        grid-row-gap: 10px;
    }
    .layout-examples-2 {
        /* 设置元素为网格容器 */
        display: grid;
        /* 定义3列，每列宽度为1fr（分数单位），即三等分可用空间 */
        grid-template-columns: repeat(3, 1fr);
        /* 定义3行，每行高度为1fr（分数单位），即三等分可用空间 */
        grid-template-rows: repeat(3, 1fr);
        /* 列与列之间有10像素的间隔 */
        grid-column-gap: 10px;
        /* 行与行之间有10像素的间隔 */
        grid-row-gap: 10px;
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
    .layout-examples-3 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-column-gap: 10px;
        grid-row-gap: 10px;
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
    .layout-examples-4 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-column-gap: 10px;
        grid-row-gap: 10px;
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
    .layout-examples-5 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-column-gap: 10px;
        grid-row-gap: 10px;
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
    .layout-examples-6 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-column-gap: 10px;
        grid-row-gap: 10px;
    }
}

.vertical-horizontal-center {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
}
</style>
<style lang="scss">
.drawer-box {
    padding: 0;
}
.inner-drawer-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    .platform-box {
        width: 100%;
        height: 95%;
        .platform-list {
            width: 100%;
            margin: 0 auto;
            display: flex;
            justify-content: flex-end;
            flex-wrap: wrap;
            box-sizing: border-box;
        }
        .box-li {
            width: 95%;
            margin-bottom: 20px;
            padding: 10px 20px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            .box-name {
                width: 50%;
                font-size: 14px;
                line-height: 16px;
                font-weight: bold;
                color: #fff;
                white-space: normal;
                letter-spacing: 1px;
                // width: 224px;
            }
            .box-img {
                width: 192px;
                height: 108px;
            }
        }
        .box-li-defaultbg {
            background: linear-gradient(
                90deg,
                rgba(74, 198, 255, 0.02),
                rgba(74, 198, 255, 0.1),
                rgba(94, 169, 233, 0.02)
            );
            // border-top: 1px solid transparent;
            // border-bottom: 1px solid transparent;
        }
        .box-li-activebg {
            background: linear-gradient(
                90deg,
                rgba(74, 198, 255, 0.06),
                rgba(74, 198, 255, 0.3),
                rgba(94, 169, 233, 0.06)
            );
            position: relative;
            // border-top: 1px solid;
            // border-bottom: 1px solid;
            // border-image: linear-gradient(90deg, #3de9ff, #3dcbff, #3de9ff) 1 1;
        }
        .box-li-activebg::before {
            content: '';
            position: absolute;
            top: -1px;
            left: 0;
            width: 100%;
            height: 1px;
            background: linear-gradient(
                to right,
                rgba(255, 255, 255, 0) 10%,
                #3dcbff 50%,
                rgba(255, 255, 255, 0) 100%
            );
        }
        .box-li-activebg::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 1px;
            background: linear-gradient(
                to right,
                rgba(255, 255, 255, 0) 10%,
                #3dcbff 50%,
                rgba(255, 255, 255, 0) 100%
            );
        }
        .el-radio__label {
            width: 98%;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: space-around;
        }
        .el-radio.el-radio--large {
            height: auto;
            margin-right: 0;
            margin-left: 0;
        }
    }
    .footer-btn {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-evenly;
        .cancel-btn {
            width: 119px;
            height: 48px;
            background: url('@/assets/img/cancel.png');
            background-size: 100% 100%;
            cursor: pointer;
        }
        .confirm-btn {
            width: 119px;
            height: 48px;
            background: url('@/assets/img/confirm.png');
            background-size: 100% 100%;
            cursor: pointer;
        }
    }
}
</style>
