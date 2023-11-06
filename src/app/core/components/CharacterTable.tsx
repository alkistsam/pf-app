  import React, { useCallback, useState } from 'react';
  import { RootState } from '../state';
  import { useAppSelector, useAppDispatch } from '../state/hooks';
  import './CharacterTables.scss';
  import { DisneyApiService } from '../services/disneyAPI';
  import { Character } from '../../shared/interfaces/interfaces';
  import Pagination from './Pagination';
  import Search from './Search';
  import { fetchCharactersRequest, sortCharacters, updatePageWithSearchValue } from '../state/characters/sliceCharacters';
import { debounce } from 'lodash';

  const CharacterTable = () => {
    const dispatch = useAppDispatch();
    const characterSearchState = useAppSelector((state: RootState) => state.characterSearch);
    const page = characterSearchState.currentPage;
    const pageSize = characterSearchState.pageSize;
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [searchValue, setSearchValue] = useState('');


    const fetchCharacters = useCallback((value: string) => {
      dispatch(updatePageWithSearchValue({
        currentPage: 1,
        searchValue: value,
      }));
      dispatch(fetchCharactersRequest({
        searchValue: value,
        currentPage: 1,
      }));
    }, [dispatch]);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedFetchCharacters = useCallback(debounce(fetchCharacters, 500), [fetchCharacters]);
    

    const handleSearchCharacter = (value: string) => {
      setSearchValue(value);
      debouncedFetchCharacters(value);
    };
    
    const handleSearchTV = (value: string) => {
      setSearchValue(value);
      debouncedFetchCharacters(value);
    };
    const handleSort = () => {
      if (characterSearchState.characters?.data) {
        const sorted = [...characterSearchState.characters.data];
        sorted.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return sortDirection === 'asc' ? -1 : 1;
          }
          if (nameA > nameB) {
            return sortDirection === 'asc' ? 1 : -1;
          }
          return 0;
        })

        dispatch(sortCharacters(sorted));
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      }
    }

    const handleScrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    };

    React.useEffect(() => {
      const apiService = new DisneyApiService();
          const shouldFetchCharacters = !characterSearchState.characters?.data || 
        (characterSearchState.pageSize !== pageSize && !characterSearchState.searchValue);
    
      if (shouldFetchCharacters) {
        apiService.getCharacters(
          dispatch,
          characterSearchState.currentPage,
          pageSize,
          '',
          characterSearchState.currentPage
        );
      }
    }, [dispatch, pageSize, characterSearchState]);
    
    return (
      <div className="wrapper">
        <Pagination searchValue={searchValue} />
        <div className="search-container">
          <Search
            placeholder="Search character..."
            onSearch={handleSearchCharacter}
            searchType="name"
          />
          <Search placeholder="Search by TV show..." onSearch={handleSearchTV} searchType="tvShow" />
        </div>
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
            {characterSearchState.characters &&
    characterSearchState.characters.data?.map((character: Character, index: number) => {
              const sequentialNumber = (page - 1) * characterSearchState.pageSize + index + 1
              return (
                <tr key={character._id}>
                  <td className="character-name" data-cell="name">
                    {sequentialNumber} - {character.name}
                  </td>
                  <td data-cell="tv-shows">
                    {character.tvShows.join(', ')} ({character.tvShows.length})
                  </td>
                  <td data-cell="games">({character.videoGames.length})</td>
                  <td data-cell="allies">{character.allies}</td>
                  <td data-cell="enemies">{character.enemies}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <button className="scroll-to-top-button" onClick={handleScrollToTop}>
          Scroll to Top
        </button>
      </div>
    )
  }

  export default CharacterTable;
