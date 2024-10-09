import CryptoJS from 'crypto-js'
const SECRET_KEY = CryptoJS.enc.Utf8.parse('utryzbhdzsystem@')
const SECRET_IV = CryptoJS.enc.Utf8.parse('utryzbhdzsystem@')
/**
 * @param data
 * @returns {string}
 */
function encrypt(data) {
    if (typeof data === 'object') {
        try {
            data = JSON.stringify(data)
        } catch (error) {
            console.log(error)
        }
    }
    const dataHex = CryptoJS.enc.Utf8.parse(data)
    const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
        iv: SECRET_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.ciphertext.toString()
}

/**
 * @param data
 * @returns {string}
 */
function decrypt(data) {
    const encryptedHexStr = CryptoJS.enc.Hex.parse(data)
    const str = CryptoJS.enc.Base64.stringify(encryptedHexStr)
    const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
        iv: SECRET_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
}

export { encrypt, decrypt }
