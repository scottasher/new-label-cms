import React, { useState, useEffect} from 'react';
import { Card, Form, Input, Select, Button, Popconfirm } from 'antd';
import { updateUser, createUser, fetchUser, clearUser, resendVerifyEmail } from '../../../../actions/users';
import { connect } from 'react-redux';

const { Option } = Select;
const auths = [
    'superAdmin',
    'admin',
    'editor',
    'author',
];
const verifyStyle = { 
    marginRight: 20,
    color: '#258eac', 
    cursor: 'pointer'
}

function NewUser(props) {
    const [form] = Form.useForm();
    const [name, setName] = useState('');
    let id;
    useEffect(() => {
        id = props.match.params.id
        if(!id) {
            props.clearUser();
        }
        if(id) {
            props.fetchUser(id)
            form.setFieldsValue(props.user)
            setName(props.user.displayName)
        }
    }, [props.user.id]);

    function handleForm(values) {
        if(!props.match.params.id) {
            return props.createUser(values, props.history);
        }
        return props.updateUser(values);
    }

    return (
        <Form
            name="new-user"
            onFinish={handleForm}
            form={form}
        >
            <Card 
                loading={props.loading} 
                title={name} 
                extra={[
                    <Popconfirm
                        title="Are you sure?"
                        onConfirm={() => props.resendVerifyEmail(props.match.params.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <span style={verifyStyle}>Resend Verification Email</span>
                    </Popconfirm>,
                    <Button 
                        htmlType="submit" 
                        type="primary"
                    >
                        {props.loading ? (props.match.params.id ? "Updating..." : "Uploading...") : (props.match.params.id ? "Update User" : "Create User")}
                    </Button>
                ]}
            >  
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Display Name"
                    name="displayName"
                    rules={[{ required: true, message: 'Please input your display name!' }]}
                >
                    <Input onChange={(e) => setName(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="authority"
                    label="Authority"
                    rules={[{required: true,message: 'Please select an authority!'}]}
                >
                    <Select placeholder="Please select an authority">
                        {
                            auths.map(obj => <Option key={obj} value={obj}>{obj}</Option>)
                        }
                    </Select>
                </Form.Item>
            </Card>
        </Form>
    )
}

function mapStateToProps({ user, loading }) {
    return { user, loading }
}

export default connect(mapStateToProps, { updateUser, createUser, fetchUser, clearUser, resendVerifyEmail })(NewUser);