import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Form, Row, Card, Tooltip, Tag, Spin, Col, Input } from 'antd';
import Head from './Head';
import FormRight from './FormRight';
import { createArticle, fetchArticle, updateArticle, clearArticle } from '../../../actions/articles';
import { EditorState, convertFromRaw, convertToRaw, ContentState, DefaultDraftBlockRenderMap } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Map } from 'immutable';
import EmbedWrapper from './EmbedWrapper';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './index.less';
const colStyles = { paddingRight: 20 };

function NewArticle(props) {
    let id;
    const [form] = Form.useForm();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [tags, setTags] = useState([]);
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState('public');
    const [dropVisible, setDropVisible] = useState(false);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [fileList, setFileList] = useState([]);
    const [title, setTitle] = useState('');
    console.log(editorState)

    useEffect(() => {
        id = props.match.params.id
        if(!id) {
           return props.clearArticle()
        }
        if(id) {
            props.fetchArticle(id)
            initVals(props.article);
        }
    }, [props.article.id]);

    const handlePublishChange = (e) => {
        setDropVisible(false)
        setSelectedMenuItem(e.key);
    }

    const onFinish = values => {
        console.log(values)
        const newArticle = {
            title: values.title,
            body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
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
        console.log('initVals', data)
        if(!data.body) {
            return 
        } else {
            if(data.body.blocks) {
                setEditorState(
                    EditorState.createWithContent(
                        convertFromRaw(data.body)
                    ) 
                )
            }
        }
        console.log(editorState)
        setTags(data.tags);
        setTitle(data.title);
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
            body: editorState,
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

    const embedCallback = (res) => {
        console.log('embedCallback', res)
        return res
    }

    const onEditorStateChange = (editorState) => {
        console.log('editorState', editorState)
        setEditorState(editorState)
    }

    const blockRenderMap = Map({
        'atomic': {
            wrapper: <EmbedWrapper />,
        },
        'unstyled': {
            element: 'p',
            aliasedElements: ['p'],
        }
    });
    const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);
    console.log(extendedBlockRenderMap)
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
                title={title}
                handlePublishChange={handlePublishChange} 
                handleDropMenu={() => setDropVisible(!dropVisible)}
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
                            <Editor
                                blockRenderMap={extendedBlockRenderMap}
                                editorState={editorState}
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class"
                                toolbarClassName="toolbar-class"
                                onEditorStateChange={onEditorStateChange}
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