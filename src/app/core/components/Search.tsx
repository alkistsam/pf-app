import React, { useCallback, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { DisneyApiService } from '../services/disneyAPI'
import './Search.scss'
import { RootState } from '../state'
import { debounce } from 'lodash'
import { SearchComponentProps } from '../../shared/interfaces/interfaces'

const SearchComponent: React.FC<SearchComponentProps> = ({ placeholder, onSearch, searchType }) => {
  const dispatch = useAppDispatch()
  const [searchValue, setSearchValue] = useState('')
  const apiService = useMemo(() => new DisneyApiService(), [])
  const characterSearchState = useAppSelector((state: RootState) => state.characterSearch)
  const page = characterSearchState.currentPage
  const pageSize = characterSearchState.pageSize

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(
    debounce((searchVal) => {
      if (searchVal === '') {
        onSearch(searchVal)
        apiService.getCharacters(dispatch, page, pageSize, '', page)
      } else {
        onSearch(searchVal)
        apiService.searchCharacters(dispatch, searchType, searchVal, page, pageSize)
      }
    }, 200),
    [dispatch, apiService, page, pageSize, searchType],
  )

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchValue(value)
    debounceSearch(value)
  }

  React.useEffect(() => {
    return () => {
      debounceSearch.cancel()
    }
  }, [debounceSearch])
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default SearchComponent
