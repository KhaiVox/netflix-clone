import { signOut } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../utils/firebase-config'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaPowerOff, FaSearch } from 'react-icons/fa'

import logo from '../assets/logo.png'

export default function NavBar({ isScrolled }) {
    const [showSearch, setShowSearch] = useState(false)
    const [inputHover, setInputHover] = useState(false)

    const links = [
        { name: 'Home', link: '/' },
        { name: 'TV Show', link: '/tv' },
        { name: 'Movies', link: '/movies' },
        { name: 'My List', link: '/mylist' },
    ]

    const navigate = useNavigate()

    // khi nhấn nút đăng xuất thì user sẽ bị xóa và trở về trang login
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) navigate('/login')
    })

    return (
        <Container>
            <nav className={`flex ${isScrolled ? 'scrolled' : ''}`}>
                <div className="left flex a-center">
                    <div className="brand flex a-center j-center">
                        <img src={logo} alt="" />
                    </div>
                    <ul className="links flex">
                        {links.map(({ name, link }) => {
                            return (
                                <li key={name}>
                                    <Link to={link}>{name}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="right flex a-center">
                    <div className={`search ${showSearch ? 'show-search' : ''}`}>
                        <button
                            onFocus={() => setShowSearch(true)}
                            onBlur={() => {
                                if (!inputHover) {
                                    setShowSearch(false)
                                }
                            }}
                        >
                            <FaSearch />
                        </button>
                        <input
                            type="text"
                            placeholder="Search"
                            onMouseEnter={() => setInputHover(true)}
                            onMouseLeave={() => setInputHover(true)}
                            // khi rời chuột sẽ ẩn ô Search
                            onBlur={() => {
                                setShowSearch(false)
                                setInputHover(false)
                            }}
                        />
                    </div>
                    <button
                        onClick={() => {
                            signOut(firebaseAuth)
                        }}
                    >
                        <FaPowerOff />
                    </button>
                </div>
            </nav>
        </Container>
    )
}

const Container = styled.div`
    .scrolled {
        background-color: black;
    }
    nav {
        position: sticky;
        height: 4.5rem;
        width: 100%;
        justify-content: space-between;
        position: fixed;
        top: 0;
        z-index: 2;
        padding: 0 2rem;
        align-items: center;
        transition: 0.3s ease-in-out;
        background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.7) 10%, transparent);
        .left {
            gap: 2rem;
            .brand {
                img {
                    height: 4rem;
                }
            }
            .links {
                list-style: none;
                gap: 2rem;
                li {
                    a {
                        color: white;
                        text-decoration: none;
                    }
                }
            }
        }
        .right {
            gap: 1rem;
            button {
                background-color: transparent;
                border: none;
                cursor: pointer;
                &:focus {
                    outline: none;
                }
                svg {
                    color: #f34242;
                    font-size: 1.2rem;
                }
            }
            .search {
                display: flex;
                gap: 0.4rem;
                align-items: center;
                justify-content: center;
                padding: 0.4rem;
                padding-left: 0.5rem;
                button {
                    background-color: transparent;
                    border: none;
                    &:focus {
                        outline: none;
                    }
                    svg {
                        color: white;
                        font-size: 1.2rem;
                    }
                }
                input {
                    width: 0;
                    opacity: 0;
                    padding-left: 4px;
                    visibility: hidden;
                    transition: 0.3s ease-in-out;
                    background-color: transparent;
                    font-size: 1rem;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
                        'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
                    border: none;
                    color: white;
                    &:focus {
                        outline: none;
                    }
                }
            }
            .show-search {
                border: 1px solid white;
                background-color: rgba(0, 0, 0, 0.6);
                input {
                    width: 100%;
                    opacity: 1;
                    visibility: visible;
                }
            }
        }
    }
`
