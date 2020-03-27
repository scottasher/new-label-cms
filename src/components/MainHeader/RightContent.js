import React from 'react';
import { Menu, Spin, Avatar, Dropdown } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
export default (props) => {
    console.log(props)
    const menu = (
        <Menu className='menu' selectedKeys={[]}>
            <Menu.Item key="/account/center">       
                <Link to="/account/center">
                    <UserOutlined />
                    <div className="user-drop-menu-text">Account Center</div>
                </Link>
            </Menu.Item>
            <Menu.Item key="/account/settings">
                <Link to="/account/settings">
                    <SettingOutlined />
                    <div className="user-drop-menu-text">Account Settings</div>
                </Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout">
                <Link to="/">
                    <LogoutOutlined />
                    <div className="user-drop-menu-text">Logout</div>
                </Link>
            </Menu.Item>
        </Menu>
    );
    
    function renderUserIcon() {
        return props.user.email ? (
            <Spin size="small" style={{ marginLeft: 8, marginRight: 8, paddingBottom: 0 }} />
        ) : null
    }

    return (
        <div className='right'>
            {props.user.email ? (
                <Dropdown overlay={menu}>
                    <span className='action account'>
                        <Avatar
                            size="small"
                            src='https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
                            alt="avatar"
                        />
                        <span className='dropdown-user'>{props.user.name}</span>
                    </span>
                </Dropdown>
                ) : (
                renderUserIcon()
            )}
        </div>
    )
}