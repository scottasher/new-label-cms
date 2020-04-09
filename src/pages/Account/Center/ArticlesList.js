import React from 'react';
import { EditOutlined, ShareAltOutlined, EllipsisOutlined, CheckOutlined } from '@ant-design/icons';
import { Card, List, Tooltip, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';

export default function({ articles, updateArticle }) {
    // console.log('[ARTICLES ACCOUNT LIST]', articles);
    const itemMenu = (obj) => (
        <Menu>
          <Menu.Item>
            <div onClick={() => updateArticle({ status: "public" })}>
                {obj.status === "public" ? <CheckOutlined /> : null} Public
            </div>
          </Menu.Item>
          <Menu.Item>
            <div onClick={() => updateArticle({ status: "private" })}>
                {obj.status === "private" ? <CheckOutlined /> : null} Private
            </div>
          </Menu.Item>
          <Menu.Item>
            <div onClick={() => updateArticle({ status: "draft" })}>
                {obj.status === "draft" ? <CheckOutlined /> : null} Draft
            </div>
          </Menu.Item>
        </Menu>
    );
    return (
        <List
            rowKey="id"
            className="filterCardList"
            grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
            dataSource={articles}
            renderItem={(item) => (
                <List.Item key={item.id}>
                    <Card
                        hoverable
                        bodyStyle={{ paddingBottom: 20 }}
                        actions={[
                            <Tooltip title="Edit" key="edit">
                                <Link to={`/articles/${item.id}/edit`}><EditOutlined /></Link>
                            </Tooltip>,
                            <Tooltip title="View live version" key="share">
                                <a target="_blank" href={`https://melodiousdin.com/articles/${item.id}`}><ShareAltOutlined /></a>
                            </Tooltip>,
                            <Dropdown overlay={itemMenu(item)} key="ellipsis">
                                <EllipsisOutlined />
                            </Dropdown>,
                        ]}
                    >
                        <Card.Meta title={item.title} />
                        <div className="cardItemContent">
                            POSTED: {formatDistance(new Date(item.createdAt), new Date(), { addSuffix: true })}
                        </div>
                    </Card>
                </List.Item>
            )}
        />
    )
}