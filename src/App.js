import React from 'react';
import './App.less';
import routes from './config/main.routes';
import MainIndex from './layouts/MainIndex';

function App(props) {
    const routeComponents = routes.map((route, key) => {
        console.log(routes)
        if (!route.routes) {
            return <MainIndex exact path={route.path} component={route.component} key={key} />
        } 
        return route.routes.map(r => {
            return <MainIndex exact path={r.path} component={r.component} key={r.path} />
        });
    });
    return (
        <>
            {routeComponents}
        </>
    );
}

export default App;