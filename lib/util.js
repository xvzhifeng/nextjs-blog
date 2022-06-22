const md5 = require('js-md5')
import { message } from 'antd'

const storage = {
    set: (key, value = null) => {
        if (key) {
            localStorage.setItem(key, JSON.stringify(value))
            return
        }
        return 'key 不能为空'
    },
    get: (key) => {
        if (key) {
            return JSON.parse(localStorage.getItem(key))
        }
        return 'key 不能为空'
    },
    remove: (key) => {
        if (key) {
            localStorage.remove(key)
        }
    }
}

export {
    storage
}