import fs from 'fs'
import path from 'path'

// let fs = require("fs")
// let path = require("path")
export function writeToFile(dir, file_name, content) {
    dir = path.join(dir, file_name)
    fs.writeFile(dir, content, async (err) => {
        if (err) {
            console.log(err)
            return;
        }
        console.log("success")
    })
}
// let dir = __dirname + "\\..\\posts"


function _strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
        obj[k] = v;
    }
    console.log(obj)
    return obj;
}

function get_file(position, key) {
    let index = 0
    let dirs = fs.readdirSync(position)
    let res = []
    for (let i in dirs) {
        let p = path.join(position, dirs[i])
        let status = fs.statSync(p)
        if (status.isDirectory()) {
            let m = new Map()
            m.set("path", p)
            m.set("title", dirs[i])
            m.set("key", key + `-${i}`)
            m.set("children", get_file(p, key + `-${i}`))
            // console.log(m)
            res.push(_strMapToObj(m))
        }
        if (status.isFile()) {
            let m = new Map()
            m.set("path", position)
            m.set("title", dirs[i])
            m.set("key", key + `-${i}`)
            res.push(_strMapToObj(m))
            // console.log(p)
        }
    }
    return res
}

export function get_all_directry(p, key) {
    const m = new Map();
    // m.set("path", p)
    m.set("title", "File")
    m.set("path", p)
    m.set("key", key)
    m.set("children", get_file(p, key))
    return [_strMapToObj(m)]
}
// p1 = __dirname+"\\..\\public"

// console.log( get_all_directry(p1,"0-0"))