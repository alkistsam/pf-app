export interface characters {
    info: {
        count: number
    },
    data: {
        _id: number,
        films: Array<string>,
        shortFilms: Array<string>,
        tvShows: Array<string>,
        videoGames: Array<string>,
        parkAttractions: Array<string>,
        allies: [],
        enemies: [],
        name: string,
        imageUrl: string,
        url: string
    }
}