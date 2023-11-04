import { environment } from '../../environments/environment'
import axios from 'axios'
import { fetchCharactersRequest } from '../state/characters/characterActions'
import { CharacterActionType, CharacterActionTypes, DisneyError } from '../../shared/types/types'
import { Dispatch } from 'redux';

export class DisneyApiService {
  private baseUrl: string

  constructor() {
    this.baseUrl = environment.disneyUrl
  }
  

  async getCharacters(dispatch: Dispatch<CharacterActionTypes>, page: number, pageSize: number) {
    try {
      dispatch(fetchCharactersRequest());
      const response = await axios.get(`${this.baseUrl}character?page=${page}&pageSize=${pageSize}`)
      dispatch({
        type: CharacterActionType.FETCH_CHARACTERS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error fetching Disney characters:', error)
      const customError: DisneyError = { message: error as string, code: 0 };
      dispatch({
        type: CharacterActionType.FETCH_CHARACTERS_FAILURE,
        payload: customError.message,
      })
    }
  }
  
  async searchCharacters(dispatch: Dispatch<CharacterActionTypes>, searchType: string, searchValue: string) {
    try {
      dispatch(fetchCharactersRequest());
      const formattedSearchValue = searchValue.trim().replace(/\s/g, '%20');
      let url = `${this.baseUrl}character`;
      if (searchType === 'name') {
        url += `?name=${formattedSearchValue}`;
      } else if (searchType === 'tvShow') {
        url += `?tvShows_like=${formattedSearchValue}`;
      }
      const response = await axios.get(url);
      dispatch({
        type: CharacterActionType.FETCH_CHARACTERS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error searching Disney characters:', error);
      const customError: DisneyError = { message: error as string, code: 0 };
      dispatch({
        type: CharacterActionType.FETCH_CHARACTERS_FAILURE,
        payload: customError.message,
      });
    }
  }
}
