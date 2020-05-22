import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../../../actions/users';
import { fetchArticles, updateArticle, clearArticles } from '../../../actions/articles';
import './index.less';
import ArticlesList from './ArticlesList';

class Center extends Component {
  state = {
    newTags: [],
    inputVisible: false,
    inputValue: '',
    visibleChild: 'articles'
  };

  componentDidMount() {
    this.props.clearArticles();
    this.props.fetchCurrentUser();
    setTimeout(() => {
      this.props.fetchArticles({
        id: this.props.currentUser.id,
        name: this.props.currentUser.displayName
      }, 100)
    })
  }

  onTabChange = key => {
    const { match, history } = this.props;
    // console.log(this.props)
    switch (key) {
      case 'articles':
        this.setState({ visibleChild: key });
        break;
      case 'applications':
        this.setState({ visibleChild: key });
        break;
      case 'projects':
        this.setState({ visibleChild: key });
        break;
      default:
        break;
    }
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  saveInputRef = input => {
    this.input = input;
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { state } = this;
    const { inputValue } = state;
    let { newTags } = state;
    if (inputValue && newTags.filter(tag => tag.label === inputValue).length === 0) {
      newTags = [...newTags, { key: `new-${newTags.length}`, label: inputValue }];
    }
    this.setState({
      newTags,
      inputVisible: false,
      inputValue: '',
    });
  };

  renderSubRoutes() {
    switch (this.state.visibleChild) {
      case 'articles':
        return <ArticlesList {...this.props} />
      case 'applications':
        return <div>applications</div>
        break;
      case 'projects':
        return <div>projects</div>
        break;
      default:
        break;
    }
  }

  render() {
    const { currentUser, articles } = this.props;
    const operationTabList = [
      {
        key: 'articles',
        tab: (
          <span>
            Articles <span style={{ fontSize: 14 }}>({articles.length})</span>
          </span>
        ),
      },
    ];

    return (
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Card bordered={false} style={{ marginBottom: 24 }}>
            {currentUser && Object.keys(currentUser).length ? (
              <div>
                <div className='avatarHolder'>
                  <img alt="" src={currentUser.avatar} />
                  <div className='name'>{currentUser.name}</div>
                  <div>{currentUser.signature}</div>
                </div>
                <div className='detail'>
                  <p>
                    <i className='title' />
                    {currentUser.title}
                  </p>
                  <p>
                    <i className='group' />
                    {currentUser.group}
                  </p>
                </div>
              </div>
            ) : 'loading...'}
          </Card>
        </Col>
        <Col lg={17} md={24}>
          <Card
            className='tabsCard'
            bordered={false}
            tabList={operationTabList}
            onTabChange={this.onTabChange}
          >
            {this.renderSubRoutes()}
          </Card>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps({ currentUser, articles }) {
  return { currentUser, articles };
}

export default withRouter(connect(mapStateToProps, { fetchCurrentUser, fetchArticles, updateArticle, clearArticles })(Center));
