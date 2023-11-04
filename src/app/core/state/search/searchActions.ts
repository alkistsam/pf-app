import { createAction } from '@reduxjs/toolkit';

export const searchCharactersRequest = createAction<string>('characters/searchCharactersRequest');
export const searchCharactersSuccess = createAction<string>('characters/searchCharactersSuccess');
export const searchCharactersFailure = createAction<string>('characters/searchCharactersFailure');
