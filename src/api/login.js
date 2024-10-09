import { service } from './request'
/**
 * @description: 登录
 * @param {*} username 用户名
 * @param {*} password 密码
 * @param {*} type 登录类型
 */
export function Login(data) {
    return service({
        url: '/admin/sys/login',
        method: 'POST',
        data
    })
}