/*
 * @Author: liz
 * @Date: 2024-08-16 17:10:32
 * @LastEditTime: 2024-08-21 11:46:43
 * @LastEditors: liz
 * @Description:
 * @FilePath: \jnks-anhui-aoti\src\utils\cookie.js
 */
import { setAuthRsa } from './rsa'
import { decrypt } from './crypto'
import { useLoginStore } from '@/store/login'
const loginStore = useLoginStore()
/**
 * @description: 获取token
 */
export const getToken = () => {
    let token = loginStore.state.token
    return token
}
/**
 * @description: 移除token
 */
export function removeToken() {
    loginStore.setToken('')
    setTimeout(() => {
        location.reload()
    }, 1000)
}

/**
 * @description: 获取加密后授权码
 */
export function getAuth() {
    let auth = ''
    let authToken = ''
    authToken = loginStore.state.AnHui_auth_code
    if (authToken == undefined || authToken == null || authToken.length < 3) {
        let CodeAH = loginStore.state.verificationCodeAH
        if (CodeAH) {
            let storage = JSON.parse(decrypt(CodeAH))
            auth = setAuthRsa(storage.value)
            loginStore.setAnHuiAuthCode(auth)
        }
    } else {
        auth = authToken
    }
    return auth
}
/**
 * @description: 移除加密授权码
 */
export function removeAuthorization() {
    loginStore.setAnHuiAuthCode('')
    loginStore.setverificationCodeAH('')
}
