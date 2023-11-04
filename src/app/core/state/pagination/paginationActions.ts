import { createAction } from '@reduxjs/toolkit';

export const updateCurrentPage = createAction<number>('pagination/updateCurrentPage');
export const updateItemsPerPage = createAction<number>('pagination/updateItemsPerPage');
export const updateTotalPages = createAction<number>('pagination/updateTotalPages');
export const updatePreviousPage = createAction<string | null>('pagination/updatePreviousPage');
export const updateNextPage = createAction<string | null>('pagination/updateNextPage');