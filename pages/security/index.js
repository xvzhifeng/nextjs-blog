import Layout from '../../components/layout'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React from "react";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import md5 from 'js-md5';
import { Grid } from "@mui/material";

export default function app() {

    let router = useRouter()
    const [data, setData] = useState("");

    let handleChange = (event) => {
        console.log(event.target.value)
        setData(event.target.value)
    }
    let submit = () => {
        let data1 = md5(data)
        fetch('/api/security').then(res => res.json()).then(res => {
            if (res.results.length > 0 && data1 == res.results[0].auth_code && !localStorage.getItem("upload")) {
                localStorage.setItem("upload", data1)
                fetch('/api/security/add').then(res => res.json()).then(res => {
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
            <Grid container spacing={2}>
                <Grid item xs={12}></Grid>
                <Grid item xs={2}> <h1>security</h1></Grid>
                <Grid item xs={8}> </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="security" id="password" onChange={(e) => handleChange(e)} />
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={4} ></Grid>
                <Grid item xs={2}><Button id="btn_submit" variant="outlined" onClick={submit}>submit</Button></Grid>
                <Grid item xs={5}>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        </Layout>

    )

}