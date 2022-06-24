import Layout from '../../components/layout'
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { storage } from '../../lib/util'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';

const { Dragger } = Upload;
const props = {
    name: 'file',
    multiple: true,
    method: 'post',
    action: '/api/upload',

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

const App = () => {


    const router = useRouter()
    const [data, setData] = useState("");

    useEffect(() => {
        setData(localStorage.getItem("upload"));
        if (!localStorage.getItem("upload")) {
            // 没有权限进行上传，跳转到权限认证页面
            router.push('/security')
        }
    }, []);

    

    return (
        <Layout>
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

    );

}


// export function  getInitialProps({ res }) {
//     if (someCondition) {
//         res.redirect('/securty');
//     }
// }

export default App;