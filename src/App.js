import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { fetchCurrentUser } from './actions/users';
import mainRoutes from './config/main.routes';
import authRoutes from './config/auth.routes';
import { Switch } from 'react-router-dom';
import LoginIndex from './layouts/LoginIndex';
import MainIndex from './layouts/MainIndex';
import './App.less';

function App(props) {
    useEffect(() => {
        props.fetchCurrentUser()
    }, [props.currentUser.active]);

    const loginRoutes = authRoutes.map((route, key) => {
        if(!route.routes) {
            return <LoginIndex exact {...route} currentUser={props.currentUser} path={route.path} component={route.component} key={key} />
        }
        return authRoutes.routes.map(r => {
            return <LoginIndex exact {...route} currentUser={props.currentUser} path={r.path} component={r.component} key={r.path} />
        });
    });

    const dashboardRoutes = mainRoutes.map((route, key) => {
        if(!route.routes) {
            return <MainIndex {...route} currentUser={props.currentUser} exact path={route.path} component={route.component} key={key} />
        } 
        return route.routes.map(r => {
            return <MainIndex {...route} currentUser={props.currentUser} exact path={r.path} component={r.component} key={r.path} />
        });
    });

    return (
        <Switch>  
            {loginRoutes}
            {dashboardRoutes}
            <Route path="/account" component={() => <Redirect to="/account/center" />} />
            <Route path="/admin" component={() => <Redirect to="/admin/users" />} />
        </Switch>
    );
}

function mapStateToProps({ currentUser, loading }) {
    return { currentUser, loading };    
}

export default connect(mapStateToProps, { fetchCurrentUser })(App);
