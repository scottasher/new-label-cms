import React from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';
import './index.less';

export default (props) => {
    return (
        <DocumentTitle title='Extraleap'>
            <div className='login-container'>
                <div className='content'>
                    <div className='top'>
                        <div className='login-header'>
                            <Link to='/'>
                                <span className='title'>Extraleap</span>
                            </Link>
                        </div>
                    </div>
                    {props.children}
                </div>
            </div>
        </DocumentTitle>
    );
}
