
import { createClient } from '../../../lib/mysql-client'

export default function handler(req, res) {
    const {
        method,
    } = req
    switch (method) {
        case 'GET':
            // Get data from your database
            getSortedPostsDataFromDB(res)
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

function getSortedPostsDataFromDB(res) {
    // Get file names under /posts
    let client = createClient()
    let select_md = "select * from blog_content where file_name like '%md'"
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