import React, { useState } from 'react';
import { RootState } from '../state';
import {useAppSelector, useAppDispatch} from '../state/hooks'
import './CharacterTables.scss'
import { DisneyApiService } from "../services/disneyAPI"
import { Character, CharacterState } from '../../shared/interfaces/interfaces';
import { fetchCharactersRequest } from '../state/characters/characterActions';
import Pagination from './Pagination'
import Search from './Search'
import { sortCharacters } from '../state/characters/characterActions'

const CharacterTable = () => {
    const dispatch = useAppDispatch();

    const disneyCharactersState: CharacterState = useAppSelector((state: RootState) => state.characters);
    const apiService = new DisneyApiService();
    const paginationState = useAppSelector((state: RootState) => state.pagination);
    const page = paginationState.currentPage;
    const pageSize = paginationState.pageSize;
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
    const handleSearchCharacter = (value: string) => {
      if (value === '') {
        apiService.getCharacters(dispatch, page, pageSize);
      } else {
        apiService.searchCharacters(dispatch, 'name', value);
      }
    };
  
    const handleSearchTV = (value: string) => {
      if (value === '') {
        apiService.getCharacters(dispatch, page, pageSize);
      } else {
        apiService.searchCharacters(dispatch, 'tvShow', value);
      }
    };

    const handleSort = () => {
      if (disneyCharactersState.characters?.data) {
        const sorted = [...disneyCharactersState.characters.data];
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
        });
  
        dispatch(sortCharacters(sorted));
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      }
    };

    const handleScrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    

    React.useEffect(() => {
      const apiService = new DisneyApiService();
      dispatch(fetchCharactersRequest());
      apiService.getCharacters(dispatch, page, pageSize);
    }, [dispatch, page, pageSize]);

  return (
    <div className='wrapper'>
      <Pagination
          />
      <div className='search-container'>
        <Search placeholder="Search character..." onSearch={handleSearchCharacter} searchType="name" />
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
          {disneyCharactersState.characters?.data?.map((character: Character, index: number) => {
            const sequentialNumber = (page - 1) * paginationState.pageSize + index + 1;
            return (
              <tr key={character._id}>
                <td className='character-name' data-cell='name'>
                  {sequentialNumber} - {character.name}
                </td>
                <td data-cell='tv-shows'>
                  {character.tvShows.join(', ')} ({character.tvShows.length})
                </td>
                <td data-cell='games'>({character.videoGames.length})</td>
                <td data-cell='allies'>{character.allies}</td>
                <td data-cell='enemies'>{character.enemies}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className="scroll-to-top-button" onClick={handleScrollToTop}>
      Scroll to Top
    </button>
    </div>
  );
};

export default CharacterTable;
