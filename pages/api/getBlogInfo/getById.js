import { createClient } from '../../../lib/mysql-client'

export default function getByID(req, res) {
    // const fileNames = fs.readdirSync(postsDirectory)
    let {query: { id }} = req
    let client = createClient()
    id += '.md'
    console.log(id)
    let select_md = `select * from blog_content where file_name like '%md' and file_name = '${id}'`
    client.query(select_md, function (err, results, fields) {
        if (err) {
            console.log(err)
            return;
        }
        console.log(results)
        let resu = results.map(result => {

            // console.log(result.content.toString())
            let content = result.content.toString();
            return {
                'id':result.file_name,
                content,
                'date':result.create_date
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