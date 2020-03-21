import React from 'react';
import LoginLayout from './LoginLayout';
import Media from 'react-media';
import { Route, Redirect } from 'react-router-dom';

export default function LoginIndex({ component: Component, location, ...rest }) {
    // console.log(location)
    if(auth.active && location) {
        return <Redirect to={location.state.from} />
    }

    return (
        <Route {...rest} render={(props) => {
            return (
                <Media query="(max-width: 599px)">
                    {isMobile => (
                        <LoginLayout isMobile={isMobile} {...props}>
                            <Component {...props}/>
                        </LoginLayout>
                    )}
                </Media>
            )
        }} />
    )
}