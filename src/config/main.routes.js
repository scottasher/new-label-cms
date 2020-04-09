import Dashboard from '../pages/Dashboard';
import Articles from '../pages/Articles';
import NewArticle from '../pages/Articles/New';
import AccountCenter from '../pages/Account/Center';
import AccountSettings from '../pages/Account/Settings'; 
import AdminUsers from '../pages/Admin/Users';
import NewUser from '../pages/Admin/Users/New';

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
    {
        key: 3,
        path: '/account',
        name: 'Account',
        title: 'Account',
        routes: [
            {
                path:'/account/center',
                name: 'Account Center',
                title: 'Account Center',
                component: AccountCenter,
                layout: 'main',
            },
            {
                path:'/account/settings',
                name: 'Account Settings',
                title: 'Account Settings',
                component: AccountSettings,
                layout: 'main',
            },
        ]
    },
    {
        key: 4,
        path: '/admin',
        name: 'Admin',
        title: 'Admin',
        routes: [
            {
                path:'/admin/users',
                name: 'All Users',
                title: 'All Users',
                component: AdminUsers,
                layout: 'main',
            },
            {
                path:'/admin/users/:id/edit',
                name: 'All Users',
                title: 'All Users',
                component: NewUser,
                layout: 'main',
            },
            {
                path:'/admin/users/create',
                name: 'Create User',
                title: 'Create User',
                component: NewUser,
                layout: 'main',
            },
        ]
    }
];