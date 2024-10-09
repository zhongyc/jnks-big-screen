/*
 * @Author: WangLong
 * @Date: 2023-05-04 09:03:20
 * @LastEditTime: 2023-12-19 11:27:31
 * @LastEditors: liz
 * @Description:
 * @FilePath: \jnks-new-company\src\utils\crypto2.js
 */
import CryptoJS from 'crypto-js'
function getDAesString(encrypted, passkey, passkeyIv) {
    // 解密
    let key = CryptoJS.enc.Utf8.parse(passkey)
    let iv = CryptoJS.enc.Utf8.parse(passkeyIv)
    let decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    let decryptedStr = decrypted.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
    //  return decrypted.toString(CryptoJS.enc.Utf8);
}

function getDAes(data) {
    // 解密
    let key = 'utryzbhdzsystem@' // 密钥
    let iv = 'utryzbhdzsystem@'
    let decryptedStr = getDAesString(data, key, iv)
    return decryptedStr
}
export { getDAes }
