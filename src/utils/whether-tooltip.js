/**
 * 指令 whether-tooltip
 * 使用方式：<div v-whether-tooltip></div>
 */
import { createApp } from 'vue'
import { ElTooltip } from 'element-plus'
export default {
    mounted: function (el, binding) {
        setTimeout(() => {
            createTooltip(el, binding)
        }, 500)
    },
    updated(el, binding) {
        createTooltip(el, binding)
    }
}
/**
 * 创建tooltip，这里采用element-plus的tooltip组件
 * @param el
 * @param binding
 */
const createTooltip = (el, binding) => {
    /**
     * 判断是否显示tooltip
     * 如果传值为true，则显示tooltip
     * 否则，autoShowToolTip 自动判断是否显示tooltip
     */
    const isShow = autoShowToolTip(el, binding)
    // 创建组件，显示tooltip
    if (isShow) {
        // 判断是否有根元素，存在，则移除
        const elRoot = document.querySelector('#_tooltip_root')
        if (elRoot) {
            elRoot.remove()
        }
        // 初始化 根元素
        el._tiproot = null
        el._tipapp = null
        const id = '_tooltip_root'
        const _tiproot = document.createElement('div')
        _tiproot.id = id
        _tiproot.classList.add('_tiproot')
        // 通过createApp 创建实例组件
        const _tipapp = createApp(ElTooltip, {
            trigger: 'hover',
            virtualRef: el,
            rawContent: true,
            placement: 'top',
            virtualTriggering: true,
            content: el.innerHTML,
            enterable: false,
            hideAfter: 0,
            appendTo: el.parentNode.parentNode
        })
        el._tiproot = _tiproot
        el._tipapp = _tipapp
        // body添加根元素
        document.body.appendChild(_tiproot)
        // 将新组件挂载到根元素
        if (_tipapp && _tiproot) {
            el._tipapp.mount('#' + id)
        }
    }
}
/**
 * 判断宽度和高度是否自动展示提示内容
 * @param el
 * @param binding
 * @returns
 */
const autoShowToolTip = (el, binding) => {
    /**
     * 通过创建range 获取元素内容的宽度和高度
     */
    const range = document.createRange()
    range.setStart(el, 0)
    if (el && el.childNodes.length) {
        range.setEnd(el, el.childNodes.length)
    }
    let rangeWidth = range.getBoundingClientRect().width
    // let rangeHeight = range.getBoundingClientRect().height
    const offsetWidth = rangeWidth - Math.floor(rangeWidth)
    // const offsetHeight = rangeHeight - Math.floor(rangeHeight)
    if (offsetWidth < 0.001) {
        rangeWidth = Math.floor(rangeWidth)
    }
    // if (offsetHeight < 0.001) {
    //     rangeHeight = Math.floor(rangeHeight)
    // }
    // 计算元素在页面中的宽度、高度
    const style = window.getComputedStyle(el, null)
    const maxWidth = parseInt(style.width || style.width) || 0
    // const maxHeight = parseInt(style['height'])
    // 获取元素的padding
    const pLeft = style['padding-left']
    const pRight = style['padding-left']
    // const pTop = style['padding-left']
    // const pBottom = style['padding-left']
    // 计算最终宽度、高度
    const finalWidth = rangeWidth + parseInt(pLeft) + parseInt(pRight)
    // const finalHeight = rangeHeight + parseInt(pTop) + parseInt(pBottom)
    if (finalWidth > maxWidth) {
        return true
    }
    return false
}
