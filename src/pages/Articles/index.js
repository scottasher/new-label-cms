import React, { useEffect } from 'react';
import ArticleCard from '../../components/ArticleCard';
import { Card, Row, Col, Table, Divider, Tag, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchArticles, deleteArticle } from '../../actions/articles';

function renderArticles(posts) {
    return posts.map(post => {
        return (
            <Col xs={24} sm={12}>  
                <Link to={`/articles/${post.id}`}>       
                    <ArticleCard article={post} />
                </Link>
            </Col>
        )
    })
}

function Articles(props) {
    useEffect(() => {
        props.fetchArticles();
    }, []);
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => <Link to={`/articles/${record.id}`}>{text}</Link>,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Author',
            dataIndex: 'author.username',
            key: 'id',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <span>
                    {tags.split(',').map(tag => {
                        return (
                            <Tag key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Link to={`/articles/${record.id}`}>Edit</Link>
                    <Divider type="vertical" />
                    <Popconfirm
                        title="Are you sure delete this article"
                        onConfirm={() => clickDeleteArticle.bind(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a href="#">Delete</a>
                    </Popconfirm>
                </span>
            ),
        },
    ];
    const clickDeleteArticle = (data, e) => {
        e.preventDefault();    
        props.deleteArticle(data, props.history);
    }

    return (
        <Row>
          <Col>
            <Card title={<h3>All Articles</h3>} extra={<Link to='/articles/create'>+ Add New</Link>} style={{ marginTop: '20px' }}>   
              <Table rowKey={record => record.id} columns={columns} dataSource={props.articles} />
            </Card>
          </Col>
        </Row>
    )
}

function mapStateToProps({ articles }) {
    return { articles };
  }
  
export default connect(mapStateToProps, { fetchArticles, deleteArticle })(Articles);
