import Layout from '../../components/layout'
// import {  getPostData } from '../../lib/posts'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { createAwait } from '../../lib/mysql-client'
import { id } from 'date-fns/locale'

export default function detail({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData?.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData?.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData?.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData?.contentHtml }} />
            </article>
        </Layout>
    )
}

export async function getStaticPaths() {
    let client = createAwait()
    let select_md = "select file_name from blog_content where file_name like '%md'"
    let results = await client.awaitQuery(select_md)
    let paths = results.map(fileName => {
        return {
            params: {
                id: fileName.file_name.replace(/\.md$/, '')
            }
        }
    })
    // console.log(paths);
    // let res = await fetch('/api/getBlogInfo/getAllIds');
    // let paths = await res.json()
    // console.log(paths)
    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({ params }) {
    let client = createAwait()
    let select_md = `select * from blog_content where file_name like '%md' and file_name = '${params.id}.md'`
    console.log(params.id)
    let results = await client.awaitQuery(select_md)
    let data = await results.map(result => {
        // console.log(result.content.toString())
        let content = result.content.toString();
        return {
            'id': result.file_name,
            content,
            'date': result.create_date
        }
    })
    console.log(data)
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(data[0].content)

    // // Use remark to convert markdown into HTML string
    const processedContent = await remark().use(html).process(matterResult.content)
    const contentHtml = processedContent.toString()

    // // Combine the data with the id and contentHtml
    // return {
    //     id,
    //     contentHtml,
    //     ...matterResult.data
    // }
    // const postData = await getPostData(params.id)
    const postData =    {
        'id': params.id,
        contentHtml,
        'title': params.id,
        ...matterResult.data
    }
    console.log(postData)
    return {
        props: {
            postData
        },
        revalidate: 10,
    }
}