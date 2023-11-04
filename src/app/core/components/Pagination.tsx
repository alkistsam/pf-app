import { useAppDispatch, useAppSelector } from '../state/hooks';
import { updateCurrentPage, updateItemsPerPage } from '../state/pagination/paginationActions';
import { RootState } from '../state';
import { DisneyApiService } from '../services/disneyAPI';
import './Pagination.scss';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const Pagination = () => {
  const dispatch = useAppDispatch();
  const paginationState = useAppSelector((state: RootState) => state.pagination);
  const apiService = new DisneyApiService();
  const pageSizeOptions = [10, 20, 50, 100, 200, 500];

  const handleCurrentPageChangeLocal = (value: number) => {
    dispatch(updateCurrentPage(value));
    apiService.getCharacters(dispatch, value, paginationState.pageSize);
  };

  const handleItemsPerPageChangeLocal = (value: number) => {
    dispatch(updateItemsPerPage(value));
    apiService.getCharacters(dispatch, paginationState.currentPage, value);
  };

  return (
    <div className="container">
      <div className="pagination-container">
        <button
          className="pagination-arrow-button"
          onClick={() => handleCurrentPageChangeLocal(paginationState.currentPage - 1)}
          disabled={paginationState.currentPage === 1}
        >
          <ArrowLeftIcon fontSize="small" />
        </button>
        <div className="pagination-info">
          <span>Current Page: {paginationState.currentPage}</span>
        </div>
      <div className="pagination-container">
        <button
          className="pagination-arrow-button"
          onClick={() => handleCurrentPageChangeLocal(paginationState.currentPage + 1)}
          disabled={paginationState.currentPage === paginationState.totalPages}
        >
          <ArrowRightIcon fontSize="small"/>
        </button>
      </div>
      </div>
      <div className="dropdown-container">
        <span>Items per Page: </span>
        <ul className="disney-list">
          {pageSizeOptions.map((option) => (
            <li
              key={option}
              className={option === paginationState.pageSize ? 'selected' : ''}
              onClick={() => handleItemsPerPageChangeLocal(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
