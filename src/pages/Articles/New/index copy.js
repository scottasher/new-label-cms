import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { 
    Form, Row, Button, PageHeader, Menu,
    Col, Card, Input, Tooltip, Icon, 
    Select, Tag, Upload, Dropdown
} from 'antd';
import { 
    InfoCircleOutlined, CheckOutlined, 
    EllipsisOutlined, PlusOutlined, 
    DownOutlined, UpOutlined 
} from '@ant-design/icons';
import ReactQuill from 'react-quill';
import { ROOT_URL } from '../../../defaultSettings';
import { uploadArticle, fetchArticle } from '../../../actions/articles';
import 'react-quill/dist/quill.snow.css';
import './index.less';

const { Option } = Select;
const colStyles = { paddingRight: 20 };
const IMG_UPLOAD_URL = `${ROOT_URL}/api/articles/image`;

function NewArticle(props) {
    let tagInput;
    let id;
    const [editorState, setEditorState] = useState('');
    const [tags, setTags] = useState([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState('public');
    const [dropVisible, setDropVisible] = useState(false);

    useEffect(() => {
        id = props.match.params
        if(id) {
            fetchArticle(id)
        }

        if(!tagInput) {
            
        } else {
            tagInput.focus()
        }
    })

    const handleEditorChange = (editorState) => setEditorState(editorState);
    const handleInputChange = e => setInputValue(e.target.value);
    const showInput = (e) => {
        setInputVisible(true);
    }
    const toggleOptions = () => setOptionsVisible(!optionsVisible);
    const handlePublishChange = (e) => {
        setDropVisible(false)
        setSelectedMenuItem(e.key);
    }
    const saveInputRef = input => (tagInput = input);

    const menu = (
        <Menu>
            <Menu.Item key="public" id="public" onClick={handlePublishChange}>
                <p>
                    {selectedMenuItem === 'public' ? <CheckOutlined /> : null} Public
                </p>
            </Menu.Item>
            <Menu.Item key="private" id="private" onClick={handlePublishChange}>
                <p>
                    {selectedMenuItem === 'private' ? <CheckOutlined /> : null} Private
                </p>
            </Menu.Item>
            <Menu.Item key="draft" id="draft" onClick={handlePublishChange}>
                <p>
                    {selectedMenuItem === 'draft' ? <CheckOutlined /> : null} Draft
                </p>
            </Menu.Item>
        </Menu>
    );
    const onFinish = values => {
        const newArticle = {
            title: values.title,
            body: values.body,
            textSnippet: values.textSnippet,
            category: values.category,
            tags: tags,
            articleImage: values.articleImage[0].name
        }
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const initVals = (data) => {
        return {
            title: data.title,
            body: data.body || '',
            textSnippet: data.textSnippet,
            category: data.category,
            tags: data.tags,
            articleImage: data.articleImage,
        }
    }

    const handleClose = removedTag => {
        const tags = tags.filter(tag => tag !== removedTag);
        setTags(tags);
    };

    const renderTags = (data) => {
        const allTags = data || []
        return allTags.map((tag, index) => {
            const isLongTag = tag.length > 20;
            const tagElem = (
                <Tag key={tag} closable={index !== 0} onClose={() => handleClose(tag)}>
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </Tag>
            );
            return isLongTag ? (
                <Tooltip title={tag} key={tag}>
                    {tagElem}
                </Tooltip>
            ) : (
                tagElem
            );
        })
    }

    const renderOptions = () => {
        return <div>HELLO</div>
    }

    const handleDropMenu = () => {
        setDropVisible(!dropVisible)
    }

    const DropdownMenu = () => {
        return (
            <Dropdown 
                visible={dropVisible} 
                onBlur={handleDropMenu} 
                onClick={handleDropMenu} 
                key="more" overlay={menu}
            >
                <Button
                    style={{ border: 'none', padding: 0 }}
                >
                    <EllipsisOutlined
                        style={{
                            fontSize: 20,
                            verticalAlign: 'top',
                        }}
                    />
                </Button>
            </Dropdown>
        );
    };
      

    const handleInputConfirm = () => {
        let newTags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            newTags = [...tags, inputValue];
        }
        if(!tags) {
            newTags = [];
        }
        console.log(newTags)
        setTags(newTags);
        setInputVisible(false);
        setInputValue('');
    };

    const normFile = e => {
        // console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    };

    const tagsLabel = (
        <span>
            <em>
                <Tooltip title='Tags'>
                    <InfoCircleOutlined style={{ marginRight: 4 }} />
                </Tooltip>
            </em>
            Tags
        </span>
    );

    return (
        <Form 
            name="new-article"
            layout="vertical"
            onFinish={onFinish}
            initialValues={initVals(props.article)}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <PageHeader
                style={{ background: '#fff', marginBottom: '13px' }}
                className="site-page-header"
                title="Title"
                onBack={() => null}
                subTitle=""
                extra={[
                    // <Button key="2" onClick={toggleOptions}>
                    //     {optionsVisible ? <UpOutlined /> : <DownOutlined /> }
                    // </Button>,
                    <Button
                        key="submit"
                        type="primary" 
                        htmlType="submit"
                        loading={props.loading}
                    >
                        {props.loading ? 'Uploading...' : 'Publish'}
                    </Button>,
                    <DropdownMenu key="more" />,
                ]}
            >
                {optionsVisible ? renderOptions(props.article) : null}
            </PageHeader>
            <Card style={{width: '100%'}} bordered={false}>
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
                            rules={[{required: true,message: 'Please add a body!',},]}
                        >
                            <ReactQuill value={editorState} onChange={handleEditorChange} />
                        </Form.Item>
                        <Form.Item
                            label="Text Snippet"
                            name="textSnippet"
                            rules={[{required: true,message: 'Please add a Text Snippet!',},]}
                        >
                            <Input placeholder='Text Snippet' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} >
                        <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select a category!' }]} hasFeedback>
                            <Select
                                showSearch
                                placeholder="Select a category"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="release"s>Releases</Option>
                                <Option value="events">Events</Option>
                                <Option value="miscellaneous">Miscellaneous</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="tags" label={tagsLabel}>
                            <>
                                {renderTags(tags)}
                                {inputVisible && (
                                    <Input
                                        id="tagInput"
                                        ref={saveInputRef}
                                        type="text"
                                        size="small"
                                        value={inputValue}
                                        style={{ width: 78 }}
                                        onChange={handleInputChange}
                                        onBlur={handleInputConfirm}
                                        onPressEnter={handleInputConfirm}
                                    />
                                )}
                                {!inputVisible && (
                                    <Tag onClick={showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                                        <PlusOutlined/> New Tag
                                    </Tag>
                                )}
                            </>
                        </Form.Item>
                        <Form.Item getValueFromEvent={normFile} valuePropName="fileList" name="articleImage" label="Image">
                            <Upload name="articleImage" action={IMG_UPLOAD_URL} listType="picture">
                                <Button>
                                    <Icon type="upload" /> Click to upload
                                </Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
            </Card>
        </Form>
    )
}

function mapStateToProps({ loading, article }) {
    return { loading, article }
}

export default connect(mapStateToProps, { uploadArticle, fetchArticle })(NewArticle);