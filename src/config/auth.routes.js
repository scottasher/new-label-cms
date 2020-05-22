import Login from '../pages/Login';
import ForgotPassword from '../pages/Login/ForgotPassword';
import ChangePassword from '../pages/Login/ChangePassword';

export default  [ 
    {
        key: 1,
        path: '/',
        name: 'login',
        title: 'Login',
        layout: 'login',
        component: Login
    },
    {
        key: 2,
        path: '/employee/forgot/password',
        name: 'forgot',
        title: 'Forgot Password',
        layout: 'login',
        component: ForgotPassword
    },
    {
        key: 3,
        path: '/employee/password/reset',
        name: 'change',
        title: 'Change Password',
        layout: 'login',
        component: ChangePassword
    },
]