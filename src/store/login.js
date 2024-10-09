import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginStore = defineStore(
    'loginStore',
    () => {
        const state = ref({
            token: '', // 登录时的token
            verificationCodeAH: '', //前端加密的授权码
            AnHui_auth_code: '' //后端加密授权码
        })

        const setToken = payload => {
            state.value.token = payload
        }
        const setverificationCodeAH = payload => {
            state.value.verificationCodeAH = payload
        }
        const setAnHuiAuthCode = payload => {
            state.value.AnHui_auth_code = payload
        }

        return {
            state,
            setToken,
            setverificationCodeAH,
            setAnHuiAuthCode
        }
    },
    {
        persist: true
    }
)
