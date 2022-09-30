
import { createClient } from '../../../lib/mysql-client'

export default function handler(req, res) {
    const {
        query:{
            kind
        },
        method,
    } = req
    switch (method) {
        case 'GET':
            // Get data from your database
            getSortedPostsDataFromDB(kind, res)
            break
        case 'PUT':
            // Update or create data in your database
            res.status(200).json({ id, name: name || `User ${id}` })
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

function getSortedPostsDataFromDB(kind, res) {
    // Get file names under /posts
    let select_md = "select * from blog_content where file_name like '%md'"
    console.log("kind:" + kind)
    if(String(kind) != "undefined" && kind != "") {
        select_md = `select * from blog_content bc left join blog_content_kind bck 
        on bc.id = bck.content_id
        where bck.kind_id = (SELECT id from blog_kind bk where bk.kind_name = "${kind.trim()}")`
    }
    console.log(select_md)
    let client = createClient()
    
    client.query(select_md, function (err, results, fields) {
        if (err) {
            console.log(err)
            res.status(500).json(err)
            return;
        }
        console.log(results)
        let allPostsData = results.map(result => {
            const id = result.file_name.replace(/\.md$/, '')
            const date = result.create_date
            return {
                id,
                date,
                'title': id
            }
        })
        console.log(allPostsData)
        // Sort posts by date
        allPostsData.sort((a, b) => {
            if (a.date < b.date) {
                return 1
            } else {
                return -1
            }
        })
        res.status(200).json(allPostsData)
        
    })
    

}