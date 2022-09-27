import Layout from '../../components/layout'
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Upload, Tooltip, Modal } from 'antd';
import { storage } from '../../lib/util'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Checkbox } from 'antd';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useSWR from "swr";
// import KindCheckBox from "../../components/kindCheckBox"

const { Dragger } = Upload;


const App = () => {
    const fetcher = (url) => fetch(url).then((res) => res.json())
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updata, SetUpdata] = useState({})
    const [kinds, SetKinds] = useState("")
    const [plainOptions, SetPlainOptions] = useState([])
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [kindName, setkindName] = useState('');

    const router = useRouter()
    const [auth, setAuth] = useState("");
    const {data,error} = useSWR("/api/kind",fetcher)
    useEffect(() => {
        setAuth(localStorage.getItem("upload"));
        if (!localStorage.getItem("upload")) {
            // 没有权限进行上传，跳转到权限认证页面
            router.push('/security')
        }
        console.log(data)
        SetPlainOptions(data?.kinds)
        // fetch("/api/kind").then(res => res.json()).then(res => {
        //     console.log(res)
        //     SetPlainOptions(res.kinds)
        // })
    }, [data]);

    if (!auth) {
        // 没有权限进行上传，跳转到权限认证页面
        return (
            <Layout></Layout>
        )
    }

    const onChange = (checkedValues) => {
        SetUpdata({ ...updata, "kind": checkedValues.join(",") })
        SetKinds(checkedValues.join(","))
    };

    let props = {
        name: 'file',
        multiple: true,
        method: 'post',
        action: '/api/upload',
        headers: {
            dataKind: kinds
        },
        data: updata,
        onChange(info) {
            const { status } = info.file;

            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }

            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },

        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        let reqData = {"kind": kindName}
        fetch("/api/kind", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(reqData) // body data type must match "Content-Type" header
        }).then(res => {
            if(res.status == 200) {
                setOpen(false);
                SetPlainOptions([...plainOptions,kindName])
                message.success("add kind successed .")
            } else {
                message.error("add kind faild .")
            }
            
        }).catch((error)=>{
            message.error("add kind faild .")
        })
        setTimeout(() => {
            setOpen(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };


    const onSearch = (value) => console.log(value);

    let showAddKind = () => {
        console.log(isModalOpen)
        console.log("click")
        setIsModalOpen(true);
        setOpen(true)
    }

    let inputKind = (event) => {
        setkindName(event.target.value)
    }

    return (
        <>
            <Layout>

                <div>
                    <KindCheckBox plainOptions={plainOptions} onChange={onChange}></KindCheckBox>
                    <Tooltip title="add kind">
                        <Button type="dashed" icon={<PlusOutlined />} onClick={showAddKind} />
                    </Tooltip>
                    <Dialog open={open} onClose={handleCancel}>
                        <DialogTitle>Add Kind</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To add kinds to this website, please enter your kind name here. We
                                will send updates occasionally.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="kind_name"
                                label="Kind name"
                                type="string"
                                fullWidth
                                variant="standard"
                                onChange={inputKind}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCancel}>Cancel</Button>
                            <Button onClick={handleOk}>Update</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </Dragger>


            </Layout>
        </>


    );

}



// const plainOptions = ['js', 'java', '杂项'];


const KindCheckBox = ({ plainOptions, onChange }) => (
    <>
        <Checkbox.Group options={plainOptions} defaultValue={[]} onChange={onChange} />
    </>
);

export async function getServerSideProps() {
    return {
        props: {
            data: ""
        }
    }
}

// export function  getInitialProps({ res }) {
//     if (someCondition) {
//         res.redirect('/securty');
//     }
// }

export default App;