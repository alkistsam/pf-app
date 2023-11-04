import {
  FetchCharactersFailureAction,
  FetchCharactersRequestAction,
  FetchCharactersSuccessAction,
  SortCharactersAction,
} from '../interfaces/interfaces'

export type DisneyError = {
  message: string
  code: number
}

export enum CharacterActionType {
  FETCH_CHARACTERS_REQUEST = 'FETCH_CHARACTERS_REQUEST',
  FETCH_CHARACTERS_SUCCESS = 'FETCH_CHARACTERS_SUCCESS',
  FETCH_CHARACTERS_FAILURE = 'FETCH_CHARACTERS_FAILURE',
  SORT_CHARACTERS = 'SORT_CHARACTERS',
}
export type CharacterActionTypes =
  | FetchCharactersRequestAction
  | FetchCharactersSuccessAction
  | FetchCharactersFailureAction
  | SortCharactersAction
