import { createClient } from '../../../lib/mysql-client'

export default function addSecurity(req, res) {
    // const fileNames = fs.readdirSync(postsDirectory)
    let client = createClient()
    let insert_md = `insert into blog_scurity(auth_code, create_date)
                        values('2f7e4c8e09a8d34c6b3c5e8952fd8d92', now())`
    client.query(insert_md, function (err, results, fields) {
        if (err) {
            console.log(err)
            return;
        }
        console.log(results)
        res.status(200).json(results)
    })
}