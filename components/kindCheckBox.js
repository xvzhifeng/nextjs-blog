import { Checkbox } from 'antd';
import React from 'react';

const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
};

// const plainOptions = ['js', 'java', '杂项'];


const KindCheckBox = ({plainOptions}) => (
    <>
        <Checkbox.Group options={plainOptions} defaultValue={[]} onChange={onChange} />
    </>
);

export default KindCheckBox;