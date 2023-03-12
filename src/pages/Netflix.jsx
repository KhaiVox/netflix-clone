import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaPlay } from 'react-icons/fa'
import { AiOutlineInfoCircle } from 'react-icons/ai'

import NavBar from '../components/NavBar'
import backgroundImage from '../assets/home.jpg'
import MovieLogo from '../assets/homeTitle.png'
import { fetchMovies, getGenres } from '../store'
import Slider from '../components/Slider'

export default function Netflix() {
    const [isScrolled, setIsScrolled] = useState(false)
    const movies = useSelector((state) => state.netflix.movies)
    const genres = useSelector((state) => state.netflix.genres)
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGenres())
    })

    useEffect(() => {
        if (genresLoaded) {
            dispatch(fetchMovies({ genres, type: 'all' }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [genresLoaded])

    console.log(genres)
    console.log(movies)

    // Scroll xuống nav sẽ có background đen
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true)
        return () => (window.onscroll = null)
    }

    return (
        <Container>
            <NavBar isScrolled={isScrolled} />
            <div className="hero">
                <img src={backgroundImage} alt="" className="background-image" />
                <div className="container">
                    <div className="logo">
                        <img src={MovieLogo} alt="" />
                    </div>
                    <div className="buttons flex">
                        <button className="flex a-center j-center" onClick={() => navigate('/player')}>
                            <FaPlay /> Play
                        </button>
                        <button className="flex a-center j-center">
                            <AiOutlineInfoCircle /> More Info
                        </button>
                    </div>
                </div>
            </div>
            <Slider movies={movies} />
        </Container>
    )
}

const Container = styled.div`
    background-color: black;
    .hero {
        position: relative;
        .background-image {
            filter: brightness(60%);
        }
        img {
            height: 100vh;
            width: 100vw;
        }
        .container {
            position: absolute;
            bottom: 5rem;
            .logo {
                img {
                    width: 600px;
                    height: auto;
                    margin-left: 5rem;
                }
            }
            .buttons {
                margin: 5rem;
                gap: 2rem;
                button {
                    font-size: 1.4rem;
                    gap: 1rem;
                    border-radius: 0.2rem;
                    padding: 0.5rem 2.4rem 0.5rem 2rem;
                    border: none;
                    cursor: pointer;
                    transition: 0.2s ease-in-out;
                    &:hover {
                        opacity: 0.8;
                    }
                    &:nth-of-type(2) {
                        background-color: rgba(109, 109, 110, 0.7);
                        color: white;
                        svg {
                            font-size: 1.8rem;
                        }
                    }
                }
            }
        }
    }
`
