import mysql from 'mysql'
import {writeToFile} from '../../../lib/file-operator'

let path = `D:/code/github/nextjs-blog/public/files/`

export default function handler(req, res) {
    const {
        query: { id, title, context, author, createtime, updatetime },
        method,
    } = req
    let mysqlClient = create()

    switch (method) {
        case 'GET':
            // Get data from your database
            mysqlClient.query('select * from blog_content', function (error, results, fields) {
                if (error) throw error;
                console.log(typeof results)
                res.status(200).json({results})
                for(let i in results) {
                    console.log(results[i].content)
                    writeToFile(path, results[i].file_name, results[i].content)
                }
            })
            break
        case 'PUT':
            // Update or create data in your database
            let add = 'INSERT into md(title,context,author,create_time,update_time) VALUES (?, ?, ?, ?, ?)'
            let value = [title, context, author, createtime, updatetime]
            console.log(value)
            mysqlClient.query(add, value, function (err, result) {
                if (err) {
                    console.log('[INSERT ERROR] - ', err.message);
                    res.status(500).json({"error":err.message})
                    return;
                }
                console.log('--------------------------INSERT----------------------------');
                //console.log('INSERT ID:',result.insertId);        
                console.log('INSERT ID:', result);
                console.log('-----------------------------------------------------------------\n\n');
                res.status(200).json({result})
            })
            break
        case 'DELETE':
            break
        case 'POST':
            break
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}

function create() {
    var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'sumu',
        password: '123456',
        database: 'my_blog'
    });
    return connection;
}