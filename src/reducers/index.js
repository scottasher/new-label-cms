import { combineReducers } from 'redux';

import { article, articles } from './articles';
import { video, videos } from './videos';
import { collapsed, loading, adminCollapsed } from './utils';
import { user, users, currentUser } from './users';
import { categories } from './categories';

export default combineReducers({
    articles,
    article,
    videos,
    video,
    collapsed,
    user,
    users,
    currentUser,
    categories,
    loading,
    adminCollapsed,
});