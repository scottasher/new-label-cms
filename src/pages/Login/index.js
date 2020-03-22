import React, { Component } from 'react';
import { notification } from 'antd';
import { connect } from 'react-redux';
import LoginForm from '../../components/LoginForm';
import {parseQuery} from '../../utils';

function Login(props) {
    function userActivation() {
        const query = parseQuery(props.location.search);
        if(query.activatedUser === 'false') {
            return (
                notification['error']({
                message: 'Account not activated',
                description:
                    'Something went wrong while trying to active your account, you will receive another email to try again.',
                })
            )
        } 
        
        if(query.activatedUser === 'true') {
            return (
                notification['success']({
                message: 'Successfully activated account',
                description:
                    'You have successfully signed up for extraleap, please login to start taking online courses.',
                })
            )
        }
    }

    return (
        <div className='login-main'>
            {userActivation()}
            <LoginForm />
        </div>
    )
}

function mapStateToProps({ login }) {
    return { login };
  }
  
  export default connect(mapStateToProps)(Login);