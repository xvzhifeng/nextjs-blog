import { get_all_directry } from "../../../lib/file-operator";
import appRootPath from 'app-root-path';
import { getBlogDataByPath } from "../../../lib/posts"

export default function getBlogByFile(req, res) {
    console.log("getTree " + appRootPath)
    let { query: { path } } = req
    console.log(path)
    getBlogDataByPath(path).then(content => {
        return res.status(200).json(content)
    })
}
