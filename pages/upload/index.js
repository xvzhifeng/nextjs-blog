import Layout from '../../components/layout'
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Upload, Tooltip, Search } from 'antd';
import { Modal } from 'antd';
import { storage } from '../../lib/util'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Checkbox } from 'antd';
// import KindCheckBox from "../../components/kindCheckBox"

const { Dragger } = Upload;


const App = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updata, SetUpdata] = useState({})
    const [kinds, SetKinds] = useState("")
    const [plainOptions, SetPlainOptions] = useState([])
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const router = useRouter()
    const [data, setData] = useState("");

    useEffect(() => {
        setData(localStorage.getItem("upload"));
        if (!localStorage.getItem("upload")) {
            // 没有权限进行上传，跳转到权限认证页面
            router.push('/security')
        }
        fetch("/api/kind").then(res => res.json()).then(res => {
            console.log(res)
            SetPlainOptions(res.kinds)
        })
        console.log(updata)
        console.log(props)
    }, [updata]);

    if (!data) {
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
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
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
    return (
        <>

            <Layout>

                <div>
                    <KindCheckBox plainOptions={plainOptions} onChange={onChange}></KindCheckBox>
                    <Tooltip title="add kind">
                        <Button type="dashed" icon={<PlusOutlined />} onClick={showAddKind} />
                    </Tooltip>
                    <Modal
                        title="Title"
                        open={open}
                        onOk={handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                    >
                        <Search placeholder="input search text"  onSearch={onSearch} style={{ width: 200 }} />
                        <p>{modalText}</p>
                    </Modal>
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