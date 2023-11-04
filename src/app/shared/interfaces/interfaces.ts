import { CharacterActionType } from '../types/types'

export interface Character {
  _id: number
  films: string[]
  shortFilms: string[]
  tvShows: string[]
  videoGames: string[]
  parkAttractions: string[]
  allies: string[]
  enemies: string[]
  sourceUrl: string
  name: string
  imageUrl: string
  createdAt: string
  updatedAt: string
  url: string
  __v: number
}

export interface CharactersData {
  info: {
    count: number
    totalPages: number
    previousPage: null | string
    nextPage: null | string
  }
  data: Character[]
}

export interface CharacterState {
  characters: CharactersData | null
  loading: boolean
  error: string | null
}

export interface FetchCharactersRequestAction {
  type: CharacterActionType.FETCH_CHARACTERS_REQUEST
}
export interface SortCharactersAction {
  type: CharacterActionType.SORT_CHARACTERS
  payload: string
}

export interface FetchCharactersSuccessAction {
  type: CharacterActionType.FETCH_CHARACTERS_SUCCESS
  payload: Character[]
}

export interface FetchCharactersFailureAction {
  type: CharacterActionType.FETCH_CHARACTERS_FAILURE
  payload: string
}

export interface PaginationState {
  currentPage: number
  pageSize: number
  totalPages: number
  totalCount: number
  previousPage: string | null
  nextPage: string | null
}
