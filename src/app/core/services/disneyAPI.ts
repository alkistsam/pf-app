import axios from 'axios'
import { Dispatch } from 'redux'
import { environment } from '../../environments/environment'
import { CharactersData } from '../../shared/interfaces/interfaces'
import {
  fetchCharactersFailure,
  fetchCharactersRequest,
  fetchCharactersSuccess,
  updateSearchType,
  updateSearchValue,
} from '../state/characters/sliceCharacters'
export class DisneyApiService {
  private baseUrl: string

  constructor() {
    this.baseUrl = environment.disneyUrl
  }

  async getCharacters(
    dispatch: Dispatch,
    page: number,
    pageSize: number,
    searchValue: string,
    currentPage: number,
  ) {
    dispatch(fetchCharactersRequest({ searchValue: searchValue, currentPage: currentPage }))
    try {
      const url = `${this.baseUrl}character?page=${page}&pageSize=${pageSize}`
      const response = await axios.get(url)
      const charactersData: CharactersData = response.data
      dispatch(fetchCharactersSuccess(charactersData))
    } catch (error) {
      console.error('Error fetching Disney characters:', error)
      let errorMessage = 'Error fetching Disney characters'
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || errorMessage
      }
      dispatch(fetchCharactersFailure(errorMessage))
      throw error
    }
  }

  async searchCharacters(
    dispatch: Dispatch,
    searchType: string,
    searchValue: string,
    page: number,
    pageSize: number,
  ) {
    dispatch(updateSearchType(searchType))
    dispatch(updateSearchValue(searchValue))

    const url = `${this.baseUrl}character`
    const formattedSearchValue = searchValue.trim().replace(/\s/g, '%20')

    const queryParams = new URLSearchParams({ page: String(page), pageSize: String(pageSize) })
    if (searchValue) {
      if (searchType === 'name') {
        queryParams.set('name', formattedSearchValue)
      } else if (searchType === 'tvShow') {
        queryParams.set('tvShows', formattedSearchValue)
      }
    }

    try {
      const response = await axios.get(`${url}?${queryParams}`)
      dispatch(fetchCharactersSuccess(response.data))
    } catch (error) {
      console.error('Error searching Disney characters:', error)
      let errorMessage = 'Error searching Disney characters'
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || errorMessage
      }
      dispatch(fetchCharactersFailure(errorMessage))
    }
  }
}
