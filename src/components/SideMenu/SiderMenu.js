import React from'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import BaseMenu from './BaseMenu';

const { Sider } = Layout;

export default function SiderMenu(props) {
    // const defaultProps = props.collapsed ? {} : { openKeys };
    // console.log('SiderMenu', props)

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={!props.collapsed}
            breakpoint="lg"
            onCollapse={collapse => props.onCollapse(collapse)}
            width={256}
            theme="light"
            style={{ padding: '0px' }}
        >
            <div className='logo' id="logo">
                <Link to="/">
                    <h1>NEW SITE</h1>
                </Link>
            </div>
            <BaseMenu {...props} />
        </Sider>
    )
}