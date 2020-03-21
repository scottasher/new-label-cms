import React from 'react';
// import RightContent from './RightContent';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './index.less';

export default function GlobalHeader (props) {
    // console.log(props);
    const toggle = () => {
        props.onCollapse(!props.collapsed);
    };

    return (
        <div className='header'>
            <span className='trigger' onClick={toggle}>
                {props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </span>
            {/* <RightContent {...props} /> */}
        </div>
    );
}

