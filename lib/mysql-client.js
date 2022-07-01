import mysql from 'mysql'


export  function createClient() {
    var connection = mysql.createConnection({
        host: '212.129.137.221',
        user: 'root',
        password: '123456',
        database: 'my_blog'
    });
    return connection;
}