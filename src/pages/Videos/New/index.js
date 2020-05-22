import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Card, Tooltip, Tag, Spin, Col, Input } from 'antd';
import Head from './Head';
import FormRight from './FormRight';
import { createVideo, fetchVideo, updateVideo, clearVideo } from '../../../actions/videos';
import './index.less';

const colStyles = { paddingRight: 20 };

function NewVideo(props) {
    let id;
    const [form] = Form.useForm();
    const [tags, setTags] = useState([]);
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState('public');
    const [dropVisible, setDropVisible] = useState(false);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [fileList, setFileList] = useState([]);


    useEffect(() => {
        id = props.match.params.id
        if(!id) {
            props.clearVideo()
        }
        if(id) {
            props.fetchVideo(id)
            initVals(props.video);
        }
    }, [props.video.id]);


    const handleDropMenu = () => setDropVisible(!dropVisible);

    const handlePublishChange = (e) => {
        setDropVisible(false)
        setSelectedMenuItem(e.key);
    }

    const onFinish = values => {
        const newVideo = {
            title: values.title,
            body: values.body,
            category: values.category,
            tags: tags.toString(),
            videoName: values.videoName[0].name,
            status: selectedMenuItem
        };
        // console.log(props.match.params.id)
        if(!props.match.params.id) {
            // console.log('[CREATE ARTICLE]', props.match.params.id)
            return props.createVideo(newVideo, props.history)
        }
        return props.updateVideo(newVideo, props.match.params.id, null)

    };

    const onFinishFailed = errorInfo => {
        // console.log('Failed:', errorInfo);
    };

    const initVals = (data) => {

        if(!data) {
            return 
        }
        setTags(data.tags);
        
        let videoPath;
        if(data.image && props.match.params) {
            videoPath = [{
                uid: '-1',
                name: data.video.name,
                status: 'done',
                url: data.video.path,
                thumbUrl: data.video.path,
            }]
        }
        const init = {
            title: data.title,
            description: data.description,
            category: data.category,
            tags: data.tags,
            videoName: videoPath || []
        }
        return form.setFieldsValue(init)
    }

    const showInput = () => setInputVisible(true);
    const handleInputChange = e => setInputValue(e.target.value);
    const handleInputConfirm = () => {
        let newTags;
        if (inputValue && tags && tags.indexOf(inputValue) === -1) {
            newTags = [...tags, inputValue];
        }
        setTags(newTags || props.video.tags || []);
        setInputVisible(false);
        setInputValue('');
    };
    const handleClose = removedTag => {
        const newTags = tags.filter(tag => tag !== removedTag);

        setTags(newTags);
    };

    return (
        <Form 
            form={form}
            name="new-video"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Head 
                {...props}
                handlePublishChange={handlePublishChange} 
                handleDropMenu={handleDropMenu}
                dropVisible={dropVisible}
                optionsVisible={optionsVisible}
                selectedMenuItem={selectedMenuItem}
                setOptionsVisible={setOptionsVisible}

            />
            <Card loading={props.loading} style={{width: '100%'}} bordered={false}>
                <Row gutter={[16, 16]}>
                    <Col 
                        style={colStyles} 
                        xs={24} sm={24} md={16}
                    >
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[{ required: true, message: 'Please add a title!'}, ]}
                        >
                            <Input placeholder='Title' />
                        </Form.Item>
                    
                    <FormRight 
                        currentTags={tags || []}
                        showInput={showInput}
                        handleInputChange={handleInputChange}
                        handleInputConfirm={handleInputConfirm}
                        inputVisible={inputVisible}
                        inputValue={inputValue}
                        handleClose={handleClose}
                        fileList={fileList}
                        setFileList={setFileList}
                    />
                    </Col>
                </Row>
            </Card>
        </Form>
    )
}

function mapStateToProps({ loading, video }) {
    return { loading, video }
}

export default connect(mapStateToProps, { 
    createVideo, fetchVideo, updateVideo, clearVideo,  
})(NewVideo);