import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PaginationState } from '../../../shared/interfaces/interfaces'

export const initialState: PaginationState = {
  currentPage: 1,
  pageSize: 50,
  totalPages: 0,
  totalCount: 0,
  previousPage: null,
  nextPage: null,
}

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    updatePagination: (state, action: PayloadAction<PaginationState>) => {
      return { ...state, ...action.payload }
    },
    updateItemsPerPage: (state, action) => {
      return { ...state, pageSize: action.payload }
    },
    updateCurrentPage: (state, action) => {
      return { ...state, currentPage: action.payload }
    },
  },
})

export const { updatePagination, updateItemsPerPage, updateCurrentPage } = paginationSlice.actions
export const paginationReducer = paginationSlice.reducer
