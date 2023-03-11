import React from 'react'
import CardSlider from './CardSlider'

export default function Slider({ movies }) {
    const getMoviesFromRange = (from, to) => {
        return movies.slice(from, to)
    }

    // với từng danh mục sẽ có 10 bộ phim tương ứng
    return (
        <div>
            <CardSlider title="Trending Now" data={getMoviesFromRange(0, 10)} />
            <CardSlider title="New Releases" data={getMoviesFromRange(10, 20)} />
            <CardSlider title="Blockbuster Movies" data={getMoviesFromRange(20, 30)} />
            <CardSlider title="Popular on Netflix" data={getMoviesFromRange(30, 40)} />
            <CardSlider title="Action Movies" data={getMoviesFromRange(40, 50)} />
            <CardSlider title="Epics" data={getMoviesFromRange(50, 60)} />
        </div>
    )
}
