import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Card, Tooltip, Tag, Spin, Col, Input } from 'antd';
import Head from './Head';
import FormRight from './FormRight';
import { createArticle, fetchArticle, updateArticle, clearArticle } from '../../../actions/articles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.less';

const colStyles = { paddingRight: 20 };

function NewArticle(props) {
    let id;
    const [form] = Form.useForm();
    const [editorState, setEditorState] = useState('');
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
            props.clearArticle()
        }
        if(id) {
            props.fetchArticle(id)
        }
        initVals(props.article);
    }, [props.article.id]);


    const handleDropMenu = () => setDropVisible(!dropVisible);

    const handlePublishChange = (e) => {
        setDropVisible(false)
        setSelectedMenuItem(e.key);
    }

    const onFinish = values => {
        const newArticle = {
            title: values.title,
            body: values.body,
            textSnippet: values.textSnippet,
            category: values.category,
            tags: tags.toString(),
            imageName: values.imageName[0].name,
            status: selectedMenuItem
        };
        // console.log(props.match.params.id)
        if(!props.match.params.id) {
            // console.log('[CREATE ARTICLE]', props.match.params.id)
            return props.createArticle(newArticle, props.history)
        }
        return props.updateArticle(newArticle, props.match.params.id, null)

    };

    const onFinishFailed = errorInfo => {
        // console.log('Failed:', errorInfo);
    };

    const initVals = (data) => {

        if(!data) {
            return 
        }
        setTags(data.tags);
        
        let imgPath;
        if(data.image && props.match.params) {
            imgPath = [{
                uid: '-1',
                name: data.image.name,
                status: 'done',
                url: data.image.path,
                thumbUrl: data.image.path,
            }]
        }
        const init = {
            title: data.title,
            body: data.body || '',
            textSnippet: data.textSnippet,
            category: data.category,
            tags: data.tags,
            imageName: imgPath || []
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
        setTags(newTags || props.article.tags || []);
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
            name="new-article"
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
                        <Form.Item
                            label="Body"
                            name="body"
                            rules={[{required: true, message: 'Please add a body!',},]}
                        >
                            <ReactQuill 
                                value={editorState}
                                onChange={(text, delta, source, editor) => setEditorState(text)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Text Snippet"
                            name="textSnippet"
                            rules={[{required: true,message: 'Please add a Text Snippet!',},]}
                        >
                            <Input placeholder='Text Snippet' />
                        </Form.Item>
                    </Col>
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
                </Row>
            </Card>
        </Form>
    )
}

function mapStateToProps({ loading, article }) {
    return { loading, article }
}

export default connect(mapStateToProps, { 
    createArticle, updateArticle, fetchArticle, clearArticle,  
})(NewArticle);