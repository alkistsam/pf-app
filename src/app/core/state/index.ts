import { combineReducers } from 'redux'
import characterSearchReducer from './characters/sliceCharacters'

const rootReducer = combineReducers({
  characterSearch: characterSearchReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
