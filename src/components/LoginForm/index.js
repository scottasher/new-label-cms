import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Checkbox, Button } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import './index.less';

export default function LoginForm(props) {
    return (
        <Form name="login-form" className="login-form" onFinish={props.handleLogin} onFinishFailed={props.handleFailedLogin}>
            <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input
                    prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Email"
                />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                <Input
                    prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item style={{ display: 'none' }} name="verify">
                <Input/>
            </Form.Item>
            <Form.Item >
                <Checkbox className='remember'>Remember me</Checkbox>
                <Link className="login-form-forgot" to="/employee/forgot/password">
                    Forgot password
                </Link>
                <Button loading={props.loading} type="primary" htmlType="submit" className="login-form-button">
                    { props.loading ? 'Loading...' : 'Login' }
                </Button>
                <div>
                    <span><Link to="/">Back Home</Link></span>
                </div>
            </Form.Item>
        </Form>
    )
}
