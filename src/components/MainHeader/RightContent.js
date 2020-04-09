import React from 'react';
import { Menu, Spin, Avatar, Dropdown } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined, GlobalOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogout } from '../../actions/users';
import { adminCollapse } from '../../actions/utils';

const RightContent = (props) => {
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
            {!props.currentUser.authority === "superAdmin" && "admin" ? null : (
                <Menu.Item onClick={() => props.adminCollapse(!props.adminCollapsed)} key="/admin/settings">
                    <div>
                        <GlobalOutlined />
                        <div className="user-drop-menu-text">Admin Settings</div>
                    </div>
                </Menu.Item>
            )}
            <Menu.Divider />
            <Menu.Item onClick={() => props.userLogout(props.history)} key="logout">
                <div>
                    <LogoutOutlined />
                    <div className="user-drop-menu-text">Logout</div>
                </div>
            </Menu.Item>
        </Menu>
    );

    function renderUserIcon() {
        return !props.currentUser.id ? (
            <Spin size="small" style={{ marginLeft: 8, marginRight: 8, paddingBottom: 0 }} />
        ) : null
    }
    // console.log(props)
    return (
        <div className='right'>
            {props.currentUser.id ? (
                <Dropdown overlay={menu}>
                    <span className='action account'>
                        <Avatar
                            size="small"
                            src='https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
                            alt="avatar"
                        />
                        <span className='dropdown-user'>{props.currentUser.name}</span>
                    </span>
                </Dropdown>
                ) : (
                renderUserIcon()
            )}
        </div>
    )
}

export default connect(null, { userLogout, adminCollapse })(RightContent);