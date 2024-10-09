/*
 * @Author: kls
 * @Date: 2023-04-18 15:47:49
 * @LastEditTime: 2024-08-20 20:22:49
 * @LastEditors: liz
 * @Description:
 * @FilePath: \jnks-anhui-aoti\src\utils\drag.js
 */
//使用Vue.directive()定义一个全局指令
//1.参数一：指令的名称，定义时指令前面不需要写v-
//2.参数二：是一个对象，该对象中有相关的操作函数
//3.在调用的时候必须写v-
export default {
    //1.指令绑定到元素上回立刻执行bind函数，只执行一次
    //2.每个函数中第一个参数永远是el，表示绑定指令的元素，el参数是原生js对象
    //3.通过el.focus()是无法获取焦点的，因为只有插入DOM后才生效
    //inserted表示一个元素，插入到DOM中会执行inserted函数，只触发一次
    // mounted(el, binding, vnode, prevVnode) {
    mounted(el) {
        //只选中头部才能拖动
        const dialogHeaderEl = el.querySelector('#draggable-area')

        dialogHeaderEl.onmousedown = function (e) {
            // 鼠标下按拖动，页面禁止选中文字（复制文本）
            document.onselectstart = function () {
                return false
            }
            let disx = e.pageX - el.offsetLeft
            let disy = e.pageY - el.offsetTop
            document.onmousemove = function (e) {
                //设置边界
                let x = e.pageX - disx < 250 ? 250 : e.pageX - disx > 1550 ? 1550 : e.pageX - disx
                let y = e.pageY - disy < 15 ? 15 : e.pageY - disy > 700 ? 700 : e.pageY - disy
                el.style.left = x + 'px'
                el.style.top = y + 'px'
            }
            document.onmouseup = function () {
                document.onmousemove = document.onmouseup = null
                // 释放鼠标，页面恢复选中文字（复制文本）
                document.onselectstart = function () {
                    return true
                }
            }
        }
    }
    //当VNode更新的时候会执行updated，可以触发多次
    // unmounted(el, binding, vnode, prevVnode) {}
}
// export default drag
