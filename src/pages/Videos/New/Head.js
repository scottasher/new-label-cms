import React from 'react';
import { PageHeader, Menu, Dropdown, Button } from 'antd';
import { EllipsisOutlined, DownOutlined, UpOutlined, CheckOutlined } from '@ant-design/icons';

export default (props) => {
    const toggleOptions = () => props.setOptionsVisible(!props.optionsVisible);
    const menu = (
        <Menu>
            <Menu.Item key="public" id="public" onClick={props.handlePublishChange}>
                <p style={{ marginBottom: 0 }}>
                    {props.selectedMenuItem === 'public' ? <CheckOutlined /> : null} Public
                </p>
            </Menu.Item>
            <Menu.Item key="private" id="private" onClick={props.handlePublishChange}>
                <p style={{ marginBottom: 0 }}>
                    {props.selectedMenuItem === 'private' ? <CheckOutlined /> : null} Private
                </p>
            </Menu.Item>
            <Menu.Item key="draft" id="draft" onClick={props.handlePublishChange}>
                <p style={{ marginBottom: 0 }}>
                    {props.selectedMenuItem === 'draft' ? <CheckOutlined /> : null} Draft
                </p>
            </Menu.Item>
        </Menu>
    );

    const renderOptions = () => {
        return (
            <div>need to add stuff here</div>
        )
    }

    const DropdownMenu = () => {
        return (
            <Dropdown 
                visible={props.dropVisible} 
                onBlur={props.handleDropMenu} 
                onClick={props.handleDropMenu} 
                key="more" overlay={menu}
            >
                <Button
                    style={{ border: 'none', padding: 0 }}
                >
                    <EllipsisOutlined
                        style={{
                            fontSize: 20,
                            verticalAlign: 'top',
                        }}
                    />
                </Button>
            </Dropdown>
        );
    };

    return (
        <PageHeader
            style={{ background: '#fff', marginBottom: '13px' }}
            className="site-page-header"
            title="Title"
            onBack={(e) => props.history.push('/articles')}
            subTitle=""
            extra={[
                <Button key="2" onClick={toggleOptions}>
                    {props.optionsVisible ? <UpOutlined /> : <DownOutlined /> }
                </Button>,
                <Button
                    key="submit"
                    type="primary" 
                    htmlType="submit"
                    loading={props.loading}
                >
                    {props.loading ? (
                        props.selectedMenuItem === 'draft' ? 'Saving...' : 'Uploading...'
                    ) : (
                        props.selectedMenuItem === 'draft' ? 'Save Draft' : 'Publish'
                    )}
                </Button>,
                <DropdownMenu key="more" />,
            ]}
        >
            {props.optionsVisible ? renderOptions(props.article) : null}
        </PageHeader>
    )
}


