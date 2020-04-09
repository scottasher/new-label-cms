import { combineReducers } from 'redux';

import { article, articles } from './articles';
import { collapsed, loading, adminCollapsed } from './utils';
import { user, users, currentUser } from './users';
import { categories } from './categories';

export default combineReducers({
    articles,
    article,
    collapsed,
    user,
    users,
    currentUser,
    categories,
    loading,
    adminCollapsed,
});