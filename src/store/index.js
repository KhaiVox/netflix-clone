import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { API_KEY, TMDB_BASE_URL } from '../utils/constants'

// Tạo trạng thái ban đầu cho các movie
const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
}

// Lấy thể loại
export const getGenres = createAsyncThunk('netflix/genres', async () => {
    const {
        data: { genres },
    } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
    return genres
})

// Tạo mảng lưu thông tin phim
const createArrayFromRawData = (array, moviesArray, genres) => {
    array.forEach((movie) => {
        const movieGenres = []
        movie.genre_ids.forEach((genre) => {
            const name = genres.find(({ id }) => id === genre)
            if (name) movieGenres.push(name.name)
        })
        if (movie.backdrop_path)
            moviesArray.push({
                id: movie.id,
                name: movie?.original_name ? movie.original_name : movie.original_title,
                image: movie.backdrop_path,
                genres: movieGenres.slice(0, 3),
            })
    })
}

// Lấy danh sách phim
const getRawData = async (api, genres, paging) => {
    const moviesArray = []
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
        const {
            data: { results },
        } = await axios.get(`${api}${paging ? `&page=${i}` : ''}`)
        createArrayFromRawData(results, moviesArray, genres)
    }
    return moviesArray
}

// Lấy phim xu hướng
export const fetchMovies = createAsyncThunk('netflix/trending', async ({ type }, thunkApi) => {
    const {
        netflix: { genres },
    } = thunkApi.getState()
    const data = getRawData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`, genres, true)
    return data
})

// Thiết lập trạng thái ban đầu cho đối tượng "phim"
const NetflixSlice = createSlice({
    name: 'netflix',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload
            state.genresLoaded = true
        })
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload
        })
    },
})

export const store = configureStore({
    reducer: {
        netflix: NetflixSlice.reducer,
    },
})
