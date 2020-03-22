import React from 'react';
import './App.less';
import { connect } from 'react-redux';
import { fetchUser } from './actions/users';

import mainRoutes from './config/main.routes';
import authRoutes from './config/auth.routes';

import LoginIndex from './layouts/LoginIndex';
import MainIndex from './layouts/MainIndex';

function App(props) {
    const loginRoutes = authRoutes.map((route, key) => {
        if(!route.routes) {
            return <LoginIndex user={props.user} exact path={route.path} component={route.component} key={key} />
        }
        return authRoutes.routes.map(r => {
            return <LoginIndex user={props.user} exact path={r.path} component={r.component} key={r.path} />
        });
    });

    const dashboardRoutes = mainRoutes.map((route, key) => {
        if(!route.routes) {
            return <MainIndex user={props.user} exact path={route.path} component={route.component} key={key} />
        } 
        return route.routes.map(r => {
            return <MainIndex user={props.user} exact path={r.path} component={r.component} key={r.path} />
        });
    });

    return (
        <>  
            {loginRoutes}
            {dashboardRoutes}
        </>
    );
}

function mapStateToProps({ user }) {
    return { user };
}

export default connect(mapStateToProps, { fetchUser })(App);