import { useAppDispatch, useAppSelector } from '../state/hooks';
import { RootState } from '../state';
import './Pagination.scss';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { fetchCharactersRequest, updateCurrentPage, updateItemsPerPage, updatePageWithSearchValue, updateTotalPages } from '../state/characters/sliceCharacters';
import { DisneyApiService } from '../services/disneyAPI';

interface SearchComponentProps {
  searchValue: string
}
const Pagination : React.FC<SearchComponentProps> = ({ searchValue }) => {
  const dispatch = useAppDispatch();
  const characterSearchState = useAppSelector((state: RootState) => state.characterSearch);
  const apiService = new DisneyApiService;
  const pageSizeOptions = [10, 20, 50, 100, 200, 500];

  const handleCurrentPageChangeLocal = (value: number) => {
    dispatch(updatePageWithSearchValue({
      currentPage: value,
      searchValue: searchValue,
    }));
    apiService.searchCharacters(dispatch, characterSearchState.searchType, searchValue, value, characterSearchState.pageSize);
  };
  
  const handleItemsPerPageChangeLocal = (value: number) => {
    dispatch(updateItemsPerPage(value));
    dispatch(updateCurrentPage(1));
  
    if (characterSearchState.searchValue) {
      apiService.searchCharacters(
        dispatch, 
        characterSearchState.searchType, 
        characterSearchState.searchValue, 
        1, 
        value
      );
    } else {
      dispatch(fetchCharactersRequest({
        searchValue: '',
        currentPage: 1,
      }));
      apiService.getCharacters(dispatch, 1, value, '', 1);
    }
      const newTotalPages = Math.ceil(characterSearchState.totalCount / value);
    dispatch(updateTotalPages(newTotalPages));
    };
  
  
  return (
    <div className="container">
      <div className="pagination-container">
        <button
          className="pagination-arrow-button"
          onClick={() => handleCurrentPageChangeLocal(characterSearchState.currentPage - 1)}
          disabled={characterSearchState.currentPage === 1}
        >
          <ArrowLeftIcon fontSize="small" />
        </button>
        <div className="pagination-info">
          <span>Current Page: {characterSearchState.currentPage}</span>
        </div>
        <div className="pagination-container">
          <button
            className="pagination-arrow-button"
            onClick={() => handleCurrentPageChangeLocal(characterSearchState.currentPage + 1)}
            disabled={
              characterSearchState?.currentPage !== undefined &&
              characterSearchState?.characters?.info?.totalPages !== undefined &&
              characterSearchState.currentPage >= (characterSearchState.characters.info.totalPages || 0)
            }
          >
            <ArrowRightIcon fontSize="small" />
          </button>
        </div>
        <p>Total Pages: {characterSearchState.characters?.info?.totalPages}</p>
      </div>
      <div className="items-container">
        <span>Items per Page: </span>
        <ul className="disney-list">
          {pageSizeOptions.map((option) => (
            <li
              key={option}
              className={option === characterSearchState.pageSize ? 'selected' : ''}
              onClick={() => handleItemsPerPageChangeLocal(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Pagination;
