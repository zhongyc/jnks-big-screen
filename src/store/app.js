/*
 * @Author: liz
 * @Date: 2023-12-19 10:30:34
 * @LastEditTime: 2024-09-03 09:45:57
 * @LastEditors: liz
 * @Description:
 * @FilePath: \jnks-anhui-aoti\src\store\app.js
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useIndustryStore = defineStore('industryStore', () => {
    const state = ref({
        industry: 0
    })
    const setIndustry = payload => {
        state.value.industry = payload
    }
    /* 弹窗出现的页面 */
    const popupType = ref({
        pageType: 'nav'
    })
    const setPopupType = payload => {
        popupType.value.pageType = payload
    }
    /* 页面状态 */
    const page = ref({
        pageStatus: 'cockpit'
    })
    const setPage = payload => {
        page.value.pageStatus = payload
    }
    const pageSize = ref({
        pageHeight: 0,
        pageWidth: 0
    })
    const setPageSize = payload => {
        pageSize.value.pageHeight = payload.height
        pageSize.value.pageWidth = payload.width
    }
    const popupsStatus = ref({
        disposalLiat: false
    })
    const setPopupsStatus = payload => {
        popupsStatus.value.disposalLiat = payload
    }
    /* 告警列表 */
    const droneActive = ref({
        droneActiveId: ''
    })
    const setDroneActiveId = payload => {
        droneActive.value.droneActiveId = payload
    }
    /* 设备信息相关 */
    const deviceStore = ref({
        deviceList: []
    })
    const deviceCountStore = ref({
        deviceCount: {}
    })
    const deviceBtnStore = ref({
        deviceCountBtn: {}
    })
    const setDeviceList = payload => {
        deviceStore.value.deviceList = payload
    }
    const setDeviceCount = payload => {
        deviceCountStore.value.deviceCount = payload
    }
    const setDeviceCountBtn = payload => {
        deviceBtnStore.value.deviceCountBtn = payload
    }
    return {
        state,
        setIndustry,
        page,
        setPage,
        pageSize,
        setPageSize,
        popupsStatus,
        setPopupsStatus,
        droneActive,
        setDroneActiveId,
        deviceStore,
        deviceCountStore,
        deviceBtnStore,
        setDeviceList,
        setDeviceCount,
        setDeviceCountBtn,
        popupType,
        setPopupType
    }
})
