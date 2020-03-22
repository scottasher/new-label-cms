import React, { useState } from 'react';
import { 
    Form, Row, Button, PageHeader, 
    Col, Card, Input, Tooltip, Icon, 
    Select, Tag, Upload
} from 'antd';
import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import './index.less';

const { Option } = Select;
const colStyles = { paddingRight: 20 };

export default function NewArticle(props) {
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const initVals = (array, key) => {
        console.log(array, key)
        const initialValue = {};
        return array.reduce((obj, item) => {
          return {
            ...obj,
            [item[key]]: item,
          };
        }, initialValue);

        console.log(initialValue)
    }
    
    const handleEditorChange = (editorState) => {
        this.setState({ editorState });
    }
    
    return (
        <Form 
            name="new-article"
            onFinish={onFinish}
            initialValues={initVals}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <PageHeader
                style={{ background: '#fff', marginBottom: '13px' }}
                className="site-page-header"
                title="Title"
                onBack={() => null}
                subTitle=""
                extra={[
                    <Button
                        type="primary" 
                        htmlType="submit"
                        // loading={loading}
                    >
                        {/* {loading ? 'Uploading...' : 'Publish'} */}
                    </Button>
                ]}
            />
            <Row>
                <Card bordered={false}>
                    <Col 
                        style={colStyles} 
                        xs={24} sm={24} md={16} lg={16} xl={16}
                    >
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please add a title!',
                                },
                            ]}
                        >
                            <Input placeholder='Title' />
                        </Form.Item>
                        <Form.Item
                            label="Body"
                            name="body"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please add a body!',
                                },
                            ]}
                        >
                            <ReactQuill onChange={handleEditorChange} />
                        </Form.Item>
                        <Form.Item
                            label="Text Snippet"
                            name="textSnippet"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please add a Text Snippet!',
                                },
                            ]}
                        >
                            <Input placeholder='Text Snippet' />
                        </Form.Item>
                    </Col>
                    <Col  md={8} lg={8} xl={8}>
                        <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select a category!' }]} hasFeedback>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select a category"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="release"s>Releases</Option>
                                <Option value="events">Events</Option>
                                <Option value="miscellaneous">Miscellaneous</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Card>
            </Row>
        </Form>
    )
}