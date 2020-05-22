import React from 'react';
import { Layout } from 'antd';
import Breadcrumbs from '../../components/Breadcrumbs';
import MainHeader from '../../components/MainHeader';
import SideMenu from '../../components/SideMenu';
import AdminMenu from '../../components/AdminMenu';
import { connect } from 'react-redux';
import { sideCollapse, adminCollapse } from '../../actions/utils';
import { ContainerQuery } from 'react-container-query';
import classnames from 'classnames';
import { format } from 'date-fns';
import routes from '../../config/main.routes';
import { getMenuMap } from '../../utils'
import './index.less';

const { Content, Footer } = Layout;
const siderMenuData = getMenuMap(routes);
const date = format(
    new Date(),
    'yyyy'
);
const query = {
    'screen-xs': {
        maxWidth: 575,
    },
    'screen-sm': {
        minWidth: 576,
        maxWidth: 767,
    },
    'screen-md': {
        minWidth: 768,
        maxWidth: 991,
    },
    'screen-lg': {
        minWidth: 992,
        maxWidth: 1199,
    },
    'screen-xl': {
        minWidth: 1200,
        maxWidth: 1599,
    },
    'screen-xxl': {
        minWidth: 1600,
    },
};

function MainLayout(props) {
    // console.log('[MAINLAYOUT PROPS]', props);
    const handleMenuCollapse = (e) => {
        // console.log(e);
        props.sideCollapse(e);
    };
    // console.log(props)
    const layout = (
        <Layout className="layout">
            <div className='sider-view'>
                <SideMenu
                    menuData={siderMenuData}
                    onCollapse={handleMenuCollapse}
                    collapsed={props.collapsed}
                    {...props}
                />
            </div>
            <Layout>
                <MainHeader
                    handleMenuCollapse={handleMenuCollapse}
                    {...props}
                />
                <AdminMenu {...props} visible={props.adminCollapsed} handleCollapse={props.adminCollapse} />
                <Content>
                    <Breadcrumbs />
                    <div className="site-layout-content">{props.children}</div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>New Site ©{date}</Footer>
            </Layout>
        </Layout>
    );

    return (
        <ContainerQuery query={query}>
            {(params) => (
                <div className={classnames(params)}>
                    {layout}
                </div>
            )}
        </ContainerQuery>
    )
}

function mapStateToProps({ collapsed, currentUser, adminCollapsed }) {
    return { collapsed, currentUser, adminCollapsed }
}

export default connect(mapStateToProps, { sideCollapse, adminCollapse })(MainLayout)