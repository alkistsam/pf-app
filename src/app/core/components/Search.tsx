import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { DisneyApiService } from '../services/disneyAPI';
import './Search.scss';
import { RootState } from '../state';

interface SearchComponentProps {
  placeholder: string;
  onSearch: (value: string) => void;
  searchType: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ placeholder, onSearch, searchType }) => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState('');
  const apiService = new DisneyApiService();
  const paginationState = useAppSelector((state: RootState) => state.pagination);
  const page = paginationState.currentPage;
  const pageSize = paginationState.pageSize;

  const handleSearch = () => {
    onSearch(searchValue);
    apiService.searchCharacters(dispatch, searchType, searchValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    if (value === '') {
      apiService.getCharacters(dispatch, page, pageSize);
    } else {
      apiService.searchCharacters(dispatch, searchType, value);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchComponent;
