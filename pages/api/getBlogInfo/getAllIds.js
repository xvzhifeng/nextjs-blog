import { createClient } from '../../../lib/mysql-client'

export default function getAllPostIds(req, res) {
    // const fileNames = fs.readdirSync(postsDirectory)
    let client = createClient()
    let select_md = "select file_name from blog_content where file_name like '%md'"
    client.query(select_md, function (err, results, fields) {
        if (err) {
            console.log(err)
            return;
        }
        console.log(results)
        let resu =  results.map(fileName => {
            return {
                params: {
                    id: fileName.file_name.replace(/\.md$/, '')
                }
            }
        })
        console.log(resu)
        res.status(200).json(resu)
    })
    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    // return fileNames.map(fileName => {
    //     return {
    //         params: {
    //             id: fileName.replace(/\.md$/, '')
    //         }
    //     }
    // })
}