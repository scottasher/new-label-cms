import React from 'react';
import { Card } from 'antd';
import ContactForm from '../../components/ContactForm'
export default function Contact(props) {
    return (
        <div>
            <Card title="Contact Us" bordered={false}>
                <ContactForm/>
            </Card>
        </div>
    )
}