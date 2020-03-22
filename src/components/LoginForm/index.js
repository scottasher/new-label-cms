import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Checkbox, Button } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { userLogin } from '../../actions/users';
import './index.less';

function LoginForm(props) {
    const [loading, setLoading] = useState(false);

    function handleFinish(e) {
        // setLoading(true)
        console.log(e)
    };

    return (
        <Form className="login-form" onFinish={handleFinish}>
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
            <Form.Item name="remember">
                <Checkbox className='remember'>Remember me</Checkbox>
                <Link className="login-form-forgot" to="/employee/forgot/password">
                    Forgot password
                </Link>
                <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
                    { loading ? 'Loading...' : 'Login' }
                </Button>
                <div>
                    <span><Link to="/">Back Home</Link></span>
                    <span style={{ float: 'right' }}>Or <Link to="/user/register">Register Now!</Link></span>
                </div>
            </Form.Item>
        </Form>
    )
}

function mapStateToProps({ loading }) {
    return { loading }
}
  
export default connect(mapStateToProps, { userLogin })(LoginForm);