import React, { useState } from 'react';
import { Drawer, Row, Col } from 'antd';
import menu from './menuMap';
import { Link } from 'react-router-dom';

export default (props) => {
    return (
        <Drawer
          title="Admin Settings"
          placement="right"
          onClose={() => props.handleCollapse(!props.adminCollapsed)}
          visible={props.visible}
        >   
            <Row>
                {
                    menu.map((obj, index) => {
                        return (
                            <Col key={index}>
                                <h3>{obj.title}</h3>
                                <ul>
                                    {obj.routes.map(route => {
                                        return (
                                            <li key={route.path}>
                                                <Link 
                                                    onClick={() => props.handleCollapse(!props.adminCollapsed)} 
                                                    to={route.path}
                                                >
                                                    {route.title}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </Col>
                        )
                    })
                }
            </Row>
        </Drawer>
    )
}