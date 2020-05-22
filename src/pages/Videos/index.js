import React, { useEffect } from 'react';
import { Card, Row, Col, Table, Divider, Tag, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchVideos, deleteVideo, clearVideo } from '../../actions/videos';

function VideoCenter(props) {
    // console.log(props)
    useEffect(() => {
        props.fetchVideos();
    }, []);

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => <Link to={`/videos/${record.id}/edit`}>{text}</Link>,
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
            render: (text, record) => <Link to={`/videos`}>{text.name}</Link>,
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
                    <Link to={`/videos/${record.id}/edit`}>Edit</Link>
                    <Divider type="vertical" />
                    <Popconfirm
                        title="Are you sure delete this video"
                        onConfirm={() => clickDeleteVideo.bind(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a href="#">Delete</a>
                    </Popconfirm>
                </span>
            ),
        },
    ];
    const clickDeleteVideo = (data, e) => {
        e.preventDefault();    
        props.deleteVideo(data, props.history);
    }

    return (
        <Row>
          <Col>
            <Card 
                loading={props.loading}
                title={<h3>All Videos</h3>} 
                extra={(
                    <Link to='/videos/create'>
                        <div onClick={() => props.clearVideo()}>+ Add New</div>
                    </Link>
                )} 
                style={{ marginTop: '20px' }}>   
              <Table rowKey={record => record.id} columns={columns} dataSource={props.articles} />
            </Card>
          </Col>
        </Row>
    )
}

function mapStateToProps({ videos, loading }) {
    return { videos, loading };
  }
  
export default connect(mapStateToProps, { fetchVideos, deleteVideo, clearVideo })(VideoCenter);
