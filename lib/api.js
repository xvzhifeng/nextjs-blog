
let get_env = ()=>{
    if(process.env.NODE_ENV == 'production') {
        return process.env.BLOG_API
    } else {
        console.log(process.env.NODE_ENV)
        return "http://localhost:3000"
    }
}

const PREFIX_URL = get_env()
