import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentUser, changePassword } from '../../../actions/users';
import { Menu } from 'antd';
import UserSettings from './UserSettings';
import AccountSecurity from './AccountSecurity';
import './index.less';

const { Item } = Menu;

class AccountSettings extends Component {
  constructor(props) {
    super(props);
    const { match, location } = props;
    const menuMap = {
      base: "Basic Settings",
      security: "Security Settings",
    };
    const key = location.pathname.replace(`${match.path}/`, '');
    console.log(menuMap)
    this.state = {
      mode: 'inline',
      menuMap,
      selectKey: 'base',
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
    this.props.fetchCurrentUser();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  getmenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map(item => <Item key={item}>{menuMap[item]}</Item>);
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };

  selectKey = ({ key }) => {
    // this.props.history.push(`/account/settings/${key}`);
    this.setState({
      selectKey: key,
    });
  };

  resize = () => {
    if (!this.main) {
      return;
    }

    const { mode: currentMode } = this.state;

    let mode = 'inline';
    const { offsetWidth } = this.main;

    if (offsetWidth > 400 && offsetWidth < 641) {
      mode = 'horizontal';
    }

    if (window.innerWidth < 768 && offsetWidth > 400) {
      mode = 'horizontal';
    }

    if (mode !== currentMode) {
      requestAnimationFrame(() => this.setState({ mode }));
    }
  };

  renderSubRoutes() {
    const { selectKey } = this.state;
    switch (selectKey) {
      case 'base':
        return <UserSettings {...this.props} />
      case 'security':
        return <AccountSecurity {...this.props} />
      default:
        break;
    }
  }

  render() {
    const { mode, selectKey } = this.state;
    const { currentUser } = this.props;
    if (!currentUser.id) {
      return '';
    }

    return (
        <div
          className='main'
          ref={ref => {
            this.main = ref;
          }}
        >
          <div className='leftmenu'>
            <Menu mode={mode} selectedKeys={[selectKey]} onClick={this.selectKey}>
              {this.getmenu()}
            </Menu>
          </div>
          <div className='right'>
            <div className='title'>{this.getRightTitle()}</div>
            {this.renderSubRoutes()}
          </div>
        </div>
    );
  }
}

function mapStateToProps({ currentUser, loading }) {
  return { currentUser, loading };
}

export default connect(mapStateToProps, { fetchCurrentUser, changePassword })(AccountSettings) ;
