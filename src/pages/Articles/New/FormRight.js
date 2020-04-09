import React, { useEffect, useState } from 'react';
import { Tooltip, Col, Form, Select, Tag, Upload, Button, Input } from 'antd';
import { InfoCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { ROOT_URL } from '../../../defaultSettings';
import { getToken } from '../../../utils/authority';

const { Option } = Select;

export default (props) => {
    let tagInput;
    const IMG_UPLOAD_URL = `${ROOT_URL}/api/v1/articles/image?token=Token ${getToken()}`;

    useEffect(() => {
        if(!tagInput) {
        } else {
            tagInput.focus()
        }
    })
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
    const handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        // console.log(tags);
        this.setState({ tags });
    };
    const saveInputRef = input => {
        // console.log(input)
        tagInput = input
    };

    const normFile = e => {
        // console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    };
    return (
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
                <div>
                    {props.currentTags.map((tag, index) => {
                        const isLongTag = tag.length > 20;
                        const tagElem = (
                            <Tag key={tag} closable={index !== 0} onClose={() => props.handleClose(tag)}>
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
                    })}
                    {props.inputVisible && (
                        <Input
                            ref={saveInputRef}
                            type="text"
                            size="small"
                            style={{ width: 78 }}
                            value={props.inputValue}
                            onChange={props.handleInputChange}
                            onBlur={props.handleInputConfirm}
                            onPressEnter={props.handleInputConfirm}
                        />
                    )}
                    {!props.inputVisible && (
                        <Tag className="site-tag-plus" onClick={props.showInput}>
                            <PlusOutlined /> New Tag
                        </Tag>
                    )}
                </div>
            </Form.Item>
            <Form.Item getValueFromEvent={normFile} valuePropName="fileList" name="imageName" label="Image">
                <Upload name="articleImage" action={IMG_UPLOAD_URL} listType="picture">
                    <Button>
                        <UploadOutlined /> Click to upload
                    </Button>
                </Upload>
            </Form.Item>
        </Col>
    )
}