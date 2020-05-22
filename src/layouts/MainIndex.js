import React from 'react';
import MainLayout from './MainLayout';
import Media from 'react-media';
import { Route, Redirect } from 'react-router-dom';

export default function MainIndex({ component: Component, currentUser, location, ...rest }) {
    return (
        <Route {...rest} render={matchProps => (
            currentUser.active
            ? (
                <Media query="(max-width: 599px)">
                    {isMobile => (
                        <MainLayout isMobile={isMobile} {...rest} {...matchProps}>
                            <Component {...rest} {...matchProps}/>
                        </MainLayout>
                    )}
                </Media>
            ) : (
                <Redirect to={{
                    pathname: "/",
                    state: { from: matchProps.location }
                }}/>
            )
        )}/>
    );
}