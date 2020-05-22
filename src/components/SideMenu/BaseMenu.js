import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

function BaseMenu(props) {
    // console.log('BASE MENU', props);

    const renderMenuItems = (data) => {
        return data.map(i => {
            if(i.name === 'Admin') {
                return false
            }
            if (!i.routes) {
                return (
                    <Menu.Item key={i.path}>
                        <Link
                            to={i.path}
                            onClick={() => props.onCollapse(false)}
                        >
                            <span>{i.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else if (i.routes) {                
                return (
                    <SubMenu 
                        key={i.path}
                        title={
                            <span>
                                <span>{i.title}</span>
                            </span>
                        }
                    >
                        {i.routes.map(r => {
                            if(r.name === 'edit') {
                                return null
                            }
                            return (
                                <Menu.Item key={r.path}>
                                    <Link
                                        to={r.path}
                                        onClick={() => props.onCollapse(false)}
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
            // defaultOpenKeys={[]}
            // selectedKeys={currentKey}
            // onOpenChange={props.handleOpenChange}
        >
            {renderMenuItems(props.menuData)}
        </Menu>
    )
}

export default BaseMenu;