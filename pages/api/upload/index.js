import { FormControlUnstyledContext } from '@mui/base';
import { da } from 'date-fns/locale';
import formidable from 'formidable';
import fs from 'fs'
import path from 'path'
import { createClient } from '../../../lib/mysql-client'
import moment from 'moment'
import { checkPrime } from 'crypto';

let result = null

export default (req, res) => {
    result = res;
    const form = formidable({});
    // console.log(form)
    console.log(getClientIP(req))
    form.parse(req, (err, fields, files) => {
        // console.log(fields)
        // console.log(files)
        // console.log(files.file)
        if (err) {
            res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
            res.end(String(err));
            return;
        }
        check(res, files);
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

function saveFile(file, res) {
    // 读文件

    // const fileContents = fs.readFileSync(file.filepath)
    // console.log(fileContents.data)
    // console.log(typeof fileContents)

    // const json_bufTry=JSON.stringify(fileContents);
    // const json_b = JSON.parse(json_bufTry)
    // console.log(json_bufTry);
    // console.log(typeof json_b)
    // console.log(json_b.toString())
    // let buff = Buffer.from(json_b.data)
    // console.log(buff.toString())
    fs.readFile(file.filepath, (err, data) => {
        if (err) {
            responseEnd(err)
        }
        let mysqlClient = createClient()
        let insert_cmd = "insert into blog_content(file_name, content, create_date) values (?, ?,now())"
        // console.log(new Date().getTime())
        const json_bufTry = JSON.stringify(data);
        // console.log(new Date().toLocaleDateString())
        let insert_values = [file.originalFilename, data]
        mysqlClient.query(insert_cmd, insert_values, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                res.status(500).json({ "error": err.message })
                return;
            }
            console.log('--------------------------INSERT----------------------------');
            //console.log('INSERT ID:',result.insertId);        
            console.log('INSERT ID:', result);
            console.log('-----------------------------------------------------------------\n\n');
            res.status(200).json({ result })
        })
        // const basePath = 'D:/code/github/nextjs-blog/posts/'
        // // 创建目录
        // createDir(basePath)
        // console.log(path.join(basePath, file.originalFilename))
        // console.log(data);
        // // 写入文件
        // fs.writeFile(path.join(basePath, file.originalFilename), data, async (err) => {
        //     if (err) {
        //         responseEnd(err)
        //     }
        //     responseEnd()
        // })
    })
}

function updateFile(file, res) {
    
    fs.readFile(file.filepath, (err, data) => {
        if (err) {
            responseEnd(err)
        }
        let mysqlClient = createClient()
        let update_cmd = `update blog_content
        set content = ?, update_date = now()
        WHERE file_name = ?;`
        let update_value = [data, file.originalFilename]
        // console.log(new Date().getTime())
        const json_bufTry = JSON.stringify(data);
        // console.log(new Date().toLocaleDateString())
        let insert_values = [file.originalFilename, data, getTime()]
        mysqlClient.query(update_cmd, update_value, function (err, result) {
            if (err) {
                console.log('[update ERROR] - ', err.message);
                res.status(500).json({ "error": err.message })
                return;
            }
            console.log('--------------------------INSERT----------------------------');
            //console.log('INSERT ID:',result.insertId);        
            console.log('update ID:', result);
            console.log('-----------------------------------------------------------------\n\n');
            res.status(200).json({ result })
        })
        // const basePath = 'D:/code/github/nextjs-blog/posts/'
        // // 创建目录
        // createDir(basePath)
        // console.log(path.join(basePath, file.originalFilename))
        // console.log(data);
        // // 写入文件
        // fs.writeFile(path.join(basePath, file.originalFilename), data, async (err) => {
        //     if (err) {
        //         responseEnd(err)
        //     }
        //     responseEnd()
        // })
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

function getTime() {
    let date = new Date()
    let timeq = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay()

    let time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    console.log(time)
    return time
}

/**
 * @getClientIP
 * @desc 获取用户 ip 地址
 * @param {Object} req - 请求
 */
function getClientIP(req) {
    return req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
        req.connection.remoteAddress || // 判断 connection 的远程 IP
        req.socket.remoteAddress || // 判断后端的 socket 的 IP
        req.connection.socket.remoteAddress;
};

function check(res, files) {
    let select_md = `SELECT count(*) as count
                        from blog_security
                        WHERE SUBTIME(NOW(), 1800) < create_date`

    let mysqlClient = createClient()
    mysqlClient.query(select_md, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            res.status(500).json({ "error": err.message })
            return;
        }
        console.log('--------------------------INSERT----------------------------');
        //console.log('INSERT ID:',result.insertId);        
        console.log('SELECT :', result[0].count);
        console.log('-----------------------------------------------------------------\n\n');
        if (result[0].count <= 0) {
            console.log('SELECT :', "auth faild");
            res.status(500).json({ "error": "auth faild" })
            return;
        }
        is_unit(res, files);
    })
}

function is_unit(res, files) {
    let mysqlClient = createClient()
    let select_md = `select count(*) as count from blog_content where file_name = '${files.file.originalFilename}'`
    mysqlClient.query(select_md, function (err, result, fields) {
        if (err) {
            console.log('[select ERROR] - ', err.message);
            res.status(500).json({ "error": err.message })
            return;
        }
        console.log(result);
        if (result[0].count > 0) {
            updateFile(files.file, res);
        } else {
            saveFile(files.file, res);
        }
    })
}
