/*
 * @Author: liz
 * @Date: 2024-08-13 10:02:59
 * @LastEditTime: 2024-10-09 09:58:06
 * @LastEditors: liz
 * @Description:
 * @FilePath: \jnks-big-screen\src\main.js
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 引入模板的全局的样式
import '@/styles/index.scss'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { message } from './utils/resetMessage.js'
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import directives from '@/utils/directive.js'
//高德地图securityJsCode
window._AMapSecurityConfig = {
    securityJsCode: '092fb44211229b72aa112eb7dc87f86b'
}
// const pinia = createPinia()
// pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
// 注册elementplus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.provide('playAudio', function (fileName) {
    try {
        const buttonAudio = document.getElementById('eventAudio')
        buttonAudio.setAttribute('src', fileName)
        buttonAudio.play()
    } catch (error) {
        console.log(error)
    }
})
app.provide('$message', message)

app.use(createPinia())
app.use(ElementPlus, {
    locale: zhCn
})
app.use(directives)
app.use(router)

app.mount('#app')
