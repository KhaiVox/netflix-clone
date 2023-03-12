import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { fetchMovies, getGenres } from '../store'
import NavBar from '../components/NavBar'
import Slider from '../components/Slider'
import NotAvailable from './NotAvailable'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../utils/firebase-config'
import SelectGenre from '../components/SelectGenre'

export default function TVShows() {
    const [isScrolled, setIsScrolled] = useState(false)
    const movies = useSelector((state) => state.netflix.movies)
    const genres = useSelector((state) => state.netflix.genres)
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded)

    // const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGenres())
    })

    useEffect(() => {
        if (genresLoaded) {
            dispatch(fetchMovies({ genres, type: 'movie' }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [genresLoaded])

    console.log(genres)
    console.log(movies)

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true)
        return () => (window.onscroll = null)
    }

    onAuthStateChanged(firebaseAuth, (currentUser) => {})

    return (
        <Container>
            <div className="navbar">
                <NavBar isScrolled={isScrolled} />
            </div>
            <div className="data">
                <SelectGenre genres={genres} type="tv" />

                {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
            </div>
        </Container>
    )
}

const Container = styled.div`
    .data {
        margin-top: 8rem;
        .not-available {
            text-align: center;
            color: white;
            margin-top: 4rem;
        }
    }
`
