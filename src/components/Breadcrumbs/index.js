import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import routes from '../../config/main.routes';

const breadcrumbNameMap = routes.filter(r => {
    if(r.path === '/') {
        return false
    }
    return true
}).map(r => { 
    const arr = {};
    arr[r.path] = r.title
    return arr;
 }).reduce(function(result, currentObject) {
    for(var key in currentObject) {
        if (currentObject.hasOwnProperty(key)) {
            result[key] = currentObject[key];
        }
    }
    return result;
}, {});;

const Breadcrumbs = withRouter(props => {
    const { location } = props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        );
    });
    const breadcrumbItems = [
        <Breadcrumb.Item key="home">
            <Link to="/">Home</Link>
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);
    return (
        <div style={{ padding: '0 30px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>{breadcrumbItems}</Breadcrumb>
        </div>
    );
});

export default Breadcrumbs;