import { createReducer } from '@reduxjs/toolkit'
import {
  searchCharactersFailure,
  searchCharactersRequest,
  searchCharactersSuccess,
} from './searchActions'
import { initialState } from './sliceSearch'

export const searchReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(searchCharactersRequest, (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      }
    })
    .addCase(searchCharactersSuccess, (state) => {
      return {
        ...state,
        loading: false,
        error: null,
      }
    })
    .addCase(searchCharactersFailure, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    })
})
