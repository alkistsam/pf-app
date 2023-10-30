import { environment } from '../../environments/environment'
import axios from 'axios'

export class DisneyApiService {
  private baseUrl: string

  constructor() {
    this.baseUrl = environment.disneyUrl
  }

  async getCharacters() {
    try {
      const response = await axios.get(`${this.baseUrl}/characters`)
      return response.data
    } catch (error) {
      console.error('Error fetching Disney characters:', error)
      throw error
    }
  }
}
