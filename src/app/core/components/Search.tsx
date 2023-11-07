import { useCallback, useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { DisneyApiService } from '../services/disneyAPI'
import './Search.scss'
import { RootState } from '../state'
import { debounce } from 'lodash'
import { SearchComponentProps } from '../../shared/interfaces/interfaces'

const SearchComponent: React.FC<SearchComponentProps> = ({
  placeholder,
  onSearch,
  searchType,
  value,
  onFocus,
}) => {
  const dispatch = useAppDispatch()
  const apiService = useMemo(() => new DisneyApiService(), [])
  const characterSearchState = useAppSelector((state: RootState) => state.characterSearch)
  const page = characterSearchState.currentPage
  const pageSize = characterSearchState.pageSize

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(
    debounce((searchVal) => {
      onSearch(searchVal)
      if (searchVal === '') {
        apiService.getCharacters(dispatch, page, pageSize, '', page)
      } else {
        apiService.searchCharacters(dispatch, searchType, searchVal, page, pageSize)
      }
    }, 1),
    [dispatch, apiService, page, pageSize, searchType],
  )

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    debounceSearch(value)
  }

  useEffect(() => {
    return () => {
      debounceSearch.cancel()
    }
  }, [debounceSearch])
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onFocus={onFocus}
      />
    </div>
  )
}

export default SearchComponent
