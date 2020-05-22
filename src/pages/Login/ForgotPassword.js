import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Input } from 'antd';
import { forgotPassword } from '../../actions/users';

const ForgotPassword = (props) => {
    function handleSubmit(values) {
        props.forgotPassword(values)
    }

    return (
        <Form className="login-form" onFinish={handleSubmit} name="forgot-password">
            <Form.Item 
                style={{ width: 300 }}
                name="email" 
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input placeholder="Please enter your email..." />
            </Form.Item>
            <Form.Item name="submit">
                <Button 
                    loading={props.loading} 
                    style={{ width: 300 }} 
                    htmlType="submit" 
                    type="primary"
                >
                    {props.loading ? "Loading..." : "Submit"}
                </Button>
                <div>
                    <span><Link to="/">Back Home</Link></span>
                </div>
            </Form.Item>
        </Form>
    );
}

export default connect(null, { forgotPassword })(ForgotPassword);
