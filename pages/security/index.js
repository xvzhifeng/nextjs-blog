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
        if(data1 == "2f7e4c8e09a8d34c6b3c5e8952fd8d92") {
            localStorage.setItem("upload", data1)
            router.push("/upload")
        }
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