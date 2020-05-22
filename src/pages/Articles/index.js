import React, { useEffect } from 'react';
import { Card, Row, Col, Table, Divider, Tag, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchArticles, deleteArticle, clearArticle } from '../../actions/articles';

function Articles(props) {
    // console.log(props)
    useEffect(() => {
        props.fetchArticles();
    }, []);
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => <Link to={`/articles/${record.id}/edit`}>{text}</Link>,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (text) => <div style={{ textTransform: 'capitalize' }}>{text}</div>
        },
        {
            title: 'Author',
            dataIndex: 'author',
            render: (text, record) => <Link to={`/articles`}>{text.name}</Link>,
            key: 'id',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <span>
                    {tags.map(tag => {
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
                    <Link to={`/articles/${record.id}/edit`}>Edit</Link>
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
            <Card 
                loading={props.loading}
                title={<h3>All Articles</h3>} 
                extra={(
                    <Link to='/articles/create'>
                        <div onClick={() => props.clearArticle()}>+ Add New</div>
                    </Link>
                )} 
                style={{ marginTop: '20px' }}>   
              <Table rowKey={record => record.id} columns={columns} dataSource={props.articles} />
            </Card>
          </Col>
        </Row>
    )
}

function mapStateToProps({ articles, loading }) {
    return { articles, loading };
  }
  
export default connect(mapStateToProps, { fetchArticles, deleteArticle, clearArticle })(Articles);
