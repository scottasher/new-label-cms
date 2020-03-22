import { combineReducers } from 'redux';

import { article, articles } from './articles';
import { collapsed } from './utils';
import { user } from './users';

export default combineReducers({
    articles,
    article,
    collapsed,
    user,
});