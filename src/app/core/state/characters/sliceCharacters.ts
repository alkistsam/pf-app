import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CharactersData, CharacterState } from '../../../shared/interfaces/interfaces'

const initialState: CharacterState = {
  characters: null,
  loading: false,
  error: null,
}

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    fetchCharactersRequest: (state) => {
      state.loading = true
      state.error = null
    },
    fetchCharactersSuccess: (state, action: PayloadAction<CharactersData>) => {
      state.loading = false
      state.characters = action.payload
      state.error = null
    },
    fetchCharactersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    sortCharacters: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
  },
})
export const {
  fetchCharactersRequest,
  fetchCharactersSuccess,
  fetchCharactersFailure,
  sortCharacters,
} = characterSlice.actions
export const characterReducer = characterSlice.reducer
