import React from 'react';
import LoginLayout from './LoginLayout';
import Media from 'react-media';
import { Route, Redirect } from 'react-router-dom';

export default function LoginIndex({ component: Component, currentUser, location, loading, ...rest }) {
    // console.log(currentUser)
    return (
        <Route {...rest} render={(moreProps) => 
            !currentUser.active ? (
                <LoginLayout>
                    <Component {...moreProps} />
                </LoginLayout>
            ) : (
                !moreProps.location.state ? <Redirect to="/dashboard" /> : (
                    <Redirect to={moreProps.location.state.from} />
                )
            )
        } />
    );
}