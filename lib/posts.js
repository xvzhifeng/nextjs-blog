import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { marked } from 'marked'
import hljs from "highlight.js";
// import 'highlight.js/styles/monokai-sublime.css';
import 'highlight.js/styles/vs2015.css';
// import { createClient } from './mysql-client'


const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '')

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        // Combine the data with the id
        return {
            id,
            ...matterResult.data
        }
    })
    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export function getSortedPostsDataFromDB() {
    fetch('/api/getBlogInfo').then(res => res.json()).then(res => {
        return res;
    })
}

export async function getAllPostIds() {
    // const fileNames = fs.readdirSync(postsDirectory)
    let res = await fetch('http://127.0.0.1:3000/api/getBlogInfo/getAllIds');
    let data = await res.json()
    console.log(typeof data)
    return data
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

export async function getPostData(id) {

    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    // let res = await fetch('http://127.0.0.1:3000/api/getBlogInfo/getById?id='+id);
    // let data = await res.json
    // console.log(data)
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Use remark to convert markdown into HTML string
    const processedContent = await remark().use(html).process(matterResult.content)
    const contentHtml = processedContent.toString()


    // Combine the data with the id and contentHtml
    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}

export async function getBlogDataByPath(fullPath) {
    marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code, lang) {
            console.log(hljs.getLanguage(lang))
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        },
        langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
        pedantic: false,
        gfm: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
    });
    // const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    // let res = await fetch('http://127.0.0.1:3000/api/getBlogInfo/getById?id='+id);
    // let data = await res.json
    // console.log(data)
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Use remark to convert markdown into HTML string
    // const processedContent = await remark().use(html).process(matterResult.content)
    // const contentHtml = processedContent.toString()
    const contentHtml = marked.parse(fileContents)

    // Combine the data with the id and contentHtml
    return {
        "id": fullPath,
        contentHtml,
        "content": fileContents.toString(),
        ...matterResult.data
    }
}
