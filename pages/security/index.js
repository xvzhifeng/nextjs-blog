import Layout from '../../components/layout'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React from "react";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import md5 from 'js-md5';

export default function app() {

    let router = useRouter()
    const [data, setData] = useState("");

    let handleChange = (event) => {
        console.log(event.target.value)
        setData(event.target.value)
    }
    let submit = () => {
        let data1 = md5(data)
        fetch('/api/security').then(res => res.json()).then(res=>{
            if(res.results.length > 0 && data1 == res.results[0].auth_code && !localStorage.getItem("upload")) {
                localStorage.setItem("upload", data1)
                fetch('/api/security/add').then(res => res.json()).then(res=>{
                    console.log(res);
                    router.push("/upload")
                })
            } else {
                router.push("/")
            }
            console.log(res.results[0].auth_code);
            console.log(res.results.length)
            // console.log(res)
        })
        
    }

    return (
        <Layout>
            <h1>security</h1>
            <TextField fullWidth label="security" id="password" onChange={(e) => handleChange(e)} />
            <br />
            <Button id="btn_submit" variant="outlined" onClick={submit}>submit</Button>
        </Layout>

    )

}