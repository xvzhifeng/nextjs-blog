import formidable from 'formidable';
import fs from 'fs'
import path from 'path'


let result = null

export default (req, res) => {
    result = res;
    const form = formidable({});
    // console.log(form)
    form.parse(req, (err, fields, files) => {
        console.log(fields)
        console.log(files)
        console.log(files.file)
        if (err) {
            res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
            res.end(String(err));
            return;
        }
        saveFile(files.file);
        // res.writeHead(200, { 'Content-Type': 'application/json' });
        // res.end(JSON.stringify({ fields, files }, null, 2));
        return;
    });


    let content = req.body
    // let contents = content.split("\r\n");
    // console.log(req.body)
    // console.log(content)
    // res.status(200).json({ text: "req" })
}

export const config = {
    api: {
        bodyParser: false,
    },
}

/**
 * 判断目录是否存在，不存在则创建
 * { recursive: true } 表示多层目录时递归创建
 */
function createDir(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true })
    }
}

function saveFile(file) {
    // 读文件
    fs.readFile(file.filepath, (err, data) => {
        if (err) {
            responseEnd(err)
        }
        const basePath = 'D:/code/github/nextjs-blog/posts/'
        // 创建目录
        createDir(basePath)
        console.log(path.join(basePath, file.originalFilename))
        console.log(data);
        // 写入文件
        fs.writeFile(path.join(basePath, file.originalFilename), data, async (err) => {
            if (err) {
                responseEnd(err)
            }
            responseEnd()
        })
    })
}

/**
 * 服务器响应
 */
function responseEnd(err) {
    if (err) {
        console.log(err)
        result.statusCode = 500
        result.end('fail')
    } else {
        result.statusCode = 200
        result.end('success')
    }
}
