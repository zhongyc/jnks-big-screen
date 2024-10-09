import axios from 'axios'
const DB_NAME = 'localforage-indexedDB'
const DB_VERSION = 3 // Use a long long for this value (don't use a float)
const DB_STORE_NAME = 'model_gltf'
const DB_B3DM_NAME = 'model_b3dm'
const modelUrl = ''
let dbInstance
let dbOpeningLock
// 加载数据库
async function initDb() {
    if (!window.indexedDB) {
        console.log("Your browser doesn't support a stable version of IndexedDB.")
        return
    }
    // 如果数据库尚未打开并且没有正在进行的打开操作
    if (!dbInstance && !dbOpeningLock) {
        // 创建一个锁，确保只有一个打开操作进行
        dbOpeningLock = new Promise((resolve, reject) => {
            let request = indexedDB.open(DB_NAME, DB_VERSION)

            request.onerror = function (event) {
                console.error('Error: create db error', event.target.error)
                reject(event.target.error)
            }

            request.onupgradeneeded = function (event) {
                let db = event.currentTarget.result
                // 创建或更新对象存储
                if (!db.objectStoreNames.contains(DB_STORE_NAME)) {
                    // 检查对象仓库是否存在
                    db.createObjectStore(DB_STORE_NAME, { keyPath: 'ssn' })
                }
                if (!db.objectStoreNames.contains(DB_B3DM_NAME)) {
                    // 检查对象仓库是否存在
                    db.createObjectStore(DB_B3DM_NAME, { keyPath: 'uri' })
                }
            }

            request.onsuccess = function (event) {
                dbInstance = event.target.result
                resolve(dbInstance)
            }
        })

        // 等待数据库打开完成
        dbInstance = await dbOpeningLock
    } else if (dbOpeningLock) {
        // 如果有正在进行的打开操作，则等待该操作完成
        dbInstance = await dbOpeningLock
    }
    return dbInstance
}

// 获取模型
async function getModel(url, id) {
    const db = await initDb()
    let getRequest = db.transaction([DB_STORE_NAME], 'readwrite').objectStore(DB_STORE_NAME).get(id)
    return new Promise((resolve, reject) => {
        getRequest.onsuccess = function (event) {
            let modelFile = event.target.result
            // 假如已经有缓存了 直接用缓存
            if (modelFile) {
                resolve(modelFile.blob)
            } else {
                // 假如没有缓存 请求新的模型存入
                inputModel(url, id)
                    .then(blob => {
                        resolve(blob)
                    })
                    .catch(() => {
                        reject()
                    })
            }
        }
        getRequest.onerror = function (event) {
            console.log('error', event)
            reject()
        }
    })
}

// 存入模型
async function inputModel(url, id) {
    const db = await initDb()
    let modelResult = await axios.get(modelUrl + url, {
        responseType: 'blob'
        // onDownloadProgress: e => {
        //     if (id == 1) {
        //         window.dispatchEvent(
        //             new CustomEvent('loadingProgress', {
        //                 detail: ((e.loaded * 100) / e.total).toFixed(2)
        //             })
        //         )
        //     }
        // }
    })
    if (modelResult.status == 200) {
        let obj = {
            ssn: id
        }
        obj.blob = new Blob([modelResult.data])
        let inputRequest = db
            .transaction([DB_STORE_NAME], 'readwrite')
            .objectStore(DB_STORE_NAME)
            .add(obj)
        return new Promise((resolve, reject) => {
            inputRequest.onsuccess = function () {
                resolve(obj.blob)
            }
            inputRequest.onerror = function () {
                reject()
            }
        })
    }
}

/**
 * 加载 .b3dm 文件，优先从缓存中读取
 * @param {string} uri - 文件的 URI
 */
async function loadB3DM(uri) {
    try {
        const db = await initDb()
        const getRequest = db
            .transaction([DB_B3DM_NAME], 'readwrite')
            .objectStore(DB_B3DM_NAME)
            .get(uri)
        return new Promise((resolve, reject) => {
            getRequest.onsuccess = event => {
                if (event.target.result) {
                    resolve(event.target.result.data)
                } else {
                    fetchB3DM(uri, db)
                        .then(blob => {
                            resolve(blob)
                        })
                        .catch(() => {
                            reject()
                        })
                }
            }

            getRequest.onerror = reject
        })
    } catch (error) {
        console.error('Error loading from cache:', error)
        throw error
    }
}

/**
 * 从网络加载 .b3dm 文件并缓存
 * @param {string} uri - 文件的 URI
 * @param {IDBDatabase} db - IndexedDB 数据库实例
 */
async function fetchB3DM(uri, db) {
    let modelResult = await axios.get(modelUrl + uri, {
        responseType: 'blob'
        // onDownloadProgress: e => {
        //     window.dispatchEvent(
        //         new CustomEvent('loadingProgress', {
        //             detail: ((e.loaded * 100) / e.total).toFixed(2)
        //         })
        //     )
        // }
    })
    if (modelResult.status == 200) {
        let obj = {
            uri: uri
        }
        obj.data = new Blob([modelResult.data])
        let inputRequest = db
            .transaction([DB_B3DM_NAME], 'readwrite')
            .objectStore(DB_B3DM_NAME)
            .add(obj)
        return new Promise((resolve, reject) => {
            inputRequest.onsuccess = function () {
                resolve(obj.data)
            }
            inputRequest.onerror = function () {
                reject()
            }
        })
    }
}

export { getModel, inputModel, loadB3DM }
