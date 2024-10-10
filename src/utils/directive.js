import drag from './drag' // 引入指令
import whetherTooltip from './whether-tooltip'

const directives = {
    // 指令对象
    drag,
    whetherTooltip
}

export default {
    install(app) {
        Object.keys(directives).forEach(key => {
            app.directive(key, directives[key])
        })
    }
}
