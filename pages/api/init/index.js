import { init } from '../../../lib/mysql-client'

export default function addSecurity(req, res) {
    // const fileNames = fs.readdirSync(postsDirectory)
    init(res)
    
}