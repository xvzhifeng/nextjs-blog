import styles from './topbar.module.css'
import { useRouter } from 'next/router'

// import './topbar.module.css'
export default function TopBar({data}) {
    let router = useRouter()
    console.log(data)
    let onclick = (e) =>{
        console.log(e.target.text)
        router.push({
            pathname: `/`,
            query:{
                kind: `${e.target.text}`
            }
        })
        // console.log('selected', selectedKeys, info.node.path);
    }
    let content = data?.map((d) => {
        return <li className={styles.li} key={d} onClick={onclick}> <a> {d} </a></li>
    })
    console.log(content)
    return (
        <div className={styles.cantiner}>
            <ul className={styles.ul}>
                <li className={styles.li}><a></a></li>
                {content}
                {/* <li className={styles.li}><a className={styles.active} href="#home">主页</a></li>
                <li className={styles.li}><a href="#news">新闻</a></li>
                <li className={styles.li}><a href="#contact">联系</a></li>
                <li className={styles.li}><a href="#about">关于</a></li> */}
            </ul>
        </div>
    )
}

