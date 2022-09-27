import { mclient } from "../../../lib/mysql-client"
export default function handler(req, res) {
    const {
        query: { id, name },
        method,
    } = req

    switch (method) {
        case 'GET':
            // Get data from your database
            get_kind(res)
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

let get_kind = (res)=>{
    let select_md = "SELECT * from blog_kind"
    mclient.query(select_md, function (err, results, fields) {
        if (err) {
            console.log(err)
            return;
        }
        let data = results.map((r)=>{
            console.log(r)
            return r.kind_name
        })
        console.log(data)
        res.status(200).json({"kinds": data})
    })
}