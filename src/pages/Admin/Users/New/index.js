import React, { useState, useEffect} from 'react';
import { Card, Form, Input, Select, Button } from 'antd';
import { updateUser, createUser, fetchUser, clearUser } from '../../../../actions/users';
import { connect } from 'react-redux';

const { Option } = Select;
const auths = [
    'superAdmin',
    'admin',
    'editor',
    'author',
]

function NewUser(props) {
    const [form] = Form.useForm();
    const [name, setName] = useState('');
    let id;
    useEffect(() => {
        id = props.match.params.id
        if(!id) {
            props.clearUser()
        }
        if(id) {
            props.fetchUser(id)
            setInitValues(props.user)
            setName(props.user.displayName)
        }
    }, [props.user.id]);

    function handleForm(values) {
        if(props.match.params.id) {
            return props.updateUser(values)
        }
        return props.createUser(values, props.history)
    }

    function setInitValues(e) {
        form.setFieldsValue(e)
    }

    function handleName(e) {
        setName(e.target.value)
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
                extra={<Button htmlType="submit" type="primary">{props.loading ? "Uploading..." : "Create User"}</Button>}
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
                    <Input onChange={handleName} />
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

export default connect(mapStateToProps, { updateUser, createUser, fetchUser, clearUser })(NewUser);