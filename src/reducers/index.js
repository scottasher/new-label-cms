import { combineReducers } from 'redux';

import { article, articles } from './articles';
import { collapsed } from './utils';

export default combineReducers({
    articles,
    article,
    collapsed,
});