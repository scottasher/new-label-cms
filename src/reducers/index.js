import { combineReducers } from 'redux';

import { article, articles } from './articles';
import { collapsed, loading } from './utils';
import { user } from './users';
import { categories } from './categories';

export default combineReducers({
    articles,
    article,
    collapsed,
    user,
    categories,
    loading,
});