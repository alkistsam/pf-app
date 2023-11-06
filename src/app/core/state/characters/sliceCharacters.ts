import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  Character,
  CharactersData,
  CharacterSearchState,
} from '../../../shared/interfaces/interfaces'

const initialState: CharacterSearchState = {
  characters: null,
  loading: false,
  error: null,
  characterSearchValue: '',
  currentPage: 1,
  pageSize: 50,
  totalPages: 0,
  totalCount: 0,
  previousPage: null,
  nextPage: null,
  paginationSearchValue: '',
  searchType: '',
  searchValue: '',
}

const characterSearchSlice = createSlice({
  name: 'characterSearch',
  initialState,
  reducers: {
    fetchCharactersRequest: (
      state,
      action: PayloadAction<{ searchValue: string; currentPage: number }>,
    ) => {
      state.loading = true
      state.error = null
      state.characterSearchValue = action.payload.searchValue
      state.currentPage = action.payload.currentPage
    },

    fetchCharactersSuccess: (state, action: PayloadAction<CharactersData>) => {
      state.characters = action.payload
      state.loading = false
      state.error = null
      console.log('Payload received in fetchCharactersSuccess:', action.payload)
    },
    fetchCharactersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    sortCharacters: (state, action: PayloadAction<Character[]>) => {
      if (state.characters) {
        state.characters.data = action.payload
      }
    },
    updateCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    updateItemsPerPage: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload
    },
    updateTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload
    },
    updatePreviousPage: (state, action: PayloadAction<string | null>) => {
      state.previousPage = action.payload
    },
    updateNextPage: (state, action: PayloadAction<string | null>) => {
      state.nextPage = action.payload
    },
    updateSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    },
    updatePageWithSearchValue: (
      state,
      action: PayloadAction<{ currentPage: number; searchValue: string }>,
    ) => {
      state.currentPage = action.payload.currentPage
      state.searchValue = action.payload.searchValue
    },
    updateSearchType: (state, action: PayloadAction<string>) => {
      state.searchType = action.payload
    },
  },
})

export const {
  fetchCharactersRequest,
  fetchCharactersSuccess,
  fetchCharactersFailure,
  sortCharacters,
  updateCurrentPage,
  updateItemsPerPage,
  updateTotalPages,
  updatePreviousPage,
  updateNextPage,
  updateSearchValue,
  updatePageWithSearchValue,
  updateSearchType,
} = characterSearchSlice.actions

export default characterSearchSlice.reducer
