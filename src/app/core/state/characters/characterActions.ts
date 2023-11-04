import { Character, FetchCharactersRequestAction } from '../../../shared/interfaces/interfaces'
import { CharacterActionType, DisneyError } from '../../../shared/types/types'

export const fetchCharactersRequest = ():  FetchCharactersRequestAction => ({
  type: CharacterActionType.FETCH_CHARACTERS_REQUEST,
})

export const fetchCharactersSuccess = (characters: Character) => ({
  type: CharacterActionType.FETCH_CHARACTERS_SUCCESS,
  payload: characters,
})

export const fetchCharactersFailure = (error: DisneyError) => ({
  type: CharacterActionType.FETCH_CHARACTERS_FAILURE,
  payload: error,
})

export const sortCharacters = (characters: Character[]) => ({
  type: CharacterActionType.SORT_CHARACTERS,
  payload: characters,
});
