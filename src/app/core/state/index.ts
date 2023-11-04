import { combineReducers } from 'redux';
import charactersReducer from './characters/characterReducers';
import { paginationReducer } from './pagination/slicePagination';

const rootReducer = combineReducers({
  characters: charactersReducer,
  pagination: paginationReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;