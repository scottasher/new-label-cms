import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Input, notification } from 'antd';
import { changePassword } from '../../actions/users';
import { parseQuery } from '../../utils';

const ChangePassword = (props) => {
    const [form] = Form.useForm();

    function handleSubmit(values) {
        if (values.password !== values.confirmPass) {
            return notification.error({
                message: 'Passwords do not match',
                description: 'Please make sure both passwords match exactly',
            });
        }

        return props.changePassword(values, props.location.search, props.history);
    }

    return (
        <Form form={form} className="login-form" onFinish={handleSubmit} name="forgot-password">
            <Form.Item 
                style={{ width: 300 }}
                name="password" 
                rules={[{ required: true, message: 'Please input a new password!' }]}
            >
                <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item 
                style={{ width: 300 }}
                name="confirmPass" 
                rules={[{ required: true, message: 'Please input confirm yout password!' }]}
            >
                <Input.Password placeholder="Confirm password" />
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

export default connect(null, { changePassword })(ChangePassword);
