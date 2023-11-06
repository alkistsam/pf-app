export interface Character {
  _id: number
  films: string[]
  shortFilms: string[]
  tvShows: string[]
  videoGames: string[]
  parkAttractions: string[]
  allies: string[]
  enemies: string[]
  sourceUrl: string
  name: string
  imageUrl: string
  createdAt: string
  updatedAt: string
  url: string
  __v: number
}

export interface CharactersData {
  info: {
    count: number
    totalPages: number
    previousPage: null | string
    nextPage: null | string
  }
  data: Character[]
}

export interface CharacterSearchState {
  characters: CharactersData | null;
  loading: boolean;
  error: string | null;
  characterSearchValue: string;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  previousPage: string | null;
  nextPage: string | null;
  paginationSearchValue: string;
  searchType: string;
  searchValue: string
}

export interface CharacterState {
  characterSearchValue: unknown
  characters: CharactersData | null
  loading: boolean
  error: string | null
  searchValue?: string
  searchType? : string
}
export interface PaginationState {
  currentPage: number
  pageSize: number
  totalPages: number
  totalCount: number
  previousPage: string | null
  nextPage: string | null
  searchValue: string
  searchType: string
}

export interface SearchComponentProps {
  placeholder: string
  onSearch: (value: string) => void
  searchType: string
}