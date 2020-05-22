import React from 'react';
import { Col, Form, Input } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const colStyles = { paddingRight: 20 };

export default (props) => {
    return (
        <Col 
            style={colStyles} 
            xs={24} sm={24} md={16}
        >
            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please add a title!'}, ]}
            >
                <Input placeholder='Title' />
            </Form.Item>
            <Form.Item
                label="Body"
                name="body"
                rules={[{required: true, message: 'Please add a body!',},]}
            >
                <ReactQuill 
                    value={props.editorState || {}} 
                    defaultValue={props.editorState || {}}
                    onChange={(text, delta, source, editor) => {
                        // console.log('1', text, '2', delta, '3', source, '4', editor)
                        props.handleEditorChange(text)
                    }}
                />
            </Form.Item>
            <Form.Item
                label="Text Snippet"
                name="textSnippet"
                rules={[{required: true,message: 'Please add a Text Snippet!',},]}
            >
                <Input placeholder='Text Snippet' />
            </Form.Item>
        </Col>
    )
}