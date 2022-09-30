import { mclient } from "../../../lib/mysql-client"
export default function handler(req, res) {
    const {
        body: { kind },
        method,
    } = req
    console.log(kind)
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
            console.log(kind)
            add_kind(kind,res)
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
            return {label:r.kind_name, value:r.id}
        })
        console.log(data)
        res.status(200).json({"kinds": data})
    })
}

let add_kind = (kind, res) =>{
    
    let select_md = `select count(*) as count from blog_kind where kind_name = '${kind}'`
    let insert_cmd = `insert into blog_kind(kind_name,create_date) values ('${kind}',now())`
    mclient.query(select_md, (err, results, fields) =>{
        if (err) {
            console.log('[select ERROR] - ', err.message);
            res.status(500).json({ "error": err.message })
            return;
        }
        if(results[0].count <= 0) {
            mclient.query(insert_cmd,(err,results)=>{
                if (err) {
                    console.log('[select ERROR] - ', err.message);
                    res.status(500).json({ "error": err.message })
                    return;
                }
                console.log(results)
                res.status(200).json(results)
            })
        }
    })
}