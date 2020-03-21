import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

function BaseMenu(props) {
    // console.log('BASE MENU', props)
    const renderMenuItems = (data) => {
        return data.map(i => {
            if (!i.routes) {
                return (
                    <Menu.Item key={i.path}>
                        <Link
                            to={i.path}
                            onClick={
                            props.isMobile ? () => {
                                    props.onCollapse(true);
                                }
                                : undefined
                            }
                        >
                            {/* <Icon type={i.icon} /> */}
                            <span>{i.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else if (i.routes) {
                return (
                    <SubMenu 
                        key={i.name}
                        title={
                            <span>
                                {/* <Icon type={i.icon} /> */}
                                <span>{i.title}</span>
                            </span>
                        }
                    >
                        {i.routes.map(r => {
                            return (
                                <Menu.Item key={r.path}>
                                    <Link
                                        to={r.path}
                                        onClick={
                                            props.isMobile
                                            ? () => {
                                                props.onCollapse(true);
                                                }
                                            : undefined
                                        }
                                    >{r.title}</Link>
                                </Menu.Item>
                            )
                        })}
                    </SubMenu>
                )   
            } else {
                return null
            }
        });
    }

    return (
        <Menu 
            key="Menu"
            mode='inline'
            theme='light'
            // onOpenChange={props.handleOpenChange}
            // selectedKeys={props.selectedKeys}
        >
            {renderMenuItems(props.menuData)}
        </Menu>
    )
}

export default BaseMenu;