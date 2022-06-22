import fs from 'fs'
import path from 'path'


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