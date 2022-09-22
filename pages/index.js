import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import useSWR from "swr";
// import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import TopBar from '../lib/topbar'
import {PREFIX_URL} from '../lib/api'
export default function Home({ allPostsData }) {

  const fetcher = (url) => fetch(url).then((res) => res.json())
  const { data, error } = useSWR('/api/getBlogInfo', fetcher)

  if (!data) {
    return (
      <Layout home>
        <img
          src="/images/loading.gif"
        // className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
        // alt={name}
        />
      </Layout>
    )
  }
  return (
    <Layout home topbar={TopBar}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Link href={`/upload`}>
        <section className={utilStyles.headingMd}>
          <p>A wild programmer.</p>
          <p>
          </p>
        </section>
      </Link>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {data.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/detail/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

// export async function getServerSideProps(context) {
//   // const fetcher = (url) => fetch(url).then((res) => res.json())
//   // const { data, error } = useSWR('http://localhost:3000/api/getBlogInfo', fetcher)
//   const res = await fetch(PREFIX_URL + '/api/getBlogInfo')
//   const data = await res.json()
//   let allPostsData = data
//   console.log(allPostsData)
//   return {
//     props: {
//       allPostsData
//     }
//   }


// }