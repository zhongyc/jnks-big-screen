/*
 * @Author: WangLong
 * @Date: 2022-11-08 13:25:07
 * @LastEditTime: 2024-06-13 16:25:38
 * @LastEditors: liz
 * @Description:
 * @FilePath: \jnks-new-company\src\utils\rsa.js
 */
import JSEncrypt from 'jsencrypt'
const AuthPubKey = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhomGLaRvHUChVEjmS5145Hp+EW84sT5l
xHM8JP7KFqvqUBp0VknW+lQATFGXrWPxwI9US0oN4mziL3w7a7hM2srKpx1TaOlwsyQT1r4ma/6C
JtHc4GoFtn5TTACbecJ3D0mSuYjTXLwnH1nmKNuZi0g5gE4cYRGHEaStmjROzulGjArJcv7gjUYP
YOBk/HLzLxAHj3887LMZTBMCTgzccH5AqJ8sE5+99zA24yhxbNqE57y/5qC5yji7aWMz1ZJQ8zem
lrmP3dgbOa/tTEh8NF69Q4uwqUC1O0oyPkdiO4WQHITWqzoBwAoMlb48CPaqADezBaoel1FVlolo
J7+xmwIDAQAB`
const pubKey =
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmIC1mjtzEqCSiQcuDTneoJGkud8LqKep1mh8O+IlA7aJtALf4bG8VJZbHyH6OyZ4c4JTB9daTgp2HFO1BBMDh/gc9DfF2bIfKADsMdvpLXKLS+0rD8BUUclwAj55uiPL7TE54wkTgLjEtGTTgYrQa3oSTysNScxuCzZ8i7C4ix5FXVKxqk7iPgTD3RmoB6Jc6stYySLjYlF4eAnDJl4URjGe/fWUv5losw4zAjh58U1WbWSG44yJvOD+pJvG0y101vWZktNoioRAGHDRZ5U/fxHlWbObnMMy4bUUOJncNdKFd+BHSG8dmajpQCezchnRUMYcSy08hpTsTlamp37EPwIDAQAB'

export function setRsa(pubStr) {
    const sign = new JSEncrypt()
    const date = +new Date()
    const key = pubStr + '@@' + date
    sign.setPublicKey(pubKey)
    return sign.encrypt(key)
}

export function setAuthRsa(pubStr) {
    const sign = new JSEncrypt()
    const key = pubStr
    sign.setPublicKey(AuthPubKey)
    return sign.encrypt(key)
}
