import drag from './drag' // 引入指令

const directives = {
    // 指令对象
    drag
}

export default {
    install(app) {
        Object.keys(directives).forEach(key => {
            app.directive(key, directives[key])
        })
    }
}
