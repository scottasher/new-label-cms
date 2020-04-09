import React from 'react';
import { Form, Input, Button } from 'antd';

export default (props) => {
    const handleSubmit = values => {
        props.changePassword(values)
    }

    return (
        <Form layout="inline" name="change-password" onFinish={handleSubmit}>
            <Form.Item name="password">
                <Input placeholder="Enter new password"/>
            </Form.Item>
            <Form.Item>
                <Button 
                    loading={props.loading} 
                    htmlType="submit" 
                    type="primary"
                >
                    {props.loading ? 'Updating...' : 'Update'}
                </Button>
            </Form.Item>
        </Form>
    )
}