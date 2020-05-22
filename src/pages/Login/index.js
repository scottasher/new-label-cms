import React from 'react';
import { notification } from 'antd';
import { connect } from 'react-redux';
import LoginForm from '../../components/LoginForm';
import {parseQuery} from '../../utils';
import { userLogin } from '../../actions/users';

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
                    'You have successfully signed up, please login.',
                })
            )
        }
    }

    function handleLogin(e) {
        if(!e.veryify) {
            return props.userLogin({ user: e }, props.history)
        }
    }

    function handleFailedLogin(e) {
        // console.log(e)
    }

    return (
        <div className='login-main'>
            {userActivation()}
            <LoginForm loading={props.loading} handleFailedLogin={handleFailedLogin} handleLogin={handleLogin} />
        </div>
    )
}

function mapStateToProps({ login, loading }) {
    return { login, loading };
}
  
export default connect(mapStateToProps, { userLogin })(Login);
