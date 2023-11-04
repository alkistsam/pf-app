import { CharacterActionType } from '../../../shared/types/types'


  import { CharacterActionTypes } from '../../../shared/types/types';
import { CharacterState } from '../../../shared/interfaces/interfaces';

  const initialState: CharacterState = {
    characters: null,
    loading: false,
    error: null,
  };
  
  const charactersReducer = (state = initialState, action: CharacterActionTypes) => {
    switch (action.type) {
      case CharacterActionType.FETCH_CHARACTERS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case CharacterActionType.FETCH_CHARACTERS_SUCCESS:
        return {
          ...state,
          characters: action.payload,
          loading: false,
          error: null,
        };
      case CharacterActionType.FETCH_CHARACTERS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
     case CharacterActionType.SORT_CHARACTERS:
      return {
        ...state,
        characters: {
          ...state.characters,
          data: action.payload
        }
      };
      default:
        return state;
    }
  };
  
  export default charactersReducer;
  