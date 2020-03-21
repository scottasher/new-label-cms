import React from 'react';
import MainLayout from './MainLayout';
import Media from 'react-media';
import { Route, Redirect } from 'react-router-dom';

export default function MainIndex({ component: Component, location, ...rest }) {
    // console.log(location)
    if(location) {
        return <Redirect to={location.state.from} />
    }

    return (
        <Route {...rest} render={(props) => {
            return (
                <Media query="(max-width: 599px)">
                    {isMobile => (
                        <MainLayout isMobile={isMobile} {...props}>
                            <Component {...props}/>
                        </MainLayout>
                    )}
                </Media>
            )
        }} />
    )
}