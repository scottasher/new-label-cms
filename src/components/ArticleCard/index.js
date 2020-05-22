import React from 'react';
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { formatDistance } from 'date-fns';

const { Meta } = Card;

export default ({ data: { createdAt, image, title } }) => {
    const formatedPostDate = formatDistance(new Date(createdAt), new Date(), { addSuffix: true });

    function handleAction(e) {
        // console.log('[ARTICLE CARD ACTION]', e)
    }

    return (
        <Card
            style={{ width: 300 }}
            cover={
                <img
                    alt="example"
                    src={image.path}
                />
            }
            actions={[
                <SettingOutlined onClick={handleAction} key="setting" />,
                <EditOutlined onClick={handleAction} key="edit" />,
                <EllipsisOutlined onClick={handleAction} key="ellipsis" />,
            ]}
        >
            <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={title}
                description={formatedPostDate}
            />
        </Card>
    )
}