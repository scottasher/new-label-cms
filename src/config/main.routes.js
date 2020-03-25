import Dashboard from '../pages/Dashboard';
import Articles from '../pages/Articles';
import NewArticle from '../pages/Articles/New';

export default  [ 
    {
        key: 1,
        path: '/dashboard',
        name: 'dashboard',
        title: 'Dashboard',
        layout: 'main',
        component: Dashboard
    },
    {
        key: 2,
        path: '/articles',
        icon: 'appstore',
        name: 'Articles',
        title: 'Articles',
        routes: [
            {
                path:'/articles',
                name: 'Articles',
                title: 'All',
                component: Articles,
                layout: 'main',
            },
            {
                path:'/articles/:id/edit',
                name: 'edit',
                title: 'Edit',
                component: NewArticle,    
                layout: 'main',
            },
            {
                path:'/articles/create',
                name: 'create',
                exact: true,
                title: 'Create',
                component: NewArticle,        
                layout: 'main',
            },
        ]
    },
]