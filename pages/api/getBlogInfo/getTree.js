import { get_all_directry } from "../../../lib/file-operator";
import appRootPath from 'app-root-path';
import 'log-timestamp'

export default function getTree(req, res) {
    console.log("getTree " + appRootPath)
    let { query: { path } } = req

    console.log(path)
    res.status(200).json(get_all_directry(appRootPath + "/" + path, "0-0"))
}