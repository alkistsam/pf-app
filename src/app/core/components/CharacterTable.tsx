import { useCallback, useEffect, useRef, useState } from 'react'
import { RootState } from '../state'
import { useAppSelector, useAppDispatch } from '../state/hooks'
import './CharacterTables.scss'
import { DisneyApiService } from '../services/disneyAPI'
import { Character } from '../../shared/interfaces/interfaces'
import Pagination from './Pagination'
import Search from './Search'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import PieChartIcon from '@mui/icons-material/PieChart'
import { sortCharacters, updatePageWithSearchValue } from '../state/characters/sliceCharacters'
import { debounce } from 'lodash'
import Modal from './Modal'
import PieChartModal from './PieChart'

const CharacterTable = () => {
  const dispatch = useAppDispatch()
  const characterSearchState = useAppSelector((state: RootState) => state.characterSearch)
  const page = characterSearchState.currentPage
  const pageSize = characterSearchState.pageSize
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [searchValue, setSearchValue] = useState('')
  const [nameSearchDisplayValue, setNameSearchDisplayValue] = useState('')
  const [tvShowSearchDisplayValue, setTvShowSearchDisplayValue] = useState('')
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPieChartOpen, setIsPieChartOpen] = useState(false)
  const maxRetries = 5
  const retryDelay = 1000
  const isLoading = characterSearchState.loading

  const fetchSearchCharacters = useCallback(
    (value: string) => {
      dispatch(
        updatePageWithSearchValue({
          currentPage: 1,
          searchValue: value,
        }),
      )
    },
    [dispatch],
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchCharacters = useCallback(debounce(fetchSearchCharacters, 200), [
    fetchSearchCharacters,
  ])

  const handleSearchCharacter = (value: string) => {
    setSearchValue(value)
    setNameSearchDisplayValue(value)
    debouncedFetchCharacters(value)
  }

  const handleSearchTV = (value: string) => {
    setSearchValue(value)
    setTvShowSearchDisplayValue(value)
    debouncedFetchCharacters(value)
  }
  const handleNameSearchFocus = () => {
    setTvShowSearchDisplayValue('')
  }

  const handleTvShowSearchFocus = () => {
    setNameSearchDisplayValue('')
  }

  const handleSort = () => {
    if (characterSearchState.characters?.data) {
      const sorted = [...characterSearchState.characters.data]
      sorted.sort((a, b) => {
        const nameA = a.name.toUpperCase()
        const nameB = b.name.toUpperCase()
        if (nameA < nameB) {
          return sortDirection === 'asc' ? -1 : 1
        }
        if (nameA > nameB) {
          return sortDirection === 'asc' ? 1 : -1
        }
        return 0
      })
      dispatch(sortCharacters(sorted))
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    }
  }

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character)
    setIsModalOpen(true)
  }
  const handlePieClick = useRef(
    debounce(() => {
      setIsPieChartOpen(true)
    }, 200),
  ).current

  useEffect(() => {
    let retryCount = 0
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    const apiService = new DisneyApiService()
    const shouldFetchCharacters =
      !characterSearchState.characters?.data ||
      (characterSearchState.pageSize !== pageSize && !characterSearchState.searchValue)

    const fetchCharacters = () => {
      if (shouldFetchCharacters) {
        apiService
          .getCharacters(
            dispatch,
            characterSearchState.currentPage,
            pageSize,
            '',
            characterSearchState.currentPage,
          )
          .catch((error) => {
            if (error.response && error.response.status === 504) {
              console.log('Received 504 error, not retrying.')
            } else {
              if (retryCount < maxRetries) {
                timeoutId = setTimeout(
                  () => {
                    fetchCharacters()
                    retryCount++
                  },
                  retryDelay * Math.pow(2, retryCount),
                )
              }
            }
          })
      }
    }
    fetchCharacters()
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [dispatch, pageSize, characterSearchState])

  return (
    <div className="wrapper">
      <Pagination searchValue={searchValue} />
      <div className="search-container">
        <Search
          placeholder="Search character..."
          onSearch={handleSearchCharacter}
          searchType="name"
          value={nameSearchDisplayValue}
          onFocus={handleNameSearchFocus}
        />
        <div className="chart">
          <span>Chart</span>
          <PieChartIcon
            className="pie-icon bounce"
            fontSize="large"
            onClick={handlePieClick}
            sx={{ color: '#b12228' }}
          />
        </div>
        <Search
          placeholder="Search by TV show..."
          onSearch={handleSearchTV}
          searchType="tvShow"
          value={tvShowSearchDisplayValue}
          onFocus={handleTvShowSearchFocus}
        />
      </div>
      {isLoading ? (
        <div className="loading-container">
          <div className="mickey">
            <div className="ear left-ear"></div>
            <div className="ear right-ear"></div>
            <div className="face"></div>
          </div>
        </div>
      ) : (
        <table>
          <caption>Disney Characters</caption>
          <tbody>
            <tr>
              <th onClick={handleSort}>Character Name</th>
              <th>Number of TV shows appearances</th>
              <th>Number of Game appearances</th>
              <th>Names of allies</th>
              <th>Names of enemies</th>
            </tr>
            {Array.isArray(characterSearchState?.characters?.data) &&
              characterSearchState?.characters?.data?.map((character: Character, index: number) => {
                const sequentialNumber = (page - 1) * characterSearchState.pageSize + index + 1
                return (
                  <tr key={character._id} onClick={() => handleCharacterClick(character)}>
                    <td className="character-name" data-cell="name">
                      {sequentialNumber} - {character.name}
                    </td>
                    <td data-cell="tv-shows">
                      {character.tvShows.join(', ')} ({character.tvShows.length})
                    </td>
                    <td data-cell="games">
                      {character.videoGames.length > 0
                        ? character.videoGames.length
                        : 'No games found!'}
                    </td>
                    <td data-cell="allies">
                      {character.allies.length > 0 ? character.allies : 'No allies found!'}
                    </td>
                    <td data-cell="enemies">
                      {character.enemies.length > 0 ? character.enemies : 'No enemies found!'}
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      )}
      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        character={selectedCharacter}
      />
      <PieChartModal
        isOpen={isPieChartOpen}
        onClose={() => setIsPieChartOpen(false)}
        character={characterSearchState.characters?.data || []}
      />
      <button className="scroll-to-top-button" onClick={handleScrollToTop}>
        <ArrowDropUpIcon />
      </button>
    </div>
  )
}

export default CharacterTable
