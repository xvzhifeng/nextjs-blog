import mysql from 'mysql'



export default function handler(req, res) {
    const {
        query: { id, title, context, author, createtime, updatetime },
        method,
    } = req
    let mysqlClient = create()

    switch (method) {
        case 'GET':
            // Get data from your database
            mysqlClient.query('select * from md', function (error, results, fields) {
                if (error) throw error;
                console.log(results)
                res.status(200).json({results})
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
        host: 'db.sumu.today',
        user: 'sumu',
        password: 'Mx199891@@',
        database: 'myblog'
    });
    return connection;
}