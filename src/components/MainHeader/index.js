import React from 'react';
import { Layout } from 'antd';
import GlobalHeader from './GlobalHeader';
const { Header } = Layout

function MainHeader(props) {
    // console.log(props)
    return (
        <Header style={{ background: '#fff', padding: 0 }}>
            <GlobalHeader
                onCollapse={props.handleMenuCollapse}
                // onMenuClick={handleMenuClick}
                settingsVisible={props.settingsVisible}
                {...props}
            />
        </Header>
    );
}

export default MainHeader


