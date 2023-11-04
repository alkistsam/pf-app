import { createSlice } from '@reduxjs/toolkit';
import { CharacterState } from '../../../shared/interfaces/interfaces';

export const initialState: CharacterState = {
    characters: null,
    loading: false,
    error: null,
  };

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchCharactersRequest: (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      },
      searchCharactersSuccess: (state, action) => {
        return {
          ...state,
          characters: action.payload,
          loading: false,
          error: null,
        };
      },
      searchCharactersFailure: (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      },
    },
});

export const { actions: searchActions, reducer: searchReducer } = searchSlice;
