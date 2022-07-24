import mysql from 'mysql'
import mysqlAwait from 'mysql-await'

let db_host = '127.0.0.1';
let user = "root"
let database_name = "my_blog"
let password = "123456"
export function create() {
    var connection = mysql.createConnection({
        host: db_host,
        user: user,
        password: password,
        database: database_name
    });
    return connection;
}

export function create_init() {
    var connection = mysql.createConnection({
        host: db_host,
        user: user,
        password: password,
        database: database_name
    });
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ');
    });
    return connection;
}

export function createClient() {
    let client = create();
    return client;
}

export function createAwait() {
    var connection = mysqlAwait.createConnection({
        host: db_host,
        user: user,
        password: password,
        database: database_name
    });
    return connection;
}

function wait(ms) {
    return new Promise(resolve =>setTimeout(() =>resolve(), ms));
};


export function init(res) {
    var connection = mysql.createConnection({
        host: db_host,
        user: user,
        password: password
    });
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            res.status(500).json(err)
            return;
        }
        console.log('connected as id ');
    });

    let init_database = `create database if not EXISTS ${database_name}  character set utf8;`
    connection.query(init_database, function (err, results) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            res.status(500).json(err)
            return;
        }
        init_table(res)
        console.log('connected as id ' + results);
    })
}

export function init_table(res) {
    let client = create_init()
    let create_content = `
            create table if not EXISTS blog_content (
            id int auto_increment NOT NULL ,
            file_name varchar(40),
            content LongBlob,
            create_date datetime,
            update_date datetime,
            PRIMARY KEY (id)
            );
            `
    client.query(create_content, function (err, results) {
        if (err) {
            console.error('error create_content: ' + err.stack);
            res.status(500).json(err)
        }
        console.log(results)
    })

    let create_security = `create table if not EXISTS blog_security (
        id int auto_increment NOT NULL,
        auth_code varchar(60),
        create_date datetime,
        update_date datetime,
        PRIMARY KEY (id)
        );`

    client.query(create_security, function (err, results) {
        if (err) {
            console.error('error create_security: ' + err.stack);
            res.status(500).json(err)
        }
        console.log(results)
    })

    let insert_md = `insert into blog_security(auth_code)
        values('2f7e4c8e09a8d34c6b3c5e8952fd8d92')`
    client.query(insert_md, function (err, results, fields) {
        if (err) {
            console.log(err)
            res.status(500).json(err)
        }
        console.log(results)
    })
    res.status(200).json({'res' : "success"})
}