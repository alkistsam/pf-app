import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import characterReducer from '../state/characters/sliceCharacters'
import '@testing-library/jest-dom'
import CharacterTable from '../components/CharacterTable'
import React, { ReactNode } from 'react'

interface WrapperProps {
  children: ReactNode
}

const mockCharacters = [
  {
    _id: 308,
    films: ['Tangled', 'Tangled: Before Ever After'],
    shortFilms: ['Tangled Ever After', 'Hare Peace'],
    tvShows: ['Once Upon a Time', 'Tangled: The Series'],
    videoGames: [
      'Disney Princess Enchanting Storybooks',
      'Hidden Worlds',
      'Disney Crossy Road',
      'Kingdom Hearts III',
    ],
    parkAttractions: ['Celebrate the Magic', 'Jingle Bell, Jingle BAM!'],
    allies: [],
    enemies: [],
    sourceUrl: 'https://disney.fandom.com/wiki/Queen_Arianna',
    name: 'Queen Arianna',
    imageUrl:
      'https://static.wikia.nocookie.net/disney/images/1/15/Arianna_Tangled.jpg/revision/latest?cb=20160715191802',
    createdAt: '2021-04-12T01:33:34.458Z',
    updatedAt: '2021-04-12T01:33:34.458Z',
    url: 'https://api.disneyapi.dev/characters/308',
    __v: 0,
  },
]

const store = configureStore({
  reducer: {
    characterSearch: characterReducer,
  },
  preloadedState: {
    characterSearch: {
      characters: {
        info: {
          count: mockCharacters.length,
          totalPages: 1,
          previousPage: null,
          nextPage: null,
        },
        data: mockCharacters,
      },
      loading: false,
      error: null,
      characterSearchValue: '',
      currentPage: 1,
      pageSize: 10,
      totalPages: 1,
      totalCount: mockCharacters.length,
      previousPage: null,
      nextPage: null,
      paginationSearchValue: '',
      searchType: 'name',
      searchValue: '',
    },
  },
})

const Wrapper: React.FC<WrapperProps> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
)
describe('CharacterTable', () => {
  it('renders the character table with initial state', () => {
    const { getByText } = render(<CharacterTable />, { wrapper: Wrapper })
    const characterName = getByText(/Queen Arianna/i)
    expect(characterName).toBeTruthy()
  })
})
afterEach(() => {
  jest.clearAllMocks()
})
