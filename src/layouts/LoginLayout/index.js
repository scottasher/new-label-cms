import React from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';
import './index.less';

export default (props) => {
    // console.log(props)
    return (
        <DocumentTitle title='New Site'>
            <div className='login-container'>
                <div className='content'>
                    <div className='top'>
                        <div className='login-header'>
                            <Link to='/'>
                                <span className='title'>New Site</span>
                            </Link>
                        </div>
                    </div>
                    {props.children}
                </div>
            </div>
        </DocumentTitle>
    );
}
