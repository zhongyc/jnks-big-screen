/*
 * @Author: liz
 * @Date: 2023-12-19 10:30:34
 * @LastEditTime: 2024-10-10 11:40:11
 * @LastEditors: liz
 * @Description:
 * @FilePath: \jnks-big-screen\src\store\app.js
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useIndustryStore = defineStore('industryStore', () => {
    const layoutList = ref([])
    const setInfo = payload => {
        layoutList.value = payload
    }
    const pageSize = ref({
        pageHeight: 0,
        pageWidth: 0
    })
    const setPageSize = payload => {
        pageSize.value.pageHeight = payload.height
        pageSize.value.pageWidth = payload.width
    }
    return {
        layoutList,
        setInfo,
        pageSize,
        setPageSize
    }
})
