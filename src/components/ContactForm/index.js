import React from 'react';
import { Form, Input, Button } from 'antd';
import { contactUs } from '../../actions/utils';
import { connect } from 'react-redux';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
  
const validateMessages = {
    required: 'This field is required!',
    types: {
        email: 'Not a validate email!',
        number: 'Not a validate number!',
    },
};

function ContactForm(props) {
    const onFinish = values => {
        props.contactUs(values);
    };
    
    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email', required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'introduction']} label="Introduction" rules={[{ required: true }]}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item style={{ display: 'none' }} name={['user', 'introduction']} label="Introduction">
                <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default connect(null, { contactUs })(ContactForm);