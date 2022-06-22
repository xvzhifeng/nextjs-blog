import { createClient } from '../../../lib/mysql-client'

export default function addSecurity(req, res) {
    // const fileNames = fs.readdirSync(postsDirectory)
    let client = createClient()
    let select_md = `select auth_code from blog_scurity
                        ORDER BY CREATE_date
                        limit 0,1`
    client.query(select_md, function (err, results, fields) {
        if (err) {
            console.log(err)
            return;
        }
        console.log(results)
        res.status(200).json({results})
    })
}