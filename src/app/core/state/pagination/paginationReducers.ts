import { createReducer } from '@reduxjs/toolkit';
import { updateCurrentPage, updateItemsPerPage, updateTotalPages, updatePreviousPage, updateNextPage } from './paginationActions';
import { initialState } from './slicePagination';

export const paginationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateCurrentPage, (state, action) => {
      state.currentPage = action.payload;
    })
    .addCase(updateItemsPerPage, (state, action) => {
      state.pageSize = action.payload;
    })
    .addCase(updateTotalPages, (state, action) => {
      state.totalPages = action.payload;
    })
    .addCase(updatePreviousPage, (state, action) => {
      state.previousPage = action.payload;
    })
    .addCase(updateNextPage, (state, action) => {
      state.nextPage = action.payload;
    });
});
