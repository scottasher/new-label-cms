import React, { Component, Fragment } from 'react';
import { Form, Input, Upload, Select, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { fetchCurrentUser, updateUser } from '../../../actions/users';
import './index.less';

const FormItem = Form.Item;

const AvatarView = ({ avatar }) => (
    <Fragment>
        <div className='avatar_title'>
           Avatar
        </div>
        <div className='avatar'>
            <img src={avatar} alt="avatar" />
        </div>
        <Upload fileList={[]}>
            <div className='button_view'>
                <Button>
                    <UploadOutlined /> Change Avatar
                </Button>
            </div>
        </Upload>
    </Fragment>
);

class UserSettings extends Component {
    componentDidMount() {
        this.props.fetchCurrentUser();
    }

    getAvatarURL() {
        const { currentUser } = this.props;
        if (currentUser.avatar) {
            return currentUser.avatar;
        }
        const url = 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';
        return url;
    }

    getViewDom = ref => {
        this.view = ref;
    };

    handleSubmit = (values) => {
        this.props.updateUser(values)
    }

    render() {
       
        return (
            <div className='baseView' ref={this.getViewDom}>
                <div className='left'>
                    <Form 
                        layout="vertical" 
                        onFinish={this.handleSubmit} 
                        hideRequiredMark
                        initialValues={this.props.currentUser}
                    >
                        <FormItem 
                            name="email" 
                            label="Email"
                            rules={[{required: true,message: 'please input an email'}]}
                        >
                            <Input />
                        </FormItem>
                        <FormItem 
                            label="Name"
                            name="name"
                            rules={[{required: true,message: "please input your name"}]}
                        >
                            <Input />
                        </FormItem>
                        <FormItem 
                            label="Display Name"
                            name="displayName"
                            rules={[{required: true,message: "please input a display name"}]}
                        >
                            <Input />
                        </FormItem>
                        <Button htmlType="submit" type="primary">
                            Update
                        </Button>
                    </Form>
                </div>
                <div className='right'>
                    <AvatarView avatar={this.getAvatarURL()} />
                </div>
            </div>
        )
    }
};


function mapStateToProps({ currentUser }) {
  return { currentUser };
}

export default connect(mapStateToProps, { fetchCurrentUser, updateUser })(UserSettings);
