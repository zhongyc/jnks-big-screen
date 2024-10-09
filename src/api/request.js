import axios from 'axios'
import { message } from '@/utils/resetMessage.js'
import { getToken, removeToken, getAuth } from '@/utils/cookie'
const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL, // api 的 base_url
    withCredentials: true, // 跨域请求时发送 cookies
    timeout: 600000 // request timeout
})

service.interceptors.request.use(
    config => {
        /* eslint-disable */
        let tokenValue = getToken()
        let authValue = getAuth()
        if (tokenValue != '') {
            config.headers['Authorization'] = tokenValue
        }
        // if (authValue) {
        //     config.headers['AuthorizeCode'] = authValue
        // }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code === 405) {
            message({
                message: res.message || 'error',
                type: 'error',
                duration: 5 * 1000
            })
        }
        return res
    },
    error => {
        if (error.response.data.code == '401') {
            removeToken()
            message({
                message: error.response.data.msg || '网络异常,请稍后重试',
                type: 'error',
                duration: 5 * 1000
            })
        }
        if (error.response.data.code == '405') {
            message({
                message: error.response.data.msg || '网络异常,请稍后重试',
                type: 'warning',
                duration: 5 * 1000
            })
        }
        if (error.response.data.code == '406') {
            message({
                showClose: true,
                message: error.response.data.msg || '网络异常,请稍后重试',
                type: 'error',
                duration: 0
            })
        }
        if (error.response.data.code == '555') {
            message({
                showClose: true,
                message: error.response.data.msg || '网络异常,请稍后重试',
                type: 'error',
                duration: 0
            })
        }
        return Promise.reject(error)
    }
)

export { service }
