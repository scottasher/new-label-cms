import React from 'react';
import { Drawer } from 'antd';
import SiderMenu from './SiderMenu';
import './index.less';

const SiderMenuWrapper = (props) => {
    return (
        <Drawer
            visible={!props.collapsed}
            placement="left"
            onClose={() => props.onCollapse(true)}
            style={{
                padding: 0,
                height: '100vh',
            }}
            className='drawer-view'
        >
            <SiderMenu {...props} collapsed={props.isMobile ? false : props.collapsed} />
        </Drawer>
    )
};

export default SiderMenuWrapper;
