import React, { Component, Fragment } from 'react';
import { List } from 'antd';
import { changePassword } from '../../../actions/users';
import ChangePassword from '../../../components/ChangePassword';

const passwordStrength = {
  strong: (
    <font className="strong">
      Strong
    </font>
  ),
  medium: (
    <font className="medium">
      Medium
    </font>
  ),
  weak: (
    <font className="weak">
      Weak
    </font>
  ),
};

class SecurityView extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      passVisible: false,
    }

    this.showPassChange = this.showPassChange.bind(this);
  }
  
  renderPassChange() {
    return (
      this.state.passVisible ? (
        <ChangePassword {...this.props} />
      ) : (
        <>
          {/* {formatMessage({ id: 'app.settings.security.password-description' }) }:  */}
          {passwordStrength.strong}
        </>
      )
    )
  }

  showPassChange() {
    this.setState(prevState => ({
      passVisible: !prevState.passVisible
    }));
  }

  getData = () => [
    {
      title: "Account Password",
      description: this.renderPassChange(),
      actions: [
        <a onClick={this.showPassChange}>
          {this.state.passVisible ? "Close" : "Modify"}        
        </a>,
      ],
    },
  ];

  render() {
    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={this.getData()}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

export default SecurityView;
