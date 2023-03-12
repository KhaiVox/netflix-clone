import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { fetchDataByGenre } from '../store'

export default function SelectGenre({ genres, type }) {
    const dispatch = useDispatch()

    return (
        <Select
            className="flex"
            onChange={(e) => {
                dispatch(fetchDataByGenre({ genre: e.target.value, type }))
            }}
        >
            {genres.map((genre) => {
                return (
                    <option value={genre.id} key={genre.id}>
                        {genre.name}
                    </option>
                )
            })}
        </Select>
    )
}

const Select = styled.select`
    margin-top: -28px;
    margin-left: 3rem;
    padding: 4px;
    font-size: 1.1rem;
    color: white;
    background-color: rgba(0, 0, 0, 0.9);
    cursor: pointer;
    border-radius: 2px;
    border: 1px solid rgba(255, 255, 255, 0.9);
    font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
    &:hover {
        /* background-color: hsla(0, 0%, 100%, 0.1); */
    }
`
