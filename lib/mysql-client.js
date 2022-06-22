import mysql from 'mysql'


export  function createClient() {
    var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        database: 'my_blog'
    });
    return connection;
}